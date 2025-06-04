import axios from "axios";
import React from "react";
import { API_BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { filterFeeds } from "../utils/feedSlice";

const UserCard = ({ user }) => {
  const dispatch = useDispatch();
  const { _id, firstName, lastName, photoUrl, about, age, gender } = user;

  const handleSendRequest = async (status, id) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/request/send/${status}/${id}`,
        {},
        { withCredentials: true }
      );
      dispatch(filterFeeds(_id));
    } catch (error) {
      console.log(error.message || "something went wrong");
    }
  };

  return (
    <div className="card bg-base-300 w-96 shadow-sm">
      <figure className="px-10 pt-10">
        <img src={photoUrl} alt="user photo" className="rounded-xl w-48 h-48" />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{`${firstName} ${lastName}`}</h2>
        {age && gender && <h4 className="card-title">{`${age}, ${gender}`}</h4>}
        <p>{about}</p>
        <div className="card-actions">
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("ignored", _id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("interested", _id)}
          >
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
