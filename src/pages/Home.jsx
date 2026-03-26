import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Clock, ArrowRight, Phone } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { ProductCard } from '../components/ui/ProductCard';
import { Link } from 'react-router-dom';

const FADE_UP = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", duration: 1.2 } }
};

const bgImages = [
    '/bg-appliances.png',
    '/bg-bakery.png',
    '/bg-butcher.png',
];

export function Home() {
    const [currentBg, setCurrentBg] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBg((prevBg) => (prevBg + 1) % bgImages.length);
        }, 5000); // Change image every 5 seconds
        return () => clearInterval(interval);
    }, []);

    const featuredProducts = [
        {
            id: 9,
            title: "Heladera Exhibidora Inelro MT-17NG",
            category: "Frío Comercial",
            price: "1,550,000",
            dailyQuota: "15,500",
            image: "/stock/Inelro MT-17NG heladera expositora vertical 460L.png",
            features: ["460 Litros", "Luces LED", "4 Estantes"]
        },
        {
            id: 5,
            title: "Cocina Cucinare Cheff Maraldi (6 Hornallas)",
            category: "Cocción Profesional",
            price: "1,150,000",
            dailyQuota: "11,500",
            image: "/stock/Cocina Cucinare Cheff 87cm Multigas 6 Hornallas - Maraldi Plateado.png",
            features: ["6 Hornallas", "Horno Industrial", "Acero Inoxidable"]
        },
        {
            id: 3,
            title: "Cortadora De Fiambre Moretti Duecento Pro",
            category: "Pesaje y Cortes",
            price: "1,050,000",
            dailyQuota: "10,500",
            image: "/stock/Cortadora De Fiambre Moretti Duecento Pro Color Plateado.png",
            features: ["Calidad Moretti", "Uso Profesional", "Afilador Incorporado"]
        },
        {
            id: 12,
            title: "Mueble Exhibidor Panadería",
            category: "Mobiliario",
            price: "1,600,000",
            dailyQuota: "16,000",
            image: "/stock/Mueble exhibidor para panadería.png",
            features: ["Premium", "Canastos Mimbre", "Iluminado"]
        }
    ];

    return (
        <div className="w-full">
            {/* Hero Section */}
            <section className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden flex items-center justify-center min-h-[85vh]">
                {/* Background Image Carousel */}
                {bgImages.map((bg, index) => (
                    <div
                        key={bg}
                        className={`absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out ${currentBg === index ? 'opacity-100' : 'opacity-0'}`}
                        style={{ backgroundImage: `url('${bg}')` }}
                    ></div>
                ))}

                {/* Dark Overlays for Readability */}
                <div className="absolute inset-0 z-0 bg-metallic-black/40"></div>
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-metallic-black/95 via-metallic-black/70 to-transparent"></div>

                {/* Abstract Background Elements (optional subtle glow) */}
                <div className="absolute top-20 left-20 w-96 h-96 bg-brand-light rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>
                <div className="absolute top-40 right-20 w-72 h-72 bg-brand-blue rounded-full mix-blend-overlay filter blur-[96px] opacity-20"></div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
                    <motion.div
                        initial="hidden" animate="show" variants={FADE_UP}
                        className="max-w-3xl"
                    >
                        <div className="inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md mb-6">
                            <span className="text-sm font-semibold text-brand-light uppercase tracking-wider">División Comercial de MyM Créditos</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-display font-bold text-white leading-tight mb-6 drop-shadow-lg">
                            Equipá tu negocio. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-white">
                                Pagá con tu trabajo.
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-metallic-silver mb-10 max-w-2xl leading-relaxed">
                            El catálogo B2B premium de Argentina. Llevate la maquinaria que necesitas hoy y financiala con planes diarios y semanales 100% a medida.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link to="/catalogo">
                                <Button size="lg" className="w-full sm:w-auto text-lg gap-2">
                                    Ver Catálogo <ArrowRight size={20} />
                                </Button>
                            </Link>
                            <Link to="/credito-mym">
                                <Button variant="outline" size="lg" className="w-full sm:w-auto text-lg text-white border-white/30 hover:bg-white/10">
                                    Pre-aprobar Crédito MyM
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Trust Badges */}
            <section className="bg-metallic-black py-12 border-b border-white/10 relative z-10">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-brand-blue/20 flex items-center justify-center shrink-0 border border-brand-blue/30">
                                <ShieldCheck size={28} className="text-brand-light" />
                            </div>
                            <div>
                                <h4 className="font-display font-bold text-white text-lg">Respaldo MyM</h4>
                                <p className="text-sm text-metallic-silver">Aprobación crediticia en el acto, evaluando tu comercio.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-brand-blue/20 flex items-center justify-center shrink-0 border border-brand-blue/30">
                                <Clock size={28} className="text-brand-light" />
                            </div>
                            <div>
                                <h4 className="font-display font-bold text-white text-lg">Cuotas Diarias/Semanales</h4>
                                <p className="text-sm text-metallic-silver">Un sistema pensado para la recaudación del comerciante.</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-brand-blue/20 flex items-center justify-center shrink-0 border border-brand-blue/30">
                                <Truck size={28} className="text-brand-light" />
                            </div>
                            <div>
                                <h4 className="font-display font-bold text-white text-lg">Logística Directa</h4>
                                <p className="text-sm text-metallic-silver">Entregamos el equipamiento listo para funcionar en tu local.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-24 bg-metallic-light">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-display font-bold text-metallic-black mb-4">Equipamiento Destacado</h2>
                            <p className="text-metallic-gray max-w-xl">
                                Seleccionamos los equipos de mayor rentabilidad y vida útil para despensas, carnicerías y gastronomía.
                            </p>
                        </div>
                        <Link to="/catalogo" className="hidden md:flex items-center gap-2 text-brand-blue font-semibold hover:underline">
                            Ver todo el catálogo <ArrowRight size={16} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featuredProducts.map((product) => (
                            <ProductCard key={product.id} {...product} />
                        ))}
                    </div>

                    <div className="mt-10 text-center md:hidden">
                        <Link to="/catalogo">
                            <Button variant="outline" className="w-full">
                                Ver todo el catálogo
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Categories Grid */}
            <section className="py-24 bg-metallic-black">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-16">
                        Soluciones para cada sector
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { name: 'Frío Comercial', image: '/images/frio-comercial.png' },
                            { name: 'Cocción Profesional', image: '/images/coccion-profesional.png' },
                            { name: 'Pesaje y Cortes', image: '/images/pesaje-cortes.png' },
                            { name: 'Mobiliario Estructural', image: '/images/mobiliario.png' }
                        ].map((cat, i) => (
                            <Link to={`/catalogo?cat=${cat.name}`} key={i} className="group relative h-64 rounded-2xl overflow-hidden shadow-lg block">
                                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/30 transition-colors z-10"></div>
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="absolute inset-0 w-full h-full object-cover z-0 group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute bottom-6 left-6 right-6 z-20 text-left">
                                    <h3 className="text-white font-display font-bold text-2xl mb-2 drop-shadow-md">{cat.name}</h3>
                                    <div className="w-8 h-1 bg-brand-light group-hover:w-full transition-all duration-300"></div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-metallic-black text-center border-t-4 border-brand-blue">
                <div className="max-w-3xl mx-auto px-6">
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">¿Listo para dar el gran salto?</h2>
                    <p className="text-lg text-metallic-silver mb-8">
                        Contactate por WhatsApp con uno de nuestros asesores y pre-aprobá tu crédito en minutos.
                    </p>
                    <Button variant="whatsapp" size="lg" className="mx-auto flex gap-2 text-lg px-10" onClick={() => window.open('https://wa.link/us5fci', '_blank')}>
                        <Phone size={24} /> Iniciar Consulta Rápidamente
                    </Button>
                </div>
            </section>
        </div>
    );
}
