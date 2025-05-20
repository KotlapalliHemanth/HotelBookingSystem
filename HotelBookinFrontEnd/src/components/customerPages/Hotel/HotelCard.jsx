import React from 'react';
import s from './hotelCard.module.css'
import { useNavigate } from 'react-router-dom';

const HotelCard = () => {

    let navigate= useNavigate();
    // need to get hotel details through the props from the serch result.
    return (
        <div className={s.cardContainer} onClick={(e) => {e.preventDefault(); navigate(`hotel/${hotelId}`);}}> 
            <div className={s.hotelcard}>
                <div className={s.img}>
                    <img src="https://cdn.pixabay.com/photo/2017/01/14/12/48/hotel-1979406_960_720.jpg" alt="" className={s.img} />
                </div>
                <div className={s.details}>
                    <div>Hotel name</div>
                    <div>Location: banglore, India</div>
                    <div>Price: Rs.900/day</div>
                </div>
            </div>
        </div>
    );
}

export default HotelCard;
