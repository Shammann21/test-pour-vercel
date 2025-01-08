import Image from 'next/image';

export default function TokenInfo() {
    const tokenAddress = "0xfb9038243F141503BcD58FA37BDDbFe2e951050e";
    
    const addToMetaMask = async () => {
        try {
            if (window.ethereum) {
                await window.ethereum.request({
                    method: 'wallet_watchAsset',
                    params: {
                        type: 'ERC20',
                        options: {
                            address: tokenAddress,
                            symbol: 'AFA',
                            decimals: 18,
                            image: 'https://github.com/Shammann21/Asset-AFA-icoWS/blob/main/16.jpg?raw=true'
                        },
                    },
                });
            }
        } catch (error) {
            console.error("Error adding token to MetaMask:", error);
        }
    };

    return (
        <div className="flex items-center gap-1">
            <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0">
                <Image
                    src="/images/16.jpg"
                    alt="Token"
                    width={48}
                    height={48}
                    className="object-cover"
                />
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1">
                <div className="flex items-center gap-1">
                    <span className="text-sm text-white font-medium" style={{ textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>
                        CA:
                    </span>
                    <span className="text-sm text-red-700 font-medium" style={{ textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000' }}>
                        {tokenAddress}
                    </span>
                </div>
                <button
                    onClick={addToMetaMask}
                    className="bg-yellow-500 hover:bg-yellow-300 text-black px-2 py-1 rounded-full text-sm font-medium transition-colors flex items-center gap-1"
                >
                    <img 
                        src="/images/metmask-fox.svg" 
                        alt="MetaMask" 
                        className="w-4 h-4"
                    />
                    Add to MetaMask
                </button>
            </div>
        </div>
    );
}