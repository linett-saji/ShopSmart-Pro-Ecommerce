import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '../context/CartContext';

const Checkout = () => {
    const stripe = useStripe();
    const elements = useElements();
    const { cartTotal, clearCart } = useCart();
    const [status, setStatus] = useState('Pay Now');

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if (!stripe || !elements) {
            return;
        }

        setStatus('Processing...');

        // SIMULATED PAYMENT LOGIC (Since no Stripe Account is linked)
        setTimeout(() => {
            const isSuccess = true; // Simulating a successful swipe

            if (isSuccess) {
                alert('✅ PAYMENT SUCCESSFUL!');
                alert(`Receipt sent to: annasaji2020@gmail.com\nOrder Total: $${cartTotal}`);
                clearCart(); // Empties the cart
                window.location.href = '/'; // Redirects to Home
            } else {
                alert('❌ Payment Declined. Please try again.');
                setStatus('Try Again');
            }
        }, 2500); // 2.5 second delay to look "real"
    };

    return (
        <div className="max-w-md mx-auto p-10 bg-white shadow-2xl rounded-3xl mt-10 border border-gray-100">
            <h2 className="text-2xl font-black mb-2 italic uppercase text-slate-900">Final Step</h2>
            <p className="mb-6 text-blue-600 font-bold text-sm">AMOUNT TO PAY: ${cartTotal}</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="p-4 border-2 border-gray-100 rounded-xl bg-gray-50 shadow-inner">
                    <label className="text-xs font-bold text-gray-400 uppercase mb-2 block">Card Details</label>
                    <CardElement options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': { color: '#aab7c4' },
                            },
                        },
                    }} />
                </div>

                <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 mb-4">
                    <p className="text-xs text-blue-700 leading-relaxed">
                        🛡️ Your payment is encrypted and processed securely.
                    </p>
                </div>

                <button 
                    disabled={status === 'Processing...'}
                    className={`w-full py-4 rounded-xl font-black text-white shadow-xl transition-all ${
                        status === 'Processing...' ? 'bg-gray-400' : 'bg-slate-900 hover:bg-blue-600 hover:-translate-y-1'
                    }`}
                >
                    {status === 'Processing...' ? (
                        <span className="flex items-center justify-center">
                            <svg className="animate-spin h-5 w-5 mr-3 border-t-2 border-white rounded-full" viewBox="0 0 24 24"></svg>
                            VERIFYING...
                        </span>
                    ) : `CONFIRM $${cartTotal}`}
                </button>
            </form>
        </div>
    );
};

export default Checkout;