import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Footer from '../../Footer';
import s from './profile.module.css';
import UserProfile from './UserProfile';
import Bookings from './Bookings';
import getUserDetails from '../../../store/Slices/user/getUserDetails';

const Profile = () => {
    const [selected, setSelected] = useState('profile');
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUserDetails());
    }, [dispatch]);

    return (
        <>
            <div className={s.profileContainer}>
                <nav className={s.sidebar}>
                    <button
                        className={`${s.navBtn} ${selected === 'profile' ? s.active : ''}`}
                        onClick={() => setSelected('profile')}
                    >
                        Profile
                    </button>
                    <button
                        className={`${s.navBtn} ${selected === 'bookings' ? s.active : ''}`}
                        onClick={() => setSelected('bookings')}
                    >
                        Bookings
                    </button>
                </nav>
                <main className={s.mainContent}>
                    <div className={s.contentBox}>
                        {selected === 'profile' ? <UserProfile /> : <Bookings />}
                    </div>
                </main>
            </div>
            <Footer />
        </>
    );
};

export default Profile;
