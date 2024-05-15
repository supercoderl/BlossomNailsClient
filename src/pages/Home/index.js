import { lazy, useEffect } from 'react';
import "../../assets/css/style.css"

const HeroSection = lazy(() => import("./hero"));
const AboutSection = lazy(() => import("./about"));
const FeatureSection = lazy(() => import("./feature"));
const FeedbackSection = lazy(() => import("./feedback"));
const ProductSection = lazy(() => import("./product"));
const BookingSection = lazy(() => import("./booking"));
const GallerySection = lazy(() => import("./gallery"));

const Home = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <HeroSection />
            <AboutSection />
            <FeatureSection />
            <ProductSection />
            <BookingSection />
            <GallerySection />
            <FeedbackSection />
        </>
    )
}

export default Home;