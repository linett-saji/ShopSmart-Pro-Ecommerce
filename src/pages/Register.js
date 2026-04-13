import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Fixed: Added this import
import axios from 'axios';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); // Fixed: Defined the navigate hook

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // Make sure your server is running on port 5000
            const res = await axios.post('http://localhost:5000/api/auth/register', { 
                email, 
                password 
            });

            if (res.status === 201) {
                alert("✅ Registration Successful!");
                navigate('/login'); // Redirects user to login page
            }
        } catch (err) {
            // Shows specific error from backend if user already exists
            alert("❌ Error: " + (err.response?.data?.message || "Server not responding"));
        }
    };

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
            <div className="bg-slate-800 p-10 rounded-3xl shadow-2xl w-full max-w-md border border-slate-700">
                <h2 className="text-3xl font-black text-white mb-8 text-center uppercase italic tracking-tighter">
                    Create Admin Account
                </h2>
                
                <form onSubmit={handleRegister} className="space-y-6">
                    <div>
                        <input 
                            type="email" 
                            placeholder="Email Address" 
                            className="w-full p-4 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-blue-500 outline-none transition"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required 
                        />
                    </div>
                    <div>
                        <input 
                            type="password" 
                            placeholder="Password" 
                            className="w-full p-4 bg-slate-900 border border-slate-700 rounded-xl text-white focus:border-blue-500 outline-none transition"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required 
                        />
                    </div>
                    
                    <button 
                        type="submit" 
                        className="w-full bg-blue-600 text-white py-4 rounded-xl font-black text-lg hover:bg-blue-500 transition shadow-lg uppercase tracking-widest"
                    >
                        Register
                    </button>
                </form>

                <p className="text-slate-400 mt-6 text-center text-sm">
                    Already have an account? 
                    <button onClick={() => navigate('/login')} className="text-blue-400 ml-2 font-bold hover:underline">
                        Login here
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Register;