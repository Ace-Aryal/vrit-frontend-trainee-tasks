// reuable outermost component for the  task-2 layout
"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { motion } from "motion/react";
import InnerContainer from "./inner-container";
type OuterConatinerProps = {
  bgColor: string;
  heading: string;
  subHeading: string;
  imagePosition: "left" | "right";
  paragraph: string;
  svg: React.ReactNode;
  content:
    | readonly [React.JSX.Element]
    | readonly [React.JSX.Element, React.JSX.Element]
    | null;
};
function OuterConatiner({
  bgColor,
  heading,
  subHeading,
  imagePosition = "left",
  paragraph,
  svg,
  content,
}: OuterConatinerProps) {
  // trcking hocered state on card
  const [hovered, setHovered] = useState(false);
  const shouldHideLayer1 = hovered;
  return (
    <div
      onMouseEnter={() => {
        if (content) {
          setHovered(true);
        }
      }}
      onMouseLeave={() => setHovered(false)}
      className="relative aspect-[592/351] max-w-[592px] max-h-[351px] min-w-[395px] min-h-[234px]"
    >
      <motion.div
        initial={{
          opacity: 1,
          x: 0,
          display: "block",
        }}
        animate={{
          x: shouldHideLayer1 ? -2000 : 0,
          opacity: shouldHideLayer1 ? 0 : 1,
        }}
        transition={{
          duration: 1,
          ease: "easeInOut",
        }}
        className={cn(
          `relative h-full w-full py-[58px] bg-red-500 rounded-3xl flex flex-col gap-4 text-white px-[35px] `,
          bgColor,
          {
            "text-left ": imagePosition === "right",
            "text-right": imagePosition === "left",
            "pointer-events-none": shouldHideLayer1,
          }
        )}
      >
        <h3 className="text-3xl  font-bold whitespace-nowrap">{heading}</h3>
        <h4 className=" text-xl font-semibold ">{subHeading}</h4>

        <div className="flex">
          {/* svg overlay */}
          {/* using same component on the basic of odd and even to control flex order */}
          <div
            className={cn("w-2/5 relative ", {
              "order-1": imagePosition === "right",
            })}
          >
            {" "}
            <div
              className={cn(
                "absolute z-10  -bottom-36 animate-vertical-marquee",
                {
                  "-left-32": imagePosition === "left",
                  "-right-20": imagePosition === "right",
                }
              )}
            >
              {svg}
            </div>
          </div>
          <div className="w-3/5">
            <p className="mt-2">{paragraph}</p>
          </div>
        </div>
      </motion.div>
      {!!content && (
        <div
          className={cn("absolute h-full w-full inset-0  -z-10 duration-1000", {
            "z-10": shouldHideLayer1,
          })}
        >
          <InnerContainer bgColor={bgColor} content={content} />
        </div>
      )}
    </div>
  );
}

export default OuterConatiner;