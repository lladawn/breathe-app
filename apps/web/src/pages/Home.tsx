import { useRef, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import LottieAnimation from "../components/LottieAnimation";
import breathing from "../assets/animations/breathe.json";
import { trackAction } from "../utils/umami";
import AddToHomePrompt from "../components/AddToHomePrompt";


const HomePage = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [hasScrolledToEnd, setHasScrolledToEnd] = useState(false);
  const alreadyDismissed = localStorage.getItem("breathePopupDismissed") === "true";

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const fired = {
      ten: false,
      fifty: false,
      hundred: false,
    };

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 20;
      const scrollPercent = (scrollTop / (scrollHeight - clientHeight)) * 100;

      if (scrollPercent >= 10 && !fired.ten) {
        trackAction("Home — Scrolled 10%");
        fired.ten = true;
      }
      if (scrollPercent >= 50 && !fired.fifty) {
        trackAction("Home — Scrolled 50%");
        fired.fifty = true;
      }
      if (scrollPercent >= 100 && !fired.hundred) {
        trackAction("Home — Scrolled to End of Story");
        fired.hundred = true;
      }

      if (isAtBottom && !hasScrolledToEnd) {
        setHasScrolledToEnd(true);
        if (!alreadyDismissed) {
          setSearchParams((prev) => {
            const newParams = new URLSearchParams(prev);
            newParams.set("message", "welcome");
            return newParams;
          });
        }
        // wait for 10 seconds, or show a navigating in 10s in UI...
        // navigate("/storybook")
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [hasScrolledToEnd, setSearchParams]);

  return (
    <>
      <div className="relative w-full font-serif text-[#5e5a55] flex flex-col items-center justify-start px-4">
        <div className="relative z-10 w-full max-w-xl">
          {/* Heading */}
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 tracking-wide text-center">
            Breathe
          </h1>
          <p className="text-lg sm:text-xl italic text-center mb-8 text-[#6e6861]">
            A living book that listens too.
          </p>

          {/* Soft Divider */}
          <hr className="border border-[#3c3a37] opacity-20 mb-8" />

          {/* Background Animation */}
          <LottieAnimation animation={breathing} opacity={0.2} scale={2} />

          {/* Scrollable Content */}
          <div
            className="relative bg-[#f8f4ef] bg-opacity-80
            rounded-lg px-4 max-h-[45vh] mb-8"
          // shadow-inner
          // transition-all
          // style={{
          //   // boxShadow: "inset 0 -20px 20px -20px rgba(0,0,0,0.1)", // subtle fade at bottom
          // }}
          >
            <div
              ref={containerRef}
              className="text-lg py-4 overflow-y-auto scrollbar-hide
                sm:text-xl leading-relaxed space-y-6 max-h-[45vh]"
            >
              <p className="first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-2">
                You know, I didn’t set out to build an app.
              </p>
              <p>I just… needed a place.</p>
              <p>
                A place to pause. To sit with thoughts I couldn’t quite put into
                words.
              </p>
              <p>
                To feel something real in a world that was always rushing me past
                it.
              </p>
              <p>
                There were nights I couldn’t sleep — not because something was
                wrong, but because something inside me hadn’t been heard.
              </p>
              <p>
                That’s how <span className="font-semibold italic">Breathe</span>{" "}
                started. Not as a product. As a whisper. A quiet feeling that
                maybe others felt it too.
              </p>
              <p>
                So I started writing. One chapter at a time. Not code first — but
                a story. Something that could sit with someone the way I needed
                someone to sit with me.
              </p>
              <p>
                (Of course, there was a lot of here and theres in the process, not
                that simple for sure. You can dig in{" "}
                <a className="underline" href="/heart">
                  about me
                </a>
                <span> </span>:p. But later.)
              </p>
              <p className="italic">Continuing...</p>
              <p>
                This isn’t a social app.
                <br /> (Though you get to connect to fellow breathers, but it
                fades — just like life.) <br />
                This is a living book. Every chapter invites you in — not to
                scroll, but to feel. <br />
                Not to be seen, but to
                <span className="font-semibold"> see yourself</span>.
              </p>
              <p>
                You can write. You can reflect. You can walk with someone for a
                while — not to fix each other, just to{" "}
                <span className="font-semibold">be</span> there.
                <br />
                <span className="italic">
                  (as you would know we are human b.e.i.n.g.s.)
                </span>
              </p>
              <p>And if all you do is breathe here… that’s more than enough.</p>
              <p>
                <span className="font-semibold">I’m still building it. </span> But
                I wanted you to know what it really is.
              </p>
              <p>
                Breathe isn’t just an app. It’s a deep heartful space... or at the
                least it’s trying to be...
              </p>
              <p>
                For you. For me. For all of us who are still trying to live gently
                in a world that forgot how to pause.
              </p>
              <p className="italic">
                (To just tell a little bit more about the nurturing of Breathe — I
                struggled in staying just in code — as I felt it takes away my
                creativity — so I found my writing pad on Vs code — with Breathe.
                Hence this emotional digital village — became a living book —
                connecting all the breathers — in the very essence of exhaling in
                their writing — with a quiet inhale... through this and many more
                hearts.)
              </p>
            </div>

            {/* Shadow overlay at the bottom */}
            <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-[#f4f1eb] to-transparent pointer-events-none" />
            {
              !hasScrolledToEnd &&
              <>
                {/* Optional scroll indicator */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-[#aaa] text-sm animate-bounce">
                  ↓
                </div>
              </>
            }

          </div>


          {/* CTA Button */}
          <div className="flex justify-center">
            <button
              onClick={() => {
                trackAction("Home — Clicked Step Inside");
                if (alreadyDismissed) navigate("/storybook")
                else navigate("/storybook?message=welcome");
              }}
              className="bg-[#f1ece4] hover:bg-[#e7e2db] text-[#3c3a37] font-medium px-6 py-2 rounded-md transition shadow-sm hover:shadow-md"
            >
              Step inside the story →
            </button>
          </div>
        </div>
      </div>
    </>

  );
};

export default HomePage;
