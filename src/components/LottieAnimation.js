import Lottie from "lottie-react";

const LottieAnimation = ({ animation, opacity = 0.5, scale = 1 }) => (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100dvh",
      zIndex: 100,
      pointerEvents: "none",
      overflow: "hidden",
      opacity,
      scale,
    }}
  >
    <Lottie
      animationData={animation}
      loop
      autoplay
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  </div>
);

export default LottieAnimation;
