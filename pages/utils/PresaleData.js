// Rainbow and Wagmi integration guide: https://billyjitsu.hashnode.dev/the-rainbowkit-wagmi-guide-i-wish-i-had
import { ConnectButton } from '@rainbow-me/rainbowkit';
import {
    useAccount,
    useContractRead,
    useContractWrite,
    usePrepareContractWrite,
    useWaitForTransaction,
} from "wagmi";
import { useState, useEffect } from "react";

// Parse contract ABI from environment variable
const contractAbi = JSON.parse(process.env.NEXT_PUBLIC_CONTRACT_ABI || '[]');

export default function PresaleData() {
    const [presaleData, setPresaleData] = useState(null);

    // Lecture des données du contrat
    const { data: tokenPriceData } = useContractRead({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        abi: contractAbi,
        functionName: "tokenPriceUSDC",
        watch: true,
        structuralSharing: (prev, next) => {
            if (!prev || !next) return next;
            if (JSON.stringify(prev) === JSON.stringify(next)) return prev;
            return next;
        }
    });

    const { data: totalTokensSold } = useContractRead({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        abi: contractAbi,
        functionName: "totalTokensSold",
        watch: true,
        structuralSharing: (prev, next) => {
            if (!prev || !next) return next;
            if (JSON.stringify(prev) === JSON.stringify(next)) return prev;
            return next;
        }
    });

    const { data: maxTokens } = useContractRead({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        abi: contractAbi,
        functionName: "MAX_TOKENS",
        watch: true,
        structuralSharing: (prev, next) => {
            if (!prev || !next) return next;
            if (JSON.stringify(prev) === JSON.stringify(next)) return prev;
            return next;
        }
    });

    const { data: icoActive } = useContractRead({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        abi: contractAbi,
        functionName: "icoActive",
        watch: true,
        structuralSharing: (prev, next) => {
            if (!prev || !next) return next;
            if (JSON.stringify(prev) === JSON.stringify(next)) return prev;
            return next;
        }
    });

    useEffect(() => {
        if (tokenPriceData && totalTokensSold && maxTokens && icoActive) {
            const tokenPrice = Number(tokenPriceData) / (10 ** 18);
            const sold = Number(totalTokensSold);
            const total = Number(maxTokens);
            const remaining = total - sold;
            
            const data = {
                tokenPrice,
                totalTokensSold: sold,
                maxTokens: total,
                remaining,
                isActive: Boolean(icoActive),
                percentageSold: ((sold * 100) / total).toFixed(2),
                totalValue: (total * tokenPrice).toFixed(2),
                raisedValue: (sold * tokenPrice).toFixed(2)
            };
            
            setPresaleData(data);
        }
    }, [tokenPriceData, totalTokensSold, maxTokens, icoActive]);

    const renderContent = () => {
        if (!presaleData) return null;

        return (
            <>
                <h3 className="magenta normal">Presale Data:</h3>
                <div>
                    <p>Token Price: ${presaleData.tokenPrice.toFixed(3)}</p>
                    <p>Total Supply: {new Intl.NumberFormat().format(presaleData.maxTokens)} Tokens</p>
                    <p>Tokens Sold: {new Intl.NumberFormat().format(presaleData.totalTokensSold)} Tokens</p>
                    <p>Remaining: {new Intl.NumberFormat().format(presaleData.remaining)} Tokens</p>
                    <p>Sale Progress: {presaleData.percentageSold}%</p>
                    <p>Total Value: ${new Intl.NumberFormat().format(presaleData.totalValue)}</p>
                    <p>Raised Value: ${new Intl.NumberFormat().format(presaleData.raisedValue)}</p>
                    <p>ICO Status: {presaleData.isActive ? "Active" : "Inactive"}</p>
                </div>
            </>
        );
    };

    return renderContent();
}
