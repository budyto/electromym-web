import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, ShoppingCart } from 'lucide-react';
import { Button } from '../ui/Button';

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Inicio', path: '/' },
        { name: 'Catálogo', path: '/catalogo' },
        { name: 'Financiación MyM', path: '/credito-mym' },
    ];

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 bg-metallic-black/80 backdrop-blur-lg border-b border-white/10 ${isScrolled ? 'shadow-lg py-3' : 'py-5'}`}>
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link to="/" className="flex items-center gap-3">
                    <img src="/logo.png" alt="Electro MyM Shield" className="h-10 md:h-12 w-auto object-contain" />
                    <span className="text-2xl font-display font-bold text-white tracking-tight hidden sm:block">
                        Electro<span className="text-brand-light">MyM</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    <div className="flex gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`text-sm font-medium transition-colors hover:text-white ${location.pathname === link.path ? 'text-white' : 'text-metallic-silver'}`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    <div className="flex items-center gap-4">
                        <Button variant="whatsapp" size="sm" className="gap-2 rounded-full" onClick={() => window.open('https://wa.link/us5fci', '_blank')}>
                            <Phone size={16} />
                            <span className="font-semibold">Consultar</span>
                        </Button>
                    </div>
                </div>

                {/* Mobile Nav Toggle */}
                <button
                    className="md:hidden text-white p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-metallic-black border-t border-white/10 p-6 flex flex-col gap-4 shadow-xl">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className="text-lg font-medium text-metallic-silver hover:text-white py-2"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Button variant="whatsapp" className="w-full mt-4 gap-2" onClick={() => window.open('https://wa.link/us5fci', '_blank')}>
                        <Phone size={18} /> Contactanos
                    </Button>
                </div>
            )}
        </nav>
    );
}
