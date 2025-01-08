import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useContractRead } from "wagmi";
import { useState, useEffect } from "react";

// Parse contract ABI from environment variable
const contractAbi = JSON.parse(process.env.NEXT_PUBLIC_CONTRACT_ABI || '[]');

export default function PresaleManager() {
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

    const { data: startTime } = useContractRead({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        abi: contractAbi,
        functionName: "startTime",
        watch: true,
        structuralSharing: (prev, next) => {
            if (!prev || !next) return next;
            if (JSON.stringify(prev) === JSON.stringify(next)) return prev;
            return next;
        }
    });

    const { data: endTime } = useContractRead({
        address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
        abi: contractAbi,
        functionName: "endTime",
        watch: true,
        structuralSharing: (prev, next) => {
            if (!prev || !next) return next;
            if (JSON.stringify(prev) === JSON.stringify(next)) return prev;
            return next;
        }
    });

    useEffect(() => {
        if (tokenPriceData && totalTokensSold && icoActive && startTime && endTime) {
            const data = {
                tokenPrice: Number(tokenPriceData) / (10 ** 18),
                totalTokensSold: Number(totalTokensSold),
                isActive: Boolean(icoActive),
                startTime: new Date(Number(startTime) * 1000),
                endTime: new Date(Number(endTime) * 1000)
            };
            setPresaleData(data);
        }
    }, [tokenPriceData, totalTokensSold, icoActive, startTime, endTime]);

    return (
        <>
            <h3 className="magenta normal">Presale Status:</h3>
            {presaleData && (
                <div>
                    <p>Price: ${presaleData.tokenPrice.toFixed(3)} per Token</p>
                    <p>Total Tokens Sold: {new Intl.NumberFormat().format(presaleData.totalTokensSold)}</p>
                    <p>ICO Active: {presaleData.isActive ? "Yes" : "No"}</p>
                    <p>Start Time: {presaleData.startTime.toLocaleString()}</p>
                    <p>End Time: {presaleData.endTime.toLocaleString()}</p>
                </div>
            )}
        </>
    );
}
