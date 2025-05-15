import React, { useRef, useState, useEffect } from "react";

const FloatingLeafButton = ({ onClick }) => {
  const [position, setPosition] = useState({ x: 20, y: 20 });
  // const buttonSize = 60; // put this outside the component too if needed
  // const margin = 20;

  // const [position, setPosition] = useState(() => ({
  //   x: window.innerWidth / 2 - buttonSize / 2,
  //   y: window.innerHeight - buttonSize - margin,
  // }));
  const [isDragging, setIsDragging] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setPosition(getSnapPosition(position.x, position.y));
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // const cornerMargin = 20;

  // const getSnapPosition = (x, y) => {
  //   const vw = window.innerWidth;
  //   const vh = window.innerHeight;
  //   const buttonSize = 60; // approx width/height of button

  //   const snapX = x < vw / 2 ? cornerMargin : vw - buttonSize - cornerMargin;
  //   const snapY = y < vh / 2 ? cornerMargin : vh - buttonSize - cornerMargin;

  //   return { x: snapX, y: snapY };
  // };

  const getSnapPosition = (x, y) => {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const buttonSize = 60;
    const margin = 20;

    const snapTo = (x, y) => ({ x, y });

    const zones = [
      snapTo(margin, margin), // top-left
      snapTo(vw - buttonSize - margin, margin), // top-right
      snapTo(vw / 2 - buttonSize / 2, margin), // top-center
      snapTo(margin, vh - buttonSize - margin), // bottom-left
      snapTo(vw - buttonSize - margin, vh - buttonSize - margin), // bottom-right
      snapTo(vw / 2 - buttonSize / 2, vh - buttonSize - margin), // bottom-center
    ];

    // Find the closest snap zone by distance
    let closest = zones[0];
    let minDist = Infinity;
    for (const zone of zones) {
      const dist = Math.hypot(zone.x - x, zone.y - y);
      if (dist < minDist) {
        minDist = dist;
        closest = zone;
      }
    }

    return closest;
  };

  useEffect(() => {
    const handlePointerMove = (e) => {
      if (!isDragging) return;
      setPosition({
        x: e.clientX - 30,
        y: e.clientY - 30,
      });
    };

    const stopDragging = () => {
      setIsDragging(false);
      setPosition((prev) => getSnapPosition(prev.x, prev.y));
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", stopDragging);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", stopDragging);
    };
  }, [isDragging]);

  return (
    <div
      ref={buttonRef}
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        zIndex: 50,
        cursor: isDragging ? "grabbing" : "grab",
        transition: isDragging ? "none" : "all 0.4s ease-out",
        touchAction: "none",
      }}
      onPointerDown={() => setIsDragging(true)}
    >
      <button
        onClick={onClick}
        className="w-16 h-16 flex items-center justify-center text-3xl bg-[#f8f5f0]/90 backdrop-blur-md rounded-full shadow-md transition-transform duration-300 ease-out active:scale-95 hover:scale-105 animate-breathing"
      >
        🌿
      </button>
      {/* <button
        onClick={onClick}
        className=" bottom-4 right-4 z-40 text-3xl bg-[#f8f5f0]/80 backdrop-blur-sm p-3 rounded-full shadow-md md:hidden animate-breathing"
      >
        🌿
      </button> */}
    </div>
  );
};

export default FloatingLeafButton;
