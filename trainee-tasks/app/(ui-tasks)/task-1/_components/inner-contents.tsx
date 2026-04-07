// unique contents which are displayed in the second layer of task 2 cards

export function FirstCardComponentOne() {
  return (
    <div className="relative text-white h-full w-full  z-0 max-w-[592px] max-h-[351px] bg-none">
      <img
        className="h-22 top-6 -left-2 w-22 -rotate-[11.91deg] absolute"
        src="/task-2-wow.png"
        alt="wow-graphic-image"
      />
      <img
        className="h-22 w-22 right-0 absolute rotate-[38.5deg] scale-x-[-1] top-48"
        src="/task-2-wow.png"
        alt="wow-graphic-image"
      />
      <img
        src="/task-2-card-1-person.png"
        alt="person-image"
        className="absolute bottom-0 -left-12 h-80 w-88"
      />
      <p className="absolute top-12 max-w-60 -right-16  font-bold text-xl">
        Clarity unlocked—stickers, sips, and skills all in one go!
      </p>
    </div>
  );
}

export function SecondCardComponentOne() {
  return (
    <div className="relative overflow-hidden text-white h-full w-full  z-0 max-w-[592px] max-h-[351px] bg-none">
      <p className="absolute top-9 max-w-60 left-0  font-bold text-xl">
        Focused faces—learning mode: ON!
      </p>
      <img
        className="absolute bottom-0   h-9/10 max-w-140 max-h-80 -right-20"
        src="/task-2-card-2-slide1-person.png"
        alt="person-image-2"
      />
    </div>
  );
}
export function SecondCardComponentTwo() {
  return (
    <div className="relative overflow-hidden text-white h-full w-full  z-0 max-w-[592px] max-h-[351px] bg-none">
      <p className=" absolute top-9  font-bold text-xl text-center">
        Laptops, lessons, and a whole lot of growth!
      </p>
      <img
        className=" absolute bottom-0 flex-1 self-end  h-9/10 max-w-140 max-h-80 -right-20"
        src="/task-2-card-2-slide2-people.png"
        alt="people-image"
      />
    </div>
  );
}