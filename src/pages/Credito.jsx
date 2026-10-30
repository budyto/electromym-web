import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

// Paleta Gold Premium
const GOLD = '#D4A843';
const GOLD_LIGHT = '#E8C872';
const GOLD_GLOW = 'rgba(212,168,67,0.3)';

// Electro MyM no otorga créditos: el simulador deriva a MyM Créditos, que evalúa y presta desde su propio sistema.
const WHATSAPP_MYM_CREDITOS = '5491125834909';

export function Credito() {
    const [amount, setAmount] = useState(1000000);
    const [frequency, setFrequency] = useState('diaria');
    
    const maxAmount = 1500000;
    const minAmount = 5000;
    const interestRate = 0.40;
    const totalToPay = amount * (1 + interestRate);
    
    const quotas = frequency === 'diaria' ? 28 : 4;
    const paymentAmount = totalToPay / quotas;

    const formatCurrency = (val) => new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(val);

    const handleSliderChange = (e) => {
        setAmount(Number(e.target.value));
    };

    const consultarMyMCreditos = () => {
        const msg = `Hola! Simulé un crédito de ${formatCurrency(amount)} en cuotas ${frequency === 'diaria' ? 'diarias' : 'semanales'} desde la web de Electro MyM. Quiero consultar.`;
        window.open(`https://wa.me/${WHATSAPP_MYM_CREDITOS}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener');
    };

    return (
        <div className="bg-[#0b0b0b] min-h-screen text-white font-sans pt-24 pb-16">
            {/* Logo MyM Shield */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 mb-8 flex justify-center">
                <img 
                    src="/logo-mym-shield.png" 
                    alt="MyM Créditos" 
                    className="h-24 md:h-28 object-contain drop-shadow-[0_0_25px_rgba(212,168,67,0.4)]" 
                />
            </div>

            {/* Título */}
            <div className="text-center mb-10 px-4">
                <h1 
                    className="text-3xl md:text-5xl font-extrabold uppercase tracking-wider mb-3"
                    style={{ 
                        fontFamily: "'Space Grotesk', sans-serif",
                        background: `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD}, #BF9530)`,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        filter: 'drop-shadow(0 2px 8px rgba(212,168,67,0.3))',
                        letterSpacing: '3px'
                    }}
                >
                    Simulá tu Préstamo Ahora
                </h1>
                <p className="text-gray-400 text-lg md:text-xl">
                    Descubrí cuánto podés obtener y consultalo con MyM Créditos
                </p>
            </div>

            <div className="max-w-3xl mx-auto px-4 sm:px-6">
                <div className="bg-[#0a0a0a] border border-[#1a1a1a] p-6 md:p-10 shadow-2xl rounded-md">
                    
                    {/* Monto del Préstamo */}
                    <div className="mb-10">
                        <label className="block text-[#ccc] text-lg font-semibold mb-6">Monto del Préstamo</label>
                        <div className="text-center mb-6">
                            <span className="text-4xl md:text-6xl font-bold" style={{ color: GOLD }}>
                                {formatCurrency(amount)}
                            </span>
                        </div>
                        
                        <div className="relative pt-1">
                            <input 
                                type="range" 
                                min={minAmount} 
                                max={maxAmount} 
                                step="5000" 
                                value={amount} 
                                onChange={handleSliderChange}
                                className="w-full h-2 bg-[#333] rounded-lg appearance-none cursor-pointer focus:outline-none"
                                style={{
                                    background: `linear-gradient(to right, ${GOLD} ${(amount - minAmount) / (maxAmount - minAmount) * 100}%, #1a1a1a ${(amount - minAmount) / (maxAmount - minAmount) * 100}%)`
                                }}
                            />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                            <span>{formatCurrency(minAmount)}</span>
                            <span>{formatCurrency(maxAmount)}</span>
                        </div>
                    </div>

                    {/* Frecuencia de Cuotas */}
                    <div className="mb-8">
                        <label className="block text-[#ccc] text-lg font-semibold mb-4">Frecuencia de Cuotas</label>
                        <div className="grid grid-cols-2 gap-0 overflow-hidden rounded-sm">
                            <button 
                                onClick={() => setFrequency('diaria')}
                                className="py-4 text-center font-bold text-lg transition-all duration-200"
                                style={frequency === 'diaria' 
                                    ? { background: GOLD, color: '#000', boxShadow: `0 0 15px ${GOLD_GLOW}` } 
                                    : { background: '#1a1a1a', color: '#888' }}
                            >
                                Cuotas Diarias
                            </button>
                            <button 
                                onClick={() => setFrequency('semanal')}
                                className="py-4 text-center font-bold text-lg transition-all duration-200"
                                style={frequency === 'semanal' 
                                    ? { background: GOLD, color: '#000', boxShadow: `0 0 15px ${GOLD_GLOW}` } 
                                    : { background: '#1a1a1a', color: '#888' }}
                            >
                                Cuotas Semanales
                            </button>
                        </div>
                    </div>

                    {/* Resumen del Préstamo */}
                    <div className="border border-[#2a2a2a] bg-[#111] p-6 mb-8 rounded-sm">
                        <div className="flex items-center gap-2 mb-6">
                            <TrendingUp style={{ color: GOLD }} size={20} />
                            <h3 className="text-white font-bold text-lg">Resumen del Préstamo</h3>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <p className="text-gray-400 text-sm mb-1">Cuota {frequency === 'diaria' ? 'Diaria' : 'Semanal'}</p>
                                <p className="text-2xl font-bold" style={{ color: GOLD }}>{formatCurrency(paymentAmount)}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm mb-1">Cantidad de Cuotas</p>
                                <p className="text-white text-2xl font-bold">{quotas}</p>
                            </div>
                            <div>
                                <p className="text-gray-400 text-sm mb-1">Total a Pagar</p>
                                <p className="text-white text-2xl font-bold">{formatCurrency(totalToPay)}</p>
                            </div>
                        </div>
                        <div className="mt-6">
                            <p className="text-gray-500 text-xs">Tasa de interés: 40% a 28 días (L a V)</p>
                        </div>
                    </div>

                    {/* Derivación a MyM Créditos (sin consultas de datos crediticios desde esta web) */}
                    <button
                        onClick={consultarMyMCreditos}
                        className="w-full font-bold text-xl py-5 rounded-sm transition-all duration-200 hover:scale-[1.01] text-black"
                        style={{
                            background: `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD})`,
                            boxShadow: `0 0 25px ${GOLD_GLOW}`
                        }}
                    >
                        Consultar con MyM Créditos por WhatsApp
                    </button>
                    <p className="text-gray-500 text-xs mt-4 text-center">
                        Simulación orientativa. Electro MyM no otorga créditos: la evaluación, las condiciones finales y el otorgamiento los realiza MyM Créditos.
                    </p>

                </div>
            </div>
        </div>
    );
}
