import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect, useContext } from "react";
import { FaAngleDown } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import "./Appearance.css";
import { ThemeContext } from "../contexts/ThemeContext";

const menuAnimation = {
    hidden: {
        opacity: 0,
        height: 0,
        padding: 0,
        transition: { duration: 0.3, when: "afterChildren" },
    },
    show: {
        opacity: 1,
        height: "auto",
        transition: {
            duration: 0.3,
            when: "beforeChildren",
        },
    },
};

const menuItemAnimation = {
    hidden: (i) => ({
        padding: 0,
        x: "-100%",
        transition: {
            duration: (i + 1) * 0.1,
        },
    }),
    show: (i) => ({
        x: 0,
        transition: {
            duration: (i + 1) * 0.1,
        },
    }),
};

const SidebarMenu = ({ route, showAnimation, isOpen, setIsOpen }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme, font } = useContext(ThemeContext);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setIsOpen(true);
    };

    useEffect(() => {
        if (!isOpen) {
            setIsMenuOpen(false);
        }
    }, [isOpen]);

    return (
        <>
        <div
        className={`flex justify-between gap-2 px-1 py-2 border-r border-r-transparent link ${
            theme === "Dark"
            ? "hover:bg-[#4d4e47] font-semibold"
            : "hover:bg-[#c5d4f1]"
        }`}
        onClick={toggleMenu}
        >
        <div className="flex gap-2">
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
        </div>
        {isOpen && (
            <motion.div
            animate={
                isMenuOpen
                ? {
                    rotate: -90,
                }
                : { rotate: 0 }
            }
            >
            <FaAngleDown />
            </motion.div>
        )}
        </div>
        <AnimatePresence>
        {isMenuOpen && (
            <motion.div
            variants={menuAnimation}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="flex flex-col p-8"
            >
            {route.subRoutes.map((subRoute, i) => (
                <motion.div
                variants={menuItemAnimation}
                key={subRoute.path} // Fixed key using path
                custom={i}
                >
                <NavLink
                to={subRoute.path}
                className={({ isActive }) =>
                `pl-5 p-1.5 border-b flex link gap-5 ${
                    isActive
                    ? "bg-blue-100 dark:bg-blue-900"
                    : ""
                } ${
                    theme === "Dark"
                    ? "hover:bg-[#4d4e47] border-b-white"
                    : "hover:bg-[#c5d4f1] border-b-black"
                }`
                }
                >
                <div className="icon">{subRoute.icon}</div>
                <motion.div className="whitespace-nowrap">
                {subRoute.name}
                </motion.div>
                </NavLink>
                </motion.div>
            ))}
            </motion.div>
        )}
        </AnimatePresence>
        </>
    );
};

export default SidebarMenu;
