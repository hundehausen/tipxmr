import React from "react";
import { Link } from "react-router-dom";
import { BiUpsideDown } from "react-icons/bi";
function StreamerNotFound() {
  return (
    <div className="flex flex-grow justify-center">
      <div className="self-center text-center">
        <BiUpsideDown size="4em" className="mx-auto" />
        <h2 className="text-xl">Oops, this streamer does not exist!</h2>
        <Link to="/streamerpage">
          <p className="underline text-xmrorange">See who else is online</p>
        </Link>
      </div>
    </div>
  );
}

export default StreamerNotFound;
