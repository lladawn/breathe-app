import Lottie from "lottie-react";
import { useRef, useEffect, useState } from "react";

const LottieAnimation = ({
  animation,
  opacity = 0.5,
  scale = 1,
  speed = 1,
  delay = 0,
}) => {
  const lottieRef = useRef();
  const [shouldPlay, setShouldPlay] = useState(true);

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(speed);
    }
  }, [speed]);

  const handleComplete = () => {
    setShouldPlay(false);
    setTimeout(() => {
      lottieRef.current?.goToAndPlay(0, true);
      setShouldPlay(true);
    }, delay);
  };

  return (
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
        lottieRef={lottieRef}
        animationData={animation}
        autoplay
        loop={false}
        onComplete={handleComplete}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
    </div>
  );
};

export default LottieAnimation;
