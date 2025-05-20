import React from 'react';
import s from './hotelList.module.css'
import HotelCard from './HotelCard';
const HotelList = () => {
    return (
        
        <div className={s.hotelList}>
            <HotelCard />
            <HotelCard />
            <HotelCard />
            <HotelCard />
        </div>
    );
}

export default HotelList;

