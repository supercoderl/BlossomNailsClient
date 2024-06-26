import { useEffect, useRef, useState } from "react";
import "./css/widget.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from "../../configs/axios";

const Widget = ({ connection, room, userID }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isUserJoined, setIsUserJoined] = useState(false);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const ref = useRef(null);

    const toggleVisibility = () => {
        if (!isVisible) {
            setIsVisible(true);
            setTimeout(() => {
                document.getElementById('smith-container').classList.add('visible');
            }, 5);
        } else {
            document.getElementById('smith-container').classList.remove('visible');
            setTimeout(() => {
                setIsVisible(false);
            }, 5);
        }
    };

    const joinRoom = async () => {
        if (!isUserJoined) {
            setIsUserJoined(true);
            await connection.invoke("JoinRoomChatCustomer", { userID: room.userID, roomID: room.id });
            connection.on("ReceiveMessageChat", (message) => {
                console.log(message);
                setMessages((messages) => [...messages, message]);
            });
        }
        else {
            setIsUserJoined(false);
        }
    }

    const sendMessage = async () => {
        if (!message || message === "") return;
        await connection.invoke("SendMessage", message);
        setMessage("");
    }

    const getMessages = async () => {
        await axiosInstance.get("Chat/get-message-by-room", { params: { roomID: room?.id } }).then((response) => {
            const result = response.data;
            if (!result) return;
            else if (result.data && result.data.length > 0) {
                setMessages((messages) => [...messages, ...result.data]);
                joinRoom();
            }
        }).catch((error) => console.log(error));
    }

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            sendMessage();
        }
    };

    useEffect(() => {
        if (connection && room) {
            getMessages();
        }
    }, [connection, room]);

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <>
            {
                isVisible &&
                <div id="smith-container">
                    <div className="smith-chat-frame">
                        <div id="smith-chat-container">
                            <div className="smith-chat-header">
                                <p>Blossom Nails</p>
                                <FontAwesomeIcon icon={faXmark} onClick={() => setIsVisible(false)} />
                            </div>
                            <div className="message-wrap">
                                <div className="text-box-sender">
                                    {
                                        messages && messages.length > 0 &&
                                        messages.map((item, index) => {
                                            const showAvatar = index === 0 || messages[index - 1].userID !== item.userID;
                                            return (
                                                <div key={index} className={item.userID !== userID ? "senderSays" : "userSays"}>
                                                    {
                                                        item.userID !== userID ? showAvatar ?
                                                            <img src={require("../../assets/images/logos/logo.png")} alt="avatar-logo" />
                                                            :
                                                            <div style={{ width: 40, height: 40 }} />
                                                            :
                                                            null
                                                    }

                                                    <div className="text">
                                                        <p className="m-0">{item?.message}</p>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                    <div ref={ref} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="smith-chat-bar">
                        {
                            isUserJoined
                                ?
                                <div className="smith-chat-bar-message">
                                    <input
                                        type="text"
                                        placeholder="Type your message"
                                        value={message}
                                        onChange={e => setMessage(e.target.value)}
                                        onKeyDown={handleKeyPress}
                                    />
                                    <button
                                        type="button"
                                        className="btn send-btn"
                                        onClick={sendMessage}
                                    >
                                        Send
                                    </button>
                                </div>
                                :
                                <button
                                    role="button"
                                    className="btn-join"
                                    onClick={joinRoom}
                                >Join conversation</button>
                        }
                    </div>
                </div>
            }

            <div id="launch" className="smith-launcher-frame" onClick={toggleVisibility}>
                <div className="smith-launcher">
                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                        viewBox="0 0 512.256 512.256">
                        <g transform="translate(-1)">
                            <g>
                                <g>
                                    <path d="M193.123,266.744c-11.776,0-21.333,9.557-21.333,21.333s9.557,21.333,21.333,21.333s21.333-9.557,21.333-21.333
				S204.899,266.744,193.123,266.744z"/>
                                    <path d="M278.456,266.744c-11.776,0-21.333,9.557-21.333,21.333s9.557,21.333,21.333,21.333s21.333-9.557,21.333-21.333
				S290.232,266.744,278.456,266.744z"/>
                                    <path d="M107.789,266.744c-11.776,0-21.333,9.557-21.333,21.333s9.557,21.333,21.333,21.333s21.333-9.557,21.333-21.333
				S119.565,266.744,107.789,266.744z"/>
                                    <path d="M506.885,337.001c-6.513-6.513-11.672-13.908-15.628-22.083c-7.715-15.942-10.273-33.007-9.73-47.561
				c20.811-26.105,31.607-54.246,31.607-85.939c0-88.441-84.11-149.333-192-149.333c-91.631,0-167.02,44.194-186.79,113.094
				C56.182,163.011,1.123,216.525,1.123,288.077c0,31.711,10.796,59.857,31.607,85.943c0.542,14.553-2.016,31.616-9.73,47.556
				c-3.956,8.175-9.116,15.57-15.628,22.083c-15.894,15.894,0.427,42.389,21.772,35.343c10.156-3.353,27.536-10.064,50.455-19.339
				c1.812-0.734,1.812-0.734,3.621-1.468c12.108-4.918,24.86-10.181,37.472-15.444c5.119-2.136,9.449-3.952,12.747-5.34h59.685
				c89.492,0,162.617-41.897,184.957-106.658h2.738c3.298,1.388,7.628,3.204,12.747,5.34c12.612,5.263,25.364,10.527,37.472,15.444
				c1.809,0.734,1.809,0.734,3.621,1.468c22.919,9.275,40.299,15.987,50.455,19.339C506.457,379.39,522.779,352.895,506.885,337.001
				z M193.123,394.744h-64c-2.856,0-5.683,0.573-8.313,1.686c-3.271,1.384-9.052,3.816-16.55,6.944
				c-11.502,4.8-23.119,9.599-34.228,14.123c5.005-17.612,6.207-34.916,5.032-50.441c-0.144-1.908-0.302-3.364-0.434-4.321
				c-0.561-4.075-2.288-7.902-4.974-11.018c-17.475-20.277-25.867-40.512-25.867-63.641c0-51.349,43.84-91.452,108.987-103.17
				c0.926-0.035,1.864-0.126,2.81-0.285c12.565-2.115,25.042-3.203,37.548-3.203c46.083,0,85.348,12.787,112.033,33.974
				c23.541,18.695,37.29,43.927,37.29,72.685c0,0.845-0.017,1.686-0.04,2.525c-0.164,4.558-0.764,9.338-1.816,14.733
				c-0.132,0.678-0.223,1.352-0.289,2.024C328.651,358.692,270.501,394.744,193.123,394.744z M444.594,245.068
				c-2.682,3.115-4.407,6.938-4.968,11.01c-0.132,0.957-0.289,2.413-0.434,4.321c-1.175,15.525,0.027,32.829,5.032,50.441
				c-11.109-4.524-22.726-9.323-34.228-14.123c-7.498-3.129-13.279-5.56-16.55-6.944c-2.63-1.113-5.457-1.686-8.313-1.686
				c0-42.842-19.737-79.219-52.352-105.342c-34.716-27.81-84.025-44-139.658-44c-3.414,0-6.803,0.062-10.168,0.183
				c21.669-38.669,73.586-64.174,138.178-64.174c86.748,0,149.333,45.31,149.333,106.667
				C470.467,204.528,462.074,224.765,444.594,245.068z"/>
                                </g>
                            </g>
                        </g>
                    </svg>
                </div>
            </div>
        </>
    )
}

export default Widget;