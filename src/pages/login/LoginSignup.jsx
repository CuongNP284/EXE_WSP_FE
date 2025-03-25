import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGooglePlusG } from '@fortawesome/free-brands-svg-icons';

const LoginSignup = () => {
    const [isRightPanelActive, setIsRightPanelActive] = useState(false);
    const [btnScaled, setBtnScaled] = useState(false);

    const [signinData, setSigninData] = useState({ email: '', password: '' });
    const [signupData, setSignupData] = useState({ name: '', email: '', password: '' });

    const handleSigninChange = (e) => {
        const { name, value } = e.target;
        setSigninData({ ...signinData, [name]: value });
    };

    const handleSignupChange = (e) => {
        const { name, value } = e.target;
        setSignupData({ ...signupData, [name]: value });
    };

    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const handleToggle = () => {
        setIsRightPanelActive(!isRightPanelActive);
        setMessage(null);

        // Trigger the button scale animation
        setBtnScaled(false);
        requestAnimationFrame(() => {
            setBtnScaled(true);
        });
    };

    const handleSignin = async (e) => {
        e.preventDefault();
        try {
            console.log("Login attempt with:", signinData);

            // Giả lập đăng nhập thành công
            if (signinData.email && signinData.password) {
                localStorage.setItem('token', 'fake-token');
                localStorage.setItem('userId', '123');
                localStorage.setItem('userRole', 'USER'); // Giả lập role

                await Swal.fire({
                    title: "Success",
                    text: "Login successful!",
                    icon: "success"
                });

                navigate('/');
            } else {
                Swal.fire("Error", "Please enter valid email and password", "error");
            }
        } catch (error) {
            console.error("Login error:", error);
            Swal.fire("Error", "Unable to log in user", "error");
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            // Giả lập đăng ký thành công
            if (signupData.name && signupData.email && signupData.password) {
                await Swal.fire("Success", "User Successfully Registered, Now Please Sign In", "success");
                navigate("/login");
            } else {
                Swal.fire("Error", "Please fill in all fields", "error");
            }
        } catch (error) {
            Swal.fire("Error", "Unable to register user", "error");
        }
    };

    return (
        <div
            className={`absolute w-[850px] h-[500px] bg-white shadow-2xl rounded-xl overflow-hidden top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ${isRightPanelActive ? "right-panel-active" : ""}`}
            id="container"
        >
            {/* Sign Up Form */}
            <div
                className={`absolute w-3/5 h-full p-0 px-10 transition-all duration-600 ease-in-out ${isRightPanelActive ? "translate-x-[66.7%] opacity-100 z-10 animate-show" : "opacity-0 z-1"} sign-up-container`}
            >
                <form
                    className="h-full flex flex-col items-center justify-center px-12"
                    onSubmit={handleSignup}
                >
                    <h1 className="text-[#141E30] text-3xl font-bold">Create Account</h1>
                    <div className="my-5">
                        <a
                            href="#"
                            className="border border-gray-300 rounded-full inline-flex justify-center items-center mx-1 h-10 w-10"
                        >
                            <FontAwesomeIcon icon={faGooglePlusG} />
                        </a>
                    </div>
                    <span className="text-xs">or use your email for registration</span>
                    <div className="relative my-2 w-full">
                        <input
                            className="w-full p-3 bg-gray-100 border-none outline-none"
                            type="text"
                            name="name"
                            placeholder="Name"
                            value={signupData.name}
                            onChange={handleSignupChange}
                            required
                        />
                    </div>
                    <div className="relative my-2 w-full">
                        <input
                            className="w-full p-3 bg-gray-100 border-none outline-none"
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={signupData.email}
                            onChange={handleSignupChange}
                            required
                        />
                    </div>
                    <div className="relative my-2 w-full">
                        <input
                            className="w-full p-3 bg-gray-100 border-none outline-none"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={signupData.password}
                            onChange={handleSignupChange}
                            required
                        />
                    </div>
                    <button
                        className="mt-4 rounded-full border border-[#0A1338] bg-[#0A1338] text-white text-xs font-bold py-3 px-11 uppercase tracking-wider transition-all duration-75 hover:bg-white hover:text-[#141E30]"
                    >
                        Sign Up
                    </button>
                </form>
            </div>

            {/* Sign In Form */}
            <div
                className={`absolute w-3/5 h-full p-0 px-10 transition-all duration-600 ease-in-out ${isRightPanelActive ? "-translate-x-1/5" : ""} z-2 sign-in-container`}
            >
                <form
                    className="h-full flex flex-col items-center justify-center px-12"
                    onSubmit={handleSignin}
                >
                    <h1 className="text-[#141E30] text-3xl font-bold">Sign in</h1>
                    {message && <p className="message">{message}</p>}
                    <div className="my-5">
                        <a
                            href="#"
                            className="border border-gray-300 rounded-full inline-flex justify-center items-center mx-1 h-10 w-10"
                        >
                            <FontAwesomeIcon icon={faGooglePlusG} />
                        </a>
                    </div>
                    <span className="text-xs">or use your account</span>
                    <div className="relative my-2 w-full">
                        <input
                            className="w-full p-3 bg-gray-100 border-none outline-none"
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={signinData.email}
                            onChange={handleSigninChange}
                            required
                        />
                    </div>
                    <div className="relative my-2 w-full">
                        <input
                            className="w-full p-3 bg-gray-100 border-none outline-none"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={signinData.password}
                            onChange={handleSigninChange}
                            required
                        />
                    </div>
                    <button
                        className="mt-4 rounded-full border border-[#0A1338] bg-[#0A1338] text-white text-xs font-bold py-3 px-11 uppercase tracking-wider transition-all duration-75 hover:bg-white hover:text-[#141E30]"
                    >
                        Sign In
                    </button>
                </form>
            </div>

            {/* Overlay Container */}
            <div
                className={`absolute top-0 left-3/5 w-2/5 h-full overflow-hidden transition-transform duration-600 ease-in-out z-10 ${isRightPanelActive ? "-translate-x-[150%]" : ""}`}
                id="overlayCon"
            >
                <div
                    className={`relative bg-[#0A1338] text-white -left-[150%] h-full w-[250%] transition-transform duration-600 ease-in-out ${isRightPanelActive ? "translate-x-1/2" : ""}`}
                >
                    {/* Overlay Left (For Returning Users) */}
                    <div
                        className={`absolute flex items-center justify-center flex-col px-10 text-center h-full w-[340px] transition-all duration-600 ease-in-out ${isRightPanelActive ? "translate-x-[25%]" : "-translate-x-[12%]"} right-[60%]`}
                    >
                        <h1 className="text-gray-100 text-3xl font-bold">Welcome!</h1>
                        <p className="text-sm font-light leading-5 tracking-wide my-6 mx-0">
                            To keep connected with us please login with your personal info
                        </p>
                        <button
                            onClick={handleToggle}
                            className="border-none bg-transparent text-white text-xs font-bold py-3 px-11 uppercase tracking-wider"
                        >
                            Sign In
                        </button>
                    </div>

                    {/* Overlay Right (For New Users) */}
                    <div
                        className={`absolute flex items-center justify-center flex-col px-10 text-center h-full w-[340px] transition-all duration-600 ease-in-out ${isRightPanelActive ? "translate-x-[35%]" : "translate-x-0"} right-0`}
                    >
                        <h1 className="text-gray-100 text-3xl font-bold">Hello, Friend!</h1>
                        <p className="text-sm font-light leading-5 tracking-wide my-6 mx-0">
                            Enter your personal details and start your journey with us
                        </p>
                        <button
                            onClick={handleToggle}
                            className="border-none bg-transparent text-white text-xs font-bold py-3 px-11 uppercase tracking-wider"
                        >
                            Sign Up
                        </button>
                    </div>
                </div>

                {/* Overlay Button */}
                <button
                    id="overlayBtn"
                    className={`absolute left-1/2 top-[295px] transform -translate-x-1/2 w-[143.67px] h-10 border border-white bg-transparent rounded-full cursor-pointer ${btnScaled ? "animate-scaleBtn" : ""}`}
                    onClick={handleToggle}
                ></button>
            </div>
        </div>
    );
};

export default LoginSignup;