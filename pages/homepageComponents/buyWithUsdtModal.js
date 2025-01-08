import React, { useState, useEffect } from "react";
import { 
  useAccount, 
  useContractWrite, 
  usePrepareContractWrite, 
  useNetwork, 
  useSwitchNetwork,
  useContractRead,
  usePublicClient
} from "wagmi";
import { 
  parseEther, 
  parseUnits, 
  formatUnits,
  encodeFunctionData,
  decodeErrorResult
} from "viem";
import { toast } from 'react-toastify';

// Constantes du contrat
const CONTRACT_ABI = JSON.parse(process.env.NEXT_PUBLIC_CONTRACT_ABI);
const ERC20_ABI = [
  {
    "constant": true,
    "inputs": [{"name": "_owner", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"name": "balance", "type": "uint256"}],
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {"name": "_spender", "type": "address"},
      {"name": "_value", "type": "uint256"}
    ],
    "name": "approve",
    "outputs": [{"name": "", "type": "bool"}],
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {"name": "_owner", "type": "address"},
      {"name": "_spender", "type": "address"}
    ],
    "name": "allowance",
    "outputs": [{"name": "", "type": "uint256"}],
    "type": "function"
  }
];

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
const USDC_ADDRESS = "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913";
const USDC_DECIMALS = 6;
const TOKEN_DECIMALS = 18;
const BASE_CHAIN_ID = 8453;

// Constants avec les vraies valeurs du smart contract
const DISPLAY_MAX = 99999; // Pour l'affichage UI
const MIN_PURCHASE = 1000n * BigInt(1e18);
const MAX_PURCHASE = 100020n * BigInt(1e18); // Aligné avec le smart contract

const BuyWithUsdtModal = () => {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isApproving, setIsApproving] = useState(false);
  const [ethPrice, setEthPrice] = useState(null);

  const { address, isConnected: useAccountIsConnected } = useAccount();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const publicClient = usePublicClient();

  // Lecture des données du contrat avec des logs
  const { data: tokenPriceUSDC } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'tokenPriceUSDC',
    watch: true,
  });

  const { data: minPurchaseUSDC } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'minPurchaseUSDC',
    watch: true,
  });

  const { data: maxPurchaseUSDC } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'maxPurchaseUSDC',
    watch: true,
  });

  const { data: icoActive } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'icoActive',
    watch: true,
  });

  const { data: endTime } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'endTime',
    watch: true,
  });

  // Récupérer le prix ETH
  useEffect(() => {
    const fetchEthPrice = async () => {
      try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
        const data = await response.json();
        setEthPrice(data.ethereum.usd);
      } catch (error) {
        console.error("Failed to fetch ETH price:", error);
      }
    };

    fetchEthPrice();
    // Rafraîchir le prix toutes les 30 secondes
    const interval = setInterval(fetchEthPrice, 30000);
    return () => clearInterval(interval);
  }, []);

  // Calcul des montants
  const getUsdcAmount = (value) => {
    if (!value || !tokenPriceUSDC) return BigInt(0);
    
    try {
      const tokenAmountInWei = parseUnits(value, TOKEN_DECIMALS);
      const usdcAmount = (tokenAmountInWei * BigInt(tokenPriceUSDC)) / BigInt(1e18);
      
      console.log("Detailed calculation:", {
        tokenAmount: value,
        tokenAmountInWei: tokenAmountInWei.toString(),
        tokenPrice: tokenPriceUSDC.toString(),
        calculatedUsdcAmount: usdcAmount.toString(),
        minRequired: (minPurchaseUSDC || 1000n * BigInt(1e18)).toString(),
        decimalAdjustment: "1e18",
        steps: {
          step1: `Token amount in wei: ${tokenAmountInWei.toString()}`,
          step2: `Token price: ${tokenPriceUSDC.toString()}`,
          step3: `Raw multiplication: ${(tokenAmountInWei * BigInt(tokenPriceUSDC)).toString()}`,
          step4: `After division by 1e18: ${usdcAmount.toString()}`,
          step5: `Final USDC amount: ${usdcAmount.toString()}`
        }
      });
      
      return usdcAmount;
    } catch (error) {
      console.error("Error in getUsdcAmount:", error);
      throw error;
    }
  };

  // Calcul du montant ETH nécessaire
  const getEthAmount = (value) => {
    if (!value || !tokenPriceUSDC || !ethPrice) return BigInt(0);
    
    try {
      // Convertir le nombre de tokens en wei (18 décimales)
      const tokenAmountInWei = parseUnits(value, TOKEN_DECIMALS);
      
      // Calculer le montant USDC nécessaire (6 décimales)
      const usdcAmount = (tokenAmountInWei * BigInt(tokenPriceUSDC)) / BigInt(1e18);
      
      // Convertir le prix ETH en format Chainlink (8 décimales)
      const ethPriceInChainlinkFormat = BigInt(Math.round(ethPrice * 1e8));
      
      // Calculer le montant ETH nécessaire
      // usdcAmount est en USDC (6 décimales)
      // ethPriceInChainlinkFormat est en USD (8 décimales)
      // On veut le résultat en ETH (18 décimales)
      const ethAmount = (BigInt(usdcAmount) * BigInt(1e20)) / ethPriceInChainlinkFormat;
      
      console.log("ETH calculation:", {
        tokenAmount: value,
        tokenAmountInWei: tokenAmountInWei.toString(),
        usdcAmount: formatUnits(usdcAmount, USDC_DECIMALS),
        ethPrice,
        ethPriceInChainlinkFormat: ethPriceInChainlinkFormat.toString(),
        ethAmount: formatUnits(ethAmount, 18),
        verificationCalc: {
          step1: `Tokens wanted: ${value}`,
          step2: `USDC needed: ${formatUnits(usdcAmount, USDC_DECIMALS)}`,
          step3: `ETH price: $${ethPrice}`,
          step4: `ETH amount: ${formatUnits(ethAmount, 18)}`,
          step5: `Verification: ${formatUnits(ethAmount * ethPriceInChainlinkFormat / BigInt(1e20), USDC_DECIMALS)} USDC`
        }
      });
      
      return ethAmount;
    } catch (error) {
      console.error("Error in getEthAmount:", error);
      throw error;
    }
  };

  // Configuration pour l'achat avec USDC
  const { writeAsync: buyWithUSDC, isLoading: isBuying } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'buyWithUSDC',
  });

  // Configuration pour l'achat avec ETH
  const { writeAsync: buyWithETH, isLoading: isBuyingWithEth } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'buyTokens',
  });

  // Configuration pour l'approbation USDC
  const { writeAsync: approve } = useContractWrite({
    address: USDC_ADDRESS,
    abi: ERC20_ABI,
    functionName: 'approve',
  });

  // Simple mise à jour de l'input sans validation
  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Limiter à 5 chiffres et vérifier si c'est un nombre valide
    if (value === "" || (/^\d{0,5}$/.test(value))) {
      setAmount(value);
      
      if (value) {
        try {
          const tokenAmountInWei = parseUnits(value, TOKEN_DECIMALS);
          if (tokenAmountInWei < minPurchaseUSDC) {
            setError("Minimum purchase is 1000 tokens");
          } else {
            setError("");
          }
        } catch (error) {
          console.error("Validation error:", error);
          setError("");
        }
      } else {
        setError("");
      }
    }
  };

  const handleBuyWithUsdc = async () => {
    let tokenAmountInWei;
    
    try {
      setIsLoading(true);

      if (!amount || isNaN(Number(amount))) {
        toast.error("Please enter a valid amount");
        return;
      }

      if (!useAccountIsConnected) {
        toast.error("Please connect your wallet");
        return;
      }

      if (chain?.id !== BASE_CHAIN_ID) {
        await switchNetwork?.(BASE_CHAIN_ID);
        toast.error("Please switch to Base network");
        return;
      }

      if (!icoActive) {
        toast.error("ICO is not active");
        return;
      }

      const cleanAmount = amount.trim().replace(/^0+/, '');
        tokenAmountInWei = parseUnits(cleanAmount, TOKEN_DECIMALS);
      const usdcAmount = getUsdcAmount(amount);

      // Approbation USDC
      setIsApproving(true);
      try {
          const { hash: approveHash } = await approve({
            args: [CONTRACT_ADDRESS, usdcAmount],
          });
          
          const approveReceipt = await publicClient.waitForTransactionReceipt({ 
            hash: approveHash,
            confirmations: 1
          });
          
        if (approveReceipt.status !== 'success') {
          toast.error("USDC approval failed");
          return;
        }

        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.error("Approval failed:", error);
        toast.error("USDC approval failed");
        return;
      } finally {
        setIsApproving(false);
      }

      // Simulation et transaction
      const { hash } = await buyWithUSDC({
        args: [tokenAmountInWei]
      });
      
      const receipt = await publicClient.waitForTransactionReceipt({ 
        hash,
        confirmations: 1
      });
      
      if (receipt.status === 'success') {
        setError(`Success you got: ${formatUnits(tokenAmountInWei, TOKEN_DECIMALS)} AFA tokens`);
          setAmount("");
        } else {
        toast.error("Transaction failed");
      }
    } catch (error) {
      console.error("Purchase failed:", error);
      toast.error("Transaction failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBuyWithEth = async () => {
    if (!amount) {
      toast.error("Please enter an amount");
      return;
    }

    try {
      setIsLoading(true);

      if (!useAccountIsConnected) {
        toast.error("Please connect your wallet");
        return;
      }

      if (chain?.id !== BASE_CHAIN_ID) {
        await switchNetwork?.(BASE_CHAIN_ID);
        toast.error("Please switch to Base network");
        return;
      }

      if (!icoActive) {
        toast.error("ICO is not active");
        return;
      }

      const cleanAmount = amount.trim().replace(/^0+/, '');
      const tokenAmountInWei = parseUnits(cleanAmount, TOKEN_DECIMALS);

      // Calculer le montant USDC nécessaire (avec 6 décimales)
      const usdcAmount = (tokenAmountInWei * BigInt(tokenPriceUSDC)) / BigInt(1e18);
      
      // Convertir le prix ETH en format Chainlink (8 décimales)
      const ethPriceInChainlinkFormat = BigInt(Math.round(ethPrice * 1e8));
      
      // Calculer le montant ETH nécessaire (18 décimales)
      const ethAmount = (usdcAmount * BigInt(1e20)) / ethPriceInChainlinkFormat;
      
      console.log("ETH purchase details:", {
        tokenAmount: cleanAmount,
        usdcNeeded: formatUnits(usdcAmount, USDC_DECIMALS),
        ethPrice,
        ethAmount: formatUnits(ethAmount, 18)
      });
      
      // Simulation et transaction
      const { hash } = await buyWithETH({
        value: ethAmount
      });
      
      console.log("ETH purchase sent:", hash);
      
      const receipt = await publicClient.waitForTransactionReceipt({
        hash,
        confirmations: 1
      });
      
      if (receipt.status === 'success') {
        setError(`Success you got: ${formatUnits(tokenAmountInWei, TOKEN_DECIMALS)} AFA tokens`);
        setAmount("");
      } else {
        toast.error("Transaction failed");
      }
    } catch (error) {
      console.error("ETH purchase error:", error);
      toast.error(error.message || "Transaction failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full max-w-sm px-4">
      <input
        type="text"
        value={amount}
        onChange={handleAmountChange}
        className="w-full rounded border bg-gray-50 text-gray-900 p-2.5 mb-4"
        placeholder={`token amount (1,000 to 99,999)`}
        disabled={isApproving || isBuying || isBuyingWithEth || isLoading}
      />
      {error && <p className={`${error.startsWith('Success') ? 'text-green-500' : 'text-red-500'} mb-2 w-full text-center`}>{error}</p>}
      {amount && tokenPriceUSDC && (
        <div className="text-sm text-gray-500 mb-4 w-full text-center">
          <p>
            Price: {formatUnits(getUsdcAmount(amount), USDC_DECIMALS)} USDC
          </p>
          {ethPrice && (
            <p className="mt-2">
              ≈ {formatUnits(getEthAmount(amount), 18)} ETH
            </p>
          )}
        </div>
      )}
      <div className="flex flex-col w-full gap-2">
        <button
          className="w-full bg-blue-400 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded"
          onClick={handleBuyWithUsdc}
          disabled={!useAccountIsConnected || isApproving || isBuying || isBuyingWithEth || isLoading || !amount}
        >
          {isApproving ? "Approving USDC..." : 
           isBuying ? "Buying tokens..." : 
           isLoading ? "Processing..." : 
           "Buy with USDC"}
        </button>
        <button
          className="w-full bg-purple-400 hover:bg-purple-500 text-white font-bold py-2 px-4 rounded mb-4"
          onClick={handleBuyWithEth}
          disabled={!useAccountIsConnected || isApproving || isBuying || isBuyingWithEth || isLoading || !amount}
        >
          {isBuyingWithEth ? "Buying tokens..." : 
           isLoading ? "Processing..." : 
           "Buy with ETH"}
        </button>
      </div>
    </div>
  );
};

export default BuyWithUsdtModal;

