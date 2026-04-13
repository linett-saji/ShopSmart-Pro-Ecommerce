import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('All');
    const { addToCart } = useCart();

    // 1. Fetch real products from MongoDB
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/products');
                setProducts(res.data);
            } catch (err) {
                console.error("Error fetching products:", err);
            }
        };
        fetchProducts();
    }, []);

    // 2. Logic for Search and Category Filtering
    const filteredProducts = products.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === 'All' || p.category === category;
        return matchesSearch && matchesCategory;
    });

    // 3. AI Recommendations Logic (Shows items in same category)
    const getRecommendations = (currentCategory) => {
        return products.filter(p => p.category === currentCategory).slice(0, 3);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-blue-500">
            {/* --- HERO SECTION --- */}
            <header className="p-10 text-center space-y-4">
                <h1 className="text-7xl font-black italic tracking-tighter uppercase leading-none">
                    Premium <span className="text-blue-500">Catalog</span>
                </h1>
                <p className="text-slate-400 font-bold tracking-[0.3em] uppercase text-sm">
                    Curated Products for your lifestyle
                </p>
            </header>

            {/* --- SEARCH & FILTER BAR --- */}
            <div className="max-w-6xl mx-auto px-6 mb-12 flex flex-col md:flex-row gap-4">
                <input 
                    type="text" 
                    placeholder="Search products..." 
                    className="flex-1 bg-slate-900 border border-slate-800 p-5 rounded-3xl outline-none focus:border-blue-600 transition shadow-2xl"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <select 
                    className="bg-slate-900 border border-slate-800 p-5 rounded-3xl font-black uppercase text-xs tracking-widest outline-none appearance-none cursor-pointer hover:bg-slate-800 transition"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option value="All">All Categories</option>
                    <option value="Laptop">Laptops</option>
                    <option value="Phone">Phones</option>
                    <option value="Tablet">Tablets</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Gaming">Gaming</option>
                </select>
            </div>

            {/* --- PRODUCT GRID --- */}
            <main className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 pb-20">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <div key={product._id} className="group bg-slate-900 border border-slate-800 p-6 rounded-[2.5rem] hover:border-blue-600 transition-all duration-500 shadow-2xl">
                            <div className="relative overflow-hidden rounded-[2rem] mb-6 aspect-square">
                                <img 
                                    src={`http://localhost:5000/uploads/${product.image}`} 
                                    alt={product.title} 
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    onError={(e) => { e.target.src = "https://via.placeholder.com/300?text=ShopSmart+Pro"; }}
                                />
                                <div className="absolute top-4 right-4 bg-blue-600 text-[10px] font-black px-3 py-1 rounded-full uppercase">
                                    {product.category}
                                </div>
                            </div>
                            
                            <h3 className="text-2xl font-black mb-1">{product.title}</h3>
                            <p className="text-slate-400 text-sm line-clamp-2 mb-4 leading-relaxed">
                                {product.description}
                            </p>
                            
                            <div className="flex items-center justify-between mt-auto">
                                <span className="text-3xl font-black text-blue-500">${product.price}</span>
                                <button 
                                    onClick={() => addToCart(product)}
                                    className="bg-white text-black px-6 py-3 rounded-2xl font-black hover:bg-blue-500 hover:text-white transition-colors duration-300"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full text-center py-20">
                        <p className="text-slate-500 font-bold italic">No products found in this category.</p>
                    </div>
                )}
            </main>

            {/* --- AI RECOMMENDATIONS SECTION --- */}
            <section className="bg-slate-900/50 py-20 border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-12">
                        AI Recommended <span className="text-blue-500">For You</span>
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {/* Example: Logic to show first 4 items as "Smart Picks" */}
                        {products.slice(0, 4).map(p => (
                            <div key={p._id} className="bg-slate-900 p-4 rounded-3xl border border-slate-800 hover:scale-105 transition-transform">
                                <img 
                                    src={`http://localhost:5000/uploads/${p.image}`} 
                                    className="w-full h-32 object-cover rounded-2xl mb-3 opacity-70" 
                                    alt="recommendation"
                                />
                                <p className="text-[10px] font-black uppercase tracking-widest text-blue-500">{p.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;