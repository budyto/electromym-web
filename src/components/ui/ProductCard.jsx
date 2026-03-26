import React from 'react';
import { motion } from 'framer-motion';
import { Tag, TrendingUp, CheckCircle2 } from 'lucide-react';
import { Button } from './Button';

export function ProductCard({
    title,
    category,
    image,
    price,
    dailyQuota,
    features = []
}) {
    const handleWhatsAppClick = () => {
        const message = `Hola! Me interesa financiar el producto: ${title}. ¿Me podrían enviar más información y planes de pago?`;
        window.open(`https://wa.me/5491125568907?text=${encodeURIComponent(message)}`, '_blank');
    };

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white rounded-2xl border border-metallic-silver overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
        >
            {/* Product Image Area */}
            <div className="aspect-square bg-metallic-light p-6 relative flex items-center justify-center group">
                {category && (
                    <span className="absolute top-4 left-4 bg-metallic-black text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                        {category}
                    </span>
                )}
                <img
                    src={image || "https://placehold.co/400x400/eeeeee/aaaaaa?text=Electro+MyM"}
                    alt={title}
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            {/* Content Area */}
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="font-display font-bold text-xl text-metallic-black mb-2 line-clamp-2">
                    {title}
                </h3>

                {/* Features List */}
                <div className="mt-2 mb-4 flex-grow">
                    {features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-sm text-metallic-gray mb-1">
                            <CheckCircle2 size={16} className="text-brand-light shrink-0 mt-0.5" />
                            <span>{feature}</span>
                        </div>
                    ))}
                </div>

                {/* Pricing / Quota Area */}
                <div className="bg-metallic-light rounded-xl p-4 mb-4 border border-metallic-silver/50">
                    <div className="flex items-center gap-2 mb-1">
                        <TrendingUp size={16} className="text-brand-blue" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-brand-blue">
                            Crédito MyM Disponible
                        </span>
                    </div>
                    <div className="flex items-baseline gap-1">
                        <span className="text-sm text-metallic-gray font-medium">Desde</span>
                        <span className="text-2xl font-bold text-metallic-black">${dailyQuota}</span>
                        <span className="text-sm text-metallic-gray">/día</span>
                    </div>
                    {price && (
                        <div className="text-xs text-metallic-gray mt-1">
                            Precio contado: <span className="line-through">${price}</span>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <Button
                    variant="whatsapp"
                    className="w-full"
                    onClick={handleWhatsAppClick}
                >
                    Consultar Financiación
                </Button>
            </div>
        </motion.div>
    );
}
