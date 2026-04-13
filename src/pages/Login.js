import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // 1. Send login request to Backend (Port 5000)
            const res = await axios.post('http://localhost:5000/api/auth/login', { 
                email, 
                password 
            });

            if (res.status === 200) {
                // 2. SUCCESS: Save the JWT Token in the browser memory
                localStorage.setItem('token', res.data.token);
                
                alert("✅ Login Successful!");
                
                // 3. REDIRECT: Move to the Admin Inventory page
                navigate('/admin');
            }
        } catch (err) {
            // Handle wrong password or server errors
            alert("❌ Login Failed: " + (err.response?.data?.message || "Invalid Credentials"));
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md border border-gray-100">
                <h2 className="text-4xl font-black text-slate-900 mb-8 text-center uppercase italic tracking-tighter">
                    Admin Login
                </h2>
                
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <input 
                            type="email" 
                            placeholder="Email" 
                            className="w-full p-4 bg-slate-50 border border-gray-200 rounded-2xl text-slate-900 outline-none focus:border-blue-500 transition shadow-sm"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>
                    <div>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            className="w-full p-4 bg-slate-50 border border-gray-200 rounded-2xl text-slate-900 outline-none focus:border-blue-500 transition shadow-sm"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition shadow-lg uppercase tracking-widest"
                    >
                        Enter Dashboard
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <button 
                        onClick={() => navigate('/register')} 
                        className="text-slate-400 text-sm hover:text-blue-600 transition font-bold"
                    >
                        Create new Admin account
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;