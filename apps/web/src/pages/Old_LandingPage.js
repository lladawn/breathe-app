import { useNavigate } from "react-router-dom";
import LottieAnimation from "../components/LottieAnimation";
import breathing from "../assets/animations/breathe.json";

export const BreatheLandingPage = () => {
  const navigate = useNavigate();

  return (
    <div
      // relative h-screen w-full overflow-x-hidden overflow-y-auto
      // min-h-screen flex items-center justify-center -> for middle of the height
      className="relative w-full overflow-hidden bg-gradient-to-br from-[#f4f1eb] via-[#f0ede7] to-[#f9f7f3] "
    >
      <div className="relative z-10 max-w-3xl mx-auto animate-fade-in text-center px-4 pb-20">
        <div className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-['Playfair_Display'] font-semibold mb-2">
            Breathe.
          </h1>
          <p className="text-base sm:text-lg text-[#7c766f] italic tracking-wide">
            A safe digital village for the emotional life.
          </p>
        </div>
        <LottieAnimation animation={breathing} scale={1.5} />
        <div className="text-lg sm:text-xl text-[#5e5a55] leading-loose space-y-3">
          <p>Hey there, welcome 🌿</p>
          <p>
            This is a quiet space—meant to hold your thoughts, your breath, your
            being.
          </p>
          <p>There’s nothing to fix here. Just a space to feel, and be.</p>
          <p className="pt-2">For your inner world to be heard,</p>
          <p>for your breath to soften,</p>
          <p>and your heart to be held.</p>
        </div>
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => navigate("/storybook")}
            className="bg-[#ece8e1] hover:bg-[#e2ded7] text-[#3c3a37] font-medium px-6 py-2 rounded-md transition shadow-sm hover:shadow-md"
          >
            Begin quietly →
          </button>
        </div>
      </div>
    </div>
  );
};
