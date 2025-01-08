import SeedSale from "./seedSale.js";
import TokenInfo from "./Tokeninfo.js";

// Homepage Section4 Section
export default function Section4()
{
    return (
        <>
            <div className="w-full">
                <section id="section4" className="flex flex-col items-center min-h-screen h-fit bg-fixed bg-center bg-cover bg-[url('/images/bg/20.jpg')] w-full pt-20">
                    <div className="grid grid-flow-row auto-rows-min sm:grid-flow-col gap-4">
                        <div className="text-left">
                            <div className="box-cont h-fit w-fit px-14 py-8 shadow-md bg-gradient-to-r from-neutral-900 rounded-lg">
                                <h3 className="text-white font-bold"style={{color: '#CD7F32', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>
                                    🚀 Airdrop Farmer Alliance Token  <br />
                                    Presale
                                </h3>
                                <p className="text-white" style={{color: '#CD7F32'}}><strong>1) </strong> Fixed Token price : 0.05 USDC</p>
                                <p className="text-white" style={{color: '#CD7F32'}}><strong>2) </strong> 35 millions AFA For sale </p>
                                <p className="text-white" style={{color: '#CD7F32'}}><strong>3) </strong> 35 millions AFA For liquidity pool   </p>
                                <p className="text-white" style={{color: '#CD7F32'}}><strong>4) </strong> Create AFA/ETH pool on DEX platforms in the BASE </p>
                                <p className="text-white" style={{color: '#CD7F32'}}><strong>5) </strong> Platform launch date :  Q1 2025 </p>
                            </div>
                        </div>
                        <SeedSale />
                    </div>
                    <div className="box-cont h-fit w-fit px-4 py-2 shadow-md bg-gradient-to-r from-neutral-900 rounded-lg mt-4">
                        <TokenInfo />
                    </div>
                </section>
            </div>
        </>
    )
}