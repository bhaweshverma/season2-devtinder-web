import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import { addConnection } from "../utils/connectionSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const Connection = () => {
  const connections = useSelector((state) => state.connection);
  const dispatch = useDispatch();

  const getConnections = async () => {
    //if (connections) return;
    try {
      const response = await axios.get(API_BASE_URL + "/user/connections", {
        withCredentials: true,
      });

      dispatch(addConnection(response?.data?.data));
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  useEffect(() => {
    getConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0)
    return (
      <h2 className="text-center my-10 text-xl font-bold">
        No connections found
      </h2>
    );

  return (
    <>
      <div className="flex-col justify-items-center text-center my-10">
        <h1 className="text-xl font-bold">Connections</h1>
        {connections &&
          connections.map((connection) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } =
              connection;
            return (
              <div
                key={_id}
                className="m-4 p-4 flex bg-base-200 shadow-sm rounded w-1/2"
              >
                <div className="w-24 h-24 ">
                  <img
                    className="rounded-full"
                    src={photoUrl}
                    alt="user image"
                  />
                </div>
                <div className="flex-col text-left">
                  <div className="px-4 py-1 text-md font-bold">
                    {firstName + " " + lastName}
                  </div>
                  <div className="px-4 py-1 text-sm">{age + ", " + gender}</div>
                  <div className="px-4 py-1 text-xs">{about}</div>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Connection;
