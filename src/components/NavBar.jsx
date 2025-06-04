import React from "react";
import { useSelector } from "react-redux";
import { API_BASE_URL, DEFAULT_USER_AVATAR } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";
import { removeConnection } from "../utils/connectionSlice";
import { removeFeeds } from "../utils/feedSlice";
import { removeRequest } from "../utils/requestSlice";

const NavBar = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const removeAllState = () => {
    dispatch(removeUser());
    dispatch(removeConnection());
    dispatch(removeFeeds());
    dispatch(removeRequest());
  };

  const handleLogout = async () => {
    try {
      let response = await axios.post(
        API_BASE_URL + "/logout",
        {},
        {
          withCredentials: true,
        }
      );
      removeAllState();

      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="navbar bg-base-200 shadow-sm">
      <div className="flex-1">
        <Link to="/feed" className="btn btn-ghost text-xl">
          DevTinder
        </Link>
      </div>
      {user && (
        <div className="flex gap-2">
          <div className="p-2">{`Welcome, ${user.firstName}`}</div>
          <div className="dropdown dropdown-end mr-5">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="user logged-in image"
                  src={user.photoUrl || DEFAULT_USER_AVATAR}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <li>
                <Link to="/feed">Feed</Link>
              </li>
              <li>
                <Link to="/connection">Connections</Link>
              </li>
              <li>
                <Link to="/request">Requests</Link>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
