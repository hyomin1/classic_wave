import React from "react";
import { FaBook } from "react-icons/fa";

function Title() {
  return (
    <div className="flex items-center">
      <FaBook className="w-6 h-6 mr-2 fill-white" />
      <span className="text-2xl font-bold text-white">CLASSIC_WAVE</span>
    </div>
  );
}

export default Title;
