import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail } from 'lucide-react';
import { SocialLinks } from '../ui/SocialLinks';

export function Footer() {
    return (
        <footer className="bg-metallic-black text-metallic-silver py-12 border-t border-metallic-dark">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
                {/* Brand */}
                <div className="col-span-1 md:col-span-2">
                    <Link to="/" className="inline-flex items-center gap-3 mb-4">
                        <img src="/logo.png" alt="Electro MyM Shield" className="h-10 w-auto object-contain" />
                        <span className="text-2xl font-display font-bold text-white tracking-tight">
                            Electro<span className="text-brand-light">MyM</span>
                        </span>
                    </Link>
                    <p className="text-sm max-w-sm mb-6">
                        Equipamiento comercial B2B premium. La división especializada de MyM Créditos para que potencies tu negocio pagando con tu trabajo gracias a nuestra financiación a medida.
                    </p>
                    <SocialLinks />
                </div>

                {/* Links */}
                <div>
                    <h4 className="text-white font-semibold mb-4 font-display">Navegación</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link to="/catalogo" className="hover:text-white transition-colors">Catálogo de Productos</Link></li>
                        <li><Link to="/credito-mym" className="hover:text-white transition-colors">Solicitar Crédito MyM</Link></li>
                        <li><Link to="/nosotros" className="hover:text-white transition-colors">Nuestra Trayectoria</Link></li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="text-white font-semibold mb-4 font-display">Contacto</h4>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-start gap-3">
                            <Phone size={16} className="text-brand-light shrink-0 mt-0.5" />
                            <span>+54 9 11 2556-8907</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <Mail size={16} className="text-brand-light shrink-0 mt-0.5" />
                            <span>ventas@electromym.com.ar</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <MapPin size={16} className="text-brand-light shrink-0 mt-0.5" />
                            <span>Av. Principal 1234, CABA, Argentina</span>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 mt-12 pt-6 border-t border-white/10 text-xs text-center">
                &copy; {new Date().getFullYear()} Electro MyM - Una división de MyM Créditos. Todos los derechos reservados.
            </div>
        </footer>
    );
}
