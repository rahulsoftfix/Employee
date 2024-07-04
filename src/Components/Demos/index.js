"use client";
import { getRequest } from "@/Helpers";
import React, { useEffect, useState } from "react";
import DemoTebles from "./TabContent";
import DemoModal from "./DemoModal";

const Demos = () => {
  const [data, setData] = useState([]);

  // COMPONENT UPDATION STATUS STATE
  const [compStatus, setCompStatus] = useState(false);
  const [modalStatus, setModalStatus] = useState(false);
  const [modalData, setModalData] = useState("");

  useEffect(() => {
    getRequest(`demo`)
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
  }, [compStatus]);

  return (
    <>
      <div className="content-body">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Demos</h4>
                </div>
                <div className="card-body">
                  <DemoTebles
                    demo={data}
                    setCompStatus={setCompStatus}
                    setModalStatus={setModalStatus}
                    compStatus={compStatus}
                    modalData={modalData}
                    setModalData={setModalData}
                  />
                </div>
              </div>
            </div>
          </div>
          {modalStatus && (
            <DemoModal
              setCompStatus={setCompStatus}
              compStatus={compStatus}
              setModalStatus={setModalStatus}
              modalData={modalData}
              setModalData={setModalData}
              modalStatus={modalStatus}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Demos;
