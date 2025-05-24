import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PaymentPage = ({ amount, bookingDetails }) => {
    const navigate = useNavigate();

    const handlePayment = async () => {
        const token = localStorage.getItem('token');

        // 1. Create booking and get bookingId
        const bookingRes = await axios.post(
            'http://localhost:8080/bookings',
            {
                customerId: bookingDetails.customerId,
                roomId: bookingDetails.roomId,
                checkInDate: bookingDetails.checkInDate,
                checkOutDate: bookingDetails.checkOutDate,
                totalPrice: amount
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        const booking = bookingRes.data;
        const bookingId = booking.id;

        // 2. Create Razorpay order with bookingId
        const orderRes = await axios.post(
            'http://localhost:8080/api/payment/order',
            { amount, bookingId },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );
        const order = orderRes.data;

        // 3. Open Razorpay checkout
        const options = {
            key: 'YOUR_RAZORPAY_KEY_ID',
            amount: order.amount,
            currency: order.currency,
            name: 'Hotel Booking',
            description: 'Room Booking Payment',
            order_id: order.id,
            handler: async function (response) {
                try {
                    const token = localStorage.getItem('token');
                    const verifyRes = await axios.post(
                        'http://localhost:8080/api/payment/verify',
                        {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            bookingId: bookingId,
                            amount: amount
                        },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                'Authorization': `Bearer ${token}`
                            }
                        }
                    );
                    alert('Payment verified and saved!');
                    navigate('/'); // Redirect to home page after successful payment
                } catch (err) {
                    alert('Payment verification failed!');
                }
            },
            prefill: {
                name: bookingDetails?.name || '',
                email: bookingDetails?.email || '',
                contact: bookingDetails?.phone || '',
            },
            theme: { color: '#1976d2' }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    return (
        <div style={{ textAlign: 'center', marginTop: 40 }}>
            <h2>Proceed to Payment</h2>
            <p>Amount to pay: <b>₹{amount}</b></p>
            <button onClick={handlePayment} style={{ padding: '10px 24px', fontSize: '1.1rem' }}>
                Pay with Razorpay
            </button>
        </div>
    );
};

export default PaymentPage;