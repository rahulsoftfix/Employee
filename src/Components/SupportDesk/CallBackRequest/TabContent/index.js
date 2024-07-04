import { useState } from "react";
import NoData from "@/CustomUtils/DataTable/NoData";
import { Pagination, Select } from "antd";
import { postRequest } from "@/Helpers";
import { toast } from "react-toastify";

const CallBackRequestTable = ({
  callRequest,

  ComponentStatus,
  setComponentStatus,
}) => {
  // LOADING STATE
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [id, setId] = useState([]);

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

    return callRequest?.slice(startIndex, endIndex);
  };
  const handleChange = (value) => {
    const url = `/call-request/update/${id}`;
    const cred = {
      number: data?.number,
      status: value,
    };
    postRequest({ url, cred })
      .then((res) => {
        toast.success(res?.data?.msg);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
        setComponentStatus(!ComponentStatus);
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
          <div className="card-header  border-0 pb-0"></div>
          <div className="row">
            <div className="col-md-12">
              <div className="card-header  border-0 py-3">
                <span>
                  <h4 className="card-sub-title">Request List</h4>
                </span>
              </div>

              <div className="card-body pt-0">
                <div className="table-responsive border rounded">
                  <table className="table table-bordered table-responsive-md mb-0">
                    <thead className="">
                      <tr className="bg-blue-300">
                        <th style={{ width: "80px" }}>
                          <strong>Sl. No.</strong>
                        </th>
                        <th>
                          <strong>Mobile </strong>
                        </th>
                        <th style={{ width: "150px" }}>
                          <strong>Status </strong>
                        </th>
                      </tr>
                    </thead>
                    {callRequest?.length ? (
                      <tbody>
                        {getVisibleData().map((customer, index) => (
                          <tr key={index + sl + 1}>
                            <th className="sl-no">{index + sl + 1}</th>
                            <td>
                              <h5 className="text-wrap mb-0">
                                {customer?.number}
                              </h5>
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
                                      value: "accepted",
                                      label: "Accepted",

                                      disabled:
                                        customer.status === "accepted"
                                          ? true
                                          : false,
                                    },
                                    {
                                      value: "pending",
                                      label: "Pending",

                                      disabled:
                                        customer.status === "pending"
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
                  total={callRequest?.length}
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

export default CallBackRequestTable;
