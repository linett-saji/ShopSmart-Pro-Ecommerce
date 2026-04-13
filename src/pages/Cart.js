import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const { cartItems, cartTotal, clearCart, removeFromCart } = useCart();
    const navigate = useNavigate();

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-2xl">
            <h1 className="text-3xl font-black mb-6 italic uppercase">Checkout Inventory</h1>
            {cartItems.length === 0 ? (
                <p className="text-gray-500">Your cart is empty.</p>
            ) : (
                <>
                    {cartItems.map(item => (
                        <div key={item._id} className="flex justify-between items-center border-b py-4">
                            <div className="flex items-center space-x-4">
                                <img src={item.image} alt={item.name} className="w-20 h-20 rounded-lg object-cover" />
                                <div>
                                    <h3 className="font-bold">{item.name}</h3>
                                    <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-black text-xl">${item.price * item.quantity}</p>
                                <button onClick={() => removeFromCart(item._id)} className="text-red-500 text-sm font-bold">Remove</button>
                            </div>
                        </div>
                    ))}
                    <div className="mt-10 flex justify-between items-center">
                        <h2 className="text-2xl font-black italic">GRAND TOTAL: <span className="text-4xl ml-4">${cartTotal}</span></h2>
                        <div className="space-x-4">
                            <button onClick={clearCart} className="px-6 py-3 bg-gray-200 rounded-xl font-bold">Clear All</button>
                            <button 
                                onClick={() => navigate('/checkout')} 
                                className="px-10 py-4 bg-slate-900 text-white rounded-xl font-black hover:bg-blue-600 transition shadow-lg"
                            >
                                Complete Order
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Cart;