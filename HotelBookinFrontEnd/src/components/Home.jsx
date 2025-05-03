import React from 'react';
import Header from './header';
import { Outlet } from 'react-router-dom';
import Footer from './Footer';

const Home = () => {
    return (
            <>
            <Header />
            <Outlet />
            <Footer />
            </>
            
    );
}

export default Home;
