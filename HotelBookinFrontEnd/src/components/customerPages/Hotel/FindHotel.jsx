import React, {useState} from 'react';
import SearchBar from './SearchBar';
import HotelList from './HotelList'; 
import Footer from '../../Footer'
import s from './FindHotel.module.css'; // Assuming you have a CSS file for styling
import Hotel from './Hotel';

const FindHotel = () => {
    const [searching, setSearching] = useState(false);
    let hlist = {};
    return (
        <div className={s.findHotel}>
            {!searching && <div><h1>Welcome, find hotels at your required locations</h1></div>}
            <SearchBar  searching={searching} setSearching={setSearching} />
            {console.log(searching)}
            {searching ? <HotelList /> : <></>}
            <Footer />
        </div>
    );
}

export default FindHotel;
