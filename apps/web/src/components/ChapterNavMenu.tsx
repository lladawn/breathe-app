import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getChapters } from "../utils/content";

const ChapterNavMenu = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const chapterSlug = searchParams.get("chapter");
    const chapters = getChapters(navigate);
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // useEffect(() => {
    //     const handleClickOutside = (event) => {
    //         if (menuRef.current && !menuRef.current.contains(event.target)) {
    //             setMenuOpen(false);
    //         }
    //     };
    //     document.addEventListener("mousedown", handleClickOutside);
    //     return () => document.removeEventListener("mousedown", handleClickOutside);
    // }, []);

    return (
        <>
            {/* Sticky Menu Toggle Button */}
            <div className="fixed top-1/2 left-0 transform -translate-y-1/2 z-50">
                <button
                    onClick={() => setMenuOpen((prev) => !prev)}
                    className="bg-[#ece8e1] rounded-r-full px-3 py-2 shadow hover:bg-[#e4dfd8] transition"
                >
                    ☰
                </button>
            </div>

            {menuOpen && (
                <div
                    ref={menuRef}
                    className="fixed top-1/2 left-10 transform -translate-y-1/2 z-50 bg-[#f4f1eb] rounded-lg shadow-lg border border-[#e4dfd8] p-3"
                >
                    <ul className="flex flex-col gap-1">
                        {chapters.map((c, index) => (
                            <li key={c.slug}>
                                <button
                                    onClick={() => {
                                        navigate(`/storybook?chapter=${c.slug}`);
                                        setMenuOpen(false);
                                    }}
                                    className={`text-left px-4 py-2 rounded transition-all text-sm hover:bg-[#ece8e1] ${chapterSlug === c.slug
                                        ? "font-semibold text-[#5e5a55]"
                                        : "text-[#6e6861]"
                                        }`}
                                >
                                    {c.title}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
};

export default ChapterNavMenu;