import axios from "axios";
import { API_BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, filterRequest } from "../utils/requestSlice";
import { useEffect } from "react";

const Request = () => {
  const requests = useSelector((state) => state.request);
  const dispatch = useDispatch();

  const getRequests = async () => {
    if (requests) return; // If requests are already fetched, do not fetch again
    try {
      const response = await axios.get(
        API_BASE_URL + "/user/requests/received",
        {
          withCredentials: true,
        }
      );
      console.log(response?.data?.data);
      dispatch(addRequest(response?.data?.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  if (!requests) return;

  if (requests.length === 0) {
    return (
      <h2 className="text-center my-10 text-xl font-bold">No requests found</h2>
    );
  }

  const handleRequest = async (status, requestId) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/request/review/${status}/${requestId}`,
        {},
        { withCredentials: true }
      );
      dispatch(filterRequest({ _id: requestId }));
    } catch (error) {}
  };

  return (
    <>
      <div className="flex-col justify-items-center text-center my-10">
        <h1 className="text-xl font-bold">Requests</h1>
        {requests &&
          requests.map((request) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } =
              request?.fromUserId;
            return (
              <div
                key={_id}
                className="m-4 p-4 flex bg-base-200 shadow-sm rounded-lg w-1/2"
              >
                <div className="w-24 h-24">
                  <img
                    className="rounded-lg object-cover w-full h-full"
                    src={photoUrl}
                    alt="user image"
                  />
                </div>
                <div className="flex-col flex-1 text-left">
                  <div className="px-4 text-md font-bold">
                    {firstName + " " + lastName}
                  </div>
                  <div className="px-4 py-1 text-sm">{age + ", " + gender}</div>
                  <div className="px-4 py-1 text-xs">{about}</div>
                </div>
                <div className="flex flex-1 items-center justify-end">
                  <button
                    className="btn btn-active btn-sm btn-primary mx-2"
                    onClick={() => handleRequest("accepted", request?._id)}
                  >
                    Accept
                  </button>
                  <button
                    className="btn btn-active btn-sm btn-secondary mx-2"
                    onClick={() => handleRequest("rejected", request?._id)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Request;
