// layouts/MainLayout.js
import React, { useState } from "react";
import {
  // DesktopNav,
  MobileNav,
} from "../components/Navbar";

const MainLayout = ({ children }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="
        flex flex-col min-h-screen w-full
        bg-gradient-to-br from-[#f4f1eb] via-[#f0ede7] to-[#f9f7f3]
      "
    >
      {/* Navbars */}
      {/* <DesktopNav /> */}
      <MobileNav menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {/* everything below the navbars */}
      <main className="flex-1 overflow-y-auto">
        {/* pt-10 pb-20 */}
        {/* py-6 sm:py-10  */}

        <div className="relative min-h-screen z-10 w-full max-w-3xl mx-auto px-4 animate-fade-in flex items-center justify-center py-20">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
