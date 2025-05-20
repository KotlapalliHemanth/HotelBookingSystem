import React from 'react';
import Header from './header';
import { Outlet } from 'react-router-dom';


const Home = () => {
    return (
            <>
            <Header />
            <div className='body'>
                <Outlet />
            </div>
            
            </>
            
    );
}

export default Home;
