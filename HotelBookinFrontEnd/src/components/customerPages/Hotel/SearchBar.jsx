import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import getHotels from '../../../store/Slices/Hotels/getHotels';
import s from './searchbar.module.css';

const SearchBar = ({ searching, setSearching }) => {
    const dispatch = useDispatch();

    // Refs for form fields
    const locationRef = useRef();
    const checkInRef = useRef();
    const checkOutRef = useRef();
    const guestsRef = useRef();
    const sortByRef = useRef();

    const handlerequest = (e) => {
        e.preventDefault();
        setSearching(true);

        // Get values from refs
        const location = locationRef.current.value;
        const checkIn = checkInRef.current.value;
        const checkOut = checkOutRef.current.value;
        const sortBy = sortByRef.current.value;

        // Dispatch the thunk
        dispatch(getHotels({ location, checkIn, checkOut, sortBy }));
    };

    return (
        <div className={s.searchBar}>
            <form className={s.searchForm}>
                <div className={`${s.searchFeild} ${s.location}`}>
                    <label htmlFor="Location" className={s.label}>Location</label>
                    <input type="text" name="Location" ref={locationRef} className={s.inputFeild} />
                </div>
                <div className={`${s.searchFeild} ${s.date}`}>
                    <label htmlFor="checkIn" className={s.label}>Check-in</label>
                    <input type="date" name="checkIn" ref={checkInRef} className={s.inputFeild} />
                </div>
                <div className={`${s.searchFeild} ${s.date}`}>
                    <label htmlFor="checkOut" className={s.label}>Check-out</label>
                    <input type="date" name="checkOut" ref={checkOutRef} className={s.inputFeild} />
                </div>
                <div className={`${s.searchFeild} ${s.guests}`}>
                    <label htmlFor='guests' className={s.label}>Guests</label>
                    <input type="number" name="guests" ref={guestsRef} className={s.inputFeild} min="0" />
                </div>
                <div className={`${s.searchFeild} ${s.sortby}`}>
                    <label htmlFor='sortBy' className={s.label}>Sort by</label>
                    <select name="sortBy" ref={sortByRef} className={`${s.inputFeild} ${s.sort}`}>
                        <option value="Price-Asc">Price: Low to High</option>
                        <option value="Price-Desc">Price: High to Low</option>
                    </select>
                </div>
                <button type="button" className={s.btn} onClick={() => setSearching(false)}>
                    <span className={`material-symbols-outlined ${s.search}  ${s.reset}`} title='Reset'>replay</span>
                    <p className={s.searchp}>Reset</p>
                </button>
                <button type="submit" className={s.btn} onClick={handlerequest}>
                    <span className={`material-symbols-outlined ${s.search}`} title='search'>search</span>
                    <p className={s.searchp}>Search</p>
                </button>
            </form>
        </div>
    );
};

export default SearchBar;
