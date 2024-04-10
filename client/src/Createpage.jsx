import React, { useEffect, useState } from "react";
import Navbar from "./component/Navbar";
import Axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const Createpage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [gender, setGender] = useState("");
  const [birthday, setBirthday] = useState("");
  const [image, setImage] = useState("");
  const [userData, setUserData] = useState(null);



  useEffect(() => {
    if (id) {
      fetchUserData(id);
    }
  }, [id]);

  const fetchUserData = async (id) => {
    try {
      const res = await Axios.get(`http://localhost:3000/users/${id}`);
      const userData = res.data;
      setUserData(userData);
      setFirstname(userData.firstname);
      setLastname(userData.lastname);
      setGender(userData.gender);
      setBirthday(userData.birthday);
      setImage(userData.image);
    } catch (error) {
        console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
      if (!firstname || !lastname || !gender || !birthday || !image) {
    alert("Please fill in all fields.");
    return;
  }
    // console.log(firstname, lastname, gender, birthday, image);
    //   await Axios.post("http://localhost:3000/users", {
    //     firstname,
    //     lastname,
    //     gender,
    //     birthday,
    //     image,
    //   })
    //     .then((res) => {
    //       console.log(res);
    //       if(res.status===200)
    //       {navigate("/")}
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // };
    const userData = { firstname, lastname, gender, birthday, image };
    try {
      if (id) {
        await Axios.put(`http://localhost:3000/users/${id}`, userData);
      } else {
        await Axios.post("http://localhost:3000/users", userData);
      }
      navigate("/");
      // console.log(userData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setFirstname("");
    setLastname("");
    setGender("");
    setBirthday("");
    setImage("");

  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className=" h-screen max-w-[1640px]">
      <Navbar />
      <div className=" p-4 md:px-10 max-w-[1640px] flex justify-between items-center ">
        <p className="text-sm md:text-xl font-semibold text-gray-400 ">
          Create new User
        </p>
        <button className=" border px-5 py-2 rounded-md text-white bg-[#2e8eff] text-sm md:text-md ">
          {" "}
          Add+
        </button>
      </div>

      {/* user */}

      <div className=" flex flex-col sm:flex-row justify-center items-center md:mx-16">
        {/* left */}
        <div className=" flex flex-col justify-start items-center gap-4 py-10 px-4 w-full sm:w-2/5 md:py-5 md:px-5">
          <img
            src={image}
            alt={image}
            className=" border border-gray-500 rounded-full w-52 h-52 items-center object-cover"
          />
          <div className="relative bg-[#2e8eff] px-8 py-3 rounded-md text-sm md:text-md text-white cursor-pointer ">
            Update Profile picture
            <input
              type="file"
              accept="image/png,image/jpg,image/jpeg"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleUpload}
            />
          </div>
          <button
            onClick={() => setImage("")}
            className=" bg-red-600 rounded-md px-8 py-3 text-sm md:text-md text-white"
          >
            Delete Picture
          </button>
        </div>

        {/* right */}
        <div className=" w-full sm:ml-20 px-4 py-2 sm:p-0 ">
          <form
            onSubmit={handleSubmit}
            className=" grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-10 w-full justify-center items-end"
          >
            <div className=" flex flex-col">
              <label className=" text-gray-400 text-base pb-2">
                First Name
              </label>
              <input
                type="text"
                name="firstname"
                placeholder="Please enter First name"
                className="block w-full px-4 py-3 border border-gray-500 rounded-md text-gray-500 text-sm focus:outline-none focus:border-gray-500"
                value={firstname}
                required
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div className=" flex flex-col">
              <label className=" text-gray-400 text-base pb-2">Last Name</label>
              <input
                type="text"
                name="lastname"
                placeholder="Please enter last name"
                className="block w-full px-4 py-3 border border-gray-500 rounded-md text-gray-500 text-sm focus:outline-none focus:border-gray-500"
                value={lastname}
                required
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div className=" flex flex-col">
              <label className=" text-gray-400 text-base pb-2">Gender</label>
              <select
                name="gender"
                // className="border rounded-md border-black py-3 block w-full "
                className="block w-full px-4 py-3 border border-gray-500 rounded-md text-gray-500 text-sm focus:outline-none focus:border-gray-500"
                value={gender}
                required
                onChange={(e) => setGender(e.target.value)}
              >
                <option disabled selected value="" className=" text-sm">
                  --Please select Gender--
                </option>
                <option value="Male" className=" text-black">
                  Male
                </option>
                <option value="female" className=" text-black">
                  FeMale
                </option>
              </select>
            </div>
            <div className=" flex flex-col">
              <label className=" text-gray-400 text-base pb-2">Birthday</label>
              <input
                type="date"
                name="birthday"
                className="block w-full px-4 py-3 border border-gray-500 rounded-md text-gray-500 text-sm focus:outline-none focus:border-gray-500"
                value={birthday}
                required
                onChange={(e) => setBirthday(e.target.value)}
              />
            </div>
          </form>
        </div>
      </div>
      <div className="flex md:justify-end justify-center gap-4 mx-16 py-4 sm:py-0 ">
        <button
          onClick={handleCancel}
          className=" border  text-white bg-gray-500  w-44 h-10 rounded-md text-sm md:text-md "
        >
          {" "}
          CANCEL
        </button>
        <button
          onClick={handleSubmit}
          className=" border  text-white bg-green-500  w-44 h-10  rounded-md text-sm md:text-md"
        >
          SAVE
        </button>
      </div>
    </div>
  );
};

export default Createpage;
