import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue } from "framer-motion";

const sections = [
    { id: "peer-reflections", label: "Peer Reflections" },
    { id: "your-reflections", label: "Your Reflections" },
    { id: "moments", label: "Moments" },
    { id: "walk-together", label: "Walk Together" },
];

const SectionDropdown = ({ currentSection }: { currentSection: string }) => {
    const navigate = useNavigate();
    const buttonRef = useRef<HTMLDivElement>(null);
    const constraintRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuLeft, setMenuLeft] = useState(60);
    const [menuTop, setMenuTop] = useState<number | null>(null);

    const y = useMotionValue(0);

    // Set initial position to middle-left of screen
    useLayoutEffect(() => {
        if (buttonRef.current) {
            const iconHeight = buttonRef.current.offsetHeight;
            const middleY = window.innerHeight / 2 - iconHeight / 2;
            y.set(middleY);
        }
    }, []);

    // Adjust menu left offset based on icon width
    useEffect(() => {
        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setMenuLeft(rect.width + 12);
        }
    }, [menuOpen]);

    useEffect(() => {
        if (menuOpen && buttonRef.current && menuRef.current) {
            const iconRect = buttonRef.current.getBoundingClientRect();
            const menuRect = menuRef.current.getBoundingClientRect();
            const iconCenter = iconRect.top + iconRect.height / 2;
            const newTop = iconCenter - menuRect.height / 2;
            setMenuTop(newTop);
        }
    }, [menuOpen]);

    // Close on outside click
    // useEffect(() => {
    //     const handleClickOutside = (event: MouseEvent) => {
    //         if (
    //             menuRef.current &&
    //             !menuRef.current.contains(event.target as Node)
    //         ) {
    //             setMenuOpen(false);
    //         }
    //     };

    //     if (menuOpen) {
    //         document.addEventListener("mousedown", handleClickOutside);
    //     } else {
    //         document.removeEventListener("mousedown", handleClickOutside);
    //     }

    //     return () => {
    //         document.removeEventListener("mousedown", handleClickOutside);
    //     };
    // }, [menuOpen]);

    return (
        <>
            {/* BOUNDING CONTAINER for strict drag constraints */}
            <div
                ref={constraintRef}
                className="fixed top-[75px] left-0 h-[calc(100vh-200px)] w-[60px] pointer-events-none"
            />

            {/* DRAGGABLE ICON — fixed within bounds */}
            <motion.div
                drag="y"
                dragConstraints={constraintRef}
                dragElastic={0}
                className="fixed left-0 z-50"
                ref={buttonRef}
                style={{ top: y }}
            >
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="bg-[#ece8e1] rounded-r-full px-3 py-2 shadow hover:bg-[#e4dfd8] transition"
                >
                    ☰
                </button>
            </motion.div>

            {/* MENU aligned with icon */}
            {menuOpen && (
                <div
                    ref={menuRef}
                    className="fixed z-50 bg-[#f4f1eb] rounded-lg shadow-lg border border-[#e4dfd8] transition-transform duration-300"
                    style={{
                        // top: buttonRef.current?.getBoundingClientRect().top ?? 200,
                        top: menuTop ?? 200,
                        left: menuLeft,
                    }}
                >
                    <ul className="flex flex-col">
                        {sections.map((section) => (
                            <li key={section.id}>
                                <button
                                    onClick={() => {
                                        navigate(`/connect?section=${section.id}`);
                                        setMenuOpen(false);
                                    }}
                                    className={`w-full px-4 py-2 text-left hover:bg-[#ece8e1] transition ${currentSection === section.id
                                        ? "font-semibold text-[#5e5a55]"
                                        : "text-[#6e6861]"
                                        }`}
                                >
                                    {section.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default SectionDropdown;