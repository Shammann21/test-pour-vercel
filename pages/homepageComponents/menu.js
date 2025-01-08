import { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function Menu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showHamburger, setShowHamburger] = useState(true);

    const menuItems = [
        { id: "home", label: "HOME" },
        { id: "section4", label: "PRESALE" },
        { id: "section5", label: "TIERS SYSTEM" },
        { id: "section6", label: "SOCIALS" },
        { id: "section7", label: "TOKENOMICS" },
        { id: "section3", label: "WHITEPAPER" },
        { id: "section8", label: "ABOUT THE DAPP" }
    ];

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setShowHamburger(false);
    };

    const handleJoinPresale = () => {
        setIsMenuOpen(false);
        setShowHamburger(true);
        const presaleSection = document.getElementById('section4');
        if (presaleSection) {
            presaleSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const handleLinkClick = (sectionId) => {
        setIsMenuOpen(false);
        setShowHamburger(true);
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            {/* Navbar fixe en haut */}
            <div className="fixed top-0 left-0 right-0 bg-gradient-to-b from-neutral-900 to-neutral-800 z-50 border-b border-neutral-600">
                <div className="flex items-center justify-between px-4 py-2">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <img src="/images/logo.png" alt="Logo" className="h-14 sm:h-16" />
                    </div>

                    {/* Join Presale Button */}
                    <button
                        onClick={handleJoinPresale}
                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg font-medium text-sm px-8 py-3"
                    >
                        JOIN PRESALE
                    </button>

                    {/* Hamburger Button */}
                    {showHamburger && (
                        <button
                            onClick={toggleMenu}
                            className="text-white p-2 transition-all duration-300"
                            aria-label="Menu"
                        >
                            <FontAwesomeIcon 
                                icon={isMenuOpen ? faTimes : faBars} 
                                className="w-6 h-6"
                            />
                        </button>
                    )}
                </div>
            </div>

            {/* Menu déroulant */}
            <div className={`fixed inset-0 bg-gradient-to-b from-neutral-900 to-neutral-800 z-40 transition-all duration-300 ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
                <div className="flex flex-col items-center justify-center h-full space-y-6">
                    {menuItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleLinkClick(item.id)}
                            className="text-gray-300 hover:text-white text-xl font-medium px-8 py-2 rounded-lg hover:bg-gray-800 transition-colors uppercase"
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
}