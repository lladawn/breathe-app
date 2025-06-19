import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FloatingLeafButton from "./FloatingLeafButton";
import { trackAction } from "../utils/umami";

// import LottieAnimation from "./LottieAnimation";

// export const DesktopNav = () => (
//   <div
//     // className="hidden md:flex justify-center gap-10 text-[#5e5a55]
//     // absolute top-6 left-1/2
//     // transform -translate-x-1/2 z-20 text-sm font-medium"
//     className="flex items-center justify-center gap-10 text-[#5e5a55]
//     text-sm font-medium mt-6"
//   >
//     {/* <div className="hidden md:flex fixed gap-10 top-0 left-1/2 transform -translate-x-1/2 z-40 bg-[#f8f5f0]/70 backdrop-blur-md px-6 py-3 rounded-b-xl shadow-md"> */}{" "}
//     <Link to="/" className="hover:text-[#3c3a37] transition">
//       Home
//     </Link>
//     <Link to="/reflect" className="hover:text-[#3c3a37] transition">
//       Reflect
//     </Link>
//     <Link to="/archive" className="hover:text-[#3c3a37] transition">
//       Archive
//     </Link>
//     <Link to="/connect" className="hover:text-[#3c3a37] transition">
//       Connect
//     </Link>
//   </div>
// );

export const MobileNav = ({ menuOpen, setMenuOpen }) => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      setAnimate(true);
      const timeout = setTimeout(() => {
        setAnimate(false);
      }, 4500); // stop after ~6 seconds
      return () => clearTimeout(timeout);
    }
  }, [menuOpen]);

  const handleOverlayClick = () => {
    trackAction("Leaf Button - Clicked to Close");
    setMenuOpen(false);
  };

  return (
    <>
      <FloatingLeafButton
        onClick={() => {
          trackAction("Leaf Button - Menu Clicked");
          setMenuOpen((prev) => !prev);
        }}
      />

      {/* Dark overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40 " // backdrop-blur-sm
          onClick={handleOverlayClick}
        />
      )}

      {/* Bottom sheet menu */}
      <div
        className={`fixed bottom-0 left-0 w-full bg-white rounded-t-3xl shadow-2xl 
        transition-transform duration-300 ease-in-out z-50 
        bg-gradient-to-br from-[#f0ede7] via-[#e8e4de] to-[#f7f4ef] ${
          menuOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="p-6">
          <div className="flex justify-end">
            <button
              onClick={() => {
                trackAction("Mobile Nav - Menu Closed");
                setMenuOpen(false);
              }}
              className="text-xl text-[#7c766f]"
            >
              ✕
            </button>
          </div>
          <nav className="mt-4 flex flex-col space-y-4 text-lg text-[#5e5a55] font-medium text-center">
            <Link
              to="/"
              onClick={() => {
                trackAction("Mobile Nav - Home Clicked");
                setMenuOpen(false);
              }}
            >
              🏡 Home
            </Link>
            <Link
              to="/storybook"
              onClick={() => {
                trackAction("Mobile Nav - Storybook Clicked");
                setMenuOpen(false);
              }}
            >
              📖 Storybook
            </Link>
            <hr className="border-t border-black opacity-10 my-6" />
            <Link
              to="/reflect"
              onClick={() => {
                trackAction("Mobile Nav - Reflect Clicked");
                setMenuOpen(false);
              }}
              className={`${animate ? "animate-bounce" : ""}`}
            >
              📝 Reflect
            </Link>
            <Link
              to="/archive"
              onClick={() => {
                trackAction("Mobile Nav - Archive Clicked");
                setMenuOpen(false);
              }}
            >
              📜 Archive
            </Link>
            <Link
              to="/connect"
              onClick={() => {
                trackAction("Mobile Nav - Connect Clicked");
                setMenuOpen(false);
              }}
              // className={`${animate ? "animate-bounce" : ""}`}
            >
              🤝 Connect
            </Link>
            <Link
              to="/saveanote"
              onClick={() => {
                trackAction("Mobile Nav - Save a Note Clicked");
                setMenuOpen(false);
              }}
            >
              ✍️ Save a Note
            </Link>
            <hr className="border-t border-black opacity-10 my-6" />
            {/* <hr className="my-2 border-t border-[#e0ddd6] opacity-100" /> */}
            <Link
              to="/latest-breaths"
              onClick={() => {
                trackAction("Mobile Nav - Breaths Clicked");
                setMenuOpen(false);
              }}
            >
              🍃 Latest Breaths
            </Link>
            <Link
              to="/heart"
              onClick={() => {
                trackAction("Mobile Nav - About me Clicked");
                setMenuOpen(false);
              }}
            >
              💁‍♀️ About Me
            </Link>
            {/* <hr className="border-t border-black opacity-10 my-6" /> */}
          </nav>

          <div className="mt-auto pt-10 text-sm text-[#a39f97] text-center">
            {/* Made with ☁️ by Breathe */}
            <Link
              to="/heart"
              onClick={() => {
                trackAction("Mobile Nav - The Open Thread Clicked");
                setMenuOpen(false);
              }}
              // className="underline"
              // className="italic text-[#7c766f] hover:text-[#3c3a37] transition"
            >
              Made with 🤍 by
              <span className="italic"> </span>
              <span className="underline">The Open Thread</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
