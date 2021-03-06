// @ts-nocheck
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, Counter } from "../../components";
import clsx from "clsx";
import { BsDisplay } from "react-icons/bs";
import { useForm } from "react-hook-form";

function MessageArea({ message, setMessage, charLimit }) {
  const textBoxStyle = clsx([
    "flex flex-grow p-2 mx-3 border border-gray-200 shadow placeholder-gray-200 bg-xmrgray-darker rounded",
  ]);

  return (
    <div className="flex flex-grow relative h-32 mx-3">
      <textarea
        type="text"
        className={textBoxStyle}
        maxLength={charLimit}
        placeholder="Enter your message here..."
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <p className="bottom-0 right-0 absolute text-gray-200 text-xs tracking-tight px-4">
        {message ? message.length + "/" + charLimit : null}
      </p>
    </div>
  );
}
MessageArea.propTypes = {
  message: PropTypes.string,
  setMessage: PropTypes.func,
  charLimit: PropTypes.number,
};

function EnterMessage({
  donor,
  setDonor,
  setMessage,
  setShowEnterMessage,
  setShowPayment,
  displayName,
  secondPrice,
  total,
  setTotal,
  message,
  charLimit,
  charPrice,
  streamUrl,
  streamPlatform,
  streamLanguage,
  streamDescription,
  streamCategory,
}) {
  const [usdPrice, setUsdPrice] = useState();
  const usdConvert = (usdPrice * total).toFixed(2);
  const [seconds, setSeconds] = useState(0);

  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    // Get MoneroPrice as number
    fetch("https://api.coinpaprika.com/v1/tickers/xmr-monero?quotes=USD")
      .then((response) => response.json())
      .then((res) => res.quotes.USD.price)
      .then(setUsdPrice)
      .catch(console.error);
  }, []);

  useEffect(() => {
    setTotal(secondPrice * seconds + message.length * charPrice);
  }, [message, seconds]);

  // useEffect(() => {
  //   setUsdConvert((usdPrice * total).toFixed(2));
  // }, [total, usdPrice]);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="flex flex-grow justify-center text-gray-200">
      <div className="my-auto">
        <h2 className="text-center text-3xl">
          <span role="img" aria-label="Green Money">
            💸
          </span>
          Donate to <span className="font-bold">{displayName}</span> with Monero
          <span role="img" aria-label="Green Money">
            💸
          </span>
        </h2>
        <div className="flex flex-row justify-evenly items-center">
          <span className="text-xl">{streamLanguage}</span>
          <span className="px-2 py-1 text-sm tracking-wide rounded-full bg-xmrgray-darker ">
            #{streamCategory}
          </span>

          <a href={streamUrl}>
            <BsDisplay size="1.2em" color="text-gray-700" />
          </a>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col text-center">
            <div className="flex flex-grow relative mx-3">
              <input
                name="donorName"
                type="text"
                align="middle"
                maxLength={15}
                className="block m-4 p-2 border border-gray-200 bg-xmrgray-darker placeholder-gray-200 w-2/3 mx-auto text-center rounded"
                placeholder="Your Name"
                ref={register({
                  required: "You forgot to put in a name",
                })}
                onChange={(e) => {
                  setDonor(e.target.value);
                }}
              />
              <p className="bottom-0 right-0 absolute text-gray-200 text-xs tracking-tight px-4">
                {donor ? donor.length + "/15" : null}
              </p>
            </div>
            <p className="text-xmrorange mb-3">
              {errors.donorName ? "Please enter a name" : null}
            </p>

            <MessageArea
              message={message}
              setMessage={setMessage}
              charLimit={charLimit}
            />
            <div className="w-3/5 mx-auto m-4 text-gray-200">
              {secondPrice ? (
                <div className="flex items-center justify-center">
                  <p className="tracking-tight mr-3">Showtime: </p>
                  <Counter count={seconds} setCount={setSeconds} />
                  <p className="tracking-tight ml-3">seconds</p>
                </div>
              ) : null}

              <div className="my-3">
                <p className="tracking-tight text-xs">Minimum amount:</p>
                {total.toFixed(5)} XMR = {usdConvert} $
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center">
            <Button
              onClick={() => {
                setShowEnterMessage(false);
                setShowPayment(true);
              }}
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
EnterMessage.propTypes = {
  donor: PropTypes.string,
  setDonor: PropTypes.func,
  setMessage: PropTypes.func,
  setShowEnterMessage: PropTypes.func,
  setShowPayment: PropTypes.func,
  displayName: PropTypes.string,
  secondPrice: PropTypes.number,
  total: PropTypes.number,
  setTotal: PropTypes.func,
  message: PropTypes.string,
  charLimit: PropTypes.number,
  charPrice: PropTypes.number,
  streamUrl: PropTypes.string,
  streamPlatform: PropTypes.string,
  streamLanguage: PropTypes.string,
  streamDescription: PropTypes.string,
  streamCategory: PropTypes.string,
};
export default EnterMessage;
