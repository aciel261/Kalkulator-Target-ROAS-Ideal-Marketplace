
import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle2, 
  HelpCircle,
  TrendingDown,
  Info,
  DollarSign,
  PieChart,
  X,
  BookOpen,
  ArrowRight,
  TrendingUp as ProfitIcon
} from 'lucide-react';
import { RoasInputs, RoasOutputs, RoasStatus } from './types';
import { InputGroup } from './components/InputGroup';
import { formatIDR, formatNumber } from './utils/format';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  ReferenceLine
} from 'recharts';

const GuidelineModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3">
            <BookOpen className="w-6 h-6 text-blue-600" />
            Panduan Strategi ROAS
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-200 rounded-full transition-colors text-slate-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-8 overflow-y-auto text-slate-700 space-y-8">
          <section>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Memahami ROAS Sebelum Menghitung Iklan</h3>
            <p className="leading-relaxed">
              Sebelum masuk ke perhitungan teknis, penting untuk memahami terlebih dahulu apa itu ROAS. 
              Menurut pemahaman saya, <strong>ROAS (Return on Ad Spend)</strong> adalah indikator atau batas (limit) untuk menilai apakah iklan yang dijalankan menghasilkan profit, impas, atau justru merugi (boncos).
              Tentu saja, setiap orang boleh memiliki sudut pandang masing-masing terkait ROAS, dan itu sah-sah saja.
            </p>
          </section>

          <section className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
            <h3 className="text-xl font-bold text-blue-900 mb-4">Kategori Angka ROAS</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-xl border border-blue-200">
                <p className="font-bold text-green-600 mb-1">ROAS Ideal</p>
                <p className="text-sm">Iklan menghasilkan profit sesuai target yang diinginkan.</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-blue-200">
                <p className="font-bold text-yellow-600 mb-1">ROAS Impas</p>
                <p className="text-sm">Iklan tidak menghasilkan untung maupun rugi (pas-pasan).</p>
              </div>
              <div className="bg-white p-4 rounded-xl border border-blue-200">
                <p className="font-bold text-red-600 mb-1">ROAS Buruk</p>
                <p className="text-sm">Iklan mengalami kerugian (boncos).</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Faktor yang Mempengaruhi ROAS</h3>
            <ul className="list-disc pl-5 space-y-1">
              <li>Harga jual produk</li>
              <li>Persentase total biaya admin & fee platform</li>
              <li>HPP (Harga Pokok Penjualan)</li>
              <li>Biaya iklan</li>
            </ul>
          </section>

          <section className="bg-slate-900 text-white p-6 rounded-2xl">
            <h3 className="text-xl font-bold mb-2">Rumus Dasar ROAS</h3>
            <code className="text-2xl font-mono text-blue-400 block py-2">ROAS = Total Penjualan / Total Biaya Iklan</code>
            
            <div className="mt-6 space-y-3 opacity-90 text-sm">
              <p><strong>Contoh 1:</strong> Penjualan Rp100.000, Biaya Rp10.000 → ROAS = 10</p>
              <p><strong>Contoh 2:</strong> Penjualan Rp100.000, Biaya Rp25.000 → ROAS = 4</p>
              <p><strong>Contoh 3:</strong> Penjualan Rp100.000, Biaya Rp5.000 → ROAS = 20</p>
            </div>
            <p className="mt-4 text-sm text-slate-400 italic">Semakin besar ROAS, semakin efisien iklan yang dijalankan.</p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Menentukan Target ROAS</h3>
            <p className="mb-4">Untuk menentukan Target ROAS, dibutuhkan satu indikator tambahan, yaitu <strong>target profit</strong>. Kita perlu memahami:</p>
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 mb-4 text-amber-900">
              <p className="font-bold">Margin Kotor</p>
              <p className="text-sm">Margin Kotor = Harga Jual − HPP − Total Biaya Admin & Fee</p>
            </div>
            <p>Margin kotor adalah uang maksimal yang dapat dialokasikan untuk biaya iklan dan profit.</p>
          </section>

          <section className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Interpretasi Pengambilan Keputusan</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded font-bold text-xs">ROAS ≥ Ideal</span>
                <p className="text-sm">🔥 <strong>Gas Terus:</strong> Performa luar biasa, silakan tambah budget secara bertahap.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded font-bold text-xs">ROAS = Impas</span>
                <p className="text-sm">⚠️ <strong>Tahan:</strong> Titik kritis. Boleh tambah budget secukupnya tapi jangan agresif.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-red-100 text-red-700 px-2 py-1 rounded font-bold text-xs">ROAS &lt; Impas</span>
                <p className="text-sm">🚨 <strong>Evaluasi:</strong> Segera pause, stop, atau atur ulang target ROAS Anda.</p>
              </div>
            </div>
          </section>

          <p className="text-center text-slate-500 italic pb-4">
            "Setiap produk memiliki struktur biaya yang berbeda, sehingga target ROAS juga pasti berbeda."
          </p>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200"
          >
            Mengerti, Saya Siap Hitung
          </button>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  // Initial States based on user example
  const [inputs, setInputs] = useState<RoasInputs>({
    sellingPrice: 100000,
    hpp: 50000,
    adminFeePercent: 20,
    adSpendAllocation: 50, // Divide 50:50 between Ads and Profit
  });

  const [currentRoas, setCurrentRoas] = useState<number>(0);
  const [isGuidelineOpen, setIsGuidelineOpen] = useState(false);

  // Calculations logic
  const results = useMemo((): RoasOutputs => {
    const adminFeeAmount = (inputs.adminFeePercent / 100) * inputs.sellingPrice;
    const grossMargin = inputs.sellingPrice - inputs.hpp - adminFeeAmount;
    
    // Impas: Biaya Iklan = Margin Kotor
    const breakEvenAdSpend = grossMargin;
    const breakEvenRoas = breakEvenAdSpend > 0 ? inputs.sellingPrice / breakEvenAdSpend : 0;

    // Ideal: Sesuai Pembagian Margin (e.g. 50%)
    const idealAdSpend = (inputs.adSpendAllocation / 100) * grossMargin;
    const idealRoas = idealAdSpend > 0 ? inputs.sellingPrice / idealAdSpend : 0;
    const targetProfit = grossMargin - idealAdSpend;

    return {
      grossMargin,
      adminFeeAmount,
      breakEvenAdSpend,
      idealAdSpend,
      breakEvenRoas,
      idealRoas,
      targetProfit
    };
  }, [inputs]);

  const status = useMemo((): RoasStatus => {
    if (currentRoas === 0) return RoasStatus.IMPAS;
    if (currentRoas < results.breakEvenRoas) return RoasStatus.BONCOS;
    if (currentRoas === results.breakEvenRoas) return RoasStatus.IMPAS;
    if (currentRoas >= results.idealRoas) return RoasStatus.IDEAL;
    return RoasStatus.PROFIT;
  }, [currentRoas, results]);

  const chartData = [
    { name: 'Impas', value: results.breakEvenRoas, fill: '#facc15' },
    { name: 'Target Ideal', value: results.idealRoas, fill: '#22c55e' },
    { name: 'Current Performance', value: currentRoas, fill: currentRoas >= results.idealRoas ? '#10b981' : currentRoas < results.breakEvenRoas ? '#ef4444' : '#f59e0b' }
  ];

  return (
    <div className="min-h-screen p-4 md:p-8 text-slate-900 bg-[#f1f5f9]">
      <GuidelineModal isOpen={isGuidelineOpen} onClose={() => setIsGuidelineOpen(false)} />
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200">
                <Calculator className="w-8 h-8 text-white" />
              </div>
              Kalkulator ROAS Ideal
            </h1>
            <p className="text-slate-600 mt-2 text-lg">Hitung target profit iklan Anda dengan presisi.</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-white border border-slate-200 px-5 py-3 rounded-2xl shadow-sm flex items-center gap-3 text-sm text-slate-700 font-medium">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span>Rumus: Penjualan / Biaya Iklan</span>
            </div>
            
            <button 
              onClick={() => setIsGuidelineOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl shadow-lg shadow-blue-100 transition-all flex items-center gap-2 font-bold text-sm"
            >
              <BookOpen className="w-4 h-4" />
              Pelajari Strategi
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Section Input */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-8 rounded-3xl shadow-md border border-slate-100">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-slate-800">
                <PieChart className="w-6 h-6 text-indigo-500" />
                Data Produk
              </h2>
              
              <InputGroup 
                label="Harga Jual" 
                value={inputs.sellingPrice} 
                type="currency"
                onChange={(v) => setInputs(prev => ({ ...prev, sellingPrice: v }))}
                icon={<DollarSign className="w-4 h-4 text-slate-400" />}
              />
              
              <InputGroup 
                label="HPP (Modal Produk)" 
                value={inputs.hpp} 
                type="currency"
                onChange={(v) => setInputs(prev => ({ ...prev, hpp: v }))}
                icon={<TrendingDown className="w-4 h-4 text-slate-400" />}
              />

              <InputGroup 
                label="Biaya Admin & Fee (%)" 
                value={inputs.adminFeePercent} 
                type="percent"
                helperText={`Potongan Admin: ${formatIDR(results.adminFeeAmount)}`}
                onChange={(v) => setInputs(prev => ({ ...prev, adminFeePercent: v }))}
              />

              <hr className="my-8 border-slate-100" />

              <h2 className="text-xl font-bold mb-6 flex items-center gap-3 text-slate-800">
                <ProfitIcon className="w-6 h-6 text-emerald-500" />
                Target Profit
              </h2>
              
              <InputGroup 
                label="Alokasi Budget Iklan" 
                value={inputs.adSpendAllocation} 
                type="percent"
                helperText="Berapa % margin kotor untuk iklan?"
                onChange={(v) => setInputs(prev => ({ ...prev, adSpendAllocation: v }))}
              />

              <div className="p-5 bg-blue-50/50 rounded-2xl space-y-3 mt-6 border border-blue-100/50">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">Margin Kotor:</span>
                  <span className="font-bold text-slate-900">{formatIDR(results.grossMargin)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">Budget Iklan Ideal:</span>
                  <span className="font-bold text-blue-600">{formatIDR(results.idealAdSpend)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">Target Profit Bersih:</span>
                  <span className="font-bold text-emerald-600">{formatIDR(results.targetProfit)}</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-md border border-slate-100">
              <h2 className="text-xl font-bold mb-6 text-slate-800">Cek Performa Saat Ini</h2>
              <InputGroup 
                label="ROAS Iklan Sekarang" 
                value={currentRoas} 
                onChange={(v) => setCurrentRoas(v)}
                helperText="Masukkan angka ROAS dari dashboard iklan."
              />
            </div>
          </div>

          {/* Section Analysis */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white border-2 border-yellow-200 p-8 rounded-3xl relative overflow-hidden shadow-sm">
                <div className="relative z-10">
                  <p className="text-yellow-700 font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4" /> ROAS Impas
                  </p>
                  <h3 className="text-5xl font-black text-slate-900">{formatNumber(results.breakEvenRoas)}</h3>
                  <p className="text-slate-500 text-sm mt-3 font-medium">Titik terendah sebelum rugi.</p>
                </div>
                <div className="absolute -bottom-4 -right-4 p-4 opacity-[0.03]">
                  <TrendingDown className="w-32 h-32 text-slate-900" />
                </div>
              </div>

              <div className="bg-white border-2 border-emerald-400 p-8 rounded-3xl relative overflow-hidden shadow-sm">
                <div className="relative z-10">
                  <p className="text-emerald-600 font-bold text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> ROAS Ideal
                  </p>
                  <h3 className="text-5xl font-black text-slate-900">{formatNumber(results.idealRoas)}</h3>
                  <p className="text-slate-500 text-sm mt-3 font-medium">Target profit sesuai rencana.</p>
                </div>
                <div className="absolute -bottom-4 -right-4 p-4 opacity-[0.03]">
                  <TrendingUp className="w-32 h-32 text-slate-900" />
                </div>
              </div>
            </div>

            {/* Comparison Visualization */}
            <div className="bg-white p-8 rounded-3xl shadow-md border border-slate-100">
              <h2 className="text-xl font-bold mb-8 flex items-center gap-3 text-slate-800">
                <TrendingUp className="w-6 h-6 text-blue-500" />
                Visualisasi Performa
              </h2>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 13, fontWeight: 600, fill: '#64748b' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#94a3b8' }} />
                    <Tooltip 
                      cursor={{ fill: '#f8fafc' }} 
                      contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', padding: '12px' }}
                    />
                    <Bar dataKey="value" radius={[12, 12, 0, 0]} barSize={60}>
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                    <ReferenceLine y={results.breakEvenRoas} stroke="#eab308" strokeDasharray="5 5" strokeWidth={2} label={{ position: 'right', value: 'Batas Boncos', fill: '#854d0e', fontSize: 11, fontWeight: 700 }} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Decision Analysis */}
            <div className={`p-8 rounded-3xl border-4 transition-all duration-500 shadow-xl ${
              status === RoasStatus.IDEAL ? 'bg-green-50 border-green-400 shadow-green-100' :
              status === RoasStatus.PROFIT ? 'bg-emerald-50 border-emerald-300 shadow-emerald-50' :
              status === RoasStatus.BONCOS ? 'bg-red-50 border-red-400 shadow-red-100' :
              'bg-amber-50 border-amber-300 shadow-amber-50'
            }`}>
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className={`p-5 rounded-2xl shadow-lg ${
                  status === RoasStatus.IDEAL ? 'bg-green-500 text-white' :
                  status === RoasStatus.BONCOS ? 'bg-red-500 text-white' :
                  'bg-amber-500 text-white'
                }`}>
                  {status === RoasStatus.IDEAL && <TrendingUp className="w-10 h-10" />}
                  {status === RoasStatus.PROFIT && <CheckCircle2 className="w-10 h-10" />}
                  {status === RoasStatus.BONCOS && <TrendingDown className="w-10 h-10" />}
                  {status === RoasStatus.IMPAS && <AlertCircle className="w-10 h-10" />}
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-3xl font-black mb-2 tracking-tight text-slate-900">
                    {status === RoasStatus.IDEAL && '🚀 GAS TERUSSSS!'}
                    {status === RoasStatus.PROFIT && '✨ ZONA PROFIT'}
                    {status === RoasStatus.BONCOS && '❌ FIX BONCOS!'}
                    {status === RoasStatus.IMPAS && '⚖️ TAHAN DULU...'}
                  </h3>
                  <p className="text-xl font-medium opacity-90 leading-relaxed text-slate-700">
                    {status === RoasStatus.IDEAL && `Luar biasa! ROAS (${currentRoas}) melampaui target ideal. Waktunya scale-up budget iklan Anda!`}
                    {status === RoasStatus.PROFIT && `Iklan menghasilkan profit bersih. ROAS (${currentRoas}) di atas titik impas, terus optimasi ke target ideal (${formatNumber(results.idealRoas)}).`}
                    {status === RoasStatus.BONCOS && `Berbahaya! ROAS (${currentRoas}) di bawah titik impas (${formatNumber(results.breakEvenRoas)}). Segera matikan atau perbaiki iklan Anda.`}
                    {status === RoasStatus.IMPAS && `Sedang di titik impas. Gunakan input "ROAS Iklan Sekarang" untuk melihat analisa mendalam.`}
                  </p>
                </div>
              </div>
            </div>

            {/* Glossary / Explanation */}
            <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="text-xl font-bold mb-6 flex items-center gap-3 text-white">
                  <HelpCircle className="w-6 h-6 text-blue-400" />
                  Pedoman Pengambilan Keputusan
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div className="space-y-4">
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <span className="font-bold text-red-400 uppercase tracking-tighter">Buruk</span>
                      </div>
                      <p className="text-slate-300">ROAS &lt; {formatNumber(results.breakEvenRoas)}: Iklan Boncos. Segera Pause/Stop.</p>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                        <span className="font-bold text-yellow-400 uppercase tracking-tighter">Impas</span>
                      </div>
                      <p className="text-slate-300">ROAS ≈ {formatNumber(results.breakEvenRoas)}: Tahan budget, jangan tambah dulu.</p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="font-bold text-blue-400 uppercase tracking-tighter">Profit</span>
                      </div>
                      <p className="text-slate-300">ROAS &gt; {formatNumber(results.breakEvenRoas)}: Iklan sudah mulai untung.</p>
                    </div>
                    <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
                      <div className="flex items-center gap-2 mb-1">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="font-bold text-green-400 uppercase tracking-tighter">Ideal</span>
                      </div>
                      <p className="text-slate-300">ROAS ≥ {formatNumber(results.idealRoas)}: Sesuai target profit. Gas terus!</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-slate-800 text-xs text-slate-500 flex justify-between items-center">
                  <span>*Berdasarkan perhitungan margin kotor spesifik produk Anda.</span>
                  <span className="bg-slate-800 px-3 py-1 rounded-full text-slate-400 italic">v1.3 Stable</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-slate-500 text-sm pb-10">
          <p className="font-medium">© {new Date().getFullYear()} ROAS Calculator • Made for Better Decisions</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
