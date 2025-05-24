import React, { useEffect, useState } from 'react';
import axios from 'axios';
import s from './profile.module.css';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await axios.get('http://localhost:8080/bookings/customer', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setBookings(res.data);
            } catch (err) {
                setBookings([]);
            } finally {
                setLoading(false);
            }
        };
        fetchBookings();
    }, []);

    if (loading) {
        return <div className={s.contentBox}><h2>My Bookings</h2><div>Loading...</div></div>;
    }

    if (!bookings.length) {
        return <div className={s.contentBox}><h2>My Bookings</h2><div>No bookings found.</div></div>;
    }

    return (
        <div className={s.contentBox}>
            <h2>My Bookings</h2>
            <div className={s.bookingList}>
                {bookings.map(booking => (
                    <div key={booking.id} className={s.bookingCard}>
                        <div><b>Hotel:</b> {booking.hotelName}</div>
                        <div><b>Room:</b> {booking.roomType} ({booking.roomNumber})</div>
                        <div><b>Check-in:</b> {booking.checkInDate}</div>
                        <div><b>Check-out:</b> {booking.checkOutDate}</div>
                        <div><b>Total Price:</b> ₹{booking.totalPrice}</div>
                        <div><b>Status:</b> {booking.bookingStatus}</div>
                        {booking.payment && (
                            <div className={s.paymentInfo}>
                                <b>Payment:</b> {booking.payment.paymentStatus} ({booking.payment.paymentMethod})<br />
                                <b>Txn ID:</b> {booking.payment.transactionId}<br />
                                <b>Paid:</b> ₹{booking.payment.amount} on {booking.payment.paymentDate}
                            </div>
                        )}
                        <div className={s.bookingMeta}>
                            <small>Booked: {booking.createdAt}</small>
                        </div>
                        {booking.bookingStatus === 'BOOKED' && (
                            <button
                                className={s.cancelBtn}
                                onClick={async () => {
                                    try {
                                        const token = localStorage.getItem('token');
                                        await axios.delete(
                                            `http://localhost:8080/booking/${booking.id}`,
                                            {
                                                headers: {
                                                    'Authorization': `Bearer ${token}`
                                                }
                                            }
                                        );
                                        setBookings(prev =>
                                            prev.filter(b => b.id !== booking.id)
                                        );
                                    } catch (err) {
                                        alert('Failed to cancel booking.');
                                    }
                                }}
                            >
                                Cancel Booking
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Bookings;
