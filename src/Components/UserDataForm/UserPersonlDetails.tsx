import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import AuthSchema from "../ZodSchema/AuthSchema"; 
import useAuth from "../Context/AuthContext";
import type { OtherData, User } from "../Helper/Type";
export default function UserPersonlDetails() {
  const {CurrentUserLogindata,AddUpadteProfile,FetchExitProfile,closeProfile}=useAuth()
  
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting, touchedFields },
    reset,
    setValue,
    watch,
  } = useForm({ mode: "onTouched", resolver: zodResolver(AuthSchema) }); //mode: "onTouched" → runs validation when user touches (focus + blur) a field.

useEffect(()=>{
  const profiledata=FetchExitProfile()
  // Type narrowing by checking a unique key
  if(!profiledata) return; //null
  if ("userId" in profiledata) {
    reset(profiledata as OtherData)
  }
  else {//if("id" in profiledata)
  reset(profiledata as User)
  }
  
},[reset])
  function SubmitForm(D:any) {
    
    const Userdata={...D}
    AddUpadteProfile(Userdata);
    closeProfile();
    reset();
  }
  

  return (
    <>
    
      <div className="w-full max-w-2xl  p-6 ">
        <h2 className="text-center text-2xl font-bold mb-6">
          User Information Form
        </h2>

        <form
          onSubmit={handleSubmit(SubmitForm)}
          className="flex flex-col gap-4"
        >
          <input
              type="text"
              {...register("Fullname")}
              placeholder="Fullname"
              className="w-full border-2 border-gray-300 p-2.5 rounded-xl  bg-gray-50
             text-gray-800 placeholder-gray-400
             focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition duration-400 ease-in hover:border-blue-500 hover:scale-103"
            />
            {errors["Fullname"] && (
              <p className="text-red-500 text-sm ">{errors["Fullname"].message}</p>
            )}
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
            <input
              type="number"
              onInput={(e)=>{
                const input=e.target as HTMLInputElement
                if (input.value.length > 10)
                              input.value = input.value.slice(0, 10);
              }}
              {...register("Phone")}
              placeholder="Phone"
              className="w-full border-2 border-gray-300 p-2.5 rounded-xl  bg-gray-50
             text-gray-800 placeholder-gray-400
             focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition duration-400 ease-in hover:border-blue-500 hover:scale-103"
            />
            {errors["Phone"] && (
              <p className="text-red-500 text-sm ">{errors["Phone"].message}</p>
            )}
         
         <textarea
              
              {...register("Address")}
              placeholder="Address"
              className="w-full border-2 border-gray-300 p-2.5 rounded-xl  bg-gray-50
             text-gray-800 placeholder-gray-400
             focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300 transition duration-400 ease-in hover:border-blue-500 hover:scale-103"
            />
            {errors["Address"] && (
              <p className="text-red-500 text-sm ">{errors["Address"].message}</p>
            )}
          
          {/* Submit */}
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              disabled={!isDirty || !isValid}
              className={`px-8 py-2 rounded-xl text-white font-semibold transition ${
                isDirty && isValid
                  ? "bg-blue-600 hover:bg-blue-800"
                  : "bg-gray-300 cursor-not-allowed text-gray-600"
              }`}
            >
              Submit
            </button>
          </div>
          </form>
        </div>
      
    </>
  );
}
