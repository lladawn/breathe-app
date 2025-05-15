import { useState, useRef, useEffect } from "react";

export const ReflectHeading = () => {
  const quotes = [
    "“The quieter you become, the more you hear.”",
    "“A breath. A thought. That’s enough to begin.”",
    "“Let your thoughts soften — they’ve held enough weight.”",
    "“In stillness, we meet the parts of us we forgot we carried.”",
    "“You are not your thoughts — but they are asking to be seen.”",
    "“When the world is loud, come whisper with yourself.”",
    "“Sometimes the most powerful thing you can say is nothing at all.”",
  ];

  const [quoteIndex, setQuoteIndex] = useState(
    Math.floor(Math.random() * quotes.length)
  );

  // useEffect(() => {
  //   const getRandomIndex = (excludeIndex) => {
  //     let newIndex;
  //     do {
  //       newIndex = Math.floor(Math.random() * quotes.length);
  //     } while (newIndex === excludeIndex);
  //     return newIndex;
  //   };
  //   const interval = setInterval(() => {
  //     setQuoteIndex((prev) => getRandomIndex(prev));
  //   }, 5000); // every 10 seconds
  //   return () => clearInterval(interval);
  // }, [quotes.length]);

  const lastQuoteIndexRef = useRef(quoteIndex);

  useEffect(() => {
    const getRandomIndex = (excludeIndex) => {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * quotes.length);
      } while (newIndex === excludeIndex);
      return newIndex;
    };

    const interval = setInterval(() => {
      const newIndex = getRandomIndex(lastQuoteIndexRef.current);
      lastQuoteIndexRef.current = newIndex;
      setQuoteIndex(newIndex);
    }, 5000); // every 5 seconds

    return () => clearInterval(interval);
  });

  return (
    // <h2 className="flex-1 w-full text-2xl sm:text-3xl font-serif font-semibold text-center text-[#3c3a37] leading-snug transition-all duration-300">
    //   Reflect
    //   <br className="sm:hidden" />
    //   <span className="block text-base font-normal italic text-[#7c766f] mt-1 tracking-wide fade-quote">
    //     {quotes[quoteIndex]}
    //   </span>
    // </h2>
    <h2
      className="flex-1 w-full text-3xl sm:text-4xl 
    font-serif font-semibold text-center text-[#3c3a37] l
    eading-snug relative tracking-wide mb-4"
    >
      Reflect
      <br className="sm:hidden" />
      <div className="mt-1 h-6 sm:h-7 relative">
        {quotes.map((quote, i) => (
          <span
            key={i}
            className={`absolute left-0 right-0 transition-opacity duration-1000 ease-in-out text-base font-normal italic text-[#7c766f] tracking-wide my-1 ${
              i === quoteIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            {quote}
          </span>
        ))}
      </div>
    </h2>
  );
};
