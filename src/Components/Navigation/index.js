"use client";

import { useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Navigation = ({ tab, mobile, toggler }) => {
  const [isTab, setIsTab] = tab;
  const [isMobile, setIsMobile] = mobile;
  const [mobileToggler, setMobileToggler] = toggler;

  // WINDOW/TAB SESIZING HANDLER
  function handleResize() {
    // HANDLING SIDEBAR HEIGHT
    const win_h = window.outerHeight;
    if (win_h > 0 ? win_h : screen.height) {
      if (document.querySelector(".content-body") !== null) {
        document.querySelector(".content-body").style.minHeight =
          win_h + 0 + "px";
      }
    }

    // HANDLING SIDEBAR WIDTH & TOGGLE TYPE
    if (innerWidth <= 767) {
      setIsTab(false);
      setIsMobile(true);
    } else if (innerWidth <= 1023) {
      setIsTab(true);
      setIsMobile(false);
    } else {
      setIsMobile(false);
      setIsTab(false);
    }
  }

  useEffect(() => {
    if (typeof window != undefined) {
      addEventListener("resize", handleResize);
      if (innerWidth <= 767) {
        setIsTab(false);
        setIsMobile(true);
      } else if (innerWidth <= 1023) {
        setIsTab(true);
        setIsMobile(false);
      } else {
        setIsMobile(false);
        setIsTab(false);
      }
    }

    return () => {
      removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Header
        mobileToggler={mobileToggler}
        setMobileToggler={setMobileToggler}
      />
      <Sidebar />
    </>
  );
};

export default Navigation;
