"use client";
import React, { useState } from "react";
import Task3Card from "./_components/card";
import {courseConfig} from "../_configs/task-two-config"
function Task3Page() {
  const [activeCardIndex, setActiveCardIndex] = useState(0);

  return (
    <div className=" flex flex-col space-y-16 mx-auto">
      <section className="flex flex-col gap-4 ">
        <h1 className="text-2xl text-[#414141] font-semibold">
          {" "}
          Explore our classes and master trending skills!
        </h1>
        <h2 className="text-[2rem] font-bold text-[#2B2B2B]">
          Dive Into{" "}
          <span className="text-[#1DA077]">What's Hot Right Now! </span> 🔥
        </h2>
      </section>
      <section className="flex space-x-8">
        {courseConfig.map((course, index) => (
          <Task3Card
            activeCardIndex={activeCardIndex}
            setActiveCardIndex={setActiveCardIndex}
            key={course.heading}
            index={index}
            heading={course.heading}
            subHeading={course.subHeading}
            noOfCourses={course.noOfCourses}
          />
        ))}
      </section>
    </div>
  );
}

export default Task3Page;