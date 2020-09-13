import React, { useState, useEffect, useRef } from "react";
import ReactLoading from "react-loading";
import PropTypes from "prop-types";
import monerojs from "../libs/monero";

function Payment({ displayName, donor, message, subaddress, getSubaddress }) {
  const [qrcode, setQrcode] = useState("");

  useEffect(() => {
    console.log("useEffect then getSubaddress()");
    getSubaddress();
  }, []);

  // generete QR Code on subaddress change
  useEffect(() => {
    async function generateQrCode() {
      if (subaddress !== null) {
        const qrcode = await monerojs.generateQrCode(subaddress);
        setQrcode(qrcode);
      }
    }
    generateQrCode();
  }, [subaddress]);

  function handleClick(e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  }

  return (
    <div className="flex flex-grow justify-center text-center">
      <div className="text-center my-auto">
        <span className="text-2xl">
          Hey {donor}, send any amount of Monero (XMR) to
        </span>
        <br />
        <img className="mx-auto w-400px h-auto" src={qrcode} alt="qr code" />
        <a href={"monero:" + subaddress} onClick={handleClick}>
          <pre className="text-center overlfow-x-auto text-xs">
            {subaddress}
          </pre>
        </a>
        <h2 className="mt-4">Your Message will be:</h2>
        <span className="italic">{message}</span>
        <div className="flex justify-center mt-6">
          <ReactLoading type="spinningBubbles" color="#F16822" />
        </div>
      </div>
    </div>
  );
}
// Payment property types
Payment.propTypes = {
  displayName: PropTypes.string,
  message: PropTypes.string,
  donor: PropTypes.string,
  subaddress: PropTypes.string,
  getSubaddress: PropTypes.func,
};

export default Payment;
