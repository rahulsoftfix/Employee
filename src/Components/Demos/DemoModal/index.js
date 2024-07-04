import { postRequest } from "@/Helpers";
import React, { useState } from "react";
import { toast } from "react-toastify";

const DemoModal = ({
  setCompStatus,
  setModalStatus,
  compStatus,
  modalData,
  setModalData,
}) => {
  // LOADING STATE
  const [loading, setLoading] = useState(false);
  // FORM DATA STATE
  const [formData, setFormData] = useState(modalData);

  // HANDLING FORM DATA
  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // FORM DATA API METHOD
  const add = (event) => {
    event.preventDefault();
    setLoading(true);

    const url = `demo/update/${modalData?._id}`;
    const cred = {
      ...formData,
      status: "scheduled",
    };

    postRequest({ url, cred })
      .then((res) => {
        toast.success(res?.data?.msg);
        setFormData("");
        setModalStatus(false);
        setModalData("");
        setCompStatus(!compStatus);
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
          <div className="modal-dialog modal-dialog-centered ">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <span style={style}>Reschedule</span>{" "}
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
                        Select Date<span className="text-danger">*</span>
                      </label>
                      <div className="">
                        <input
                          type="date"
                          className="form-control"
                          id="name"
                          name="date"
                          placeholder="Select Date"
                          value={formData?.date}
                          onChange={handleFormData}
                          required
                        />
                      </div>
                    </div>
                    <div className="mb-3 col-6">
                      <label className="col-form-label" htmlFor="name">
                        Select Time<span className="text-danger">*</span>
                      </label>

                      <div className="">
                        <input
                          type="time"
                          className="form-control"
                          id="name"
                          name="time"
                          value={formData?.time}
                          placeholder="Select Time"
                          onChange={handleFormData}
                          required
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
    </>
  );
};

export default DemoModal;
