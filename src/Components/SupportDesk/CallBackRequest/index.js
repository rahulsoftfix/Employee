"use client";

import { useEffect, useState } from "react";
import { getRequest } from "@/Helpers";
import CallBackRequestTable from "./TabContent";

const CallBackRequestIndex = () => {
  const [data, setData] = useState([]);

  // COMPONENT UPDATION STATUS STATE
  const [updateStatus, setUpdateStatus] = useState(false);
  // DOCUMENT TITLES TABLE LIST
  const [title, setTitle] = useState([]);
  // MODAL STATUS STATE
  const [modalStatus, setModalStatus] = useState(false);
  // MODAL DATA STATE
  const [modalData, setModalData] = useState("");

  useEffect(() => {
    getRequest(`call-request`)
      .then((res) => {
        setData(res?.data?.data);
      })
      .catch((err) => {
        setTitle([]);
        if (err?.response?.data?.msg) {
          console.log(err?.response?.data?.msg);
        } else {
          console.log(err?.message);
        }
      });
  }, [updateStatus]);

  return (
    <>
      <div className="content-body">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Call Back Request</h4>
                </div>
                <div className="card-body">
                  <div className="default-tab">
                    <div className="tab-content">
                      <div
                        className="tab-pane fade show active"
                        id="documents"
                        role="tabpanel"
                      >
                        <CallBackRequestTable
                          callRequest={data}
                          setModalStatus={setModalStatus}
                          setModalData={setModalData}
                          setComponentStatus={setUpdateStatus}
                          ComponentStatus={updateStatus}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CallBackRequestIndex;
