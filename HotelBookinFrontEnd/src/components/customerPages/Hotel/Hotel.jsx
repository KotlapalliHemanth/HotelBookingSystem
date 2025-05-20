import React,{useState} from 'react';
import Footer from '../../Footer';
import s from './hotel.module.css'


const images = [
    'https://via.placeholder.com/400x200?text=Image+1',
    'https://via.placeholder.com/400x200?text=Image+2',
    'https://via.placeholder.com/400x200?text=Image+3'
];
const roomTypes = [
    { name: 'Standard', price: 1000 },
    { name: 'Deluxe', price: 1500 },
    { name: 'Suite', price: 2000 }
];

    
const Hotel = () => {
    const [current, setCurrent] = useState(0);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [selectedRoom, setSelectedRoom] = useState(roomTypes[0]);
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);

    const prevSlide = () => {
        setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    const nextSlide = () => {
        setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    // Calculate nights
    const getNights = () => {
        if (!checkIn || !checkOut) return 1;
        const inDate = new Date(checkIn);
        const outDate = new Date(checkOut);
        const diff = (outDate - inDate) / (1000 * 60 * 60 * 24);
        return diff > 0 ? diff : 1;
    };

    // Calculate total price
    const totalPrice = selectedRoom.price * (adults + (children * 0.5)) * getNights();

    const handleBook = () => {
        // Redirect to payments page (replace with your routing logic)
        window.location.href = '/payment';
    };

    return (
        <>
        <div className={s.hotelContainer}>
            <div className={s.hdetails}>
                <div className={s.imageslider}>
                    <div className={`${s.arrow} ${s.left}`} onClick={prevSlide}>&lt;</div>
                    <img className={s.sliderImage} src={images[current]} alt={`Hotel ${current + 1}`} style={{ width: '100%', height: '100%' }} />
                    <div className={`${s.arrow} ${s.right}`} onClick={nextSlide}>&gt;</div>
                </div>
                <div className="details">
                    

                    <h2 className={s.hotelName}>Hotel Name</h2>
                    <div className={s.hotelLocation}>Location: City, Country</div>
                    <div className={s.hotelDescription}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam vitae.
                    </div>
                    <div className={s.hotelRating}>Rating: ★★★★☆</div>
                    <div className={s.hotelPrice}>Price: $120/night</div>
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
                    {/* Room Types */}
                    <div className={s.roomTypes}>
                        {roomTypes.map((room, idx) => (
                            <div
                                key={room.name}
                                className={`${s.roomTypeCard} ${selectedRoom.name === room.name ? s.selected : ''}`}
                                onClick={() => setSelectedRoom(room)}
                            >
                                <div className={s.roomTypeName}>{room.name}</div>
                                <div className={s.roomTypePrice}>₹{room.price}/night</div>
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
                    {/* Book Button : need to create form data collection method and submit that data to payments */}
                    <button type="submit" className={s.bookBtn}>Book Now</button>
                </form>
            </div>
        </div>
        <Footer />
        </>
    );
}

export default Hotel;
