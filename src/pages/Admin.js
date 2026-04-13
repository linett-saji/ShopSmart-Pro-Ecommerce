import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Admin = () => {
    const [product, setProduct] = useState({ title: '', price: '', category: '', description: '' });
    const [image, setImage] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem('token')) navigate('/login');
    }, [navigate]);

    const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Create the "package" for the server
    const formData = new FormData();
    formData.append('title', product.title); // Note: Change 'title' to 'name' if your model uses 'name'
    formData.append('price', product.price);
    formData.append('category', product.category);
    formData.append('description', product.description);
    formData.append('image', image); // The actual file from the 'Choose File' button

    try {
        const res = await axios.post('http://localhost:5000/api/products', formData, {
            headers: { 'Content-Type': 'multipart/form-data' } // Tells server an image is coming
        });
        if (res.status === 201) {
            alert("✅ Product added to catalog!");
        }
    } catch (err) {
        alert("Error uploading product. Make sure backend is running.");
    }
};

    return (
        <div className="min-h-screen bg-slate-50 p-10 flex justify-center">
            <form onSubmit={handleSubmit} className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-lg border border-gray-100">
                <h2 className="text-3xl font-black text-slate-900 mb-8 uppercase italic tracking-tighter">Inventory Manager</h2>
                <div className="space-y-4">
                    <input type="text" placeholder="Product Title" className="w-full p-4 border-2 rounded-xl" onChange={(e) => setProduct({...product, title: e.target.value})} required />
                    <div className="flex gap-4">
                        <input type="number" placeholder="Price ($)" className="w-1/2 p-4 border-2 rounded-xl" onChange={(e) => setProduct({...product, price: e.target.value})} required />
                        <input type="text" placeholder="Category" className="w-1/2 p-4 border-2 rounded-xl" onChange={(e) => setProduct({...product, category: e.target.value})} required />
                    </div>
                    <textarea placeholder="Product description..." className="w-full p-4 border-2 rounded-xl h-32" onChange={(e) => setProduct({...product, description: e.target.value})}></textarea>
                    <div className="p-6 border-2 border-dashed rounded-2xl bg-slate-50 text-center">
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
                    </div>
                    <button className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xl hover:bg-blue-600 transition-all shadow-lg uppercase">Push to Catalog</button>
                </div>
            </form>
        </div>
    );
};

export default Admin;