import { useEffect, useState } from "react";
import NoData from "@/CustomUtils/DataTable/NoData";
import { Pagination, Select, Switch } from "antd";
import { GoDotFill } from "react-icons/go";
import { getRequest, postRequest } from "@/Helpers";
import { toast } from "react-toastify";

const CustomerTableContent = ({
  user,
  setSelectFilter,
  setComponentStatus,
  setCredentials,
  credentials,
}) => {
  const [subscriptionData, setSubscriptionData] = useState([]);

  const onchangeSelectFilter = (value) => {
    setSelectFilter(value);
  };

  const leftdays = (dateend) => {
    const currentDate1 = new Date();

    // Format the current date as dd-mm-yyyy
    const day = String(currentDate1.getDate()).padStart(2, "0");
    const month = String(currentDate1.getMonth() + 1).padStart(2, "0");
    const year = currentDate1.getFullYear();
    const todayDateStr = `${day}-${month}-${year}`;

    const startDateStr = todayDateStr;

    const endDateStr = dateend;

    const startDateParts = startDateStr?.split("-");
    const endDateParts = endDateStr?.split("-");

    const startDate = new Date(
      startDateParts[2],
      startDateParts[1] - 1,
      startDateParts[0]
    );
    const endDate = new Date(
      endDateParts[2],
      endDateParts[1] - 1,
      endDateParts[0]
    );

    const timeDiff = endDate.getTime() - currentDate1.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return daysLeft;
  };

  const totalPage = user?.totalPages + "0";

  // HANDLING PAGINATION
  const handlePage = (value) => {
    setCredentials((prev) => ({
      ...prev,
      page: value,
    }));
  };

  const onChangeToggleForActive = (value) => {
    postRequest({
      url: `customer/set-admin-active-status`,
      cred: {
        id: value?.user?._id,
        status: true,
      },
    })
      .then((res) => {
        setComponentStatus((prev) => !prev);
        toast.success(res?.data?.msg);
      })
      .catch((error) => {
        console.log("active error", error);
      });
  };
  const onChangeToggleForInActive = (value) => {
    postRequest({
      url: `customer/set-admin-active-status`,
      cred: {
        id: value?.user?._id,
        status: false,
      },
    })
      .then((res) => {
        setComponentStatus((prev) => !prev);
        toast.success(res?.data?.msg);
      })
      .catch((error) => {
        console.log("active error", error);
      });
  };

  // MAPPING OEMs LIST INTO SELECT OPTIONS
  const planfilterData = subscriptionData?.map((plan) => {
    return {
      label: plan?.title,
      value: plan?._id,
    };
  });

  useEffect(() => {
    getRequest(`subscription`)
      .then((res) => {
        setSubscriptionData(res?.data?.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  return (
    <div className="pt-4">
      <div className="col">
        <div className="card">
          <div className="card-header  border-0 pb-0">
            <nav>
              <ol className="breadcrumb text-secondary">
                <li className="breadcrumb-item">Manage Users</li>
                <li className="breadcrumb-item">User List</li>
              </ol>
            </nav>
          </div>
          <div className="row">
            <div className="col-md-12">
              <div className="card-header  border-0 py-3">
                <span>
                  <h4 className="card-sub-title">User List</h4>
                </span>
              </div>
              <div className="d-flex justify-content-between mx-4 my-3">
                <span className="">
                  <Select
                    id="select"
                    size="large"
                    style={{ width: "15rem" }}
                    defaultValue="Please select"
                    onChange={onchangeSelectFilter}
                    options={planfilterData}
                  />
                </span>
                <span className="">
                  <div className="btn btn-warning">
                    {" "}
                    Total Subscribers {user?.totalUsers}
                  </div>
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
                          <strong>Mobile </strong>
                        </th>
                        <th>
                          <strong>Status </strong>
                        </th>
                        <th>
                          <strong>Subscription </strong>
                        </th>
                        <th>
                          <strong>Registration Date </strong>
                        </th>
                        <th>
                          <strong>Company Created </strong>
                        </th>
                        <th>
                          <strong>User Creation </strong>
                        </th>
                        <th>
                          <strong>Storage Usage</strong>
                        </th>
                        <th>
                          <strong>LogIn Access </strong>
                        </th>
                      </tr>
                    </thead>
                    {user?.users?.length ? (
                      <tbody>
                        {user?.users?.map((customer, index) => (
                          <tr key={index + 1}>
                            <th className="sl-no">
                              {(credentials.page - 1) * 10 + index + 1}
                            </th>

                            <td>
                              <h5 className="text-wrap mb-0">
                                {customer?.user?.mobile}
                              </h5>
                            </td>
                            <td>
                              <h5 className="text-wrap mb-0">
                                {customer?.user?.isActive ? (
                                  <span>
                                    <GoDotFill className="text-success" />{" "}
                                    Active
                                  </span>
                                ) : (
                                  <span>
                                    <GoDotFill className="text-danger" />{" "}
                                    Inactive
                                  </span>
                                )}
                              </h5>
                            </td>
                            <td>
                              <h5 className="text-wrap mb-0">
                                <span>
                                  <strong className="text-warning">
                                    {customer?.subscriptionDetails?.title}
                                  </strong>
                                  <br />
                                  {customer?.orderDetails?.planDetails
                                    ?.endDate ? (
                                    <>
                                      Expiry Date:{" "}
                                      {
                                        customer?.orderDetails?.planDetails
                                          ?.endDate
                                      }{" "}
                                      <br /> Days Left:{" "}
                                      {leftdays(
                                        customer?.orderDetails?.planDetails
                                          ?.endDate
                                          ? customer?.orderDetails?.planDetails
                                              ?.endDate
                                          : ""
                                      )}{" "}
                                      Days
                                    </>
                                  ) : (
                                    ""
                                  )}
                                </span>
                              </h5>
                            </td>
                            <td>
                              <h5 className="text-wrap mb-0">
                                {customer?.user?.createdAt.slice(0, 10)}
                              </h5>
                            </td>
                            <td>
                              <h5>
                                {customer?.totalCompany}/
                                {customer?.companiesLimit}
                              </h5>
                            </td>
                            <td>
                              <h5>
                                {customer?.userCount}/{customer?.userLimit}
                              </h5>
                            </td>
                            <td>
                              <h5>
                                {customer?.storageConsumed}/
                                {customer?.storageLimit} GB
                              </h5>
                            </td>
                            <td>
                              {customer?.user?.isActive ? (
                                <Switch
                                  defaultChecked
                                  onChange={() =>
                                    onChangeToggleForInActive(customer)
                                  }
                                />
                              ) : (
                                <Switch
                                  onChange={() =>
                                    onChangeToggleForActive(customer)
                                  }
                                />
                              )}
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
              <div className="text-end">
                <Pagination
                  defaultCurrent={1}
                  onChange={handlePage}
                  total={totalPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerTableContent;
