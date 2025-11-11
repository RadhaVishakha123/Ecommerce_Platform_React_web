import React, { useEffect, useState } from "react";
import AuthSchema from "../ZodSchema/AuthSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useAuth from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";



export default function ResponsiveSwapBoxes() {
  const { AddUser, FoundUser } = useAuth();
  const [isSwapped, setIsSwapped] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [iscpassword, setiscpassword] = useState(false);
  const [isshowpassword, setpasswordshowhide] = useState(false);
  const [isshowcpassword, setcpasswordshowhide] = useState(false);
  const navigate=useNavigate()
  const showicon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#e3e3e3"
    >
      <path d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Zm0-300Zm0 220q113 0 207.5-59.5T832-500q-50-101-144.5-160.5T480-720q-113 0-207.5 59.5T128-500q50 101 144.5 160.5T480-280Z" />
    </svg>
  );
  const hideicon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="#e3e3e3"
    >
      <path d="m644-428-58-58q9-47-27-88t-93-32l-58-58q17-8 34.5-12t37.5-4q75 0 127.5 52.5T660-500q0 20-4 37.5T644-428Zm128 126-58-56q38-29 67.5-63.5T832-500q-50-101-143.5-160.5T480-720q-29 0-57 4t-55 12l-62-62q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302Zm20 246L624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM222-624q-29 26-53 57t-41 67q50 101 143.5 160.5T480-280q20 0 39-2.5t39-5.5l-36-38q-11 3-21 4.5t-21 1.5q-75 0-127.5-52.5T300-500q0-11 1.5-21t4.5-21l-84-82Zm319 93Zm-151 75Z" />
    </svg>
  );

  function swapAuthform(): void {
    setIsSwapped(!isSwapped);
    setIsRegister(!isRegister);
  }
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting },
    reset,
    setValue,
    watch,
  } = useForm({ mode: "onTouched", resolver: zodResolver(AuthSchema) });
  function SubmitForm(data: any) {
    console.log("data", data);
    if(isRegister){
    const UserData = { Username: data.Username, Email: data.Email, Password: data.Password };
    console.log("Submit Data",UserData)
    AddUser(UserData);
    setIsRegister(false)
    setIsSwapped(false)
    reset();
    }
    else{
      const isUser=FoundUser(data.Email,data.Password);
      if(isUser){
        reset()
        navigate("/Home")
      }
      else{
        alert("User not found!");
      }
    }

  }
  let password = watch("Password");
  let cpassword = watch("cPassword");
  useEffect(() => {
    if (password && cpassword) {
      if (password == cpassword) {
        setiscpassword(false);
      } else {
        setiscpassword(true);
      }
    }
  }, [password, cpassword]);
  return (
    <div className={`relative w-full h-screen overflow-hidden bg-gray-100  `}>
      {/* Box 1 */}
      <div
        className={`absolute bg-blue-500 text-white flex flex-col justify-center items-center 
                    transition-transform duration-700 ease-in-out
                    w-full h-1/2 lg:w-1/2 lg:h-full
                    ${
                      isRegister
                        ? "lg:rounded-l-[15rem]"
                        : "lg:rounded-r-[15rem]"
                    }
                    ${
                      isSwapped
                        ? "translate-y-full lg:translate-y-0 lg:translate-x-full"
                        : "translate-y-0 lg:translate-x-0"
                    }`}
      >
        <p className="text-2xl font-semibold">
          {isRegister
            ? "Already have an account?"
            : "Sign up now to shop smarter and save more!"}
        </p>
        <button
          onClick={swapAuthform}
          className="mt-4 bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-100 hover:scale-103"
        >
          {isRegister ? "Login" : "Register"}
        </button>
      </div>

      {/* Box 2 */}
      <div
        className={`absolute bg-gray-100 text-black flex justify-center items-center 
                    transition-transform duration-700 ease-in-out
                    w-full h-1/2 lg:w-1/2 lg:h-full
                    bottom-0 lg:bottom-auto lg:right-0
                    ${
                      isSwapped
                        ? "-translate-y-full lg:translate-y-0 lg:-translate-x-full"
                        : "translate-y-0 lg:translate-x-0"
                    }`}
      >
        <form className=" w-100 " onSubmit={handleSubmit(SubmitForm)}>
          <h2 className="text-2xl font-bold mb-6 text-center ">
            {isRegister ? "Register" : "Login"}
          </h2>

          {isRegister && (
            <div className="mb-4">
              <input
                type="text"
                {...register("Username")}
                placeholder="Username"
                className="w-full border-2 border-gray-300 p-2.5 rounded-xl  bg-gray-50
             text-gray-800 placeholder-gray-400
             focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition duration-400 ease-in hover:border-blue-500 hover:scale-103"
              />
              {errors["Username"] && (
                <p className="text-red-500 text-sm ">
                  {errors["Username"].message}
                </p>
              )}
            </div>
          )}
          <div className="mb-4">
            <input
              type="text"
              {...register("Email")}
              placeholder="Email"
              className="w-full border-2 border-gray-300 p-2.5 rounded-xl  bg-gray-50
             text-gray-800 placeholder-gray-400
             focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition duration-400 ease-in hover:border-blue-500 hover:scale-103"
            />
            {errors["Email"] && (
              <p className="text-red-500 text-sm ">{errors["Email"].message}</p>
            )}
          </div>
          <div className=" relative mb-4">
            <input
              type={isshowpassword ? "text" : "password"}
              {...register("Password")}
              placeholder="Password"
              className="w-full border-2 border-gray-300 p-2.5 rounded-xl  bg-gray-50
             text-gray-800 placeholder-gray-400
             focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition duration-400 ease-in hover:border-blue-500 hover:scale-103"
            />
            <span
              className="absolute right-4 cursor-pointer mt-3 text-gray-500 hover:text-blue-600"
              onClick={() => setpasswordshowhide(!isshowpassword)}
            >
              {isshowpassword ? showicon : hideicon}
            </span>
            {errors["Password"] && (
              <p className="text-red-500 text-sm ">
                {errors["Password"].message}
              </p>
            )}
          </div>
          {isRegister && (
            <div className=" relative mb-4">
              <input
                type={isshowcpassword ? "text" : "password"}
                {...register("cPassword")}
                placeholder="Comfirm Password"
                className="w-full border-2 border-gray-300 p-2.5 rounded-xl  bg-gray-50
             text-gray-800 placeholder-gray-400
             focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition duration-400 ease-in hover:border-blue-500 hover:scale-103"
              />
              <span
                className="absolute right-4 cursor-pointer mt-3 text-gray-500 hover:text-blue-600"
                onClick={() => setcpasswordshowhide(!isshowcpassword)}
              >
                {isshowcpassword ? showicon : hideicon}
              </span>
              {errors["cPassword"] && (
                <p className="text-red-500 text-sm ">
                  {errors["cPassword"].message}
                </p>
              )}
              {iscpassword && (
                <p className="text-red-500 text-sm mt-1">
                  Passwords do not match
                </p>
              )}
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2.5 rounded-xl 
             shadow-md hover:bg-blue-600 active:scale-95 transition duration-400 ease-in hover:border-blue-500 hover:scale-103
             "
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
