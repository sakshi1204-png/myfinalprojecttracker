import React, { useState } from "react";
import { useSignup } from "../../hook/useSignup";
import { Link, useNavigate } from 'react-router-dom';
import LoginFooter from '../Footer/LoginFooter';
import { email2, password2, signup2, loginIcon } from "../../utils/Icons";

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signup, error, isLoading } = useSignup();
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const [reenteredPassword, setReenteredPassword] = useState('');
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setPasswordMatchError('');

    if (password !== reenteredPassword) {
      setPasswordMatchError("Passwords do not match");
    } else if (password.length < 6) {
      setPasswordMatchError("Password must be at least 6 characters long");
    } else {
      const success = await signup(email, password); // Await the signup process
      if (success) {
        // Navigate to login after a successful signup
        navigate("/login");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <div className="flex-grow flex justify-center items-center">
        <div className="bg-white shadow-lg p-8 rounded-lg w-full max-w-md border border-gray-300 mt-8">
          <h2 className="text-3xl font-semibold text-gray-800 text-center mb-4">Create Account</h2>
          <h3 className="text-xl font-medium text-gray-600 text-center mb-6">Sign Up</h3>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">{email2} Email address:</label>
              <input
                type="email"
                placeholder="Email or Username"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">{password2} Password:</label>
              <input
                type="password"
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">{password2} Re-enter Password:</label>
              <input
                type="password"
                placeholder="Re-enter Password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setReenteredPassword(e.target.value)}
                value={reenteredPassword}
              />
            </div>
            
            {passwordMatchError && <div className="text-red-500 text-sm mt-2">{passwordMatchError}</div>}
            {/* <Link to="/login"> */}

            <button
              disabled={isLoading}
              className="w-full bg-blue-500 text-white font-semibold p-3 rounded-lg hover:bg-blue-600 transition duration-200 mt-4"
              type="submit"
            >
              {signup2} Sign up
            </button>
            {/* </Link> */}


            {error && <div className="text-red-500 text-sm mt-2">{error}</div>}
          </form>

          <hr className="my-6 border-gray-300" />

          <div className="text-center mt-4">
            <p className="text-gray-600">Already have an account?</p>
            <Link to="/login">
              <button className="mt-2 w-full bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold p-3 rounded-lg transition duration-200">
                {loginIcon} Back to Login
              </button>
            </Link>
          </div>
        </div>
      </div>

      <footer className="mt-12">
        <LoginFooter />
      </footer>
    </div>
  );
}

export default Signup;
