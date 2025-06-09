import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // if user is already logged-in, move to profile page
    if (user) {
      navigate("/profile");
    }
  }, []);

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/login`,
        {
          email,
          password,
        },
        {
          withCredentials: true, // Include credentials for CORS, without this token cookie wont be sent with request
        }
      );
      dispatch(addUser(res.data.data));
      navigate("/feed");
    } catch (error) {
      setError(error?.response?.data || "Login failed. Please try again.");
      console.log(error?.response?.data || "Login failed. Please try again.");
    }
  };

  const handleSignUp = async () => {
    try {
      const response = await axios.post(
        API_BASE_URL + "/signup",
        {
          firstName,
          lastName,
          email,
          password,
        },
        { withCredentials: true }
      );

      console.log(response?.data?.data);
      dispatch(addUser(response?.data?.data));
      navigate("/profile");
    } catch (error) {
      setError(error?.response?.data);
    }
  };

  return (
    <div className="flex justify-center my-10">
      <div className="card lg:card-side bg-base-100 shadow-sm w-1/2">
        <figure>
          <img
            src="/cassette.webp"
            alt="Album"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{isLoginForm ? "Login" : "Sign up"}</h2>
          {!isLoginForm && (
            <>
              <label className="input validator">
                <span className="label">First Name</span>
                <input
                  type="text"
                  placeholder="first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <div className="validator-hint hidden">
                Enter valid first name
              </div>
              <label className="input validator">
                <span className="label">Last Name</span>
                <input
                  type="text"
                  placeholder="last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
              <div className="validator-hint hidden">Enter valid last name</div>
            </>
          )}
          <label className="input validator">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
              </g>
            </svg>
            <input
              type="email"
              placeholder="mail@site.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <div className="validator-hint hidden">Enter valid email address</div>
          <label className="input validator">
            <svg
              className="h-[1em] opacity-50"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeWidth="2.5"
                fill="none"
                stroke="currentColor"
              >
                <path d="M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z"></path>
                <circle cx="16.5" cy="7.5" r=".5" fill="currentColor"></circle>
              </g>
            </svg>
            <input
              type="password"
              required
              placeholder="Password"
              minLength="8"
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be more than 8 characters, including number, lowercase letter, uppercase letter"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <p className="validator-hint hidden">Enter valid password</p>
          {error && <p className="text-red-500">{error}</p>}
          <div className="card-actions justify-center my-2">
            <button
              className="btn btn-primary"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Login" : "Sign up"}
            </button>
          </div>
          <div
            className="card-actions justify-center my-2 cursor-pointer"
            onClick={() => {
              setIsLoginForm(!isLoginForm);
              setError("");
            }}
          >
            {isLoginForm
              ? "New user? Please sign up."
              : "Existing user? Please login."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
