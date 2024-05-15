import { Route, Routes } from "react-router-dom"
import Home from "../../pages/Home";
import Header from "../../layouts/Header";
import Footer from "../../layouts/Footer";
import Booking from "../../pages/Booking";
import LoginRequire from "../../pages/Error/login-require";
import Auth from "../../pages/Auth/auth";
import { useEffect, useState } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import ScrollUp from "../../components/scroll-up";
import AuthService from "../../services/auth";
import axiosInstance from "../../configs/axios";
import Contact from "../../pages/Contact";
import Pricing from "../../pages/Pricing";
import ForgotPassword from "../../pages/Auth/forgot-password";
import NotFound from "../../pages/Error/not-found";

const MainRoutes = () => {
    const [connection, setConnection] = useState();

    const joinRoom = async (user, room) => {
        const connection = new HubConnectionBuilder().withUrl("https://localhost:7176/notify").configureLogging(LogLevel.Information).build();
        await connection.start();
        await connection.invoke("JoinRoom", { user, room });
        setConnection(connection);
    }

    const getGetOwnerBooking = async () => {
        const user = JSON.parse(AuthService.getUser());
        if (user) {
            await axiosInstance.get(`Booking/booking-by-customer`)
                .then((response) => {
                    const result = response.data;
                    console.log(result);
                    if (!result) return;
                    else if (result.success && result.data) {
                        const booking = {
                            bookingID: result.data.bookingID,
                            customerName: user?.fullname || "",
                            customerPhone: user?.phone || "",
                            customerID: user?.userID || "",
                            nailTechnicianID: "",
                            bookingDate: new Date(),
                            startTime: "",
                            endTime: "",
                            status: "Booked",
                            totalCost: 0,
                            notes: ""
                        };
                        window.localStorage.setItem("booking", JSON.stringify(booking));
                    }
                });
        }
    }

    useEffect(() => {
        const storedBooking = JSON.parse(localStorage.getItem("booking"));
        if (!storedBooking) getGetOwnerBooking();
        joinRoom("Anonymous", "notification");
    }, []);

    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/booking" element={<Booking connection={connection} />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/error/login-require" element={<LoginRequire />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <ScrollUp />
            <Footer />
        </>
    )
}

export default MainRoutes;