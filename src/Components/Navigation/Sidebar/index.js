import { deleteCookie } from "@/Hooks/cookie";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { BiSolidDashboard } from "react-icons/bi";

import { IoCall } from "react-icons/io5";
import { PiMonitorPlayFill } from "react-icons/pi";
import { FaUser } from "react-icons/fa";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { toast } from "react-toastify";

const Sidebar = () => {
  // USING URL PATH HOOK
  const path = usePathname();
  const pathNames = path?.split("/");

  // LOADING STATE
  const [loading, setLoading] = useState(false);

  var handleCurrentActive = (elem) => {
    if (
      typeof window != undefined &&
      typeof document != undefined &&
      elem.target.nodeName !== "svg" &&
      elem.target.nodeName !== "path" &&
      elem.target.className !== ""
    ) {
      const element = elem.target;
      const node = element.parentNode;

      if (
        node.nodeName !== "svg" &&
        node.className.split(" ").includes("has-sub")
      ) {
        // ADD/REMOVE EXPAND/COLLAPSE CLASSES
        if (node.className.split(" ").includes("mm-active")) {
          node.classList.remove("mm-active");
          node.childNodes?.[1].classList.remove("mm-show");
        } else {
          document.querySelectorAll(".mm-active").forEach((element) => {
            element.classList.remove("mm-active");
          });
          document.querySelectorAll(".mm-show").forEach((element) => {
            element.classList.remove("mm-show");
          });
          node.classList.add("mm-active");
          node.childNodes?.[1].classList.add("mm-show");
        }

        // SETTING CURRENT ACTIVE LINK
        Array.from(node.childNodes?.[1]?.childNodes)
          ?.map((el) => el)
          .filter((item) => {
            return (
              item?.childNodes?.[0]?.href?.split("/").slice(-1)?.toString() ===
              path?.split("/").slice(-1)?.toString()
            );
          })?.[0]
          ?.childNodes?.[0].classList.add("mm-active");
      }
      if (node.parentNode.className.split(" ").includes("has-sub")) {
        // ADD/REMOVE EXPAND/COLLAPSE CLASSES
        if (node.parentNode.className.split(" ").includes("mm-active")) {
          node.parentNode.classList.remove("mm-active");
          node.parentNode.childNodes?.[1].classList.remove("mm-show");
        } else {
          document.querySelectorAll(".mm-active").forEach((element) => {
            element.classList.remove("mm-active");
          });
          document.querySelectorAll(".mm-show").forEach((element) => {
            element.classList.remove("mm-show");
          });
          node.parentNode.classList.add("mm-active");
          node.parentNode.childNodes?.[1].classList.add("mm-show");
        }

        // SETTING CURRENT ACTIVE LINK
        Array.from(node.parentNode.childNodes?.[1]?.childNodes)
          ?.map((el) => el)
          .filter((item) => {
            return (
              item?.childNodes?.[0]?.href?.split("/").slice(-1)?.toString() ===
              path?.split("/").slice(-1)?.toString()
            );
          })?.[0]
          ?.childNodes?.[0].classList.add("mm-active");
      }
    }
  };

  const logout = () => {
    deleteCookie("qbc-auth-empolye");
    toast.success("Logout");
    window != undefined &&
      (window.location.href = `${process.env.NEXT_PUBLIC_API_BASE_URL_LOGIN}`);
  };

  return (
    <div className="deznav">
      <div className="deznav-scroll">
        <ul className="metismenu" id="menu">
          <li
            className={`${
              pathNames?.slice(-1)?.includes("") ? "mm-active" : ""
            }`}
          >
            <Link href="/">
              <div className="menu-icon">
                <BiSolidDashboard
                  style={{ height: "1.3rem", width: "1.3rem" }}
                  stroke="#fff"
                  color="white"
                />
              </div>
              <span className="nav-text">Dashboard</span>
            </Link>
          </li>
          {/* <li
            className={`has-sub ${
              pathNames?.includes("manageUsers") ? "mm-active" : ""
            }`}
            onClick={(elem) => handleCurrentActive(elem)}
          >
            <Link
              className="has-arrow "
              href="#!"
              aria-expanded="false"
              onClick={(e) => e.preventDefault()}
            >
              <div className="menu-icon">
                <FaUser
                  style={{ height: "1.3rem", width: "1.3rem" }}
                  stroke="#fff"
                  color="white"
                />
              </div>
              <span className="nav-text">Manage Users </span>
            </Link>
            <ul
              aria-expanded="false"
              className={`left mm-collapse ${
                pathNames?.includes("manageUsers") ? "mm-show" : ""
              }`}
            >
              <li>
                <Link
                  href="/manageUsers/customer"
                  className={`${
                    pathNames?.includes("customer") ? "mm-active" : ""
                  }`}
                >
                  View User List
                </Link>
              </li>
            </ul>
          </li> */}
          <li className={`${pathNames?.includes("demos") ? "mm-active" : ""}`}>
            <Link href="/demos">
              <div className="menu-icon">
                <PiMonitorPlayFill
                  style={{ height: "1.3rem", width: "1.3rem" }}
                  stroke="#fff"
                  color="white"
                />
              </div>
              <span className="nav-text">Demos</span>
            </Link>
          </li>
          <li
            className={`${
              pathNames?.includes("callBackReq") ? "mm-active" : ""
            }`}
          >
            <Link href="/callBackReq">
              <div className="menu-icon">
                <IoCall
                  style={{ height: "1.3rem", width: "1.3rem" }}
                  stroke="#fff"
                  color="white"
                />
              </div>
              <span className="nav-text">Call Back Request</span>
            </Link>
          </li>

          <li className={`${pathNames?.includes("logout") ? "mm-active" : ""}`}>
            <Link href="#" onClick={() => (loading ? "" : logout())}>
              <div className="menu-icon">
                <RiLogoutBoxRFill
                  style={{ height: "1.3rem", width: "1.3rem" }}
                  stroke="#fff"
                  color="white"
                />
              </div>
              <span className="nav-text">Logout</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
