import axios from "axios";
import React, { useEffect } from "react";
import { API_BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeeds } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((state) => state.feed);
  const dispatch = useDispatch();

  const getFeeds = async () => {
    if (feed) return;

    try {
      const response = await axios.get(API_BASE_URL + "/feed", {
        withCredentials: true,
      });

      dispatch(addFeeds(response?.data?.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getFeeds();
  }, []);

  if (!feed) return;

  if (feed.length === 0) {
    return (
      <h2 className="text-center my-10 text-xl font-bold">No feed found</h2>
    );
  }
  return (
    feed && (
      <div className="flex justify-center my-10">
        <UserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
