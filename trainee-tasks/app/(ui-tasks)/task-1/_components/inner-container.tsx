// second layer for sliding cards
import { cn } from "@/lib/utils";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useState } from "react";

function InnerContainer({
  bgColor,
  content,
}: {
  bgColor: string;
  content:
    | readonly [React.JSX.Element]
    | readonly [React.JSX.Element, React.JSX.Element];
}) {
  const [currentContent, setCurrentContent] = useState({
    index: 0,
    content: content[0],
  });
  // current contenet on the slide
  return (
    <div
      className={cn(
        `h-full w-full flex flex-col z-0 space-y-0 relative rounded-3xl overflow-clip `
      )}
    >
      <div
        className="absolute h-1/3 w-[22.75%] flex justify-center items-center rounded-full top-1/2
         -translate-y-1/2 -left-8  bg-background 
     
      "
      >
        <button
          onClick={() => {
            setCurrentContent((prev) => {
              // slider logic --
              if (prev.index > 0) {
                return {
                  content: content[prev.index - 1],
                  index: prev.index - 1,
                };
              }
              return prev;
            });
          }}
          className="w-18 h-18 z-10 hover:bg-gray-100 cursor-pointer shadow-md flex justify-center items-center bg-background rounded-full absolute left-8"
        >
          <ArrowLeft className="w-8  h-8 text-gray-500" />
        </button>
      </div>
      <div
        className="absolute h-1/3 w-[22.75%] flex justify-center items-center rounded-full top-1/2 -translate-y-1/2 -right-8  bg-white 
      "
      >
        <button
          onClick={() => {
            setCurrentContent((prev) => {
              // slider logic ++
              if (prev.index < content.length - 1) {
                console.log(prev.index, content.length - 1);
                return {
                  content: content[prev.index + 1],
                  index: prev.index + 1,
                };
              }
              return prev;
            });
          }}
          className="w-18 hover:bg-gray-100 h-18 z-10 shadow-md cursor-pointer  flex justify-center items-center bg-white rounded-full absolute right-8"
        >
          <ArrowRight className="w-8 h-8   text-gray-500" />
        </button>
      </div>
      <div className={cn("bg-red-500 flex-1 -z-10 rounded-3xl", bgColor)} />
      <div className={cn("bg-red-500 flex-1 -z-10 rounded-3xl", bgColor)} />
      <div className={cn("bg-red-500 flex-1 -z-10 rounded-3xl", bgColor)} />
      <div
        key={currentContent.index}
        className="absolute inset-y-0 w-7/10 bg-none h-full self-center"
      >
        {currentContent.content}
      </div>
    </div>
  );
}

export default InnerContainer;