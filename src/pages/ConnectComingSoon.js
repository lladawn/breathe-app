// src/pages/ConnectComingSoon.js
import React from "react";
import LottieAnimation from "../components/LottieAnimation";
import reflect from "../assets/animations/laying.json";

const ConnectComingSoon = () => {
  return (
    <div className="relative flex-1 bg-gradient-to-br from-[#f4f1eb] via-[#f0ede7] to-[#f9f7f3] overflow-hidden flex flex-col items-center justify-center px-4 py-10">
      <LottieAnimation animation={reflect} opacity={0.3} scale={1.5} />
      {/* Soft background animation */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#ffffff40,transparent_70%)] bg-no-repeat bg-cover animate-cloud-float opacity-60 blur-2xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-2xl animate-fade-in">
        <h1 className="text-4xl sm:text-5.2xl font-serif font-semibold mb-4">
          Connect is Blooming soon 🌿
        </h1>
        <p className="text-lg sm:text-xl text-[#5e5a55] leading-relaxed mb-8">
          A gentle place to meet others walking through their emotional weather.
          You'll be able to relate, share warmth, or walk together—one moment at
          a time.
        </p>
        <div className="text-sm text-gray-500 italic mb-6">
          Coming soon: human connection through reflections.
        </div>
        <div className="bg-white border rounded-xl p-6 shadow-md max-w-md mx-auto">
          <p className="text-gray-600 italic mb-2">
            “Some days I just need to know I'm not alone.”
          </p>
          <p className="text-sm text-gray-500">
            — Future peer connection participant
          </p>
        </div>
        <p className="mt-10 text-sm text-gray-400">
          Feature under mindful construction ✨
        </p>
      </div>
    </div>
  );
};

export default ConnectComingSoon;

/* Add to global CSS:
@keyframes cloud-float {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
.animate-cloud-float {
  background-size: 200% 200%;
  animation: cloud-float 40s ease-in-out infinite;
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in {
  animation: fade-in 0.6s ease-out both;
}
*/
