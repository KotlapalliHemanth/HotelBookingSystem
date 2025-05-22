import React from 'react';
import s from './hotelCard.module.css';
import { useNavigate } from 'react-router-dom';

const HotelCard = ({ hotel }) => {
    const navigate = useNavigate();
    const hotelId = hotel._id || hotel.id;

    return (
        <div
            className={s.cardContainer}
            onClick={() => navigate(`/hotel/${hotelId}`)}
        >
            <div className={s.hotelcard}>
                <div className={s.img}>
                    <img
                        src={hotel.imageUrl || "https://cdn.pixabay.com/photo/2017/01/14/12/48/hotel-1979406_960_720.jpg"}
                        alt={hotel.name}
                        className={s.img}
                    />
                </div>
                <div className={s.details}>
                    <div>{hotel.name}</div>
                    <div>Location: {hotel.location}</div>
                    <div>Price: ₹{hotel.price}/day</div>
                </div>
            </div>
        </div>
    );
};

export default HotelCard;
