import { IoIosAddCircleOutline } from "react-icons/io";
import { BiSolidPencil, BiSolidTrashAlt } from "react-icons/bi";
import { deleteRequest } from "@/Helpers";
import { toast } from "react-toastify";
import { useState } from "react";
import NoData from "@/CustomUtils/DataTable/NoData";

const SupportTeamTable = ({
  Member,
  setModalStatus,
  setModalData,
  setComponentStatus,
}) => {
  // LOADING STATE
  const [loading, setLoading] = useState(false);

  // DELETE ITEM
  const deleteItem = (id) => {
    const url = `/support-user/${id}`;

    deleteRequest(url)
      .then((res) => {
        toast.success(res?.data?.msg);
        setComponentStatus((prev) => !prev);
        setTimeout(() => {
          setLoading(false);
        }, 3000);
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
          <div className="card-header  border-0 pb-0">
            <ol className="breadcrumb text-secondary">
              <li className="breadcrumb-item">Support Desk</li>
              <li className="breadcrumb-item">Support Team</li>
            </ol>
          </div>
          <div className="card-header  border-0 py-0 d-flex justify-content-end">
            <div>
              <div className="input-group search-area">
                <button
                  type="button"
                  className="btn btn-rounded btn-primary"
                  onClick={() => {
                    setModalData("");
                    setModalStatus(true);
                  }}
                  disabled={loading}
                >
                  <span className="btn-icon-start text-success">
                    <IoIosAddCircleOutline
                      style={{ height: "1.5rem", width: "1.5rem" }}
                      stroke="#fff"
                      color="white"
                    />
                  </span>
                  Add New Team Memeber
                </button>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="card-header  border-0 py-3">
                <span>
                  <h4 className="card-sub-title">Team</h4>
                </span>
              </div>
              <div className="card-body pt-0">
                <div className="table-responsive border rounded">
                  <table className="table table-bordered table-responsive-md mb-0">
                    <thead>
                      <tr className="bg-blue-300" collapse={8}>
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
                          <strong>Action </strong>
                        </th>
                      </tr>
                    </thead>
                    {Member?.length ? (
                      <tbody>
                        {Member?.map((item, index) => (
                          <tr key={index + 1}>
                            <th className="sl-no">{index + 1}</th>
                            <td>
                              <h5 className="text-wrap mb-0">{item.name}</h5>
                            </td>
                            <td>
                              <h5 className="text-wrap mb-0">{item.mobile}</h5>
                            </td>

                            <td style={{ width: "80px" }}>
                              <div className="d-flex justify-content-center">
                                <span
                                  href="#"
                                  className="btn btn-primary shadow btn-xs sharp me-1"
                                  title="Edit"
                                  onClick={() => {
                                    setModalData(item);
                                    setModalStatus(true);
                                  }}
                                >
                                  <BiSolidPencil
                                    style={{ height: "1rem", width: "1rem" }}
                                    title="Edit"
                                  />
                                </span>
                                <span
                                  className="btn btn-danger shadow btn-xs sharp me-1 anchor"
                                  title="Delete"
                                  onClick={() =>
                                    !loading && deleteItem(item._id)
                                  }
                                >
                                  <BiSolidTrashAlt
                                    style={{ height: "1rem", width: "1rem" }}
                                    title="Delete"
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportTeamTable;
