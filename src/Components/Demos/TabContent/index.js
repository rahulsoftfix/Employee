import { useState } from "react";
import NoData from "@/CustomUtils/DataTable/NoData";
import { Pagination, Select } from "antd";
import { postRequest } from "@/Helpers";
import { toast } from "react-toastify";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { BiSolidPencil } from "react-icons/bi";

const DemoTebles = ({
  demo,
  setCompStatus,
  compStatus,
  setModalData,
  setModalStatus,
}) => {
  // LOADING STATE
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const customSortDec = () => {
    let temp;
    for (let i = 0; i < demo.length; i++) {
      for (let j = 0; j < demo.length; j++) {
        if (demo[i].date > demo[j].date) {
          temp = demo[i];
          demo[i] = demo[j];
          demo[j] = temp;
        }
      }
    }
    setData(demo);
  };
  const customSortAsc = () => {
    let temp;
    for (let i = 0; i < demo.length; i++) {
      for (let j = 0; j < demo.length; j++) {
        if (demo[i].date < demo[j].date) {
          temp = demo[i];
          demo[i] = demo[j];
          demo[j] = temp;
        }
      }
    }
    setData();
  };

  const [pageSize, setPageSize] = useState(5);
  const handlePerPageSelect = (value) => {
    setPageSize(value);
  };
  const onPageChange = (page) => {
    setCurrentPage(page);
  };
  var sl = (currentPage - 1) * pageSize;
  const getVisibleData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    return demo?.slice(startIndex, endIndex);
  };
  const handleChange = (value) => {
    if (value === "reschedule") {
      setModalData(customer);
      setModalStatus(true);
    }

    const url = `/demo/update/${id}`;
    const cred = {
      date: data?.date,
      email: data?.email,
      name: data?.name,
      mobile: data?.mobile,
      nameOfBusiness: data?.nameOfBusiness,
      time: data?.time,
      status: value,
    };
    postRequest({ url, cred })
      .then((res) => {
        toast.success(res?.data?.msg);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
        setCompStatus(!compStatus);
      })
      .catch((err) => {
        if (err?.response?.data?.msg) {
          console.log(err?.response?.data?.msg);
          toast.error(err?.response?.data?.msg);
          setTimeout(() => {
            setLoading(false);
          }, 3000);
        } else {
          console.log(err?.message);
          toast.error(err?.message);
          setTimeout(() => {
            setLoading(false);
          }, 3000);
        }
      });
  };
  return (
    <div className="pt-4">
      <div className="col">
        <div className="card">
          <div className="row">
            <div className="col-md-12">
              <div className="card-header  border-0 py-3">
                <span>
                  <h4 className="card-sub-title">Demo List</h4>
                </span>
              </div>
              <div className="card-body pt-0">
                <div className="table-responsive border rounded">
                  <table className="table table-bordered table-responsive-md mb-0">
                    <thead>
                      <tr className="bg-blue-300">
                        <th style={{ width: "80px" }}>
                          <strong>Sl. No.</strong>
                        </th>
                        <th>
                          <strong>Name </strong>
                        </th>
                        <th>
                          <strong>Mobile </strong>
                        </th>
                        <th>
                          <strong>Email </strong>
                        </th>
                        <th>
                          <strong>Name of business </strong>
                        </th>
                        <th>
                          <strong>Date</strong>
                          <strong className=" btn px-2" onClick={customSortDec}>
                            <IoMdArrowDropdown />
                          </strong>
                          <strong className="btn px-2" onClick={customSortAsc}>
                            <IoMdArrowDropup />
                          </strong>
                        </th>
                        <th>
                          <strong>Time </strong>
                        </th>

                        <th style={{ width: "150px" }}>
                          <strong>Status </strong>
                        </th>
                        <th style={{ width: "150px" }}>
                          <strong>Reschedule </strong>
                        </th>
                      </tr>
                    </thead>
                    {demo?.length ? (
                      <tbody>
                        {getVisibleData().map((customer, index) => (
                          <tr key={index + 1}>
                            <th className="sl-no">{index + sl + 1}</th>
                            <td>
                              <h5 className="text-wrap mb-0">
                                {customer?.name}
                              </h5>
                            </td>
                            <td>
                              <h5 className="text-wrap mb-0">
                                {customer?.mobile}
                              </h5>
                            </td>
                            <td>
                              <h5 className="text-wrap mb-0">
                                {customer?.email}
                              </h5>
                            </td>
                            <td>
                              <h5 className="text-wrap mb-0">
                                {customer?.nameOfBusiness}
                              </h5>
                            </td>
                            <td>
                              <h5>{customer?.date}</h5>
                            </td>
                            <td>
                              <h5>{customer?.time}</h5>
                            </td>
                            <td>
                              <h5 className="">
                                <Select
                                  id="select"
                                  size="large"
                                  className="d-block"
                                  placeholder="Select"
                                  onClick={() => {
                                    setId(customer._id);
                                    setData(customer);
                                  }}
                                  options={[
                                    {
                                      value: "scheduled",
                                      label: "Scheduled",
                                      disabled:
                                        customer.status === "scheduled"
                                          ? true
                                          : false,
                                    },
                                    {
                                      value: "done",
                                      label: "Done",
                                      disabled:
                                        customer.status === "done"
                                          ? true
                                          : false,
                                    },
                                    {
                                      value: "rejected",
                                      label: "Rejected",
                                      disabled:
                                        customer.status === "rejected"
                                          ? true
                                          : false,
                                    },
                                  ]}
                                  defaultValue={customer?.status}
                                  onChange={handleChange}
                                />
                              </h5>
                            </td>
                            <td>
                              <div className="d-flex justify-content-center">
                                <span
                                  href="#"
                                  className="btn btn-primary shadow btn-xs sharp me-1"
                                  title="Edit"
                                  onClick={() => {
                                    setModalData(customer);
                                    setModalStatus(true);
                                  }}
                                >
                                  <BiSolidPencil
                                    style={{ height: "1rem", width: "1rem" }}
                                    title="Edit"
                                  />
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    ) : (
                      <NoData />
                    )}
                  </table>
                </div>
              </div>
              <div className="row w-100 m-0 pagination-container py-3 ">
                <div className="col-6">
                  <p>
                    Rows per page:{" "}
                    <Select
                      id="select"
                      size="large"
                      placeholder={pageSize}
                      options={[
                        {
                          value: 5,
                          label: "5",
                        },
                        {
                          value: 10,
                          label: "10",
                        },
                        {
                          value: 15,
                          label: "15",
                        },
                      ]}
                      onChange={handlePerPageSelect}
                    />{" "}
                  </p>
                </div>
                <Pagination
                  defaultCurrent={1}
                  total={demo?.length}
                  onChange={onPageChange}
                  current={currentPage}
                  pageSize={pageSize}
                  showSizeChanger={false}
                  hideOnSinglePage={true}
                  className="col-6 text-end"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoTebles;
