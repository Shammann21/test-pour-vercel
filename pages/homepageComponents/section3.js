// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import TokenInfo from "./Tokeninfo.js";

import
{
    faCircleDown
} from "@fortawesome/free-solid-svg-icons";
import Typewriter from 'typewriter-effect';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { useContractRead } from 'wagmi';

// Fonction pour formater la date
const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleDateString();
}

// Fonction pour convertir la période en mois
const formatPeriod = (period) => {
    const MONTH = 30 * 24 * 60 * 60; // 30 jours en secondes
    return Math.floor(period / MONTH) + " mois";
}

export default function Section3()
{
    return (
        <>
            <section id="section3" className="flex flex-col place-items-center justify-around min-h-screen h-fit bg-fixed bg-center bg-cover bg-[url('/images/bg/31.jpg')] py-10">
                <div className="text-center max-w-6xl mx-auto">
                    <div className="box-cont w-full px-14 mb-10 py-8 shadow-md bg-gradient-to-r from-neutral-900 rounded-lg">
                        <h2 className="text-white font-bold text-3xl mb-6">Our whitepaper</h2>
                        <h4 className="lead text-white font-bold mb-6">
                            <Typewriter
                                options={{
                                    strings: ["READ ME !!!"],
                                    autoStart: true,
                                    loop: true,
                                }}
                            />
                        </h4>
                        <div className="flex justify-center">
                            <a href="/whitepaper/whitepaper.pdf"
                                target="_blank"
                                className="bg-slate-300 text-black hover:bg-red-600 active:bg-red-900 font-bold uppercase text-base px-8 py-3 rounded-[24px] shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                                <span>whitepaper.pdf <FontAwesomeIcon icon={faCircleDown} className="ml-2" /></span>
                            </a>
                        </div>
                        <div className="text-white mb-10 text-left leading-relaxed whitespace-pre-line">
                            <div className="prose prose-invert max-w-none">
                                <h2 className="text-2xl font-bold mb-4 text-white border-b-2 border-white pb-2 inline-block"style={{color: '#FFD700'}}>1. Introduction</h2>
                                <p className="mb-6">
                                    Airdrop Farmer Alliance was born from the need for a streamlined and efficient way to participate in airdrop opportunities within the Web3 ecosystem. By creating a unified platform with a gold-mining-inspired theme, we aim to:
                                </p>
                                <ul className="list-disc pl-6 mb-6">
                                    <li>Enable secure and transparent contribution management.</li>
                                    <li>Reward users through a tiered system based on staking the native AFA token.</li>
                                    <li>Build a collaborative community focused on maximizing rewards from diverse protocols.</li>
                                </ul>

                                <h2 className="text-2xl font-bold mb-4 text-white border-b-2 border-white pb-2 inline-block"style={{color: '#FFD700'}}>2. The Problem</h2>
                                <p className="mb-4">Airdrop opportunities often face challenges, including:</p>
                                <ul className="list-disc pl-6 mb-6">
                                    <li>Lack of transparency in fund pooling.</li>
                                    <li>Fragmented participation mechanisms.</li>
                                    <li>Limited access to specific opportunities for small contributors.</li>
                                    <li>Unsafe link to claim Rewards from airdrops.</li>
                                </ul>

                                <h2 className="text-2xl font-bold mb-4 text-white border-b-2 border-white pb-2 inline-block"style={{color: '#FFD700'}}>3. The Solution</h2>
                                <p className="mb-4">
                                    Airdrop Farmer Alliance provides a unified platform with the following key features:
                                </p>

                                <h3 className="text-xl font-bold mb-3 text-white"style={{color: '#CD7F32', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>3.1 Useful link to gather information</h3>
                                <p className="mb-4">
                                    Information about potential or ongoing airdrops and safe links to gathered the rewards!
                                </p>

                                <h3 className="text-xl font-bold mb-3 text-white"style={{color: '#CD7F32', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>3.2 Liquidity Pools</h3>
                                <p className="mb-4">Each protocol is assigned two pools:</p>
                                <ul className="list-disc pl-6 mb-4">
                                    <li>USDC Pool</li>
                                    <li>ETH Pool</li>
                                </ul>

                                <p className="mb-4">Pools are named and categorized into two tabs for easy access: Testnet and Mainnet.</p>
                                <p className="mb-2">For example:</p>
                                <ul className="list-disc pl-6 mb-6">
                                    <li>Linea (USDC Pool) and Linea (ETH Pool)</li>
                                    <li>Hyperlane (USDC Pool) and Hyperlane (ETH Pool)</li>
                                    <li>Fuel (USDC Pool) and Fuel (ETH Pool)</li>
                                    <li>Bera chain (Bera Pool)</li>
                                </ul>

                                <h3 className="text-xl font-bold mb-3 text-white"style={{color: '#CD7F32', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>3.3 Tier-Based System</h3>
                                <p className="mb-4">
                                    Users stake AFA tokens to unlock tiers and access different pools. Higher tiers provide access to more pools and exclusive rewards:
                                </p>
                                <ul className="list-disc pl-6 mb-6">
                                    <li>Tier 1: Prospector - 2,000 AFA tokens staked</li>
                                    <li>Tier 2: Gold Digger - 5,000 AFA tokens staked</li>
                                    <li>Tier 3: Mine Overseer - 12,500 AFA tokens staked</li>
                                    <li>Tier 4: Chief Excavator - 30,000 AFA tokens staked</li>
                                    <li>Tier 5: Gold Baron - 75,000 AFA tokens staked</li>
                                </ul>

                                <h3 className="text-xl font-bold mb-3 text-white"style={{color: '#CD7F32', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>3.4 Transparent Fund Management</h3>
                                <p className="mb-4">Funds are securely managed through smart contracts, ensuring:</p>
                                <ul className="list-disc pl-6 mb-6">
                                    <li>Full transparency of deposits and withdrawals</li>
                                    <li>Decentralized control over pooled assets</li>
                                </ul>

                                <h2 className="text-2xl font-bold mb-4 text-white border-b-2 border-white pb-2 inline-block"style={{color: '#FFD700'}}>4. The AFA Token</h2>

                                <h3 className="text-xl font-bold mb-3 text-white"style={{color: '#CD7F32', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>4.1 Overview</h3>
                                <p className="mb-4">
                                    The AFA token (Airdrop Farmer Alliance) is the native utility token of the Airdrop Farmer Alliance platform. It serves as the backbone for staking, governance, and accessing tiered rewards.
                                </p>

                                <h3 className="text-xl font-bold mb-3 text-white"style={{color: '#CD7F32', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>4.2 Token Allocation</h3>
                                <ul className="list-disc pl-6 mb-6">
                                    <li>Total Supply: 100,000,000 AFA</li>
                                    <li>ICO Allocation: 35% (35,000,000 AFA)</li>
                                    <li>Liquidity Pools & Staking Rewards: 35% (35,000,000 AFA)</li>
                                    <li>Community & Marketing: 15%</li>
                                    <li>Reserve: 15%</li>
                                    <li>Team Allocation: 10% (vesting over 3 months)</li>
                                </ul>
                                <div className="mt-2 mb-2 flex justify-left">
                                    <TokenInfo />
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-white"style={{color: '#CD7F32', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>4.3 Use Cases</h3>
                                <ul className="list-disc pl-6 mb-6">
                                    <li>Staking: Unlock access to pools and tiers.</li>
                                    <li>Governance: Participate in decision-making processes.</li>
                                    <li>Rewards: Earn incentives through staking and liquidity contributions.</li>
                                </ul>

                                <h2 className="text-2xl font-bold mb-4 text-white border-b-2 border-white pb-2 inline-block"style={{color: '#FFD700'}}>5. ICO Details</h2>
                                <h3 className="text-xl font-bold mb-3 text-white"style={{color: '#CD7F32', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>5.1 Details</h3>
                                <ul className="list-disc pl-6 mb-6">
                                    <li>Token Name: AFA (Airdrop Farmer Alliance)</li>
                                    <li>Symbol: AFA</li>
                                    <li>ICO Start and End Dates: January to March 2025.</li>
                                    <li>Presale Allocation: 35,000,000 AFA</li>
                                    <li>Price: $0.05 USD per AFA token</li>
                                    <li>Purchase Methods: USDC & ETH
                                        <ul className="list-disc pl-6 mt-2">
                                            <li>Min Contribution : 1000 AFA tokens </li>
                                            <li>Max Contribution : 100000 AFA tokens </li>
                                        </ul>
                                    </li>
                                </ul>

                                <h2 className="text-2xl font-bold mb-4  border-b-2 border-white pb-2 inline-block"style={{color: '#FFD700'}}>6. Roadmap</h2>
                                <ul className="list-disc pl-6 mb-6">
                                    <li className="mb-4">Phase 1: Platform Design & Development
                                        <ul className="list-disc pl-6 mt-2">
                                            <li>Build and test the liquidity pooling mechanism.</li>
                                            <li>Develop and launch the tiered staking system.</li>
                                        </ul>
                                    </li>
                                    <li className="mb-4">Phase 2: ICO Launch
                                        <ul className="list-disc pl-6 mt-2">
                                            <li>Begin token sale and distribute AFA tokens.</li>
                                            <li>List AFA tokens on decentralized exchanges.</li>
                                        </ul>
                                    </li>
                                    <li className="mb-4">Phase 3: Community Growth & Expansion
                                        <ul className="list-disc pl-6 mt-2">
                                            <li>Incentivize community participation through marketing campaigns.</li>
                                            <li>Onboard new protocols and expand pool options.</li>
                                        </ul>
                                    </li>
                                    <li className="mb-4">Phase 4: Governance Implementation
                                        <ul className="list-disc pl-6 mt-2">
                                            <li>Introduce community voting for platform updates and decisions.</li>
                                            <li>Expand partnerships with other DeFi and Web3 projects.</li>
                                        </ul>
                                    </li>
                                </ul>

                                <h2 className="text-2xl font-bold mb-4 text-white border-b-2 border-white pb-2 inline-block">7. Frequently Asked Questions (FAQ)</h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-xl font-bold mb-2" style={{color: '#CD7F32', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>What is Airdrop Farmer Alliance?</h3>
                                        <p className="mb-4">
                                            Airdrop Farmer Alliance is a decentralized platform designed to facilitate community-driven liquidity farming and participation in targeted airdrop campaigns.
                                        </p>
                                    </div>
                                    
                                    <div>
                                        <h3 className="text-xl text-white font-bold mb-2" style={{color: '#CD7F32', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>How do the liquidity pools work?</h3>
                                        <p className="mb-4">
                                            Each protocol has two pools (USDC and ETH) where users can contribute funds securely. Funds are managed transparently via smart contracts.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-xl text-white font-bold mb-2" style={{color: '#CD7F32', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>What are the staking tiers?</h3>
                                        <p className="mb-4">
                                            Users stake AFA tokens to access different tiers, unlocking pools and exclusive rewards. Higher tiers require more tokens but offer greater benefits.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-xl text-white font-bold mb-2" style={{color: '#CD7F32', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>How can I participate in the ICO?</h3>
                                        <p className="mb-4">
                                            You can purchase AFA tokens during the ICO using ETH or USDC. Contributions are capped at 10,000 USDC or 3.5 ETH per user.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-xl text-white font-bold mb-2" style={{color: '#CD7F32', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>Where can I find updates?</h3>
                                        <p className="mb-4">
                                            Follow us on:
                                        </p>
                                        <ul className="list-disc pl-6 mb-4">
                                            <li>Twitter: <a href="https://x.com/Airdrop_Alloy" className="text-blue-400 hover:text-blue-300">https://x.com/Airdrop_Alloy</a></li>
                                            <li>Telegram: <a href="https://t.me/AirdropFarmerAlliance" className="text-blue-400 hover:text-blue-300">https://t.me/AirdropFarmerAlliance</a></li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-xl font-bold mb-2" style={{color: '#CD7F32', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>Will the platform provide useful resources?</h3>
                                        <p className="mb-4">
                                            Yes, the platform will feature a dedicated section with useful and safe links to trusted information sources about airdrops.
                                        </p>
                                    </div>
                                </div>

                                <h2 className="text-2xl font-bold mb-4 text-white border-b-2 border-white pb-2 inline-block">8. Disclaimer</h2>
                                <p className="mb-4">
                                    Participation in Airdrop Farmer Alliance involves risk. Please ensure you fully understand the platform's mechanics, conduct your own research, and note that this is not financial advice. This platform does not provide any financial or investment advice under any circumstances.
                                </p>

                                <p className="text-white mb-10" style={{ textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>
                                    The $AFA tokenomics allocate <span style={{color: '#CD7F32', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>35%</span> of the total supply to the liquidity pool and another <span style={{color: '#CD7F32', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>35%</span> to the presale, ensuring robust market support and early investor engagement. The remaining supply is distributed across marketing <span style={{color: '#CD7F32', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>15%</span>, team <span style={{color: '#CD7F32', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>10%</span>, and reserve <span style={{color: '#CD7F32', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>5%</span> allocations to foster growth and sustainability.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}