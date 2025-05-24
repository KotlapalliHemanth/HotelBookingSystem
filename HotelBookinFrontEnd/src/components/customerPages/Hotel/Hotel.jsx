import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Footer from '../../Footer';
import s from './hotel.module.css';

const Hotel = () => {
    const [hotel, setHotel] = useState(null);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [selectedRoomType, setSelectedRoomType] = useState(null);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [current, setCurrent] = useState(0);
    const navigate = useNavigate();
    const { hotelId } = useParams(); // assuming route is /hotel/:hotelId
    const user = useSelector(state => state.user.user.userdetails);

    useEffect(() => {
        // Fetch hotel details
        axios.get(`http://localhost:8080/hotels/${hotelId}`)
            .then(res => {
                setHotel(res.data);
                // Default to first available room
                if (res.data.rooms && res.data.rooms.length > 0) {
                    setSelectedRoom(res.data.rooms[0]);
                }
            })
            .catch(err => {
                console.error('Error fetching hotel details:');
            });
    }, [hotelId]);

    if (!hotel) return <div>Loading...</div>;

    const images = hotel.imageUrls && hotel.imageUrls.length > 0
        ? hotel.imageUrls
        : ['https://via.placeholder.com/400x200?text=No+Image'];

    // Calculate nights
    const getNights = () => {
        if (!checkIn || !checkOut) return 1;
        const inDate = new Date(checkIn);
        const outDate = new Date(checkOut);
        const diff = (outDate - inDate) / (1000 * 60 * 60 * 24);
        return diff > 0 ? diff : 1;
    };

    const selectedRoomTypeObj = hotel.roomTypesAndPrices.find(rt => rt.roomType === selectedRoomType);
    const totalPrice = selectedRoomTypeObj
        ? selectedRoomTypeObj.pricePerDay * (adults + (children * 0.5)) * getNights()
        : 0;

    const handleBook = (e) => {
        // e.preventDefault();
        if (!selectedRoomType) return;
        const availableRoom = hotel.rooms.find(
            room => room.roomType === selectedRoomType && room.isAvailable
        );
        if (!availableRoom) {
            alert('No available rooms of this type.');
            return;
        }
        
        navigate('/payment', {
            state: {
                amount: totalPrice,
                bookingDetails: {
                    customerId: user.id,
                    roomId: availableRoom.id,
                    checkInDate: checkIn,
                    checkOutDate: checkOut,
                    name: user.firstName + ' ' + user.lastName,
                    email: user.email,
                    phone: user.phone
                }
            }
        });
    };

    return (
        <>
        <div className={s.hotelContainer}>
            <div className={s.hdetails}>
                <div className={s.imageslider}>
                    <div className={`${s.arrow} ${s.left}`} onClick={() => setCurrent(current === 0 ? images.length - 1 : current - 1)}>&lt;</div>
                    <img className={s.sliderImage} src={images[current]} alt={`Hotel ${current + 1}`} style={{ width: '100%', height: '100%' }} />
                    <div className={`${s.arrow} ${s.right}`} onClick={() => setCurrent(current === images.length - 1 ? 0 : current + 1)}>&gt;</div>
                </div>
                <div className="details">
                    <h2 className={s.hotelName}>{hotel.name}</h2>
                    <div className={s.hotelLocation}>Location: {hotel.location}</div>
                    <div className={s.hotelDescription}>{hotel.description}</div>
                    <div className={s.hotelRating}>Rating: {hotel.rating} ★</div>
                </div>
            </div>
            <div className={s.hform}>
                <form className={s.bookingForm} onSubmit={e => { e.preventDefault(); handleBook(); }}>
                    {/* Check-in and Check-out */}
                    <div className={s.row}>
                        <div className={s.inputGroup}>
                            <label>Check-in</label>
                            <input type="date" value={checkIn} onChange={e => setCheckIn(e.target.value)} required />
                        </div>
                        <div className={s.inputGroup}>
                            <label>Check-out</label>
                            <input type="date" value={checkOut} onChange={e => setCheckOut(e.target.value)} required />
                        </div>
                    </div>
                    {/* Room Selection */}
                    <div className={s.roomTypes}>
                        {hotel.roomTypesAndPrices.map(rt => (
                            <div
                                key={rt.roomType}
                                className={`${s.roomTypeCard} ${selectedRoomType === rt.roomType ? s.selected : ''}`}
                                onClick={() => setSelectedRoomType(rt.roomType)}
                            >
                                <div className={s.roomTypeName}>{rt.roomType}</div>
                                <div className={s.roomTypePrice}>₹{rt.pricePerDay}/night</div>
                            </div>
                        ))}
                    </div>
                    {/* People Count */}
                    <div className={s.row}>
                        <div className={s.inputGroup}>
                            <label>Adults</label>
                            <input type="number" min="1" value={adults} onChange={e => setAdults(Number(e.target.value))} required />
                        </div>
                        <div className={s.inputGroup}>
                            <label>Children</label>
                            <input type="number" min="0" value={children} onChange={e => setChildren(Number(e.target.value))} required />
                        </div>
                    </div>
                    {/* Total Price */}
                    <div className={s.totalPrice}>
                        Total: <span>₹{totalPrice.toFixed(2)}</span>
                    </div>
                    <button
                        type="submit"
                        className={s.bookBtn}
                        disabled={!selectedRoomType}
                    >
                        Book Now
                    </button>
                </form>
            </div>
        </div>
        <Footer />
        </>
    );
};

export default Hotel;
