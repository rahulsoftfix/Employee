"use client";
import useCookie from "@/Hooks/cookie";
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import logo from "../../../public/Assets/Images/logo/logo.png";
import login from "../../../public/Assets/Images/signup.png";
import Image from "next/image";
import { numberValidation } from "@/Utils";

const Login = () => {
  const { setCookie, getCookie } = useCookie();
  const [logincred, setLogincred] = useState({
    mobile: null,
    password: "",
  });

  const loginOnchange = (e) => {
    const { name, value } = e.target;
    if (name == "mobile") {
      setLogincred({ ...logincred, [name]: numberValidation(value, 10) });
    } else {
      setLogincred({ ...logincred, [name]: value });
    }
  };

  const loginAdmin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}admin/password-login`,
        logincred
      );

      setCookie("qbc-auth-empolye", res?.data?.data?.token, 30);
      toast.success(res?.data?.msg);
      window != undefined && (window.location.href = `/`);
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.msg);
    }
  };

  return (
    <>
      <div className="authincation h-100">
        <div className="container-fluid p-12 h-100">
          <div className="row justify-content-center h-100 align-items-center">
            <div className="col-md-12 d-flex gap-4 justify-content-center h-80 bg-light-100 p-5 rounded-lg  shadow-lg">
              <div className="Heading-container d-flex align-items-center col-5">
                <div className="text-container">
                  <h1 className="text-5xl fw-bold text-center ">
                    Welcome Employee!
                  </h1>
                  <strong className="fs-3 text-black">
                    Your Reliable Partner in Intelligent Tender Bid Solutions.
                  </strong>
                  <p className="text-black fs-5">
                    Revolutionizing the tender bid preparation process.
                  </p>
                  <Image width={400} src={login} alt="Quickbid login image" />
                </div>
              </div>
              <div className="sign-up-box bg-white shadow-lg col-6">
                <div className="bg-white text-center pt-5">
                  <Image width={200} src={logo} alt="Quickbid login image" />
                </div>
                <h5 className="text-center fs-3">Employee Login</h5>
                <div className="d-flex justify-content-center">
                  <form className="row g-3 justify-content-center">
                    <div className="col-md-11 text-left">
                      <label
                        for="inputEmail4"
                        className="form-label text-primary fs-4"
                      >
                        Mobile
                      </label>
                      <input
                        type="number"
                        name="mobile"
                        value={logincred?.mobile}
                        placeholder="Enter Mobile No."
                        className="form-control border-dark"
                        id="inputEmail4"
                        onChange={loginOnchange}
                      />
                    </div>
                    <div className="col-md-11">
                      <label
                        for="inputPassword4"
                        className="form-label text-primary fs-4"
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        value={logincred?.password}
                        placeholder="Password"
                        className="form-control border-dark"
                        id="inputPassword4"
                        onChange={loginOnchange}
                      />
                    </div>

                    <div className="col-11 pb-4">
                      <button
                        type="submit"
                        className="btn btn-primary btn-lg w-100 font-size"
                        onClick={loginAdmin}
                      >
                        Login
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
