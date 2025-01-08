// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegram } from "@fortawesome/free-brands-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import TokenInfo from './Tokeninfo';

// Homepage Home Section
export default function HomeSection()
{
    return (
        <>
            {/* PARALLAX ONE START */}
            <section id="home" className="flex items-center justify-center h-fit min-h-screen bg-fixed bg-center bg-cover bg-[url('/images/bg/33.jpg')]">
                <div className="container mx-auto text-center mt-[100px] md:mt-0 px-4">
                    <h5 className="uppercase text-white text-xl sm:text-2xl font-bold">Welcome to the future of decentralization</h5>
                    <h2 className="uppercase lead font-bold" style={{ fontSize: '1.5rem', sm: '2rem', color: '#ffcc00', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>Airdrop Farmer Alliance</h2>
                    <p className="text-white text-lead font-bold" style={{ fontSize: '1.25rem', sm: '2rem', color: '#CD7F32', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>First ever Airdrop Copy Farming Platform !</p><br />
                    <p className="font-bold" style={{ 
                        fontSize: '1.25rem', 
                        color: '#CD7F32',
                        textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
                    }}>
                        <strong style={{ color: '#22C55E' }}>✓</strong> Community farming. <strong style={{ color: '#22C55E' }}>✓</strong> help to the decentralization.
                        <strong style={{ color: '#22C55E' }}>✓</strong> mutal growth. <strong style={{ color: '#22C55E' }}>✓</strong>
                    </p>
                    <br />
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href="https://t.me/AirdropFarmerAlliance" target="_blank" className="w-full sm:w-auto bg-neutral-900 text-white hover:bg-red-600 active:bg-red-900 font-bold uppercase text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3 rounded-[24px] shadow-md hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150">
                            <span>Join us on Telegram <FontAwesomeIcon icon={faTelegram} className="ml-2 sm:ml-5 text-xl sm:text-2xl text-blue-600" /></span>
                        </a>
                        <a href="https://x.com/Airdrop_Alloy" target="_blank" className="w-full sm:w-auto bg-neutral-900 text-white hover:bg-red-600 active:bg-red-900 font-bold uppercase text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3 rounded-[24px] shadow-md hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150">
                            <span>Follow us on Twitter 
                                <img 
                                    src="/images/bg/x-logo.jpg" 
                                    alt="X Logo" 
                                    className="ml-2 inline-block w-4 h-4 sm:w-6 sm:h-6"
                                />
                            </span>
                        </a>
                    </div>
                    <div className="mt-8 flex justify-center">
                        <TokenInfo />
                    </div>
                </div>
            </section>
            {/* PARALLAX ONE END */}
        </>
    )
}