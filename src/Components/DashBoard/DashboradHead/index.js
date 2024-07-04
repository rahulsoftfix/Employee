"use client";
import React, { useEffect, useState } from "react";
import "./index.css";
import { BsBox } from "react-icons/bs";
import { FiAward } from "react-icons/fi";
import { TbBusinessplan } from "react-icons/tb";
import { BiSolidOffer, BiSolidPurchaseTag } from "react-icons/bi";
import { Select } from "antd";
import DashboardGraph from "../DashboardGraph";
import { CiShoppingTag } from "react-icons/ci";
import { IoWarningOutline } from "react-icons/io5";
import { MdOutlineAutorenew, MdUpgrade } from "react-icons/md";
import { getRequest } from "@/Helpers";
const DashboardHead = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getRequest(`financial`)
      .then((res) => {
        setData(res?.data?.data);
      })
      .catch((err) => {
        if (err?.response?.data?.msg) {
          console.log(err?.response?.data?.msg);
        } else {
          console.log(err?.message);
        }
      });
  }, []);
  // FY DATA OPTIONS MAPPING
  const FyOptions = data?.map((fyp) => {
    return {
      value: fyp?._id,
      label: fyp?.year,
    };
  });

  return (
    <>
      <div className="content-body">
        <div className="container-fluid ">
          <div className="row w-100">
            <div className="col-12 p-0">
              <div className="card">
                <div className="card-header">
                  <div>
                    <span className="card-title text-black">Dashboard</span>
                  </div>
                </div>
                <div className="card-body">
                  <div className="">
                    <h4 className="card-sub-title  mb-3">
                      Subscription &nbsp;
                    </h4>
                  </div>
                  <div className="col-xl-12">
                    <div
                      style={{ backgroundColor: "#F3F0EC" }}
                      className="card  analytics-card"
                    >
                      <div className="card-body mt-4 pb-1">
                        <div className="row align-items-center">
                          <div className="col-xl-12">
                            <div className="row d-flex justify-content-around">
                              <div className="col-xl-2 col-md-2 col-sm-4 col-6">
                                <div className="card cardTwo">
                                  <div className="card-body">
                                    <div className="ana-box">
                                      <div className="ic-n-bx">
                                        <div className="icon-box cardTwoIcon rounded-circle">
                                          <BiSolidPurchaseTag className="fs-3" />
                                        </div>
                                      </div>
                                      <div className="anta-data">
                                        <h5>Total</h5>
                                        <h3>55000</h3>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-2 col-md-2 col-sm-4 col-6">
                                <div className="card cardThree">
                                  <div className="card-body px-0">
                                    <div className="ana-box">
                                      <div className="ic-n-bx">
                                        <div className="icon-box cardThreeIcon rounded-circle">
                                          <BiSolidOffer className="fs-2" />
                                        </div>
                                      </div>
                                      <div className="anta-data">
                                        <h5>Free Trial</h5>
                                        <h3>26780</h3>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-2 col-md-2 col-sm-4 col-6">
                                <div className="card cardFour">
                                  <div className="card-body">
                                    <div className="ana-box">
                                      <div className="ic-n-bx">
                                        <div className="icon-box cardFourIcon rounded-circle">
                                          <BsBox className="fs-3" />
                                        </div>
                                      </div>
                                      <div className="anta-data">
                                        <h5>Basic</h5>
                                        <h3>3220</h3>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-2 col-md-2 col-sm-4 col-6">
                                <div className="card cardFive">
                                  <div className="card-body">
                                    <div className="ana-box">
                                      <div className="ic-n-bx">
                                        <div className="icon-box cardFiveIcon rounded-circle">
                                          <FiAward className="fs-3" />
                                        </div>
                                      </div>
                                      <div className="anta-data">
                                        <h5>Business</h5>
                                        <h3>13000</h3>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="col-xl-2 col-md-2 col-sm-4 col-6">
                                <div className="card cardSix">
                                  <div className="card-body ">
                                    <div className="ana-box">
                                      <div className="ic-n-bx">
                                        <div className="icon-box cardSixIcon rounded-circle">
                                          <TbBusinessplan className="fs-3" />
                                        </div>
                                      </div>
                                      <div className="anta-data">
                                        <h5>Enterprise</h5>
                                        <h3>12000</h3>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="row mx-0 ">
                    <div className="col-xl-3 col-md-3 col-sm-6 col-12 p-0 pe-2">
                      <div className="card">
                        <div className="card-body">
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="icon-box icon-box-lg bg-success-light rounded-circle">
                              <p className="fs-2 text-success mt-1">
                                <IoWarningOutline />
                              </p>
                            </div>
                            <div className="total-projects ms-3">
                              <h3 className="text-success count">1k</h3>
                              <span>Expired</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-md-3 col-sm-6 col-12 p-0 px-2">
                      <div className="card">
                        <div className="card-body">
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="icon-box icon-box-lg bg-success-light rounded-circle">
                              <MdUpgrade className="fs-2 text-success" />
                            </div>
                            <div className="total-projects ms-3">
                              <h3 className="text-success count">2k</h3>
                              <span>Upgraded</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-md-3 col-sm-6 col-12 p-0 px-2">
                      <div className="card">
                        <div className="card-body">
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="icon-box icon-box-lg bg-success-light rounded-circle">
                              <MdOutlineAutorenew className="fs-2 text-success" />
                            </div>
                            <div className="total-projects ms-3">
                              <h3 className="text-success count">3k</h3>
                              <span>Renewed</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-md-3 col-sm-6 col-12 p-0 ps-2">
                      <div className="card">
                        <div className="card-body">
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="icon-box icon-box-lg bg-success-light rounded-circle">
                              <CiShoppingTag className="fs-2 text-success" />
                            </div>
                            <div className="total-projects ms-3">
                              <h3 className="text-success count">6k</h3>
                              <span>Total</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="section-header mb-3 d-flex justify-content-start px-0 align-items-center my-5">
                      <div className="me-3">
                        <div className="card-body p-0">
                          <h4 className="card-sub-title">Revenue </h4>
                        </div>
                      </div>
                      <div>
                        <span className="card-title text-black">
                          <Select
                            id="select"
                            size="large"
                            placeholder="Select FY"
                            defaultValue="Select FY"
                            options={FyOptions}
                          />
                        </span>
                      </div>
                    </div>
                    <div className="col-xl-3 col-md-3 col-sm-6 col-12 p-0 pe-2">
                      <div className="card">
                        <div className="card-body">
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="icon-box icon-box-lg bg-success-light rounded-circle">
                              <p className="fs-2 text-success mt-2">₹</p>
                            </div>
                            <div className="total-projects ms-3">
                              <h3 className="text-success count">₹11k</h3>
                              <span>Total</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-md-3 col-sm-6 col-12 p-0 px-2">
                      <div className="card">
                        <div className="card-body">
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="icon-box icon-box-lg bg-success-light rounded-circle">
                              <BsBox className="fs-2 text-success" />
                            </div>
                            <div className="total-projects ms-3">
                              <h3 className="text-success count">₹3k</h3>
                              <span>Basic</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-md-3 col-sm-6 col-12 p-0 px-2">
                      <div className="card">
                        <div className="card-body">
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="icon-box icon-box-lg bg-success-light rounded-circle">
                              <FiAward className="fs-2 text-success" />
                            </div>
                            <div className="total-projects ms-3">
                              <h3 className="text-success count">₹6k</h3>
                              <span>Business</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-xl-3 col-md-3 col-sm-6 col-12 p-0 ps-2">
                      <div className="card">
                        <div className="card-body">
                          <div className="d-flex align-items-center justify-content-between">
                            <div className="icon-box icon-box-lg bg-success-light rounded-circle">
                              <TbBusinessplan className="fs-2 text-success" />
                            </div>
                            <div className="total-projects ms-3">
                              <h3 className="text-success count">₹2k</h3>
                              <span>Enterprise</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
                <DashboardGraph />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHead;
