"use client";

import Footer from "@/Components/Footer";
import Navigation from "@/Components/Navigation";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "primereact/resources/primereact.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { ConfirmDialog } from "primereact/confirmdialog";

export default function Template({ children }) {
  const [isTab, setIsTab] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileToggler, setMobileToggler] = useState(false);

  useEffect(() => {
    if (typeof document != undefined) {
      import("bootstrap/dist/js/bootstrap");
    }
  }, []);

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ConfirmDialog />
      <div
        id="main-wrapper"
        className={mobileToggler ? "menu-toggle" : ""}
        data-header-position="fixed"
        data-sidebar-position="fixed"
        data-sidebar-style={isTab ? "mini" : isMobile ? "overlay" : "full"}
      >
        <Navigation
          tab={[isTab, setIsTab]}
          mobile={[isMobile, setIsMobile]}
          toggler={[mobileToggler, setMobileToggler]}
        />
        {children}
        <Footer />
      </div>
    </>
  );
}
