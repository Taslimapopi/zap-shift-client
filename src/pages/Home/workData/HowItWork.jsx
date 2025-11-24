import React from "react";
import WorkDataCard from "./WorkDataCard";

const HowItWork = () => {
   const worksData = [
    {
      id: 1,
      title: "Booking Pick & Drop",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
      icon: "/icons/pick-drop.svg",
    },
    {
      id: 2,
      title: "Cash On Delivery",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
      icon: "/icons/cod.svg",
    },
    {
      id: 3,
      title: "Delivery Hub",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
      icon: "/icons/hub.svg",
    },
    {
      id: 4,
      title: "Booking SME & Corporate",
      desc: "From personal packages to business shipments — we deliver on time, every time.",
      icon: "/icons/sme.svg",
    },
  ];

  return <section className="my-16 max-w-7xl mx-auto px-4">
      <h2 className="text-3xl font-bold mb-10 text-[#003C3C]">
        How it Works
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {
            worksData.map(work=>
                <WorkDataCard key={work.id}
                title={work.title}
                desc={work.desc}
                ></WorkDataCard>
            )
        }
      </div>
    </section>
};

export default HowItWork;
