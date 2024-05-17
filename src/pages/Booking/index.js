import { useEffect, useState } from "react";
import DatePicker from "sassy-datepicker";
import { Timepicker } from 'react-timepicker';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import moment from 'moment';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import axiosInstance from "../../configs/axios";
import 'react-timepicker/timepicker.css';
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShieldHalved, faCircleInfo, faCheck, faClock, faUser, faBookmark, faCircleCheck, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { sumPrice } from "../../utils/sum";
import { combineDateTime, dateFormatter, getEndTime } from "../../utils/time";
library.add(faShieldHalved, faCircleInfo, faCheck, faClock, faUser, faBookmark, faCircleCheck, faSpinner);

const Booking = ({ connection }) => {
    const data = JSON.parse(localStorage.getItem("booking"));
    const [services, setServices] = useState([]);
    const [employees, setEmployees] = useState([]);
    const animatedComponents = makeAnimated();
    const [servicesSelected, setServicesSelected] = useState([]);
    const [active, setActive] = useState('');
    const [loading, setLoading] = useState(false);

    const steps = ["Select Time", "Choose Staff", "Information", "Check your booking", "Finish"];
    const stepsIcon = ["fa-clock", "fa-user", "fa-circle-info", "fa-bookmark", "fa-circle-check"];
    const [step, setStep] = useState(steps[0]);
    const [stepIcon, setStepIcon] = useState(stepsIcon[0]);

    // Object
    const [booking, setBooking] = useState(data);
    // Object

    useEffect(() => {
        if (!data) window.history.back();
        window.scrollTo(0, 0);
        getServices();
    }, []);

    const backToHome = () => {
        window.location.href = "/";
    }

    const handleSelectedValue = (e) => {
        setServicesSelected(e);
    }

    const handleSelectDate = newDate => {
        setBooking(prevBooking => ({ ...prevBooking, bookingDate: newDate }));
    }

    const handleSelectTime = (hoursSelected, minuteSelected) => {
        const startTime = new Date();
        startTime.setHours(hoursSelected, minuteSelected, 0);
        setBooking(prevBooking => ({ ...prevBooking, startTime: startTime.toLocaleTimeString("it-IT") }));
    }

    const handleNextToChooseEmployee = (event) => {
        if (!(Number(moment(booking?.bookingDate).format("DD")) >= Number(moment(new Date()).format("DD")))) {
            event.preventDefault();
            toast.error("You can not select a day before today!");
        }

        else if (Number(booking?.startTime.split(":")[0] < 9 || Number(booking?.startTime.split(":")[0] > 18))) {
            event.preventDefault();
            toast.error("We only work from 9:00AM to 18:00PM!");
        }
        else {
            getEmployees();
            window.scrollTo(0, 0);
        }
    }

    const handleChooseStaff = async (employeeID) => {
        setBooking(prevBooking => ({ ...prevBooking, nailTechnicianID: employeeID }));
        setActive(employeeID);
    }

    const handleNextToFillInformation = (event) => {
        if (booking.nailTechnicianID == null || booking.nailTechnicianID.length <= 0) {
            event.preventDefault();
            toast.error("Please choose staff.");
        }
        else {
            setStep("Information");
            setStepIcon("fa-circle-info");
            window.scrollTo(0, 0);
        }
    }

    const handleNextToCheckBooking = (event) => {
        if (booking?.customerName.length <= 0) {
            event.preventDefault();
            toast.error("Please input your name!");
        }
        else if (booking?.customerPhone.length <= 0 && booking?.customerPhone.length > 15) {
            event.preventDefault();
            toast.error("Please input correct number phone!");
        }
        else if (services.length <= 0) {
            event.preventDefault();
            toast.error("Please select at least 1 service!");
        }
        else {
            setBooking(prevBooking => ({ ...prevBooking, totalCost: sumPrice(servicesSelected), endTime: getEndTime(booking?.startTime, servicesSelected) }));
            setStep("Check your booking");
            setStepIcon("fa-bookmark");
            window.scrollTo(0, 0);
        }
    }

    const handleSkip = () => {
        setStep("Information");
        setStepIcon("fa-circle-info");
    }

    const handlePrevious = () => {
        switch (step) {
            case "Finish":
                setStep("Check your booking");
                setStepIcon("fa-bookmark");
                break;
            case "Check your booking":
                setStep("Information");
                setStepIcon("fa-circle-info")
                break;
            case "Information":
                setStep("Choose Staff");
                setStepIcon("fa-user");
                break;
            case "Choose Staff":
                setStep("Select Time");
                setStepIcon("fa-clock");
                setBooking(prevBooking => ({ ...prevBooking, nailTechnicianID: "" }));
                setActive('');
                break;
        }
    }

    const getServices = async () => {
        await axiosInstance.get("Service/services")
            .then((response) => {
                const result = response.data;
                if (!result) return;
                else if (result.success && result.data) {
                    result.data.map((item) => {
                        const service = {
                            'value': item.name,
                            'id': item.serviceID,
                            'label': item.name,
                            'price': item.price,
                            'periodTime': `${item.workingTime}m`
                        };
                        setServices(prevServices => [...prevServices, service]);
                    })
                }
            })
            .catch((error) => {
                toast.error("Services error!");
            })
    }

    const getEmployees = async () => {
        setLoading(true);
        await axiosInstance.get("Booking/employees-availability", {
            params:
            {
                startTime: booking?.startTime,
                bookingDate: dateFormatter(booking?.bookingDate, "DD-MM-YYYY")
            }
        })
            .then((response) => {
                const result = response.data;
                if (!result) return;
                else if (result.success && result.data) {
                    console.log(result.data);
                    setStep("Choose Staff");
                    setStepIcon("fa-user");
                    setEmployees(result.data);
                }
                else toast.error(result.message);
            })
            .catch((error) => {
                toast.error("Employees error!");
            }).finally(() => setTimeout(() => setLoading(false), 300));
    }

    const addServiceToBooking = async () => {
        setLoading(true);
        const requests = servicesSelected.map(e => ({
            bookingID: booking?.bookingID,
            serviceID: e.id,
            serviceCost: e.price
        }));
        await axiosInstance.post("Booking/add-service-to-booking", { requests }).then((response) => {
            const result = response.data;
            if (!result) return;
        }).catch((error) => console.log(error)).finally(() => setTimeout(() => setLoading(false), 300));
    }

    const handleFinish = async () => {
        setLoading(true);
        const id = toast.loading("Checking your appointment...");
        if (booking?.bookingID <= 0) {
            toast.update(id, { render: "Please reload your page and choose again your appointment.", type: "warning", isLoading: false });
            return;
        }
        await axiosInstance.put(`Booking/update-booking/${booking?.bookingID}`, booking).then(async (response) => {
            const result = response.data;
            if (!result) return;
            else if (result.success) {
                setStep("Finish");
                setStepIcon("fa-circle-check");
                toast.update(id, { render: "All is good. Congratulation!", type: "success", isLoading: false });
                window.localStorage.removeItem("booking");
                window.scrollTo(0, 0);
                await addServiceToBooking();
                await connection.invoke("SendNotify", `You have a new booking! BookingID ${booking?.bookingID}`, "booking", booking?.bookingID);
            }
            else {
                toast.update(id, { render: result.message, type: "error", isLoading: false });
            }
        }).catch((error) => {
            console.log(error);
            toast.update(id, { render: "Something went wrong!", type: "error", isLoading: false });
        }).finally(() => setLoading(false));
    }

    return (
        <section className='section-booking p-50 wide-70'>
            <h1 className="text-center pb-40">Booking</h1>

            <ul className='steps'>
                {
                    steps.map((item, index) => {
                        return (
                            <li key={index} className={step == item ? "is-active" : null}>{item}</li>
                        )
                    })
                }
            </ul>

            <ul className='steps mobile'>
                {
                    stepsIcon.map((item, index) => {
                        return (
                            <li key={index} className={stepIcon == item ? "is-active" : null}>
                                <FontAwesomeIcon icon={`fa-solid ${item}`} />
                            </li>
                        )
                    })
                }
            </ul>

            <fieldset className={`field ${step === "Choose Staff" ? "is-active" : null}`}>
                <h4>Choose Staff</h4>
                <div className='row booking-calender'>
                    <div className='col-sm-12'>
                        <div style={{ width: "100%", textAlign: "center" }}>
                            <div className='choose-staff'>
                                {
                                    employees && employees.length > 0 ?
                                        employees.map((item, index) => {
                                            return (
                                                <button key={index} className={`btn-staff ${active == item?.employeeID && 'active'}`} disabled={item?.isBusy} onClick={() => handleChooseStaff(item?.employeeID)}>
                                                    <img src={`https://i2.wp.com/vdostavka.ru/wp-content/uploads/2019/05/no-avatar.png?fit=512%2C512&ssl=1`} alt='' />
                                                    <span>{item.lastname + " " + item.firstname}</span>
                                                    <span className='error'>{item?.isBusy ? `Busy!` : null}</span>
                                                    {
                                                        active == item?.employeeID && <FontAwesomeIcon icon="fa-solid fa-check" />
                                                    }
                                                </button>
                                            )
                                        })
                                        :
                                        "Please wait..."
                                }
                            </div>
                            <Link className='skip' onClick={handleSkip}><i>Click here to skip this part</i></Link>
                        </div>
                    </div>

                    <div className='btn-change'>
                        <button className='btn-previous' onClick={handlePrevious}>Previous</button>
                        <button className='btn-next' onClick={handleNextToFillInformation}>Next</button>
                    </div>

                </div>
            </fieldset>

            <fieldset className={`field ${step === "Select Time" ? "is-active" : null}`}>
                <h4>Select Time</h4>
                <div className='row m-0 booking-calender'>
                    <div className='col-sm-12'>
                        <DatePicker onChange={handleSelectDate} value={new Date(booking?.bookingDate)} />

                        <div className='timepicker-div'>
                            <Timepicker hours={0} minutes={0} onChange={handleSelectTime} />
                        </div>
                    </div>
                </div>

                <div className='btn-change'>
                    <button className='btn-next' onClick={handleNextToChooseEmployee}>
                        {
                            loading ?
                                <FontAwesomeIcon icon="fa-solid fa-spinner" />
                                :
                                "Next"
                        }
                    </button>
                </div>
            </fieldset>

            <fieldset className={`field ${step === "Information" ? "is-active" : null}`}>
                <h4>Information</h4>
                <div className='booking-calender'>
                    <form>
                        <p>Please enter your information below</p>
                        <div className="row m-0" style={{ gap: 20 }}>
                            <input
                                className="col-4"
                                type='text'
                                placeholder='Full Name'
                                value={booking?.customerName}
                                onChange={(e) => setBooking(prevBooking => ({ ...prevBooking, customerName: e.target.value }))}
                            />
                            <input
                                className="col-4"
                                type='tel'
                                placeholder='Number Phone'
                                value={booking?.customerPhone}
                                onChange={(e) => setBooking(prevBooking => ({ ...prevBooking, customerPhone: e.target.value }))}
                            />
                            <input
                                className="col-4"
                                type='text'
                                disabled
                                defaultValue={`${moment(booking?.bookingDate).format("DD-MM-YYYY")} ${booking?.startTime}`}
                                placeholder='Please select the time above'
                            />
                        </div>

                        <div className='row service-select'>
                            <div className='col-4'>
                                <Select
                                    closeMenuOnSelect={false}
                                    components={animatedComponents}
                                    isMulti
                                    options={services}
                                    placeholder="Select one..."
                                    onChange={handleSelectedValue}
                                />
                            </div>

                            <div className='col-8'>
                                <p>Your services selected</p>

                                <ul className="p-0">
                                    {servicesSelected && servicesSelected.length > 0 ?
                                        servicesSelected.map((item, index) => {
                                            return (
                                                <li key={index} className="m-0">
                                                    {item.label} ${services.find(x => x.id == item.id)?.price} - {services.find(x => x.id == item.id)?.periodTime}
                                                </li>
                                            )
                                        })
                                        :
                                        (<li className='no-selected m-0'>There aren't any services selected</li>)
                                    }
                                </ul>
                            </div>
                        </div>

                        <textarea rows={7} placeholder='Notes' onChange={(e) => setBooking(prevBooking => ({ ...prevBooking, notes: e.target.value }))} />
                    </form>
                </div>

                <div className='btn-change'>
                    <button className='btn-previous' onClick={handlePrevious}>Previous</button>
                    <button className='btn-next' onClick={handleNextToCheckBooking}>
                        {
                            loading ?
                                <FontAwesomeIcon icon="fa-solid fa-spinner" />
                                :
                                "Next"
                        }
                    </button>
                </div>
            </fieldset>

            <fieldset className={`field ${step === "Check your booking" ? "is-active" : null}`}>
                <div className='row booking-calender'>
                    <div className='col-sm-12 booking-confirmed'>
                        <div className='col-7'>
                            <h4><i className='bx bxs-check-square' ></i> Booking Confirmed</h4>
                            <p className='p-confirmed'>
                                <img src="https://cdn-icons-png.flaticon.com/512/4974/4974985.png" alt='' />
                                <p>A beautician will be assigned <b>1 hour</b> before the schedule time</p>
                            </p>
                            <div className='time-confirmed'>
                                <div>
                                    <span>Your schedule will start at</span>
                                    <p>{moment(booking?.bookingDate).format("dddd, MMM Do YYYY")}</p>
                                </div>
                                <button onClick={() => setStep("Select Time")}>Re-schedule</button>
                            </div>
                        </div>

                        <div className='col-4'>
                            <h5>Payment Summary</h5>

                            <ul className='service-confirmed'>
                                {
                                    servicesSelected && servicesSelected.length > 0 ?
                                        servicesSelected.map((item, index) => {
                                            return (
                                                <li key={index}>
                                                    {
                                                        services && services.length > 0 ?
                                                            (
                                                                <p className="m-0">
                                                                    {services.find(value => value.id === item.id)?.label}:
                                                                    <span>
                                                                        €{services.find(value => value.id === item.id)?.price}
                                                                    </span>
                                                                </p>
                                                            )
                                                            :
                                                            null
                                                    }
                                                </li>
                                            )
                                        })
                                        :
                                        null
                                }
                            </ul>

                            <p className='total-price'>Total price: <span>€{booking?.totalCost}</span></p>

                            <div className='btn-change'>
                                <button className='btn-previous' onClick={handlePrevious}>Previous</button>
                                <button className='btn-next' onClick={handleFinish}>
                                    {
                                        loading ?
                                            <FontAwesomeIcon icon="fa-solid fa-spinner" />
                                            :
                                            "Finish"
                                    }
                                </button>
                            </div>
                        </div>

                        <div className='col-7 other service-checklist' onClick={handlePrevious}>
                            <div>
                                <h6>Service Checklist</h6>
                                <span>See what all you should know or do while the beautician serve you.</span>
                            </div>
                            <i className='bx bx-chevron-right' style={{ fontSize: "24px" }}></i>
                        </div>

                        <div className='col-4 other' style={{ color: "rgb(78 114 211)" }}>
                            <FontAwesomeIcon icon="fa-solid fa-shield-halved" style={{ fontSize: 38 }} />
                            <p style={{ fontSize: "14px", width: "70%" }} className="m-0">Your request is eligible for UrbanClop Insurance Program.</p>
                            <FontAwesomeIcon icon="fa-solid fa-circle-info" style={{ fontSize: 20, color: 'rgba(0, 0, 0, 0.3)' }} />
                        </div>

                        <div className='col-7 other'>
                            <div>
                                <h6>Need our help?</h6>
                                <span>Call us in case you face any issue in our service.</span>
                            </div>
                            <a href='tel:+442380613526' style={{ color: "rgb(211 82 82)" }}>
                                <i className='bx bxs-phone' ></i>
                                +44 23 8061 3526
                            </a>
                        </div>
                    </div>
                </div>
            </fieldset>

            <fieldset className={`field ${step === "Finish" ? "is-active" : null}`}>
                <h4>Finish</h4>
                <div className='booking-calender'>
                    <div className='row finish'>
                        <div className="firework"></div>
                        <div className="firework"></div>
                        <div className="firework"></div>

                        <div className='col-5'>
                            <i className='bx bxs-check-circle' ></i>
                            <p>BOOKING ID: {booking?.bookingID}</p>
                            <h5>You Successfully created your booking</h5>
                            <span onClick={backToHome}><i className='bx bxs-home' ></i> Back to home</span>
                        </div>
                    </div>
                </div>
            </fieldset>
        </section >
    )
}

export default Booking;