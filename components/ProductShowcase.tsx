import React from 'react';
import { Tag, Star, ShoppingBag, ArrowUpRight } from 'lucide-react';

const PRODUCTS = [
  {
    id: 1,
    name: "Kopi Gayo Premium",
    category: "Makanan & Minuman",
    price: 85000,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=300&h=300",
    trend: [30, 45, 35, 60, 55, 75, 90]
  },
  {
    id: 2,
    name: "Tas Rotan Bali",
    category: "Kerajinan Tangan",
    price: 350000,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&q=80&w=300&h=300",
    trend: [40, 35, 50, 45, 60, 55, 65]
  },
  {
    id: 3,
    name: "Kain Batik Tulis Solo",
    category: "Fesyen",
    price: 1250000,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1572911295287-25d2b7c4a165?auto=format&fit=crop&q=80&w=300&h=300",
    trend: [60, 65, 70, 68, 75, 80, 85]
  },
  {
    id: 4,
    name: "Keripik Pisang Lumer",
    category: "Camilan",
    price: 25000,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1600431562773-a8c603176ebc?auto=format&fit=crop&q=80&w=300&h=300",
    trend: [20, 30, 25, 40, 35, 50, 60]
  },
  {
    id: 5,
    name: "Vas Bunga Keramik",
    category: "Dekorasi Rumah",
    price: 175000,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1612196808214-b7e239e5f6b7?auto=format&fit=crop&q=80&w=300&h=300",
    trend: [45, 40, 35, 45, 50, 55, 50]
  },
  {
    id: 6,
    name: "Sambal Roa Manado",
    category: "Bumbu Dapur",
    price: 45000,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1588613144890-34358244e830?auto=format&fit=crop&q=80&w=300&h=300",
    trend: [50, 60, 55, 70, 80, 85, 95]
  },
  {
    id: 7,
    name: "Dompet Kulit Asli",
    category: "Aksesoris",
    price: 299000,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=300&h=300",
    trend: [35, 40, 45, 50, 48, 55, 60]
  },
  {
    id: 8,
    name: "Tenun Ikat NTT",
    category: "Kain Tradisional",
    price: 850000,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1550254245-21c64eb372c8?auto=format&fit=crop&q=80&w=300&h=300",
    trend: [70, 75, 72, 80, 85, 90, 88]
  }
];

const TrendChart = ({ data, color = "#0d9488" }: { data: number[], color?: string }) => {
  const width = 60;
  const height = 24;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  // Generate SVG points
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width;
    // Keep 2px padding top/bottom
    const y = (height - 4) - ((val - min) / range) * (height - 4) + 2; 
    return `${x},${y}`;
  }).join(' ');

  const areaPoints = `${points} ${width},${height} 0,${height}`;

  return (
    <div className="flex flex-col items-end">
        <div className="flex items-center gap-1 text-[10px] text-brand-600 font-semibold mb-0.5 opacity-80">
            <ArrowUpRight size={10} />
            <span>Tren</span>
        </div>
        <svg width={width} height={height} className="overflow-visible">
            <defs>
                <linearGradient id="trendGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor={color} stopOpacity="0.2" />
                    <stop offset="100%" stopColor={color} stopOpacity="0" />
                </linearGradient>
            </defs>
            <path d={`M ${areaPoints} Z`} fill="url(#trendGradient)" />
            <polyline
                points={points}
                fill="none"
                stroke={color}
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <circle 
                cx={width} 
                cy={(height - 4) - ((data[data.length-1] - min) / range) * (height - 4) + 2} 
                r="2" 
                fill={color} 
                className="animate-pulse"
            />
        </svg>
    </div>
  );
};

const ProductCard = ({ product }: { product: any }) => {
  const formatRupiah = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="w-72 flex-shrink-0 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden cursor-pointer group/card">
      <div className="h-44 w-full overflow-hidden bg-slate-100 relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transform group-hover/card:scale-110 transition-transform duration-700 ease-in-out"
        />
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-md px-2 py-1 rounded-lg text-xs font-bold text-amber-500 flex items-center gap-1 shadow-sm">
          <Star size={10} fill="currentColor" /> {product.rating}
        </div>
        <div className="absolute bottom-0 left-0 w-full p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex justify-end">
            <div className="bg-white p-2 rounded-full text-brand-600 shadow-lg transform translate-y-4 group-hover/card:translate-y-0 transition-transform duration-300">
                <ShoppingBag size={16} />
            </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
             <p className="text-[10px] font-bold text-brand-600 uppercase tracking-widest bg-brand-50 px-2 py-0.5 rounded-full">{product.category}</p>
        </div>
        <h3 className="text-sm font-bold text-slate-800 mb-3 truncate group-hover/card:text-brand-600 transition-colors">{product.name}</h3>
        
        <div className="flex justify-between items-end border-t border-slate-50 pt-3">
             <p className="text-lg font-bold text-slate-900">{formatRupiah(product.price)}</p>
             <TrendChart data={product.trend} />
        </div>
      </div>
    </div>
  );
};

const ProductShowcase: React.FC = () => {
  return (
    <div className="w-full bg-slate-50 border-b border-slate-200 py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 flex flex-col sm:flex-row justify-between items-end sm:items-center gap-4">
        <div>
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <Tag size={24} className="text-brand-600" />
            Inspirasi Produk UMKM Lokal
            </h2>
            <p className="text-slate-500 mt-2 max-w-xl">
                Jelajahi kisah sukses produk-produk yang telah berkembang pesat bersama mitra digital kami.
            </p>
        </div>
        <button className="text-sm font-semibold text-brand-600 hover:text-brand-700 flex items-center gap-1">
            Lihat Semua <Tag size={14} />
        </button>
      </div>
      
      <div className="relative flex w-full">
        {/* Left Gradient Mask */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-32 bg-gradient-to-r from-slate-50 to-transparent z-10"></div>
        
        {/* Marquee Container */}
        <div className="animate-scroll py-4 flex gap-6 whitespace-nowrap pause-animation will-change-transform pl-4">
          {/* First set of items */}
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
          
          {/* Duplicate set for seamless loop */}
          {PRODUCTS.map((product) => (
            <ProductCard key={`dup-${product.id}`} product={product} />
          ))}
        </div>

        {/* Right Gradient Mask */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-32 bg-gradient-to-l from-slate-50 to-transparent z-10"></div>
      </div>
    </div>
  );
};

export default ProductShowcase;