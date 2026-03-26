import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { ProductCard } from '../components/ui/ProductCard';

export function Catalogo() {
    const [activeCategory, setActiveCategory] = useState("Todos");

    const categories = ["Todos", "Frío Comercial", "Cocción Profesional", "Pesaje y Cortes", "Mobiliario"];

    const products = [
        // PESAJE Y CORTES - Balanzas
        {
            id: 1, title: "Balanza Báscula Electrónica Systel Nexa 150Kg", category: "Pesaje y Cortes",
            price: "550,000", dailyQuota: "5,500", image: "/stock/Balanza Bascula Electronica Industrial Systel Nexa 150 Kg Plateado.png",
            features: ["Capacidad 150Kg", "Plataforma Acero", "Batería Interna"]
        },
        {
            id: 2, title: "Balanza Digital Pilón Trébol 600kg", category: "Pesaje y Cortes",
            price: "680,000", dailyQuota: "6,800", image: "/stock/Balanza Digital Pilon Trebol 600kg Promo Gris Oscuro.png",
            features: ["Soporta 600Kg", "Gancho Industrial", "Promo Especial"]
        },
        // PESAJE Y CORTES - Cortadoras
        {
            id: 3, title: "Cortadora De Fiambre Moretti Duecento Pro", category: "Pesaje y Cortes",
            price: "1,050,000", dailyQuota: "10,500", image: "/stock/Cortadora De Fiambre Moretti Duecento Pro Color Plateado.png",
            features: ["Calidad Moretti", "Uso Profesional", "Afilador Incorporado"]
        },
        {
            id: 4, title: "Cortadora De Fiambre Profesional Ascada Slicer 300", category: "Pesaje y Cortes",
            price: "1,250,000", dailyQuota: "12,500", image: "/stock/Cortadora De Fiambre Profesional Ascada Slicer 300 Plateado.png",
            features: ["Disco 300mm", "Acero Inox", "Alta Producción"]
        },
        // COCCIÓN PROFESIONAL
        {
            id: 5, title: "Cocina Cucinare Cheff 87cm Maraldi (6 Hornallas)", category: "Cocción Profesional",
            price: "1,150,000", dailyQuota: "11,500", image: "/stock/Cocina Cucinare Cheff 87cm Multigas 6 Hornallas - Maraldi Plateado.png",
            features: ["6 Hornallas", "Horno Industrial", "Acero Inoxidable"]
        },
        {
            id: 6, title: "Horno Convector Eléctrico Moretti", category: "Cocción Profesional",
            price: "1,650,000", dailyQuota: "16,500", image: "/stock/Horno Convector Electrico Moretti Para 4 Bandejas 44 X 32cm.png",
            features: ["4 Bandejas", "Convección", "Control Temperatura"]
        },
        {
            id: 7, title: "Horno Eléctrico Ultracomb 50L (Anafe)", category: "Cocción Profesional",
            price: "280,000", dailyQuota: "2,800", image: "/stock/Horno Eléctrico de mesa UC-50AC 50 Litros 1600w Ultracomb Timer Con doble Anafe - Rojo.png",
            features: ["50 Litros", "Doble Anafe", "Timer Integrado"]
        },
        // FRÍO COMERCIAL
        {
            id: 8, title: "Freezer Exhibidor Inelro FIH 350", category: "Frío Comercial",
            price: "1,300,000", dailyQuota: "13,000", image: "/stock/Freezer Exhibidor Inelro Fih 350 Pi Plus.png",
            features: ["Puertas Vidrio", "Alta Capacidad", "Eficiencia A+"]
        },
        {
            id: 9, title: "Heladera Exhibidora Inelro MT-17NG", category: "Frío Comercial",
            price: "1,550,000", dailyQuota: "15,500", image: "/stock/Inelro MT-17NG heladera expositora vertical 460L.png",
            features: ["460 Litros", "Luces LED", "4 Estantes"]
        },
        {
            id: 10, title: "Heladera Batea Carnicera Vidrio Curvo 2m", category: "Frío Comercial",
            price: "3,200,000", dailyQuota: "32,000", image: "/stock/Heladera Batea Exhibidora Vidrio Curvo 2 Metros Carniceria Curvo.png",
            features: ["2 Metros", "Vidrio Curvo", "Iluminación Carnes"]
        },
        // MOBILIARIO
        {
            id: 11, title: "Mueble Panero y Facturero (1.90m)", category: "Mobiliario",
            price: "450,000", dailyQuota: "4,500", image: "/stock/Mueble Panero Y Facturero 1.90 X 1.50 X 45cm.png",
            features: ["1.90m Alto", "Varios Niveles", "Gran Visibilidad"]
        },
        {
            id: 12, title: "Mueble Exhibidor Panadería (Don Armando)", category: "Mobiliario",
            price: "1,600,000", dailyQuota: "16,000", image: "/stock/Mueble exhibidor para panadería.png",
            features: ["Premium", "Canastos Mimbre", "Iluminado"]
        },
        {
            id: 13, title: "Mueble Facturero (Melamina 18mm)", category: "Mobiliario",
            price: "290,000", dailyQuota: "2,900", image: "/stock/Mueble facturero (melamina 18 mm).png",
            features: ["Melamina 18mm", "Bandejas Amplias", "Moderno"]
        }
    ];

    const filteredProducts = activeCategory === "Todos"
        ? products
        : products.filter(p => p.category === activeCategory);

    return (
        <div className="bg-metallic-light min-h-screen">
            {/* Header */}
            <div className="bg-metallic-black pt-32 pb-16 text-center text-white">
                <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">Catálogo de Equipamiento</h1>
                <p className="text-metallic-silver max-w-2xl mx-auto px-6">
                    Explorá las mejores marcas del mercado. Encontrá lo que necesitás y pedí tu plan de financiación en el acto.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row gap-8">
                {/* Sidebar Filters */}
                <div className="w-full md:w-64 shrink-0">
                    <div className="bg-white rounded-2xl p-6 border border-metallic-silver sticky top-32">
                        <h3 className="font-display font-bold text-lg mb-4 flex items-center gap-2 text-metallic-black">
                            <Filter size={20} /> Categorías
                        </h3>
                        <div className="space-y-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`block w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeCategory === cat
                                        ? "bg-brand-blue text-white"
                                        : "text-metallic-gray hover:bg-metallic-light"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                <div className="flex-grow">
                    <div className="bg-white rounded-2xl p-4 border border-metallic-silver mb-8 flex justify-between items-center">
                        <p className="text-metallic-gray text-sm">
                            Mostrando <span className="font-bold text-metallic-black">{filteredProducts.length}</span> equipos en "<span className="text-metallic-black">{activeCategory}</span>"
                        </p>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Buscar..."
                                className="pl-9 pr-4 py-2 bg-metallic-light rounded-lg text-sm border-none focus:ring-2 focus:ring-brand-light outline-none"
                            />
                            <Search size={16} className="absolute left-3 top-2.5 text-metallic-gray" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} {...product} />
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-metallic-gray text-lg">No hay productos en esta categoría por el momento.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
