import { postRequest } from "@/Helpers";
import React, { useState } from "react";
import { toast } from "react-toastify";

const SupportTeamModal = ({
  setComponentStatus,
  setModalStatus,
  modalData,
  modalStatus,
  setModalData,
}) => {
  // LOADING STATE
  const [loading, setLoading] = useState(false);

  // FORM DATA STATE
  const [formData, setFormData] = useState(
    modalData
      ? {
          ...modalData,
        }
      : {
          mobile: "",
          name: "",
          password: "",
        }
  );

  // HANDLING FORM DATA
  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // FORM DATA API METHOD
  const add = (event) => {
    event.preventDefault();
    setLoading(true);

    const url = modalData
      ? `support-user/update/${modalData._id}`
      : "support-user";
    const cred = modalStatus
      ? { ...formData }
      : {
          ...formData,
        };

    postRequest({ url, cred })
      .then((res) => {
        toast.success(res?.data?.msg);
        setFormData({
          mobile: "",
          name: "",
          password: "",
        });
        setComponentStatus((prev) => !prev);
        setModalStatus(false);
        setModalData("");
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

  const style = {
    fontWeight: "500",
  };

  return (
    <>
      <form onSubmit={add}>
        <div
          className="modal fade show"
          id="oem-brand-modal"
          style={{ display: "block" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <span style={style}>
                    {modalData ? "Edit" : "Add New"} Team Memeber
                  </span>{" "}
                  <div className="text-secondary"></div>
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  onClick={() => {
                    setModalStatus(false);
                    setModalData("");
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <div className="form-validation">
                  <div className="row">
                    <div className="mb-3 col-6">
                      <label className="col-form-label" htmlFor="name">
                        Name<span className="text-danger">*</span>
                      </label>
                      <div className="">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="name"
                          placeholder=""
                          value={formData?.name}
                          onChange={handleFormData}
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-3 col-6">
                      <label className="col-form-label" htmlFor="name">
                        Mobile<span className="text-danger">*</span>
                      </label>
                      <div className="">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="mobile"
                          placeholder=""
                          value={formData?.mobile}
                          onChange={handleFormData}
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-3 col-6">
                      <label className="col-form-label" htmlFor="name">
                        Password<span className="text-danger">*</span>
                      </label>
                      <div className="">
                        <input
                          type="text"
                          className="form-control"
                          id="name"
                          name="password"
                          placeholder=""
                          onChange={handleFormData}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={loading}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      <div className="modal-backdrop fade show"></div>
    </>
  );
};

export default SupportTeamModal;
