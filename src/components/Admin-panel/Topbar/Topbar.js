import React, { useContext, useState, useEffect } from "react"
import ContextData from "../../../ContextData/ContextData.js"

import { IoMdNotifications, IoMdArrowDropup, IoMdClose } from "react-icons/io"
import { IoMoonSharp, IoHomeSharp } from "react-icons/io5"
import { FaBars } from "react-icons/fa6"

import axios from "axios"
import { Link } from "react-router-dom"

export default function Topbar({ isShowNotifs, setIsShowNotifs }) {
  const [notifs, setNotifs] = useState([])
  const { config, setIsOpenSidebarMenuPAdmin, userInfos } =
    useContext(ContextData)

  useEffect(() => {
    getAllNotifs()
  }, [])

  function getAllNotifs() {
    axios
      .get("https://lafka-back.liara.run/v1/auth/me", config)
      .then((userDatas) => {
        setNotifs(userDatas.data.notifications)
      })
      .catch((err) => console.log(err))
  }

  function seeNotif(id) {
    axios
      .put(
        `https://lafka-back.liara.run/v1/notifications/see/${id}`,
        {},
        config
      )
      .then(() => getAllNotifs())
  }

  return (
    <div className="md:rounded-3xl py-3 bg-zinc-100 flex justify-between items-center w-full sm:container-primary md:px-7">
      <div className="flex gap-8 relative">
        <FaBars
          className="sm:block lg:hidden border-2 rounded-full p-3 w-12 h-12 cursor-pointer"
          onClick={() => setIsOpenSidebarMenuPAdmin(true)}
        />
        <Link to={'/'}>

        <IoHomeSharp className="sm:hidden lg:block border-2 rounded-full p-3 w-12 h-12 cursor-pointer" />
        </Link>

        <IoMdNotifications
          className="sm:hidden lg:block border-2 rounded-full p-3 w-12 h-12 cursor-pointer"
          onMouseEnter={() => setIsShowNotifs(true)}
        />
          <IoMoonSharp className="sm:hidden md:block border-2 rounded-full p-3 w-12 h-12 cursor-pointer" />
       

        {isShowNotifs && (
          <ul
            className="absolute sm:top-[0] lg:top-[3.7rem] rounded-xl sm:-left-[14rem] lg:-left-56 text-white  bg-green-400 px-4 py-2 lg:w-[23rem] space-y-3 z-[1000]"
            onMouseLeave={() => setIsShowNotifs(false)}
          >
            <IoMdArrowDropup className="text-green-400 text-4xl -mt-7 sm:hidden lg:block" />
            <IoMdClose
              onClick={() => setIsShowNotifs(false)}
              className="cursor-pointer mr-[10px]"
            />
            {notifs.length > 0 ? (
              <div className="space-y-3">
                {notifs.map((notif) => (
                  <li
                    key={notif._id}
                    className="flex justify-between items-center"
                  >
                    <p>{notif.msg} </p>{" "}
                    <button
                      className="btn text-sm bg-blue-400"
                      onClick={() => seeNotif(notif._id)}
                    >
                      تایید
                    </button>
                  </li>
                ))}
              </div>
            ) : (
              <li className="text-lg mr-[10px]">هیچ پیغامی وجود ندارد!</li>
            )}
          </ul>
        )}
      </div>
      <div className="pr-5 border-r-4 border-zinc-200">
        <div>
          <img src="" alt="" />
          <div className="text-center">
            <p className="font-bold"> {userInfos.name}</p>
            <p className="text-sm">ادمین</p>
          </div>
        </div>
      </div>
    </div>
  )
}
