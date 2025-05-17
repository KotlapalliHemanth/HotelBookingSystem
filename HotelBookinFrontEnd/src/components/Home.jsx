import React from 'react';
import Header from './header';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

const Home = () => {
    return (
            <>
            <Header />
            <div className='body'>
                <Outlet />
            </div>
            <Footer />
            </>
            
    );
}

export default Home;
