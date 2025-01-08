import React, { useState, useEffect } from "react";
import { useAccount, useContractRead, useNetwork, usePublicClient } from "wagmi";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import BuyWithUsdtModal from "./buyWithUsdtModal";

// ABI vérifié depuis Base Scan
const contractAbi = JSON.parse(process.env.NEXT_PUBLIC_CONTRACT_ABI || '[]');

const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;

// Log ABI details
console.log("Contract Configuration:", {
    address: CONTRACT_ADDRESS,
    abiFunctions: contractAbi
        .filter(item => item.type === 'function')
        .map(item => ({
            name: item.name,
            inputs: item.inputs,
            outputs: item.outputs,
            stateMutability: item.stateMutability
        }))
});

export default function SeedSale() {
    const { address: useAccountAddress } = useAccount();
    const { chain } = useNetwork();
    const publicClient = usePublicClient();
    const [presaleDataParsed, setPresaleDataParsed] = useState(null);
    const [error, setError] = useState(null);

    // Log initial setup
    useEffect(() => {
        const checkContract = async () => {
            try {
                console.log("Checking contract interface...");
                
                // Vérification du RPC
                const blockNumber = await publicClient.getBlockNumber();
                console.log("Current block number:", blockNumber);
                
                const code = await publicClient.getBytecode({
                    address: CONTRACT_ADDRESS,
                });
                console.log("Contract bytecode:", code ? "Present" : "Not found");

                if (!code) {
                    console.error("Contract not found at address:", CONTRACT_ADDRESS);
                    setError("Contract not found at the specified address");
                    return;
                }

                // Vérification directe des fonctions
                const icoActive = await publicClient.readContract({
                    address: CONTRACT_ADDRESS,
                    abi: contractAbi,
                    functionName: 'icoActive',
                });
                console.log("Direct icoActive call:", icoActive);

                const maxTokens = await publicClient.readContract({
                    address: CONTRACT_ADDRESS,
                    abi: contractAbi,
                    functionName: 'MAX_TOKENS',
                });
                console.log("Direct maxTokens call:", maxTokens);

            } catch (err) {
                console.error("Contract check error:", {
                    message: err.message,
                    details: err,
                });
                setError("Error while checking the contract");
            }
        };

        if (CONTRACT_ADDRESS && publicClient) {
            checkContract();
        }

        console.log("Initial Setup:", {
            contractAddress: CONTRACT_ADDRESS,
            chainId: chain?.id,
            userAddress: useAccountAddress,
            abiLength: contractAbi.length,
            abiMethods: contractAbi.filter(x => x.type === 'function').map(x => x.name),
        });
    }, [chain?.id, useAccountAddress, publicClient]);

    // Vérification de l'état du contrat
    const { data: icoActive, isError: icoActiveError, error: icoActiveErrorDetails } = useContractRead({
        address: CONTRACT_ADDRESS,
        abi: contractAbi,
        functionName: "icoActive",
        watch: true,
        cacheTime: 0,
        staleTime: 0,
        onSettled: (data, error) => {
            console.log("ICO Active Settled:", {
                data,
                error,
                contractAddress: CONTRACT_ADDRESS,
                abiFunction: contractAbi.find(x => x.name === "icoActive"),
            });
        }
    });

    // Lecture des données du contrat avec configuration spécifique
    const { data: tokenPriceData, isError: tokenPriceError } = useContractRead({
        address: CONTRACT_ADDRESS,
        abi: contractAbi,
        functionName: "tokenPriceUSDC",
        watch: true,
        cacheTime: 0,
        staleTime: 0,
        onSettled: (data, error) => {
            console.log("Token Price Settled:", {
                data,
                error,
                contractAddress: CONTRACT_ADDRESS,
                abiFunction: contractAbi.find(x => x.name === "tokenPriceUSDC"),
            });
        }
    });

    const { data: totalTokensSold, isError: totalTokensSoldError } = useContractRead({
        address: CONTRACT_ADDRESS,
        abi: contractAbi,
        functionName: "totalTokensSold",
        watch: true,
        cacheTime: 0,
        staleTime: 0,
        onSettled: (data, error) => {
            console.log("Total Tokens Sold Settled:", {
                data,
                error,
                contractAddress: CONTRACT_ADDRESS,
                abiFunction: contractAbi.find(x => x.name === "totalTokensSold"),
            });
        }
    });

    const { data: maxTokens, isError: maxTokensError } = useContractRead({
        address: CONTRACT_ADDRESS,
        abi: contractAbi,
        functionName: "MAX_TOKENS",
        watch: true,
        cacheTime: 0,
        staleTime: 0,
        onSettled: (data, error) => {
            console.log("Max Tokens Settled:", {
                data,
                error,
                contractAddress: CONTRACT_ADDRESS,
                abiFunction: contractAbi.find(x => x.name === "MAX_TOKENS"),
            });
        }
    });

    useEffect(() => {
        console.log("Contract State:", {
            address: CONTRACT_ADDRESS,
            chainId: chain?.id,
            icoActive,
            icoActiveError,
            icoActiveErrorDetails,
            tokenPriceData,
            totalTokensSold,
            maxTokens,
            errors: {
                icoActiveError,
                tokenPriceError,
                totalTokensSoldError,
                maxTokensError
            }
        });

        // Vérification de la chaîne
        if (chain?.id !== 8453) { // Base mainnet
            setError("Please connect to Base mainnet network");
            return;
        }

        // Vérification de l'adresse du contrat
        if (!CONTRACT_ADDRESS) {
            setError("Contract address is not defined");
            return;
        }

        if (icoActiveError) {
            setError("Unable to verify ICO status");
            return;
        }

        // On ne met plus d'erreur si icoActive est undefined
        if (icoActive === false) {
            setError("ICO is not active yet");
            return;
        }

        // Si on arrive ici, on efface l'erreur
        setError("");

        if (tokenPriceData && totalTokensSold && maxTokens) {
            try {
                const tokenPrice = Number(tokenPriceData) / (10 ** 18);
                const sold = Number(totalTokensSold);
                const total = Number(maxTokens);
                const remaining = total - sold;
                
                const data = {
                    tokensSold: sold,
                    tokensSoldParsed: new Intl.NumberFormat().format(sold),
                    tokensToSell: total,
                    tokensToSellParsed: new Intl.NumberFormat().format(total),
                    price: tokenPrice,
                    presaleFundsRaised: sold * tokenPrice,
                    presaleFundsRaisedParsed: new Intl.NumberFormat('en-US', { 
                        style: 'currency', 
                        currency: 'USD',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0 
                    }).format(sold * tokenPrice),
                    presaleGoal: total * tokenPrice,
                    preSaleGoalParsed: new Intl.NumberFormat('en-US', { 
                        style: 'currency', 
                        currency: 'USD',
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0 
                    }).format(total * tokenPrice),
                    salePercentage: (sold * 100) / total,
                    salePercentageParsed: ((sold * 100) / total).toFixed(2) + "%"
                };
                
                setPresaleDataParsed(data);
                setError(null);
            } catch (err) {
                console.error("Data Processing Error:", err);
                setError("Error while processing data");
            }
        }
    }, [chain?.id, icoActive, icoActiveError, icoActiveErrorDetails, tokenPriceData, totalTokensSold, maxTokens]);

    const [displayPresaleData, setDisplayPresaleData] = useState(0);
    const [displayBuyData, setBuyData] = useState(0);

    useEffect(() => {
        if (!useAccountAddress) {
            setDisplayPresaleData(
                <>
                    {error ? (
                        <p className="text-red-500 mb-4">{error}</p>
                    ) : (
                        <>
                            <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700 mb-3">
                                <div className="bg-red-600 text-xs font-medium font-bold text-neutral-900 text-center p-0.5 leading-none rounded-full"
                                    style={{ width: presaleDataParsed?.salePercentageParsed }}>
                                    {presaleDataParsed?.salePercentageParsed}
                                </div>
                            </div>
                            <p className="text-white">
                                Sold — {presaleDataParsed?.tokensSoldParsed}
                                /
                                {presaleDataParsed?.tokensToSellParsed}
                            </p>
                            <p className="text-white mb-6">
                                Sold — {presaleDataParsed?.presaleFundsRaisedParsed}
                                /
                                {presaleDataParsed?.preSaleGoalParsed}
                            </p>
                        </>
                    )}
                </>
            );
            setBuyData("");
        } else {
            setDisplayPresaleData("");
            setBuyData(
                <>
                    {error ? (
                        <p className="text-red-500 mb-4">{error}</p>
                    ) : (
                        <div className="flex items-center justify-center mb-6 mt-5">
                            <BuyWithUsdtModal />
                        </div>
                    )}
                </>
            );
        }
    }, [useAccountAddress, presaleDataParsed, error]);

    return (
        <>
            <div className="text-center">
                <div className="box-cont h-fit w-fit px-14 mb-10 py-8 shadow-md bg-neutral-900 rounded-lg">
                    <h7 className="text-white font-bold">
                        ✅ 1st Jan 2025 to sell out (or 30th March 2025)<br />
                        ICO Launch
                    </h7>
                    <h4 className="text-white font-bold text-4xl" style={{color: '#CD7F32', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>
                        1 Token = 0.05 $USDC
                    </h4>
                    <p className="text-green-500 mb-4">
                        All year round is airdrop farming season
                    </p>
                    {displayPresaleData}
                    {displayBuyData}
                    <div className="flex place-items-center justify-around">
                        <ConnectButton />
                    </div>
                </div>
            </div>
        </>
    );
}