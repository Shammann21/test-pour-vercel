import Typewriter from 'typewriter-effect';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";

export default function Section8()
{
    return (
        <>
            <section id="section8" className="flex place-items-center justify-around min-h-screen h-fit bg-fixed bg-center bg-cover bg-[url('/images/bg/35.jpg')]">
                <div className="text-center">
                    <div className="box-cont h-fit w-fit px-14 mb-10 py-8 shadow-md bg-gradient-to-r from-neutral-900 rounded-lg">
                        <h4 className="lead text-white font-bold">
                            <Typewriter
                                options={{
                                    strings: ["Community Airdrop Farming"],
                                    autoStart: true,
                                    loop: true,
                                    pauseFor: 600000
                                }}
                            />
                        </h4> <br />
                        <p className="text-white mb-10 text-2xl" style={{ fontSize: '2rem', color: '#ffcc00', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>
                            <span className="underline">Goal :</span> Create a fair and rewarding airdrop farming system for the community, leveraging collective participation.
                        </p>
                        <p className="text-white mb-10 text-2xl text-left underline">
                        <span className="underline text-2xl font-bold"style={{color: '#CD7F32', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>How:</span> 
                        </p>
                        <ul className="text-white text-left list-disc list-inside mb-10 text-lg">
                            <p>
                                <span className="underline text-2xl font-bold text-left" style={{color: '#CD7F32', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>Pooling Resources:</span> <br />
                                <span className='text-left'>Each community pool will range from $1,000 to $10,000 worth of USDC and will correspond to one wallet address. This ensures efficient management and qualification for airdrops.</span>
                            </p>
                            <p>
                                <span className="underline font-bold text-left" style={{color: '#CD7F32', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>Point System Airdrops:</span> <br />
                                <span className='text-left'>Utilize larger pools for airdrop systems based on points to maximize potential rewards. The more volume we collectively generate, the bigger the airdrop rewards. Higher volumes can often lead to higher rankings and more significant airdrop allocations.</span>
                            </p>
                            <p>
                                <span className="underline font-bold text-left" style={{color: '#CD7F32', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>Other Airdrop Systems:</span> <br />
                                <span className='text-left'>Employ smaller pools for other types of airdrop systems to ensure optimal participation and reward distribution. More pools will result in more wallet addresses, leading to increased airdrop allocations across multiple addresses.</span>
                            </p>
                            <p>
                                <span className="underline font-bold text-left" style={{color: '#CD7F32', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>Team Actions:</span> <br />
                                <span className='text-left'>The Airdrop Farmer Alliance team will manage these wallet pools, perform the necessary actions, and ensure they qualify for the airdrops.</span>
                            </p>
                            <p>
                                <span className="underline font-bold text-left" style={{color: '#CD7F32', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>Boosting Returns:</span> <br />
                                <span className='text-left'>Supplement the community pools with liquidity from the team wallet and reserve (10,000,000 $AFA and 5,000,000 $AFA, respectively) to enhance overall returns.</span>
                            </p>
                            <p>
                                <span className="underline font-bold text-left" style={{color: '#CD7F32', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>Strategic Farming:</span> <br />
                                <span className='text-left'>Engage in strategic airdrop farming protocols that offer the highest potential rewards.</span>
                            </p>
                            <p>
                                <span className="underline font-bold text-left" style={{color: '#CD7F32', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>Fair Distribution:</span> <br />
                                <span className='text-left'>Distribute airdrop rewards proportionally based on each member's contribution to the pool, ensuring a fair and equitable system. The pool weight will be calculated by considering individual contributions after deducting the added liquidity from the Airdrop farmer Alliance team.</span>
                            </p>
                            <p>
                                <span className="underline font-bold text-left" style={{color: '#CD7F32', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>Community Engagement:</span> <br />
                                <span className='text-left'>Encourage active participation and collaboration within the community, fostering a sense of collective achievement and mutual support.</span>
                            </p>
                        </ul>
                    </div>
                </div>
            </section>
        </>
    )
}