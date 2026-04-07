import React from "react";
import OuterConatiner from "./_components/outer-container";
import { TASK_ONE_CONFIG } from "../_configs/task-one-config";

function TaskOnePage() {
  return (
    <div className="max-w-7xl px-12 mx-auto">
      <div className="mb-12 space-y-5">
        <h1 className=" text-2xl text-[#414141] font-semibold">
          Your SkillShikshya Jourey
        </h1>
        <h2 className="text-[2rem] font-bold text-[#2B2B2B]">
          <span className="text-[#1DA077] font-mons">Step</span> In.{" "}
          <span className="text-[#1DA077]">Skill</span> Up.{" "}
          <span className="text-[#1DA077]">Stand</span> Out. 🚀
        </h2>
      </div>

      <div className="grid  grid-cols-2 gap-10 space-y-4 w-fit ">
        {TASK_ONE_CONFIG.map((config, index) => {
          const { heading, subHeading, paragraph, bgColor, content, svg } =
            config;
          const isEven = (index + 1) % 2 === 0;
          return (
            <OuterConatiner
              imagePosition={isEven ? "right" : "left"}
              heading={heading}
              subHeading={subHeading}
              paragraph={paragraph}
              bgColor={bgColor}
              svg={svg}
              key={heading}
              content={content}
            />
          );
        })}
      </div>
    </div>
  );
}

export default TaskOnePage;