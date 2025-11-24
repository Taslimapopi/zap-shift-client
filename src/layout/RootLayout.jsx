import React from 'react';
import { Outlet } from 'react-router';
import NabVar from '../pages/shared/NavBAr/NabVar';
import Footer from '../pages/Home/footer/Footer';
import Banner from '../pages/Home/Banner/Banner';

const RootLayout = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <NabVar></NabVar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;