// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegram } from "@fortawesome/free-brands-svg-icons";
import TokenInfo from "./Tokeninfo.js";
// Homepage Section6 Section
export default function Section6()
{
    return (
        <>
            <section id="section6" className="flex items-center justify-center h-fit min-h-screen bg-fixed bg-center bg-cover bg-[url('/images/bg/35.jpg')]">
                <div className="text-center">
                    <div className="box-cont h-fit w-fit mt-[20%] px-20 mb-16 py-12 shadow-md bg-gradient-to-r from-neutral-900 rounded-lg">
                        <h5 className="uppercase text-red-600 text-2xl font-bold">
                            Join us on Socials networks
                        </h5>
                        <h5 className="uppercase text-lg text-blue-400 font-bold">
                            We are on Telegram.
                        </h5>
                        <h5 className="uppercase text-white text-lg mb-10 font-bold">
                            And Soon on discord ! 
                        </h5>
                        <a href="https://t.me/AirdropFarmerAlliance"
                            target="_blank"
                            className="bg-slate-300 mt-5 text-black hover:bg-red-600 active:bg-red-900 font-bold uppercase text-base px-8 py-3 rounded-[24px] shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                            <span>Telegram <FontAwesomeIcon icon={faTelegram} className="ml-5 text-2xl text-blue-600" /></span>
                        </a>
                        <a href="https://x.com/Airdrop_Alloy"
                            target="_blank"
                            className="bg-slate-300 mt-5 text-black hover:bg-red-600 active:bg-red-900 font-bold uppercase text-base px-8 py-3 rounded-[24px] shadow-md hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
                            <span>Twitter 
                                <img 
                                    src="/images/bg/logo-black.png" 
                                    alt="X Logo" 
                                    className="ml-5 inline-block w-6 h-6"
                                />
                            </span>
                        </a>
                   
                    </div>
               
                <div className="mt-2 mb-2 flex justify-left">
                    <TokenInfo />
                </div>
            </div>
            </section>
        </>
    )
}