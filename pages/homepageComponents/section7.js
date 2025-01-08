// Import the FontAwesomeIcon component
import Typewriter from 'typewriter-effect';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


const data = {
    labels: ['Liquidity Pool', 'Presale', 'Marketing & Community', 'Team', 'Reserve'],
    datasets: [
        {
            label: '%',
            data: [35, 35, 15, 10 , 5],
            backgroundColor: [
                'rgba(3,54,73)',
                'rgba(3,101,100)',
                'rgba(205,179,128)',
                'rgba(138,155,15)',
                'rgba(248,202,0)',
                'rgba(189,21,80)',
            ],
            borderColor: [
                'rgba(3,54,73)',
                'rgba(3,101,100)',
                'rgba(205,179,128)',
                'rgba(138,155,15)',
                'rgba(248,202,0)',
                'rgba(189,21,80)',
            ],
            hoverOffset: 4,
            borderWidth: 1,
        },
    ],
};

const options = {
    maintainAspectRatio: false,
    plugins: {
        legend: {
            position: 'top',
            labels: {
                color: 'rgb(255, 255, 255)',
                padding: 20,
                font: {
                    size: 12,
                    family: "'Poppins', sans-serif",
                    weight: 'bold'
                },
                boxWidth: 34,
                boxHeight: 34
            },
        },
        tooltip: {
            titleFont: {
                size: 10
            },
            bodyFont: {
                size: 10
            },
            callbacks: {
                label: function(context) {
                    return `${context.label} : ${context.raw}%`;
                }
            }
        }
    }
};

export default function Section7()
{
    return (
        <>
            <section id="section7" className="flex place-items-center justify-around min-h-screen h-fit bg-fixed bg-center bg-cover bg-[url('/images/bg/34.jpg')]">
                <div className="text-center w-full max-w-4xl mx-auto px-4">
                    <div className="box-cont h-fit w-full px-12 sm:px-18 mb-10 py-8 shadow-md bg-gradient-to-r from-neutral-900 rounded-lg">
                        <h2 className="text-white font-bold underline"style={{color: '#CD7F32', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>AFA token distribution</h2>
                        <h4 className="lead text-white font-bold">
                            <Typewriter
                                options={{
                                    strings: ["Fairness and Stability"],
                                    autoStart: true,
                                    loop: true,
                                    pauseFor: 600000
                                }}
                            />
                        </h4>
                        <p className="text-white mb-10" style={{ textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>
    The $AFA tokenomics allocate <span style={{color: '#CD7F32', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>35%</span> of the total supply to the liquidity pool and another <span style={{color: '#CD7F32', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>35%</span> to the Presale, ensuring robust market support and early investor engagement. <br/> The remaining supply is distributed across Marketing & Community <span style={{color: '#CD7F32', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>15%</span>, Team <span style={{color: '#CD7F32', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>10%</span>, and Reserve <span style={{color: '#CD7F32', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>5%</span> allocations to foster growth and sustainability.
</p>
                        <h5 className="uppercase text-3xl font-bold" style={{color: '#CD7F32', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>
                            Tokenomics<br /> 
                        </h5>
                        <h5 className="uppercase text-2xl font-bold" style={{color: '#CD7F32', textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'}}>Total supply: 100,000,000 $AFA
                        </h5>
                        <div className="tokenomicsDiv">
                            <Doughnut
                                data={data}
                                height={380}
                                width={110}
                                options={options}
                            />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}