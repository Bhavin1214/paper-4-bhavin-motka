import React, { useState } from "react";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { api } from "../../utils/fetchWrapper"


const AuthScreen = ({ isOpen, type, onClose }) => {

  const [resError, setResError] = useState(null);
  const [resMessage, setResMessage] = useState(null)

  const loginSchema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Minimum 6 characters")
      .required("Password is required"),
  });

  const registerSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Minimum 6 characters")
      .required("Password is required"),
  });

  const schema = type === "login" ? loginSchema : registerSchema;

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    resolver: yupResolver(schema)
  })

  const submitHandler = async (data) => {
    if (type === "register") {
      const res = await api.post("/auth/register", data);
        console.log(res);
      if (res.Code === 200) {
        setResMessage(res.message)
        localStorage.setItem("token", res.data?.token)
        localStorage.setItem("email", res.data?.email)
      } else {
        setResError(res.message || "something went wrong")
      }
    }else{
      const res = await api.post("/auth/login", data);
        console.log(res);
      if (res.Code === 200) {
        setResMessage(res.message)
        localStorage.setItem("token", res.data?.token)
        localStorage.setItem("email", res.data?.email)
      } else {
        setResError(res.message || "something went wrong")
      }
    }

  }
  if (!isOpen) return null;

  const onCloseHandler = ()=>{
    setResError(null);
    setResMessage(null)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 
                      p-8 rounded-xl shadow-xl w-[90%] max-w-md relative">

        <button
          onClick={onCloseHandler}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300"
        >
          ✕
        </button>

        <h1 className="text-2xl font-semibold mb-6 text-center">
          {type === "login" ? "Login" : "Register"}
        </h1>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit(submitHandler)}>

          {type === "register" && (
            <>
              <input
                {...register("name")}
                type="text"
                placeholder="Name"
                className="border rounded-md px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </>
          )}

          <input
            {...register("email")}
            type="email"
            placeholder="Email"
            className="border rounded-md px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            className="border rounded-md px-3 py-2 dark:bg-gray-800 dark:border-gray-700"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          {
            resError !== null && (
              <span className="border rounded-md px-3 py-2 text-white bg-red-500 border-red-500 dark:bg-red-500 dark:border-red-500">
                {resError}
              </span>
            )
          }

          {
            resMessage !== null && (
              <span className="border rounded-md px-3 py-2 text-white bg-green-500 border-green-500 dark:bg-green-500 dark:border-green-500">
                {resMessage}
              </span>
            )
          }

          <button
            className={`py-2 rounded-md text-white ${type === "login"
              ? "bg-blue-600 hover:bg-blue-700"
              : "bg-green-600 hover:bg-green-700"
              }`}
          >
            {type === "login" ? "Login" : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthScreen;
