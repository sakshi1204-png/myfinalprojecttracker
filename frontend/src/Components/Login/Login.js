import React, { useState } from "react";
import { useLogin } from "../../hook/useLogin";
import { Link, useNavigate } from "react-router-dom";
import loginImage from "../Login/loginImage.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { loginIcon } from "../../utils/Icons";
import { useSignup } from "../../hook/useSignup";
import { auth } from "../../FirebaseConfig";
import axios from "axios";

const Login = () => {
  const { login, error, isLoading } = useLogin();
  const { signup } = useSignup();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  const checkUser = async (email) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/user/${email}/`);
      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error.message);
      return false;
    }
  };

  const passwordGenerator = () => "PasswordForFirebase*123";

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
  };

  const handleLogin = () => {
    navigate('/Dashboard');
  };

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        setUser(null);
        navigate("/Login"); 
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={{ flex: 1, backgroundColor: "#2A2746", overflow: "auto", maxHeight: "100vh" }}>
      <div style={{ display: "flex", height: "100vh", backgroundColor: "lightgray", overflow: "auto" }}>
        <div style={{ display: "flex", flexDirection: "column", flex: 2 }}>
          <div style={{ flex: 1, backgroundColor: "lightgray", height: "100vh" }}>
            <img src={loginImage} alt="Sample" style={{ width: "100%", height: "99%"}} />
          </div>
        </div>
        {/* , objectFit: "cover"  */}

        <div style={{ flex: 1, backgroundColor: "#2A2746", borderTopLeftRadius: "80px", borderBottomLeftRadius: "80px" }}>
          <div className="flex h-full items-center justify-center" style={{ backgroundColor: '#fcf5ff' }}>
            <div className="flex-1 max-w-md p-8 bg-transparent shadow-black rounded-lg shadow-2xl " style={{ backgroundColor: "black" }}> 
              <form className="login" onSubmit={handleSubmit}>
                <h3 className="text-6xl font-bold text-white text-center mb-4">Log In</h3>
                <p className="text-lg font-light text-white text-center mb-4">Get started with Personal Finance Tracker</p>
                <label htmlFor="email" className="text-white text-2xl mb-8 mt-7">Email</label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="w-full p-2 pl-10 border rounded-md mb-4 mt-4 text-black"
                    placeholder="Email"
                  />
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <FontAwesomeIcon icon={faUser} className="text-gray-400" />
                  </div>
                </div>
                <label htmlFor="password" className="text-white text-2xl mb-8 mt-7">
                  Password
                  <span>
                    <FontAwesomeIcon
                      icon={showPassword ? faEye : faEyeSlash}
                      className="text-gray-400 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    />
                  </span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="w-full mt-4 mb-6 p-2 pl-10 border rounded-md text-black"
                    placeholder="Password"
                  />
                  <div className="absolute inset-y-0 left-0 pl-2 flex items-center pointer-events-none">
                    <FontAwesomeIcon
                      icon={faLock}
                      className="text-gray-400 cursor-pointer"
                    />
                  </div>
                </div>
                <button
                  disabled={isLoading}
                  className={`w-full mb-4 mt-4 p-2 bg-blue-500 text-white font-bold rounded-md
          transition-transform transform hover:scale-125
          ${isLoading ? "bg-blue-300 cursor-not-allowed" : "hover:bg-blue-700"}`}
                >
                  {loginIcon} Log in
                </button>
                {error && <div className="text-red-500">{error}</div>}
                <hr className="my-4" />
                <p className="text-white">or create new account</p>
                <Link to="/signup">
                  <button className="w-full mb-4 mt-4 h-12 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-700 transition-transform transform hover:scale-125">
                    Sign Up
                  </button>
                </Link>
              </form>
              <div>
                {user ? (
                  <>
                    <button
                      className="w-full mb-4 mt-4 p-2 bg-red-500 text-white font-bold rounded-md hover:bg-green-700 transition-transform transform hover:scale-125"
                      onClick={handleLogout}
                    >
                      LOGOUT
                    </button>
                    <h3 className="text-white">Welcome {user.displayName}</h3>
                    <p className="text-white">{user.email}</p>
                    <div className="flex justify-center">
                      <img src={user.photoURL} alt={user.displayName} referrerPolicy="no-referrer" />
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
