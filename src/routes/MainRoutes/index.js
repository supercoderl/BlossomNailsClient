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
import Widget from "../../pages/Chat/widget";
import { v4 as uuid } from "uuid";

const MainRoutes = () => {
    const [connection, setConnection] = useState();
    const [chatRoom, setChatRoom] = useState(null);
    const [chatUserID, setChatUserID] = useState(localStorage.getItem("chatUserID"));

    const joinRoom = async (user, room) => {
        const connection = new HubConnectionBuilder().withUrl(`https://blossom-nails.somee.com/notify`).configureLogging(LogLevel.Information).build();

        await connection.start();
        await connection.invoke("JoinRoom", { user, room });
        setConnection(connection);
    }

    const getGetOwnerBooking = async () => {
        const user = JSON.parse(AuthService.getUser());
        await axiosInstance.get(`Booking/booking-empty`)
            .then((response) => {
                const result = response.data;
                if (!result) return;
                else if (result.success && result.data) {
                    const booking = {
                        bookingID: result.data.bookingID,
                        customerName: user?.fullname || "",
                        customerEmail: user?.email || "",
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
            }).catch((error) => console.log(error));
    }

    useEffect(() => {
        const getChatRoomByUserID = async () => {
            if (chatUserID) {
                await axiosInstance.get(`Chat/get-room-by-user`, { params: { userID: chatUserID, roleCode: 300 } }).then((response) => {
                    const result = response.data;
                    if (!result) return;
                    else if (result && result.data) {
                        setChatRoom(result.data);
                    }
                }).catch((error) => console.log(error));
            }
            else {
                const newChatUserID = uuid();
                await axiosInstance.get(`Chat/get-room-by-user`, { params: { userID: newChatUserID, roleCode: 300 } }).then((response) => {
                    const result = response.data;
                    if (!result) return;
                    else if (result && result.data) {
                        setChatRoom(result.data);
                        localStorage.setItem("chatUserID", newChatUserID);
                    }
                }).catch((error) => console.log(error));
            }
        }

        getChatRoomByUserID();
    }, [chatUserID]);

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
                <Route path="/contact" element={<Contact connection={connection} />} />
                <Route path="/error/login-require" element={<LoginRequire />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <ScrollUp />
            <Widget connection={connection} room={chatRoom} userID={chatUserID} />
            <Footer />
        </>
    )
}

export default MainRoutes;