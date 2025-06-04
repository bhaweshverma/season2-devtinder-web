import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_BASE_URL } from "../utils/constants";
import UserCard from "./UserCard";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [about, setAbout] = useState(user?.about || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const [gender, setGender] = useState(user?.gender || "male");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const handleSave = async () => {
    setError("");
    try {
      const response = await axios.patch(
        API_BASE_URL + "/profile/edit",
        { firstName, lastName, age, about, photoUrl, gender },
        { withCredentials: true }
      );

      dispatch(addUser(response?.data?.data));
      setShowToast(true);

      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (error) {
      setError(
        error?.response?.data || "Failed to update profile. Please try again."
      );
    }
  };

  return (
    user && (
      <>
        <div className="flex justify-center align-items-top my-10">
          <div className="card card-border bg-base-300 w-96">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>
              <label className="input">
                <span className="label">First Name</span>
                <input
                  type="text"
                  placeholder="first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </label>
              <label className="input">
                <span className="label">Last Name</span>
                <input
                  type="text"
                  placeholder="last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
              <label className="input">
                <span className="label">Age</span>
                <input
                  type="text"
                  placeholder="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </label>
              <label className="select">
                <span className="label">Gender</span>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option>male</option>
                  <option>female</option>
                  <option>others</option>
                </select>
              </label>
              <label className="input">
                <span className="label">Photo URL</span>
                <input
                  type="text"
                  placeholder="photo url"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </label>
              <textarea
                className="textarea"
                placeholder="about"
                value={about}
                onChange={(e) => setAbout(e.target.value)}
              ></textarea>
              {error && <p className="text-red-500">{error}</p>}
              <div className="card-actions justify-center my-2">
                <button className="btn btn-primary" onClick={handleSave}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
          <div className="mx-5">
            <UserCard
              user={{ firstName, lastName, age, gender, photoUrl, about }}
            />
          </div>
        </div>
        {showToast && (
          <div className="toast toast-top toast-end">
            <div className="alert alert-success">
              <span>Profile changes saved successfully.</span>
            </div>
          </div>
        )}
      </>
    )
  );
};

export default EditProfile;
