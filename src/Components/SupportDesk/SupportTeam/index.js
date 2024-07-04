"use client";

import { useEffect, useState } from "react";
import { getRequest } from "@/Helpers";
import SupportTeamTable from "./TabContent";
import SupportTeamModal from "./SupportTeamModal";
const SupportTeamIndex = () => {
  const [data, setData] = useState([]);

  // COMPONENT UPDATION STATUS STATE
  const [updateStatus, setUpdateStatus] = useState(false);

  // MODAL STATUS STATE
  const [modalStatus, setModalStatus] = useState(false);
  // MODAL DATA STATE
  const [modalData, setModalData] = useState("");

  useEffect(() => {
    getRequest(`support-user?role=supportTeam`)
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
  }, [updateStatus]);

  return (
    <>
      <div className="content-body">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="card">
                <div className="card-header">
                  <h4 className="card-title">Support Team</h4>
                </div>
                <div className="card-body">
                  <div className="default-tab">
                    <div className="tab-content">
                      <div
                        className="tab-pane fade show active"
                        id="documents"
                        role="tabpanel"
                      >
                        <SupportTeamTable
                          Member={data}
                          setModalStatus={setModalStatus}
                          setModalData={setModalData}
                          setComponentStatus={setUpdateStatus}
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

      {modalStatus && (
        <SupportTeamModal
          setComponentStatus={setUpdateStatus}
          setModalStatus={setModalStatus}
          modalData={modalData}
          setModalData={setModalData}
          modalStatus={modalStatus}
        />
      )}
    </>
  );
};

export default SupportTeamIndex;
