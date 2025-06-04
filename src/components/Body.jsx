import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const user = await axios.get(`${API_BASE_URL}/profile/view`, {
        withCredentials: true,
      });

      dispatch(addUser(user.data.data));
    } catch (error) {
      if (error.status === 401) {
        console.log("401 Unauthorized");
      }
      navigate("/login");
      console.log(error?.response?.data);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      <NavBar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
