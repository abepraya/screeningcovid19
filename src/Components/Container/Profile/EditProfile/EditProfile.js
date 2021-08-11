import React, { useContext, useEffect, useRef, useState } from "react";
import "./EditProfile.css";
import { useHistory, useParams } from "react-router-dom";
import { EditData } from "../../../Models/EditData";
import axios from "axios";
import Modal from "../../../../assets/Modal/Modal";
import AuthContext from "../../../../Store/auth-context";
import Moment from "moment";
import Aos from 'aos';
import 'aos/dist/aos.css';

const EditProfile = (props) => {
  const [userData, setUserData] = useState({
    nik: "",
    ktp: "",
    fName: "",
    lName: "",
    gender: "",
    dob: "",
    email: "",
    address: "",
    phoneNumber: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef();
  const authCtx = useContext(AuthContext);
  let { userId } = useParams();
  const history = useHistory();
  const triggerInputSelect = () => inputRef.current?.focus();

  useEffect(() => {
    Aos.init({duration: 1000});
    getDataUser();
  }, []);

  async function getDataUser() {
    try {
      const token = authCtx.token;
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get("/account/get-user/profile", {
        headers,
      });
      if (response.status === 200 || response.status === 202) {
        let content = await response.data.data;

        let firstName = content.full_name.split(" ").slice(0, -1).join(" ");
        let lastName = content.full_name.split(" ").slice(-1).join(" ");
        console.log("DATA EDIT: " + JSON.stringify(content));
        setUserData({
          ...userData,
          nik: content.nik_number,
          ktp: content.ktp_number,
          email: content.email,
          address: content.address,
          fName: firstName,
          lName: lastName,
          gender: content.gender,
          dob: content.birth_date,
          phoneNumber: content.msisdn,
        });
      } else {
        throw new Error(response);
      }
    } catch (error) {
      alert(error.message);
    }
  }

  async function submitHandler(event) {
    try {
      if (window.confirm("Are You Sure ?")) {
        event.preventDefault();
        setIsLoading(true);
        //const updateData = new EditData(oldNik, oldFname, oldLname, oldGender, oldDob, oldEmail, oldPassword);
        const bodyFormData = new FormData();
        bodyFormData.append("nik", userData.nik);
        bodyFormData.append("ktpNumber", userData.ktp);
        bodyFormData.append("name", userData.fName + " " + userData.lName);
        bodyFormData.append("gender", userData.gender);
        bodyFormData.append("birthDate", userData.dob);
        bodyFormData.append("msisdn", userData.phoneNumber);
        bodyFormData.append("address", userData.address);
        bodyFormData.append("email", userData.email);
        bodyFormData.append("password", userData.password);
        for (var pair of bodyFormData.entries()) {
          console.log(pair[0] + " - " + pair[1]);
        }

        const token = authCtx.token;
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.put(
          "/account/update-profile",
          bodyFormData,
          { headers }
        );
        if (response.status === 200 || response.status === 202) {
          console.log("BERHASIL !!" + response.data);
          setIsLoading(false);
          let path = `/profile`;
          history.push(path);
          setUserData({
            ...userData,
            nik: userData,
            ktp: userData.ktp,
            address: userData.address,
            dob: userData.dob,
            email: userData.email,
            fName: userData.fName,
            lName: userData.lName,
            gender: userData.gender,
            password: userData.password,
            phoneNumber: userData.phoneNumber,
          });
        } else {
          setIsLoading(false);
          throw new Error(response);
        }
      }
    } catch (error) {
      alert("Error Submit: " + error.message);
    }
  }

  function routeBackHandler() {
    let path = `/profile`;
    history.push(path);
  }

  let dateOfBirthFormat = Moment(userData.dob).format("yyyy-MM-DD");


  return (
    <header className="profiles" data-aos="fade-left">
      <form className="Form-editProfile">
        <div className="Field">
          <h3 className="text-center">Edit Profile</h3>
          <div className="form-group">
            <label>NIK</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter NIK"
              value={userData.nik}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  nik: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label>KTP</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter KTP"
              value={userData.ktp}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  ktp: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label>First name</label>
            <input
              type="text"
              className="form-control"
              placeholder="First name"
              value={userData.fName}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  fName: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label>Last name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              value={userData.lName}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  lName: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="number"
              className="form-control"
              placeholder="Phone Number"
              value={userData.phoneNumber}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  phoneNumber: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label>Gender</label>
            <br />
            <select
              className="form-control"
              value={userData.gender}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  gender: e.target.value,
                })
              }
            >
              <option value="SELECT">- Select -</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label>Address</label>
            <input
              type="text"
              className="form-control"
              placeholder="Address"
              value={userData.address}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  address: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label>Date of Birth</label>
            <br />
            <input
              type="date"
              className="form-control"
              placeholder="Date of Birth"
              value={userData.dob}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  dob: e.target.value,
                })
              }
            />
          </div>
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={userData.email}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  email: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={userData.password}
              onChange={(e) =>
                setUserData({
                  ...userData,
                  password: e.target.value,
                })
              }
            required
            />
          </div>

          <div className="multiple-button">
            {isLoading ? (
              <>
                <button
                  className="btn-edit btn btn-primary btn-block"
                  type="submit"
                  disabled
                >
                  <span
                    className="spinner-border spinner-border-sm"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Loading...
                </button>
              </>
            ) : (
              <button
                type="submit"
                className="btn-edit btn btn-primary btn-block"
                onClick={submitHandler}
              >
                Save
              </button>
            )}
            <button
              type="submit"
              className="btn-edit btn btn-danger btn-block"
              onClick={routeBackHandler}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </header>
  );
};

export default EditProfile;
