import axios from "axios";
import React, { useState, useEffect } from "react";
import { Header } from "../components";
import PopUp from "../components/Modal/PopUp";
import { useTranslation } from "react-i18next";
import { protectedRoute } from "../Contexts/ProtectedRoute";
import { useNavigate } from "react-router-dom";
const EditProfile = () => {
  const navigate = useNavigate();
  const currentuser = JSON.parse(localStorage.getItem("userDetails"));
  const [cvdHistory, setCvdHistory] = useState([])
  const [userId, setuserId] = useState(currentuser.email);
  // console.log(userId)
  const [userName, setuserName] = useState(currentuser.name);
  const [userEmail, setuserEmail] = useState(currentuser.email);
  const [userCat, setuserCat] = useState(currentuser.category);
  const [userPass, setuserPass] = useState(currentuser.password);
  const [userZone, setuserZone] = useState(currentuser.zone);
  const [userAddress, setuserAddress] = useState(currentuser.address);
  const [userAadhar, setuserAadhar] = useState(currentuser.aadharCardNo);
  const [userContact, setuserContact] = useState(currentuser.contactNo);
  const [avatar, setavatar] = useState();
  const { t } = useTranslation();

  const [openPopUp, setopenPopUp] = useState(false);


  useEffect(async() => {
    const res=await axios.post(
      "http://localhost:3000/users/cvd_history",{
        email:currentuser.email
      }
    )
    setCvdHistory(res.data.response);
  }, [])
  
  const updateProfileHandler = async () => {
    if (avatar) {
      const formData = new FormData();
      formData.append("file", avatar);
      formData.append("user_id", userId);
      await axios.post(
        "http://localhost:3000/users/image_upload",
        formData
      );
      const response = await axios.post(
        "http://localhost:3000/users/update",
        {
          name: userName,
          email: userEmail,
          category: userCat,
          password: userPass,
          zone: userZone,
          address: userAddress,
          aadharCardNo: userAadhar,
          contactNo: userContact,
        }
      );
      if (response.data.response) {
        localStorage.setItem(
          "userDetails",
          JSON.stringify(response.data.response)
        );
        setopenPopUp(true);
      }
    } else {
      const response = await axios.post(
        "http://localhost:3000/users/update",
        {
          name: userName,
          email: userEmail,
          category: userCat,
          password: userPass,
          zone: userZone,
          address: userAddress,
          aadharCardNo: userAadhar,
          contactNo: userContact,
        }
      );
      if (response.data.response) {
        localStorage.setItem(
          "userDetails",
          JSON.stringify(response.data.response)
        );
        setopenPopUp(true);
      }
    }
  };

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl ">
      <Header category={t("App")} title={t("Edit Profile")} />
      <div>
        {openPopUp ? (
          <PopUp
            message={"Profile succesfully updated"}
            status={true}
            setopenPopUp={setopenPopUp}
            heading={"Success"}
          />
        ) : (
          ""
        )}
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <div className="bg-white rounded p-4 px-4 md:p-8 mb-6">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
                <div className="lg:col-span-3">
                  <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                    <div className="md:col-span-5 flex flex-col mb-2">
                      <label htmlFor="full_name" className="pb-2">
                        {t("User Image")}
                      </label>
                      {avatar ? (
                        <img
                          src={URL.createObjectURL(avatar)}
                          className="h-40 w-40 mb-2"
                        />
                      ) : (
                        ""
                      )}
                      <input
                        type="file"
                        onChange={(e) => setavatar(e.target.files[0])}
                      />
                    </div>
                    
                    <div className="md:col-span-5">
                      <label htmlFor="full_name">{t("Full Name")}</label>
                      <input
                        type="text"
                        name="full_name"
                        id="full_name"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={userName}
                        onChange={(e) => setuserName(e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="email">{t("Email Address")}</label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        className="h-10 h-10 cursor-not-allowed border mt-1 rounded px-4 w-full bg-gray-50 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={userEmail}
                        // onChange={(e) => setuserEmail(e.target.value)}
                        placeholder="email@domain.com"
                        disabled
                      />
                    </div>
                    <div className="md:col-span-5 cursor-not-allowed">
                      <label htmlFor="email">{t("Role")}</label>
                      <select
                        name="email"
                        id="email"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50 cursor-not-allowed"
                        // onChange={(e) => setuserCat(e.target.value)}
                        placeholder="email@domain.com"
                        disabled
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="pass">{t("Address")}</label>
                      <input
                        type="text"
                        name="pass"
                        id="pass"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={userAddress}
                        onChange={(e) => setuserAddress(e.target.value)}
                        placeholder=""
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="pass">{t("Aadhar Card Number")}</label>
                      <input
                        type="text"
                        name="pass"
                        id="pass"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={userAadhar}
                        onChange={(e) => setuserAadhar(e.target.value)}
                        placeholder=""
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="pass">{t("Contact Number")}</label>
                      <input
                        type="text"
                        name="pass"
                        id="pass"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={userContact}
                        onChange={(e) => setuserContact(e.target.value)}
                        placeholder=""
                      />
                    </div>
                    <div className="md:col-span-5">
                      <label htmlFor="pass">{t("Zone")}</label>
                      <input
                        type="text"
                        name="pass"
                        id="pass"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        value={userZone}
                        onChange={(e) => setuserZone(e.target.value)}
                        placeholder=""
                      />
                    </div>
                    <div className="md:col-span-5 text-right">
                      <div className="inline-flex items-end">
                        <button
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                          onClick={() => updateProfileHandler()}
                        >
                          {t("Submit")}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 flex flex-col justify-center">
          {currentuser &&
          cvdHistory &&
          cvdHistory.length ? (
            <div className="pl-3 text-lg font-bold">{t("History")}</div>
          ) : (
            ""
          )}
          <ul className="w-full divide-y divide-gray-200 dark:divide-gray-700 ">
            {currentuser &&
              cvdHistory &&
              cvdHistory.map((history) => {
                return (
                  <li
                    className="py-2 my-2 sm:py-4 capitalize mt-2 cursor-pointer hover:bg-slate-100 px-3 rounded"
                    onClick={() =>
                      navigate(`/cvd-details?id=${history._id}`)
                    }
                  >
                    <div className="flex items-center space-x-4 capitalize">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                          {history.CVDScore===-1?"Not calculated":history.CVDScore}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                          CVD Score
                        </p>
                      </div>
                      <div className="inline-flex items-center text-sm text-base font-semibold text-gray-900 dark:text-white">
                        <div className="flex gap-2 justify-center items-center text-gray-700 capitalize">
                          <p>
                            {history.CVDScore > 0.5 ? (
                              <p className="h-3 w-3 rounded-full bg-red-400"></p>
                            ) : (
                              <p>
                                
                                  <p className="h-3 w-3 rounded-full bg-green-400"></p>
                              
                                 
                                
                              </p>
                            )}
                          </p>
                          <p>{history.CVDScore>0.5?"dangerous":"okay"}</p>
                        </div>
                      </div>
                      <div className="inline-flex items-center text-sm text-base font-semibold text-gray-900 dark:text-white">
                        {t(`${history.createdAt.substring(0,10)}`)}
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default protectedRoute(EditProfile);
