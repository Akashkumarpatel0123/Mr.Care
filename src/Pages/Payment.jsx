import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaShieldAlt, FaCreditCard, FaMoneyBillWave, FaUserNurse, FaFirstAid } from 'react-icons/fa';
import { motion } from 'framer-motion';
import upiIcon from '../assets/upi-icon.png';

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const nurse = state?.nurse;
  const service = state?.service;
  const amount = service?.price ? service.price.replace(/[^\d]/g, '') : state?.price;

  const handleOnlinePayment = async () => {
    try {
      const res = await fetch('http://localhost:10000/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount }),
      });

      const { order } = await res.json();

      const options = {
        key: 'rzp_test_YourKeyHere', // 🔁 Replace this with your Razorpay Key ID
        amount: order.amount,
        currency: 'INR',
        name: 'Mr. Care',
        description: `Payment for ${service?.name} by Nurse ${nurse?.name}`,
        order_id: order.id,
        handler: function (response) {
          alert(`Payment successful!\nPayment ID: ${response.razorpay_payment_id}`);
          navigate('/confirmation', {
            state: {
              nurse,
              service,
              paymentId: response.razorpay_payment_id,
            },
          });
        },
        prefill: {
          name: 'User Name',
          email: 'user@example.com',
          contact: '9000090000',
        },
        theme: {
          color: '#8D2E7D',
          backdrop_color: '#f5e9f4',
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      alert('Payment failed. Please try again.');
      console.error(error);
    }
  };

  const handleCOD = async () => {
    try {
      const res = await fetch('http://localhost:10000/api/payment/cod-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nurse, service, amount }),
      });

      const data = await res.json();
      if (data.success) {
        navigate('/confirmation', { state: { nurse, service, paymentMethod: 'COD' } });
      } else {
        throw new Error(data.message || 'COD failed');
      }
    } catch (error) {
      alert(error.message || 'COD failed. Try again.');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Booking</h1>
          <p className="text-gray-600">Secure payment for your wound care service</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FaFirstAid className="text-purple-600 mr-2" />
              Service Details
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <FaUserNurse className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{nurse?.name}</h3>
                  <p className="text-sm text-gray-500">Wound Care Specialist</p>
                  <div className="flex items-center mt-1">
                    <div className="flex items-center text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`h-4 w-4 ${i < nurse?.rating ? 'fill-current' : 'fill-gray-300'}`} viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500 ml-1">({nurse?.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <h4 className="font-medium text-gray-900 mb-2">Service Selected</h4>
                <div className="bg-purple-50 rounded-lg p-3">
                  <div className="flex justify-between">
                    <span className="font-medium">{service?.name}</span>
                    <span className="font-bold text-purple-700">{service?.price}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{service?.description}</p>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex justify-between py-1">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{amount}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-600">Convenience Fee</span>
                  <span className="font-medium">₹0</span>
                </div>
                <div className="flex justify-between py-1 border-t border-gray-200 mt-2 pt-2">
                  <span className="text-gray-600">Total</span>
                  <span className="font-bold text-lg text-purple-700">₹{amount}</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FaCreditCard className="text-purple-600 mr-2" />
              Payment Method
            </h2>

            <div className="space-y-4">
              <motion.div whileHover={{ scale: 1.02 }} className="border border-purple-200 rounded-lg overflow-hidden">
                <input type="radio" id="online" name="payment" className="hidden peer" defaultChecked />
                <label htmlFor="online" className="block p-4 cursor-pointer peer-checked:bg-purple-50 peer-checked:border-purple-400">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-purple-600 mt-0.5">
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium text-gray-900">UPI Payment</h3>
                      <p className="text-sm text-gray-500 mt-1">Pay instantly using any UPI app</p>
                      <div className="mt-3">
                        <img src={upiIcon} alt="UPI" className="h-8 object-contain" />
                      </div>
                    </div>
                  </div>
                </label>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="border border-gray-200 rounded-lg overflow-hidden">
                <input type="radio" id="cod" name="payment" className="hidden peer" />
                <label htmlFor="cod" className="block p-4 cursor-pointer peer-checked:bg-purple-50 peer-checked:border-purple-400">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 h-5 w-5 text-gray-400 mt-0.5 peer-checked:text-purple-600">
                      <svg viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="font-medium text-gray-900">Cash on Delivery</h3>
                      <p className="text-sm text-gray-500 mt-1">Pay in cash when the nurse arrives</p>
                      <div className="mt-3 flex items-center">
                        <FaMoneyBillWave className="h-6 w-6 text-gray-400 mr-2" />
                        <span className="text-xs text-gray-500">Additional ₹50 convenience fee may apply</span>
                      </div>
                    </div>
                  </div>
                </label>
              </motion.div>

              <div className="pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleOnlinePayment}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center"
                >
                  <FaShieldAlt className="mr-2" />
                  Pay Securely ₹{amount}
                </motion.button>

                <button
                  onClick={handleCOD}
                  className="w-full mt-3 border border-purple-600 text-purple-600 hover:bg-purple-50 py-3 px-4 rounded-lg font-medium flex items-center justify-center"
                >
                  <FaMoneyBillWave className="mr-2" />
                  Pay on Delivery
                </button>
              </div>

              <div className="flex items-center justify-center mt-4 text-xs text-gray-500">
                <FaShieldAlt className="text-purple-400 mr-1" />
                <span>Your payment is secured with 256-bit SSL encryption</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Payment;
