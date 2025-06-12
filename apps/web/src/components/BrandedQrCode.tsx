import React from "react";
// import breatheIcon from "../assets/animations/breathe.json"; // path to your logo
// import breatheIcon from "logo.png"; // path to your logo
import { QRCodeCanvas } from "qrcode.react";


const BrandedQRCode = () => {
    return (
        <div className="p-4 rounded-xl bg-white shadow-md inline-block">
            <QRCodeCanvas
                value="https://breathe.living"
                size={200}
                bgColor="#ffffff"
                fgColor="#3c3a37"
                level="H" // High error correction for logo overlay
                includeMargin={false}
                imageSettings={{
                    src: "/logo-rounded.png",
                    x: undefined,
                    y: undefined,
                    height: 70,
                    width: 70,
                    excavate: true,
                }}
            />
        </div>
    );
};

export default BrandedQRCode;