import React from 'react';
import { useSelector } from 'react-redux';
import s from './hotelList.module.css';
import HotelCard from './HotelCard';

const HotelList = () => {
    // Get hotels array from the Redux store
    const hotels = useSelector(state => state.hotels.hotels);

    return (
        <div className={s.hotelList}>
            {hotels && hotels.length > 0 ? (
                hotels.map(hotel => (
                    <HotelCard key={hotel.id || hotel._id} hotel={hotel} />
                ))
            ) : (
                <div className={s.noHotelsFound}>
                    No hotels found.
                </div>
            )}
        </div>
    );
}

export default HotelList;

