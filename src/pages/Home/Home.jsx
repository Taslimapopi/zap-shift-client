import React from 'react';
import HowItWork from './workData/HowItWork';
import Banner from './Banner/Banner';
import Brands from './Brands/Brands';
import Reviews from './reviews/Reviews';

const reviewPromise = fetch('/reviews.json').then(res=>res.json())

const Home = () => {

    return (
        <div>
            <Banner></Banner>
            <Brands></Brands>
            <Reviews reviewPromise={reviewPromise}></Reviews>
            <HowItWork></HowItWork>
        </div>
    );
};

export default Home;