// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCircleDown
} from "@fortawesome/free-solid-svg-icons";
import Typewriter from 'typewriter-effect';


// Homepage Section5 Component
export default function Section5()
{
    return (
        <>
            <section id="section5" className="flex place-items-center justify-around min-h-screen h-fit bg-fixed bg-center bg-cover bg-[url('/images/bg/37.jpg')]">
                <div className="text-center">
                    <div className="box-cont h-fit w-fit px-14 mb-10 py-8 shadow-md bg-gradient-to-r from-neutral-900 rounded-lg">
                        <h4 className="lead text-white font-bold mb-6">
                            <Typewriter
                                options={{
                                    strings: ["FARM WITH US!"],
                                    autoStart: true,
                                    loop: true,
                                }}
                            />
                        </h4>
                        <p className="text-white mb-8 font-bold text-xl underline" style={{color: '#CD7F32', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>
                            To access our exclusive services and maximize benefits,<br/>
                            we've introduced a tiered system for $AFA holders:
                        </p>
                        
                        <div className="text-left text-red-600">
                            {/* Tier 1: Prospector */}
                            <div className="mb-8">
                                <h3 className="font-bold text-xl mb-2 text-blue-600 underline">Level 1: Prospector</h3>
                                <ul className="list-none pl-4" style={{textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>
                                    <li>- Cost: 2,000 AFA <span className="text-blue-500">($100 USDC)</span></li>
                                    <li>- Access: Participation in 4 pools of choice <span className="text-green-400"> (2 Testnet or 2 Mainnet)</span></li>
                                    <li>- Governance: Read-only access to governance discussions, without voting rights</li>
                                    <li>- Additional Benefits: Access to educational resources on airdrops</li>
                                </ul>
                            </div>

                            {/* Tier 2: Gold Digger */}
                            <div className="mb-8">
                                <h3 className="font-bold text-xl mb-2 text-green-400 underline">Level 2: Gold Digger</h3>
                                <ul className="list-none pl-4" style={{textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>
                                    <li>- Cost: 5,000 AFA <span className="text-blue-500">($250 USDC)</span></li>
                                    <li>- Access: Participation in 6 pools <span className="text-green-400"> (2 Testnet and 4 Mainnet)</span></li>
                                    <li>- Governance: Voting rights on secondary community proposals</li>
                                    <li>- Additional Benefits: Priority access to announcements of new pools</li>
                                </ul>
                            </div>

                            {/* Tier 3: Mine Overseer */}
                            <div className="mb-8">
                                <h3 className="font-bold text-xl mb-2 underline" style={{color: '#CD7F32'}}>Level 3: Mine Overseer</h3>
                                <ul className="list-none pl-4" style={{textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>
                                    <li>- Cost: 12,500 AFA <span className="text-blue-500">($650 USDC)</span></li>
                                    <li>- Access: Participation in 9 pools <span className="text-green-400"> (3 Testnet and 6 Mainnet)</span></li>
                                    <li>- Governance: Voting rights on strategic platform decisions</li>
                                    <li>- Additional Benefits: Access to a library of useful and secure links for airdrops</li>
                                </ul>
                            </div>

                            {/* Tier 4: Chief Excavator */}
                            <div className="mb-8">
                                <h3 className="font-bold text-xl mb-2 underline" style={{color: '#D3D3D3'}}>Level 4: Chief Excavator</h3>
                                <ul className="list-none pl-4" style={{textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>
                                    <li>- Cost: 30,000 AFA <span className="text-blue-500">($1,500 USDC)</span></li>
                                    <li>- Access: Participation in 12 pools <span className="text-green-400"> (4 Testnet and 8 Mainnet)</span></li>
                                    <li>- Governance: Weighted voting rights on key decisions, such as adding new protocols</li>
                                    <li>- Additional Benefits: Invitations to AMA (Ask Me Anything) sessions with the team</li>
                                </ul>
                            </div>

                            {/* Tier 5: Gold Baron */}
                            <div className="mb-8">
                                <h3 className="font-bold text-xl mb-2 underline" style={{color: '#FFD700'}}>Level 5: Gold Baron</h3>
                                <ul className="list-none pl-4" style={{textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>
                                    <li>- Cost: 75,000 AFA <span className="text-blue-500">($3,750 USDC)</span> </li>
                                    <li>- <span className="text-green-400">Access: Unlimited access to all Testnet and Mainnet pools</span></li>
                                    <li>- Governance: Proposal rights and major weighted voting on platform developments</li>
                                    <li>- Additional Benefits: Priority participation in beta releases of new features</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}