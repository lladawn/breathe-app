import React from "react";
import { useNavigate } from "react-router-dom";

const sections = [
    { id: "peer-reflections", label: "Peer Reflections" },
    { id: "your-reflections", label: "Your Reflections" },
    { id: "moments", label: "Moments" },
    { id: "walk-together", label: "Walk Together" },
];

const SectionDropdown = ({ currentSection }: { currentSection: string }) => {
    const [menuOpen, setMenuOpen] = React.useState(false);
    const navigate = useNavigate();

    return (
        <>
            {/* Menu Button */}
            <div className="fixed top-1/2 left-0 transform -translate-y-1/2 z-50">
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="bg-[#ece8e1] rounded-r-full px-3 py-2 shadow hover:bg-[#e4dfd8] transition"
                >
                    ☰
                    {/* 📖 */}
                </button>
            </div>

            {/* Navigation Menu */}
            {menuOpen && (
                <div
                    className="fixed top-1/2 left-10 transform -translate-y-1/2 z-50 bg-[#f4f1eb] rounded-lg shadow-lg border border-[#e4dfd8] transition-transform duration-300"
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