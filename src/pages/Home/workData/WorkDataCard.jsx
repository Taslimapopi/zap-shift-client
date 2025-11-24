import React from "react";
import { GrDeliver } from "react-icons/gr";

const WorkDataCard = ({  title, desc }) => {
  return (
    <div className="bg-white rounded-[24px] shadow-[0_4px_20px_rgba(0,0,0,0.04)] p-8 flex flex-col gap-4">
      <img src={<GrDeliver className="w-12 h-12" />}  alt="" />
      <GrDeliver className="w-12 h-12" /> 

      <h3 className="text-[20px] font-semibold text-[#003C3C]">{title}</h3>

      <p className="text-[15px] text-gray-600 leading-6">{desc}</p>
    </div>
  );
};

export default WorkDataCard;
