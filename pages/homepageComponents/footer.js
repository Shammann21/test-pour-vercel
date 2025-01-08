import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import
{
    faTelegram,
    faYoutube,
    faGithub
} from "@fortawesome/free-brands-svg-icons";

export default function Footer()
{
    return (
        <>
            <footer className="bg-neutral-800 pt-8">
                <div className="flex items-center justify-between px-6 py-8">
                    <a href="#" className="flex items-center">
                        <img src="/images/logo.png" className="h-12 sm:h-16" alt="Presale Example" />
                    </a>
                    <div>
                        
                        <ul className="text-blue-400 flex space-x-4">
                            <li>
                                <a href="#" className="hover:underline"><FontAwesomeIcon icon={faTelegram} className="mr-2" /> Telegram</a>
                            </li>
                            <li>
                                <a href="#" className="hover:underline">
                                    <img 
                                        src="/images/bg/x-logo.jpg" 
                                        alt="X Logo" 
                                        className="mr-2 inline-block w-4 h-4"
                                    /> 
                                    Twitter
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="py-6 px-4 bg-neutral-900 md:flex md:items-center md:justify-between">
                    <span className="text-sm text-gray-300 sm:text-center md:justify-between">© 2024 <a href="#">Airdrop Farmer Alliance</a>. All Rights Reserved.</span>
                    <span  className="text-sm text-gray-300 sm:text-center md:justify-between"> The content of the website and the Dapp is in anycase not a financial advice.</span>
                  {/*   <div className="flex mt-4 space-x-6 sm:justify-center md:mt-0">
                        <a href="#" className="text-gray-400 hover:text-white">
                            <FontAwesomeIcon icon={faTelegram} className="mr-2" />
                            <span className="sr-only">Telegram group</span>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <FontAwesomeIcon icon={faTwitter} className="mr-2" />
                            <span className="sr-only">Twitter page</span>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white">
                            <FontAwesomeIcon icon={faGithub} className="mr-2" />
                            <span className="sr-only">Github page</span>
                        </a>
                    </div>*/}
                </div>
            </footer>
        </>
    )
}