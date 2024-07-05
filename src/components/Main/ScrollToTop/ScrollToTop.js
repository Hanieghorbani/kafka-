import React from "react"
import { animateScroll } from "react-scroll"
import { IoIosArrowUp } from "react-icons/io"
export default function ScrollToTop() {
  return (
    <button
      className="rounded-full fixed sm:bottom-10 lg:bottom-16  sm:left-10 lg:left-16 bg-secondary sm:w-10 sm:h-10 lg:w-14 lg:h-14 border-none outline-none text-white z-50 flex justify-center items-center"
      onClick={() => {
        animateScroll.scrollToTop()
      }}
    >
      <IoIosArrowUp className="sm:text-2xl lg:text-4xl" />
    </button>
  )
}
