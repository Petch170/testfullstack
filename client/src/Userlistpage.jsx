import React, { useEffect, useState } from "react";
import Navbar from "./component/Navbar";
import Userlist from "./component/Userlist";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Axios from "axios";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Userlistpage = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [searchFound, setSearchFound] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async (value) => {
    try {
      const res = await Axios.get("http://localhost:3000/users");
      const json = res.data;
      const result = json.filter((user) => {
        return (
          (value &&
            user &&
            user.firstname &&
            user.firstname.toLowerCase().includes(value)) ||
          (user.lastname && user.lastname.toLowerCase().includes(value))
        );
      });
      setSearchFound(value ? result : json);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDel = async (id) => {
    try {
      await Axios.delete("http://localhost:3000/users/" + id);
      fetchData();
      // navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id) => {
    try {
      navigate(`/create/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };


  const datausers = [
    {
      image: "A",
      firstname: "Ratapong",
      lastname: "Sukjai",
      gender: "Male",
      birthday: "13 Jun 2023",
    },
    {
      image: "B",
      firstname: "Somchai",
      lastname: "Rirut",
      gender: "Male",
      birthday: "19 Apr 2023",
    },
    {
      image: "C",
      first: "Somchai",
      lastname: "Rirut",
      gender: "Male",
      birthday: "21 Oct 2023",
    },
  ];

  return (
    <div className=" h-screen max-w-[1640px]">
      <Navbar />

      <div className=" p-4 md:px-10 max-w-[1640px] flex justify-between items-center">
        <p className="text-sm md:text-xl font-semibold text-gray-400 ">
          Users List
        </p>
        <div className=" flex items-center md:flex-grow md:mx-24">
          <input
            className=" border border-gray-500 rounded-xl  bg-transparent p-2 w-full focus:outline-none"
            type="text"
            placeholder="Search"
            value={input}
            onChange={(e) => handleChange(e.target.value)}
          />
          <FiSearch size={25} />
        </div>
        <Link
          to="/create"
          className=" border px-5 py-2 rounded-md text-white bg-[#2e8eff] text-sm md:text-md "
        >
          Add+
        </Link>
      </div>

      <div className="md:mx-16 md:my-5 max-w-[1640px] overflow-x-auto">
        <table className="items-center justify-center w-full">
          <thead className="bg-[#d9d9d9] h-10">
            <tr className="text-center">
              <th className="w-1/6 py-2 px-4 text-xs md:text-sm font-semibold">
                Profile picture
              </th>
              <th className="w-1/6 py-2 px-4 text-xs md:text-sm font-semibold">
                First Name
              </th>
              <th className="w-1/6 py-2 px-4 text-xs md:text-sm font-semibold">
                Last Name
              </th>
              <th className="w-1/6 py-2 px-4 text-xs md:text-sm font-semibold">
                Gender
              </th>
              <th className="w-1/6 py-2 px-4 text-xs md:text-sm font-semibold">
                Birthday
              </th>
              <th className="w-1/6 py-2 px-4 text-xs md:text-sm font-semibold">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {input === "" && searchFound.length === 0 ? (
              data.map((item, i) => (
                <tr key={i} className="items-center justify-center">
                  {/* ส่วนของการแสดงผลข้อมูลทั้งหมด */}
                  <td className="items-center justify-center flex my-4">
                    <img
                      src={item.image}
                      className="rounded-full bg-blue-600 h-12 w-12 md:h-16 md:w-16 text-center"
                    />
                  </td>
                  <td className="text-center text-sm md:text-base xl:text-lg my-4">
                    {item.firstname &&
                      item.firstname.charAt(0).toUpperCase() +
                        item.firstname.slice(1)}
                  </td>
                  <td className="text-center text-sm md:text-base xl:text-lg my-4">
                    {item.lastname &&
                      item.lastname.charAt(0).toUpperCase() +
                        item.lastname.slice(1)}
                  </td>
                  <td className="text-center text-sm md:text-base xl:text-lg my-4">
                    {item.gender}
                  </td>
                  <td className="text-center text-sm md:text-base xl:text-lg my-4">
                    {item.birthday &&
                      new Date(item.birthday).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                  </td>
                  <td>
                    <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-end sm:items-center">
                      <button
                        onClick={() => handleEdit(item._id)}
                        className="flex justify-center items-center min-w-16 sm:w-24 h-6 sm:h-10 rounded-sm bg-[#ffc000] text-white text-sm mb-2 md:mb-0 md:mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDel(item._id)}
                        className="min-w-16 sm:w-24 h-6 sm:h-10 rounded-sm bg-[#ff0000] text-white text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : searchFound.length > 0 ? (
              searchFound.map((item, i) => (
                <tr key={i} className="items-center justify-center">
                  {/* ส่วนของการแสดงผลข้อมูลที่พบ */}
                  <td className="items-center justify-center flex my-4">
                    <img
                      src={item.image}
                      className="rounded-full bg-blue-600 h-12 w-12 md:h-16 md:w-16 text-center"
                    />
                  </td>
                  <td className="text-center text-sm md:text-base xl:text-lg my-4">
                    {item.firstname &&
                      item.firstname.charAt(0).toUpperCase() +
                        item.firstname.slice(1)}
                  </td>
                  <td className="text-center text-sm md:text-base xl:text-lg my-4">
                    {item.lastname &&
                      item.lastname.charAt(0).toUpperCase() +
                        item.lastname.slice(1)}
                  </td>
                  <td className="text-center text-sm md:text-base xl:text-lg my-4">
                    {item.gender}
                  </td>
                  <td className="text-center text-sm md:text-base xl:text-lg my-4">
                    {item.birthday &&
                      new Date(item.birthday).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                  </td>
                  <td>
                    <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-end sm:items-center">
                      <button
                        onClick={() => handleEdit(item._id)}
                        className="flex justify-center items-center min-w-16 sm:w-24 h-6 sm:h-10 rounded-sm bg-[#ffc000] text-white text-sm mb-2 md:mb-0 md:mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDel(item._id)}
                        className="min-w-16 sm:w-24 h-6 sm:h-10 rounded-sm bg-[#ff0000] text-white text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              // ส่วนของการแสดงผลเมื่อไม่พบข้อมูลตรงกับการค้นหา
              <tr>
                <td colSpan="6" className="text-center">
                  No matching users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* number */}
      <div className=" flex justify-end md:mx-16 md:p-10">
        <div className="flex items-center gap-2 ">
          <FaAngleLeft className=" size-2 lg:size-4 text-gray-400" />
          <a href="#" className=" text-sm text-gray-400 ">
            1
          </a>
          <a href="#" className=" text-sm text-gray-400">
            2
          </a>
          <a href="#" className=" text-sm text-gray-400">
            3
          </a>
          <a href="#" className=" text-sm text-gray-400">
            4
          </a>
          <a href="#" className=" text-sm text-gray-400">
            5
          </a>
          <a href="#" className=" text-sm text-gray-400">
            6
          </a>
          <FaAngleRight className=" size-2 lg:size-4 text-gray-400" />
        </div>
      </div>
    </div>
  );
};

export default Userlistpage;
