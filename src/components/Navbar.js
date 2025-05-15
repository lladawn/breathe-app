// components/Navbar.js
import { Link } from "react-router-dom";
import FloatingLeafButton from "./FloatingLeafButton";

// import LottieAnimation from "./LottieAnimation";

export const DesktopNav = () => (
  <div
    // className="hidden md:flex justify-center gap-10 text-[#5e5a55]
    // absolute top-6 left-1/2
    // transform -translate-x-1/2 z-20 text-sm font-medium"
    className="flex items-center justify-center gap-10 text-[#5e5a55] 
    text-sm font-medium mt-6"
  >
    {/* <div className="hidden md:flex fixed gap-10 top-0 left-1/2 transform -translate-x-1/2 z-40 bg-[#f8f5f0]/70 backdrop-blur-md px-6 py-3 rounded-b-xl shadow-md"> */}{" "}
    <Link to="/" className="hover:text-[#3c3a37] transition">
      Home
    </Link>
    <Link to="/reflect" className="hover:text-[#3c3a37] transition">
      Reflect
    </Link>
    <Link to="/archive" className="hover:text-[#3c3a37] transition">
      Archive
    </Link>
    <Link to="/connect" className="hover:text-[#3c3a37] transition">
      Connect
    </Link>
  </div>
);

export const MobileNav = ({ menuOpen, setMenuOpen }) => (
  // Side bar
  // <>
  //   {/* Toggle Button */}
  //   <button
  //     onClick={() => setMenuOpen(true)}
  //     className="absolute top-5 right-5 z-20 text-[#5e5a55] text-3xl bg-white/70 backdrop-blur-sm px-3 py-1 rounded-lg shadow-md hover:scale-105 transition md:hidden"
  //   >
  //     ☰
  //   </button>

  //   {/* Slide-Out Menu */}
  //   <div
  //     className={`fixed top-0 right-0 h-full w-72 bg-[#f8f5f0] shadow-2xl z-30 transform transition-transform duration-300 ease-in-out rounded-l-3xl border-l border-[#e0dcd5] ${
  //       menuOpen ? "translate-x-0" : "translate-x-full"
  //     }`}
  //   >
  //     <div className="p-6 flex flex-col h-full">
  //       <div className="flex justify-end">
  //         <button
  //           onClick={() => setMenuOpen(false)}
  //           className="text-xl text-[#7c766f] hover:text-[#3c3a37] transition"
  //         >
  //           ✕
  //         </button>
  //       </div>
  //       <nav className="mt-10 flex flex-col space-y-4 text-lg text-[#5e5a55] font-medium">
  //         <Link
  //           to="/"
  //           onClick={() => setMenuOpen(false)}
  //           className="hover:text-[#3c3a37] transition"
  //         >
  //           🏡 Home
  //         </Link>
  //         <Link
  //           to="/reflect"
  //           onClick={() => setMenuOpen(false)}
  //           className="hover:text-[#3c3a37] transition"
  //         >
  //           📝 Reflect
  //         </Link>
  //         <Link
  //           to="/archive"
  //           onClick={() => setMenuOpen(false)}
  //           className="hover:text-[#3c3a37] transition"
  //         >
  //           📜 Archive
  //         </Link>
  //         <Link
  //           to="/connect"
  //           onClick={() => setMenuOpen(false)}
  //           className="hover:text-[#3c3a37] transition"
  //         >
  //           🤝 Connect
  //         </Link>
  //       </nav>
  //       <div className="mt-auto pt-10 text-sm text-[#a39f97] text-center">
  //         Made with ☁️ by Breathe
  //       </div>
  //     </div>
  //   </div>
  // </>

  <>
    {/* Sticky menu button */}
    {/* <button
      onClick={() => setMenuOpen(true)}
      className="fixed bottom-4 right-4 z-40 text-3xl bg-[#f8f5f0]/80 backdrop-blur-sm p-3 rounded-full shadow-md md:hidden"
    >
      🌿
    </button> */}

    <FloatingLeafButton onClick={() => setMenuOpen((prev) => !prev)} />

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
            onClick={() => setMenuOpen(false)}
            className="text-xl text-[#7c766f]"
          >
            ✕
          </button>
        </div>
        <nav className="mt-4 flex flex-col space-y-4 text-lg text-[#5e5a55] font-medium text-center">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            🏡 Home
          </Link>
          <Link to="/reflect" onClick={() => setMenuOpen(false)}>
            📝 Reflect
          </Link>
          <Link to="/archive" onClick={() => setMenuOpen(false)}>
            📜 Archive
          </Link>
          <Link to="/connect" onClick={() => setMenuOpen(false)}>
            🤝 Connect
          </Link>
        </nav>
      </div>
    </div>
  </>
);
