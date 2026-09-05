import React, { useState } from 'react';
import { PRODUCTS_CATALOG, ProductItem } from '../../data/productsData';
import { 
  Search, Layers, Sparkles, Shield, CheckCircle2, 
  Info, Eye, X, Tag, SlidersHorizontal, ShoppingBag 
} from 'lucide-react';

export const ProductsView: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [inspectProduct, setInspectProduct] = useState<ProductItem | null>(null);

  const filteredProducts = PRODUCTS_CATALOG.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.dimensions.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categoryCounts = {
    All: PRODUCTS_CATALOG.length,
    Basic: PRODUCTS_CATALOG.filter(p => p.category === 'Basic').length,
    Premium: PRODUCTS_CATALOG.filter(p => p.category === 'Premium').length,
    'Ultra-Premium': PRODUCTS_CATALOG.filter(p => p.category === 'Ultra-Premium').length,
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Banner */}
      <div className="glass-panel p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-3 py-1 text-[10px] font-extrabold bg-sky-100 text-sky-800 border border-sky-200 rounded-full uppercase tracking-wider">
                Tarang Product Line Catalog
              </span>
              <span className="text-xs text-slate-500 font-mono font-medium">Kinetic Sand Art Tables</span>
            </div>
            <h1 className="text-2xl font-black text-slate-900 mt-1 tracking-tight">
              Tarang Kinetic Sand Art Products (Excel Catalog)
            </h1>
            <p className="text-xs text-slate-500 mt-0.5 font-medium">
              Explore all product models from the official specifications catalog ({PRODUCTS_CATALOG.length} models across 3 collections).
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-3 bg-sky-50 border border-sky-200 rounded-2xl text-center">
              <span className="text-[10px] text-sky-700 font-bold uppercase tracking-wider block">Total Models</span>
              <span className="text-xl font-black text-slate-900">{PRODUCTS_CATALOG.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="glass-panel p-5 space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          
          {/* Collection Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {(['All', 'Basic', 'Premium', 'Ultra-Premium'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center space-x-2 ${
                  selectedCategory === cat
                    ? 'bg-sky-600 text-white shadow-md shadow-sky-600/20'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200'
                }`}
              >
                <span>{cat === 'All' ? 'All Collections' : `${cat} Collection`}</span>
                <span className={`px-2 py-0.5 text-[10px] rounded-full font-mono font-bold ${
                  selectedCategory === cat ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                }`}>
                  {categoryCounts[cat]}
                </span>
              </button>
            ))}
          </div>

          {/* Search & Status Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search products or specs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs rounded-xl pl-9 pr-3 py-2 focus:outline-none focus:border-sky-600 font-medium"
              />
            </div>

            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl px-3 py-2 focus:outline-none"
            >
              <option value="All">All Availability</option>
              <option value="In Stock">In Stock</option>
              <option value="Experience Center Showcase">Experience Center Showcase</option>
              <option value="Made to Order">Made to Order</option>
            </select>
          </div>

        </div>
      </div>

      {/* Product Cards Grid — Expanded Responsiveness */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
        {filteredProducts.map(item => (
          <div 
            key={item.id} 
            className="glass-panel p-5 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group border border-slate-200/80 hover:border-sky-300"
          >
            <div>
              {/* Product Image Container */}
              <div className="relative h-48 w-full bg-slate-50 rounded-2xl overflow-hidden mb-4 border border-slate-200/60 flex items-center justify-center">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&q=80';
                  }}
                />

                {/* Category Badge Pill */}
                <div className="absolute top-3 left-3">
                  <span className={`px-2.5 py-1 text-[10px] font-extrabold rounded-lg shadow-sm uppercase tracking-wider border ${
                    item.category === 'Ultra-Premium'
                      ? 'bg-purple-600 text-white border-purple-400'
                      : item.category === 'Premium'
                      ? 'bg-indigo-600 text-white border-indigo-400'
                      : 'bg-sky-600 text-white border-sky-400'
                  }`}>
                    {item.category}
                  </span>
                </div>

                {/* Status Badge Pill */}
                <div className="absolute top-3 right-3">
                  <span className="px-2.5 py-1 text-[10px] font-extrabold rounded-lg bg-white/95 text-slate-800 border border-slate-200 shadow-sm">
                    {item.status}
                  </span>
                </div>
              </div>

              {/* Header Info */}
              <div className="flex justify-between items-start mb-1.5">
                <span className="text-[11px] font-mono text-sky-700 font-bold">{item.id}</span>
                <span className="text-base font-black text-emerald-700 font-mono">{item.price}</span>
              </div>

              <h3 className="font-extrabold text-slate-900 text-sm leading-snug group-hover:text-sky-700 transition">
                {item.name}
              </h3>

              <div className="mt-2 text-xs font-semibold text-slate-600 flex items-center gap-1.5 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200/60">
                <Tag className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span className="truncate">{item.dimensions}</span>
              </div>

              <p className="text-xs text-slate-500 mt-2.5 line-clamp-2 leading-relaxed font-medium">
                {item.description}
              </p>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setInspectProduct(item)}
                className="w-full py-2 bg-slate-100 hover:bg-sky-50 hover:text-sky-700 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 transition flex items-center justify-center space-x-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Full Specifications & Demo Info</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Product Inspection Modal — Perfectly Proportioned, Zero Blank Space */}
      {inspectProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
          <div className="glass-panel w-full max-w-2xl overflow-hidden shadow-2xl space-y-4 p-6 relative bg-white my-auto max-h-[90vh] overflow-y-auto smooth-scroll">
            
            {/* Close Button */}
            <button 
              onClick={() => setInspectProduct(null)}
              className="absolute top-4 right-4 p-2 bg-slate-100 text-slate-700 hover:text-slate-900 rounded-xl border border-slate-200 transition z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="pr-10">
              <div className="flex items-center space-x-2 mb-1">
                <span className="px-2.5 py-0.5 text-[10px] font-extrabold bg-sky-100 text-sky-800 rounded-full border border-sky-200 uppercase tracking-wider">
                  {inspectProduct.category} COLLECTION
                </span>
                <span className="text-xs text-slate-500 font-mono font-bold">{inspectProduct.id}</span>
              </div>
              <h2 className="text-xl font-black text-slate-900 leading-tight">{inspectProduct.name}</h2>
            </div>

            {/* 2-Column Balanced Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Left Column: Product Image */}
              <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex items-center justify-center h-full min-h-[220px]">
                <img 
                  src={inspectProduct.image} 
                  alt={inspectProduct.name} 
                  className="max-h-56 w-full object-contain rounded-xl" 
                />
              </div>

              {/* Right Column: Key Metrics & Description (Balanced Fill) */}
              <div className="flex flex-col justify-between space-y-2.5 text-xs">
                
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl">
                  <span className="text-[10px] text-emerald-800 font-bold uppercase tracking-wider block">MSRP List Price</span>
                  <span className="text-xl font-black text-emerald-900 font-mono">{inspectProduct.price}</span>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Dimensions & Build</span>
                  <span className="font-bold text-slate-900">{inspectProduct.dimensions}</span>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Availability Status</span>
                    <span className="font-bold text-sky-700">{inspectProduct.status}</span>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>

                {/* Integrated Description Block to fill right column height evenly */}
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex-1 flex flex-col justify-center">
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">Product Description</span>
                  <p className="text-xs text-slate-700 leading-relaxed font-medium">
                    {inspectProduct.description}
                  </p>
                </div>

              </div>
            </div>

            {/* Technical Highlights Section */}
            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
              <h4 className="font-extrabold text-slate-900 text-xs tracking-tight">Technical Highlights & Specifications</h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {inspectProduct.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center space-x-2 p-2.5 bg-slate-50 rounded-xl border border-slate-200/80 font-medium text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Footer Action */}
            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setInspectProduct(null)}
                className="px-6 py-2.5 bg-slate-900 text-white font-bold text-xs rounded-xl hover:bg-slate-800 transition shadow-sm"
              >
                Close Specification View
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
