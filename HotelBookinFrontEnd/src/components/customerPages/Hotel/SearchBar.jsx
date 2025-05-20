import React from 'react';
import s from './searchbar.module.css'; // Assuming you have a CSS file for styling

const SearchBar = ({searching, setSearching}) => {

    const handlerequest = (e) => {
        e.preventDefault();
        console.log(searching);
        setSearching(true);
        // Here you can add the logic to handle the search request
        // For example, you can fetch data from an API or filter a list of hotels
    }

    return (
        <div className={s.searchBar}> 
            <form action="" className={s.searchForm}>
                <div className={`${s.searchFeild} ${s.location}`}>
                    <label htmlFor="Location" className={s.label}>Location</label>
                    <input type="text" name="Location" id="" className={s.inputFeild} />
                </div>
                <div className={`${s.searchFeild} ${s.date}`}> 
                    <label htmlFor="checkIn" className={s.label}>Check-in</label>
                    <input type="date" name="checkIn" id="" className={s.inputFeild} />
                </div>
                <div className={`${s.searchFeild} ${s.date}`}>
                    <label htmlFor="checkOut" className={s.label}>Check-out</label>
                    <input type="date" name="checkOut" id=""  className={s.inputFeild}/>
                </div>
                <div className={`${s.searchFeild} ${s.guests}`}>
                    <label htmlFor='guests' className={s.label}>Guests</label>
                    <input type="number" name="guests" id="" className={s.inputFeild} min="0" />
                </div>
                <div className={`${s.searchFeild} ${s.sortby}`}>
                    <label htmlFor='sortBy' className={s.label}>Sort by</label>
                    <select name="sortBy" id="" className={`${s.inputFeild} ${s.sort}`}>
                        <option value="Price-Asc">Price: Low to High</option>
                        <option value="Price-Desc">Price: High to Low</option>
                    </select>
                </div>
                
                <button type="submit" className={s.btn} onClick={(e)=>{e.preventDefault;console.log(searching); setSearching(false);}}><span className={`material-symbols-outlined ${s.search}  ${s.reset}`} id='' title='Reset'>replay</span><p className={s.searchp}>Reset</p></button>
                <button type="submit" className={s.btn} onClick={handlerequest}><span className={`material-symbols-outlined ${s.search}`} id='' title='search'>search</span><p className={s.searchp}>Search</p></button>
            </form>
            
        </div>
    );
}

export default SearchBar;
