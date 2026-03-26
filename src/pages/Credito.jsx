import React, { useState } from 'react';
import { TrendingUp, Loader2, CheckCircle, XCircle, AlertTriangle, ShieldCheck, ShieldX } from 'lucide-react';

// Paleta Gold Premium
const GOLD = '#D4A843';
const GOLD_LIGHT = '#E8C872';
const GOLD_GLOW = 'rgba(212,168,67,0.3)';

// Mapeo de situaciones BCRA
const SITUACION_LABELS = {
    1: 'Normal',
    2: 'Con seguimiento especial / Riesgo bajo',
    3: 'Con problemas / Riesgo medio',
    4: 'Con alto riesgo de insolvencia',
    5: 'Irrecuperable',
    6: 'Irrecuperable por disposición técnica',
};

export function Credito() {
    const [amount, setAmount] = useState(1000000);
    const [frequency, setFrequency] = useState('diaria');
    const [cuil, setCuil] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null); // { status: 'approved'|'rejected'|'error', data, message }
    
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

    const consultarBCRA = async () => {
        const cuilClean = cuil.replace(/\D/g, '');
        if (cuilClean.length < 10 || cuilClean.length > 11) {
            setResult({ status: 'error', message: 'Ingresá un CUIL/CUIT válido de 11 dígitos.' });
            return;
        }

        setLoading(true);
        setResult(null);

        try {
            // Consultar via Supabase Edge Function
            const response = await fetch('https://enqgmjxnbvwvyyygzowv.supabase.co/functions/v1/consultar-bcra', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ cuit: cuilClean })
            });
            
            const json = await response.json();

            // Error del servidor
            if (!response.ok) {
                throw new Error(json.error || `Error ${response.status}`);
            }

            // CUIT no encontrado = sin deudas (Aprobado)
            if (json.status === 'not_found' || !json.results) {
                setResult({
                    status: 'approved',
                    message: '¡Excelente! No se registran deudas en el sistema financiero. Estás pre-aprobado para el crédito.',
                    data: { periodos: [], denominacion: cuilClean }
                });
                setLoading(false);
                return;
            }

            const data = json.results;

            // Tomar el último período (el más reciente)
            const ultimoPeriodo = data.periodos?.[0];
            const entidades = ultimoPeriodo?.entidades || [];

            // Si no hay entidades en el último periodo = Normal
            if (entidades.length === 0) {
                setResult({
                    status: 'approved',
                    message: 'Tu comportamiento crediticio es excelente. Pre-aprobado con total confianza.',
                    data: { ...data, peorSituacion: 1, entidades: [], periodo: ultimoPeriodo?.periodo || 'Reciente' }
                });
                setLoading(false);
                return;
            }

            // Buscar la peor situación entre todas las entidades
            let peorSituacion = 1;
            entidades.forEach(ent => {
                const sit = ent.situacion || 1;
                if (sit > peorSituacion) peorSituacion = sit;
            });

            if (peorSituacion <= 2) {
                setResult({
                    status: 'approved',
                    message: peorSituacion === 1 
                        ? '¡Muy bien! Estás calificado como cliente cumplidor. Tu crédito está pre-aprobado.' 
                        : 'Tu calificación es aceptable para nuestro sistema. Crédito pre-aprobado.',
                    data: { ...data, peorSituacion, entidades, periodo: ultimoPeriodo.periodo }
                });
            } else {
                setResult({
                    status: 'rejected',
                    message: `Tu calificación actual es ${peorSituacion} (${SITUACION_LABELS[peorSituacion] || 'Con atrasos'}). Por el momento no podemos otorgarte el crédito de forma automática.`,
                    data: { ...data, peorSituacion, entidades, periodo: ultimoPeriodo.periodo }
                });
            }

        } catch (err) {
            console.error('Error consultando BCRA:', err);
            setResult({
                status: 'error',
                message: 'No pudimos conectar con el servicio del BCRA. Intentá de nuevo en unos minutos o contactanos por WhatsApp.'
            });
        } finally {
            setLoading(false);
        }
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
                    Descubrí cuánto podés obtener y verificá tu elegibilidad al instante
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

                    {/* CUIL */}
                    <div className="mb-8">
                        <label className="block text-[#ccc] text-lg font-semibold mb-4">Ingresá tu CUIL/CUIT</label>
                        <input 
                            type="text"
                            inputMode="numeric"
                            placeholder="11 dígitos (ej: 20123456789)"
                            value={cuil}
                            onChange={(e) => {
                                setCuil(e.target.value.replace(/\D/g, '').slice(0, 11));
                                setResult(null);
                            }}
                            className="w-full bg-[#141414] border border-[#2a2a2a] text-white text-lg p-4 focus:outline-none transition-colors rounded-sm tracking-widest"
                            onFocus={(e) => e.target.style.borderColor = GOLD}
                            onBlur={(e) => e.target.style.borderColor = '#2a2a2a'}
                        />
                        <p className="text-gray-600 text-[10px] mt-2">
                            Al simular, autorizás la consulta de tu situación crediticia (Ley 25.326 de Protección de Datos Personales).
                        </p>
                    </div>

                    {/* Botón */}
                    <button 
                        onClick={consultarBCRA}
                        disabled={loading}
                        className="w-full font-bold text-xl py-5 rounded-sm transition-all duration-200 hover:scale-[1.01] text-black disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                        style={{ 
                            background: `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD})`,
                            boxShadow: `0 0 25px ${GOLD_GLOW}`
                        }}
                    >
                        {loading ? (
                            <>
                                <Loader2 size={24} className="animate-spin" />
                                Consultando BCRA...
                            </>
                        ) : (
                            'Verificar Elegibilidad'
                        )}
                    </button>

                    {/* Resultado de la consulta */}
                    {result && (
                        <div className={`mt-8 rounded-md overflow-hidden border transition-all duration-500 ${
                            result.status === 'approved' 
                                ? 'border-emerald-500/50 bg-emerald-950/30' 
                                : result.status === 'rejected' 
                                    ? 'border-red-500/50 bg-red-950/30' 
                                    : 'border-yellow-500/50 bg-yellow-950/20'
                        }`}>
                            {/* Header del resultado */}
                            <div className={`p-6 flex items-center gap-4 ${
                                result.status === 'approved' 
                                    ? 'bg-emerald-900/30' 
                                    : result.status === 'rejected' 
                                        ? 'bg-red-900/30' 
                                        : 'bg-yellow-900/20'
                            }`}>
                                {result.status === 'approved' ? (
                                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                                        <ShieldCheck size={36} className="text-emerald-400" />
                                    </div>
                                ) : result.status === 'rejected' ? (
                                    <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
                                        <ShieldX size={36} className="text-red-400" />
                                    </div>
                                ) : (
                                    <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center shrink-0">
                                        <AlertTriangle size={36} className="text-yellow-400" />
                                    </div>
                                )}
                                <div>
                                    <h3 className={`text-2xl font-bold ${
                                        result.status === 'approved' ? 'text-emerald-400' 
                                        : result.status === 'rejected' ? 'text-red-400' 
                                        : 'text-yellow-400'
                                    }`}>
                                        {result.status === 'approved' ? '✅ CRÉDITO PRE-APROBADO' 
                                        : result.status === 'rejected' ? '❌ CRÉDITO RECHAZADO' 
                                        : '⚠️ ERROR DE CONSULTA'}
                                    </h3>
                                    <p className="text-gray-300 text-sm mt-1">{result.message}</p>
                                </div>
                            </div>

                            {/* Detalle de entidades (si hay datos) */}
                            {result.data?.entidades && result.data.entidades.length > 0 && (
                                <div className="p-6 border-t border-white/5">
                                    <p className="text-gray-400 text-xs mb-3 uppercase tracking-wider">
                                        Detalle del período {result.data.periodo} — {result.data.denominacion}
                                    </p>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm">
                                            <thead>
                                                <tr className="text-gray-500 text-xs uppercase border-b border-white/5">
                                                    <th className="text-left py-2 pr-4">Entidad</th>
                                                    <th className="text-center py-2 px-2">Situación</th>
                                                    <th className="text-right py-2 px-2">Monto</th>
                                                    <th className="text-center py-2 pl-2">Días Atraso</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {result.data.entidades.map((ent, i) => (
                                                    <tr key={i} className="border-b border-white/5 last:border-0">
                                                        <td className="py-3 pr-4 text-white">{ent.entidad || 'N/A'}</td>
                                                        <td className="py-3 px-2 text-center">
                                                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${
                                                                (ent.situacion || 1) <= 2 
                                                                    ? 'bg-emerald-500/20 text-emerald-400' 
                                                                    : 'bg-red-500/20 text-red-400'
                                                            }`}>
                                                                {(ent.situacion || 1) <= 2 ? <CheckCircle size={12} /> : <XCircle size={12} />}
                                                                {ent.situacion || 1} - {SITUACION_LABELS[ent.situacion || 1] || 'Desconocida'}
                                                            </span>
                                                        </td>
                                                        <td className="py-3 px-2 text-right text-white font-mono">
                                                            {ent.monto ? formatCurrency(ent.monto) : '-'}
                                                        </td>
                                                        <td className="py-3 pl-2 text-center text-gray-400">
                                                            {ent.diasAtrasoPago || 0}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            )}

                            {/* Acción post-resultado */}
                            {result.status === 'approved' && (
                                <div className="p-6 border-t border-white/5 text-center">
                                    <button
                                        onClick={() => {
                                            const msg = `Hola! Estoy pre-aprobado para un crédito de ${formatCurrency(amount)}. Mi CUIL es ${cuil}. Quiero avanzar con el trámite.`;
                                            window.open(`https://wa.me/5491100000000?text=${encodeURIComponent(msg)}`, '_blank');
                                        }}
                                        className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-lg rounded-sm transition-all hover:scale-[1.01] inline-flex items-center gap-2"
                                    >
                                        📲 Continuar por WhatsApp
                                    </button>
                                </div>
                            )}

                            {result.status === 'rejected' && (
                                <div className="p-6 border-t border-white/5 text-center">
                                    <p className="text-gray-400 text-sm">
                                        Podés comunicarte con nosotros para evaluar otras alternativas.
                                    </p>
                                    <button
                                        onClick={() => {
                                            const msg = `Hola, mi CUIL es ${cuil}. Vi que tengo una situación crediticia complicada. ¿Tienen alguna alternativa para mí?`;
                                            window.open(`https://wa.me/5491100000000?text=${encodeURIComponent(msg)}`, '_blank');
                                        }}
                                        className="mt-3 px-6 py-3 bg-[#1a1a1a] hover:bg-[#222] text-gray-300 font-semibold rounded-sm transition-all inline-flex items-center gap-2 border border-white/10"
                                    >
                                        Consultar Alternativas
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
