import React, { useEffect, useState } from "react";
// import QRCode from "react-qr-code";
import BrandedQRCode from "./BrandedQrCode";
import { trackAction } from "../utils/umami";
import { useLocation, useSearchParams } from "react-router-dom";

const AddToHomePrompt = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    // const [isIOS, setIsIOS] = useState(false);
    const [isDesktop, setIsDesktop] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    // const location = useLocation();
    // const isHome = location.pathname === "/" || location.pathname === "/home";

    useEffect(() => {
        // If the user has already dismissed the popup
        const alreadyDismissed = localStorage.getItem("breathePopupDismissed") === "true";

        const isInStandaloneMode = () =>
            window?.matchMedia('(display-mode: standalone)').matches ||
            (window?.navigator as any)?.standalone === true;

        if (alreadyDismissed) {
            const userAgent = window.navigator.userAgent.toLowerCase();
            const mobile = Boolean(/iphone|ipad|ipod|android/.test(userAgent)); // /iphone|android/.test(userAgent);
            const desktop = !mobile;
            if (!isInStandaloneMode()) {
                trackAction(`ATHP - Not Installed - ${desktop ? "desktop" : mobile ? "mobile" : "unknown"}`, {
                    device: desktop ? "desktop" : mobile ? "mobile" : "unknown",
                });
            }
            return;
        };
        if (isInStandaloneMode()) {
            trackAction("Add to Home Prompt - Using Installed", {
                action: "using_installed",
            });
            return;
        };
    }, [])

    useEffect(() => {
        const message = searchParams.get("message");
        let isWelcome = false;
        if (message === "welcome") {
            isWelcome = true

            // If the user has already dismissed the popup
            const alreadyDismissed = localStorage.getItem("breathePopupDismissed") === "true";

            const isInStandaloneMode = () =>
                window?.matchMedia('(display-mode: standalone)').matches ||
                (window?.navigator as any)?.standalone === true;

            // detecting device type
            const userAgent = window.navigator.userAgent.toLowerCase();
            const mobile = /iphone|ipad|ipod|android/.test(userAgent); // /iphone|android/.test(userAgent);
            // const ios = /iphone|ipad|ipod/.test(userAgent);
            const desktop = !mobile;

            setIsMobile(mobile);
            // setIsIOS(ios);
            setIsDesktop(desktop);

            // not happening
            if (alreadyDismissed) {
                if (!isInStandaloneMode()) {
                    trackAction("Add to Home Prompt - Not Installed yet", {
                        action: "is_already_dismissed",
                        outcome: "not_installed_yet",
                        device: isDesktop ? "desktop" : isMobile ? "mobile" : "unknown",
                    });
                }
                return;
            };

            // welcome message but in installed 
            if (isInStandaloneMode()) {
                // trackAction("Add to Home Prompt - Using Installed", {
                //     action: "using_installed",
                // });
                removeMessageParam();
                return;
            }; // Don’t show popup

            // Delay popup by a few seconds
            const timer = setTimeout(() => {
                if (isWelcome) {
                    setShowPopup(true);
                    trackAction("Add to Home Prompt - Shown", {
                        action: "shown",
                        device: isDesktop ? "desktop" : isMobile ? "mobile" : "unknown",
                    });
                }
                // else {
                //     setShowPopup(true);
                //     trackAction("Add to Home Prompt", {
                //         action: "shown",
                //         device: isDesktop ? "desktop" : isMobile ? "mobile" : "unknown",
                //     });
                // }
            }, 3000);
            return () => clearTimeout(timer);
        }
        else return;
    }, [searchParams]);

    const removeMessageParam = () => {
        // Remove "message" from current params
        const updatedParams = new URLSearchParams(searchParams);
        updatedParams.delete("message");
        setSearchParams(updatedParams);
    }

    const handleClose = () => {
        trackAction("Add to Home Prompt - Closed", {
            action: "closed",
            device: isDesktop ? "desktop" : isMobile ? "mobile" : "unknown",
        });
        removeMessageParam();
        setShowPopup(false);
        localStorage.setItem("breathePopupDismissed", "true");
    };

    if (!showPopup) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
            <div className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-lg relative text-center text-[#5e5a55] font-serif">
                <button
                    className="absolute top-2 right-3 text-xl text-gray-500 hover:text-gray-700"
                    onClick={handleClose}
                >
                    ×
                </button>

                {isMobile && (
                    <>
                        <h2 className="text-xl font-semibold mb-3">🌿 Pin peace to your pocket</h2>
                        <p className="text-sm mb-4">
                            Tap the <strong>Share</strong> button in your browser, then choose <strong>“Add to Home Screen”</strong>.
                        </p>
                        <img
                            src="/assets/breathe-app-view.jpeg"
                            alt="Add to home screen example"
                            className="rounded-lg shadow w-40 mx-auto"
                        />
                        <p className="text-sm mt-4">
                            It adds Breathe like an app on your phone — always there when you need a moment of calm.
                        </p>
                    </>
                )}

                {isDesktop && (
                    <>
                        {/* <h2 className="text-xl font-semibold mb-3">🌿 Open Breathe on your phone</h2> */}
                        <h2 className="text-lg sm:text-xl font-semibold mb-3 text-center">
                            🌿 Carry calm in your palm<br />
                        </h2>
                        <h3 className="text sm:text-m font-semibold mb-3 text-center">
                            {/* read <strong className="italic">Breathe</strong> on your phone — like a living book. */}
                            {/* on your phone, as a soft, living book by your side. */}
                            Breathe — with a living book that listens too.
                        </h3>
                        <img
                            src="/assets/breathe-app-view.jpeg"
                            alt="Add to home screen example"
                            className="rounded-lg shadow w-40 mx-auto my-4"
                        />


                        <p className="text-sm mt-4 mb-1">
                            Scan this QR code to open <strong>breathe.living</strong> on your phone.
                        </p>

                        <BrandedQRCode />

                        <p className="text-sm mt-3">
                            Once there, you can tap <strong>Share</strong> &rarr; <strong>Add to Home Screen</strong>.
                        </p>


                        {/* <p className="text-sm mb-4">
                            <br />It adds Breathe like an app on your phone — calm, soft, and always there.
                        </p> */}


                    </>
                )}
            </div>
        </div>
    );
};

export default AddToHomePrompt;
