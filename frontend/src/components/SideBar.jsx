import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser } from "react-icons/fa";
import { MdSpaceDashboard } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";
import { FaCalendarDays } from "react-icons/fa6";
import { AiFillSchedule } from "react-icons/ai";
import { BiSolidReport } from "react-icons/bi";
import { IoMdNotifications } from "react-icons/io";
import { RiColorFilterFill } from "react-icons/ri";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { BiSearch } from "react-icons/bi";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";

import { ThemeContext } from "../contexts/ThemeContext";
import "./Appearance.css";
import { useContext } from "react";

const routes = [

{
  path: "/Dashboard",
  name: "Dashboard",
  icon: <MdSpaceDashboard />,
},
{
  path: "/Profile",
  name: "Profile",
  icon: <FaUser />,
},
{
  path: "/MarkAttendance",
  name: "Mark Attendance",
  icon: <AiFillSchedule />,
},
{
  path: "/Schedule",
  name: "Schedule",
  icon: <FaCalendarDays/>,
},
{
  path: "/Reports",
  name: "Reports",
  icon: <BiSolidReport />,
},
{
  path: "/Settings",
  name: "Settings",
  icon: <IoSettingsSharp />,
  exact: true,
  subRoutes: [
    {
      path: "/Settings/Account",
      name: "Account ",
      icon: <FaUser />,
    },
    {
      path: "/Settings/Appearance",
      name: "Appearance",
      icon: <RiColorFilterFill />,
    },
    {
      path: "/Settings/Notification",
      name: "Notification",
      icon: <IoMdNotifications />,
    },
    {
      path: "/Settings/Privacy",
      name: "Privacy",
      icon: <FaLock />,
    },
  ],
},
{
  path: "/Logout",
  name: "Logout",
  icon: <RiLogoutBoxRLine />,
},
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };


  const { theme, font } = useContext(ThemeContext);
  return (
    <>
    <div className="flex  ">
    <motion.div
    animate={{
      width: isOpen ? "200px" : "45px",

      transition: {
        duration: 0.5,
        type: "spring",
        damping: 10,
      },
    }}
    className={`${
      theme === "Dark"
      ? "bg-gradient-to-b from-[#0b091e] via-[#18162f] to-[#1a1a2b] text-slate-50"
      : "bg-gradient-to-b from-[#ada996] via-[#dbdbdb] to-[#eaeaea]"
    } w-full p-2.5 pt-4 ${
      font === "Small"
      ? "font-small-text"
      : font === "Medium"
      ? "font-medium-text"
      : "font-large-text"
    } overflow-y-auto`}
    >
    <div className={`flex justify-between items-center font-bold px-1 py-0.5 ${
      font === "Small"
      ? "font-small-heading"
      : font === "Medium"
      ? "font-medium-heading"
      : "font-large-heading"
    }`}>
    <AnimatePresence>
    {isOpen && (
      <motion.h1
      variants={showAnimation}
      initial="hidden"
      animate="show"
      exit="hidden"
      >
      Attendance Tracker
      </motion.h1>
    )}
    </AnimatePresence>

    <div className="w-7">
    <FaBars onClick={toggle} />
    </div>
    </div>
    {/* <div className="search">
      <div className="search_icon">
      <BiSearch />
      </div>
      <AnimatePresence>
      {isOpen && (
        <motion.input
        initial="hidden"
        animate="show"
        exit="hidden"
        variants={inputAnimation}
        type="text"
        placeholder="Search"
        />
  )}
  </AnimatePresence>
  </div> */}
  <section className="flex flex-col mt-4 gap-1">
  {routes.map((route, index) => {
    if (route.subRoutes) {
      return (
        <SidebarMenu
        setIsOpen={setIsOpen}
        route={route}
        showAnimation={showAnimation}
        isOpen={isOpen}
        />
      );
    }

    return (
      <NavLink
      to={route.path}
      key={index}
      className={`${theme === "Dark" ? "hover:bg-[#4d4e47] font-semibold" : "hover:bg-[#c5d4f1]"} flex gap-2 px-1 py-2 border-r border-r-transparent link `}
      activeClassName="active"
      >
      <div className="icon">{route.icon}</div>
      <AnimatePresence>
      {isOpen && (
        <motion.div
        variants={showAnimation}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="whitespace-nowrap"
        >
        {route.name}
        </motion.div>
      )}
      </AnimatePresence>
      </NavLink>
    );
  })}
  </section>
  </motion.div>

  <main>{children}</main>
  </div>
  </>
  );
};

export default SideBar;
