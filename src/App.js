import { useEffect, useState, useCallback } from "react"
import ScrollToTop from "./components/Main/ScrollToTop/ScrollToTop"
import ContextData from "./ContextData/ContextData"
import useScroll from "./hooks/useScroll"
import routes from "./Routes"

import { useNavigate, useRoutes } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"

import swal from "sweetalert"
import axios from "axios"
import AOS from "aos"

function App() {
  const navigate = useNavigate()
  const router = useRoutes(routes)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isOpenSidebarMenu, setIsOpenSidebarMenu] = useState(false)
  const [isOpenSidebarMenuPAdmin, setIsOpenSidebarMenuPAdmin] = useState(false)
  const [isOpenSidebarCart, setIsOpenSidebarCart] = useState(false)
  const [isOpenSideSearch, setIsOpenSideSearch] = useState(false)
  const [reLoading, setReLoading] = useState(false)

  const [userInfos, setUserInfos] = useState([])
  const [categorys, setCategorys] = useState([])
  const [products, setProducts] = useState([])
  const [infos, setInfos] = useState([])
  const [cart, setCart] = useState([])
  const [favourites, setFavourites] = useState([])
  const [articles, setArticles] = useState([])

  const [token, setToken] = useState("")
  const [userPanelSubMenu, setUserPanelSubMenu] = useState("پیشخوان")
  const [countProduct, setCountProduct] = useState(1)
  const [isScrollBtnVisible, offset] = useScroll(400)

  const localStorageToken = JSON.parse(localStorage.getItem("user"))
  const config = {
    headers: {
      Authorization: `Bearer ${
        !localStorageToken ? "null" : localStorageToken.token
      }`,
      "Content-Type": "application/json",
    },
  }
  const formDataConfig = {
    headers: {
      Authorization: `Bearer ${
        !localStorageToken ? "null" : localStorageToken.token
      }`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }

  const login = useCallback((userInfos, token) => {
    setToken(token)
    setIsLoggedIn(true)
    setUserInfos(userInfos)
    localStorage.setItem("user", JSON.stringify({ token }))
  }, [])

  const logout = useCallback(() => {
    setToken(null)
    setUserInfos({})
    setIsLoggedIn(false)
    localStorage.removeItem("user")
  })

  function logoutHandler() {
    swal({
      text: " آیا می خواهید از حساب کاربری خود خارج شوید؟",
      icon: "warning",
      buttons: ["لغو", "خروج"],
    }).then((res) => {
      if (res) {
        swal({
          text: "شما با موفقیت از حساب کاربری خود خارج شدید",
          icon: "success",
          dangerMode: false,
          buttons: "تایید",
        }).then((val) => {
          logout()
          navigate("/")
        })
      }
    })
  }

  function getAllCategorys() {
    axios
      .get("https://lafka-back.liara.run/v1/category")
      .then((res) => {
        setCategorys(res.data)
      })
      .catch((err) => console.log(err))
  }

  function getAllProducts() {
    axios
      .get("https://lafka-back.liara.run/v1/courses")
      .then((res) => {
        setProducts(res.data)
      })
      .catch((err) => console.log(err))
  }

  function getAllArticles() {
    axios
      .get("https://lafka-back.liara.run/v1/articles")
      .then((res) => setArticles(res.data))
      .catch((err) => console.log(err))
  }

  function addToCart(prodInfos, newPrice) {
    if (isLoggedIn) {
      const existingItem = cart.find((prod) => prod._id === prodInfos._id)
      if (existingItem) {
        if (newPrice) {
          const addNewInfos = cart.map((prod) => {
            return prod._id == prodInfos._id
              ? { ...prod, count: prod.count + 1, price: newPrice }
              : prod
          })
          setCart(addNewInfos)
          localStorage.setItem("cart", JSON.stringify(addNewInfos))
        } else {
          const addCountProd = cart.map((prod) => {
            return prod._id == prodInfos._id
              ? { ...prod, count: prod.count + 1 }
              : prod
          })
          setCart(addCountProd)
          localStorage.setItem("cart", JSON.stringify(addCountProd))
        }
      } else {
        let updateCart
        if (newPrice) {
          updateCart = [...cart, { ...prodInfos, count: 1, price: newPrice }]
        } else {
          updateCart = [...cart, { ...prodInfos, count: 1 }]
        }
        setCart(updateCart)
        localStorage.setItem("cart", JSON.stringify(updateCart))
      }
      toast.success("محصول با موفقیت اضافه شد", {
        position: toast.POSITION.TOP_LEFT,
      })
    } else {
      swal({
        text: "ابتدا وارد حساب کاربری خود شوید",
        icon: "warning",
        dangerMode: false,
        buttons: "تایید",
      }).then((val) => {
        navigate("/login")
      })
    }
  }

  function minesCart(prodInfos, removeAll) {
    if (prodInfos.count > 1 && !removeAll) {
      const minesCountProd = cart.map((prod) => {
        return prod._id == prodInfos._id
          ? { ...prod, count: prod.count - 1 }
          : prod
      })
      setCart(minesCountProd)
      localStorage.setItem("cart", JSON.stringify(minesCountProd))
    } else if (prodInfos.count == 1 || removeAll) {
      const filterdCart = cart.filter((prod) => prod._id !== prodInfos._id)
      setCart(filterdCart)
      localStorage.setItem("cart", JSON.stringify(filterdCart))
    }
    toast.success("محصول با موفقیت حذف شد", {
      position: toast.POSITION.TOP_LEFT,
    })
  }

  function getInfos() {
    axios
      .get("https://lafka-back.liara.run/v1/infos/index")
      .then((res) => {
        setInfos(res.data)
      })
      .catch((err) => console.log(err))
  }

  function addfavouriteHandler(prodInfos) {
    const existingItem = favourites.find((prod) => prod._id === prodInfos._id)
    if (existingItem) {
      toast.error("این محصول در لیست علاقه مندی های شما وجود دارد", {
        position: toast.POSITION.TOP_LEFT,
      })
    } else {
      setFavourites((prev) => [...prev, prodInfos])
      localStorage.setItem(
        "favourites",
        JSON.stringify([...favourites, prodInfos])
      )
      toast.success("محصول به لیست علاقه مندی ها اضافه شد", {
        position: toast.POSITION.TOP_LEFT,
      })
    }
  }

  function removefavourite(prodInfos) {
    const filterdItems = favourites.filter((prod) => prod._id !== prodInfos._id)
    setFavourites(filterdItems)
    localStorage.setItem("favourites", JSON.stringify(filterdItems))
    toast.success("محصول با موفقیت از لیست علاقه مندی ها خارج شد", {
      position: toast.POSITION.TOP_LEFT,
    })
  }

  //for get user data
  useEffect(() => {
    if (localStorageToken) {
      axios
        .get("https://lafka-back.liara.run/v1/auth/me", config)
        .then((userDatas) => {
          setIsLoggedIn(true)
          setUserInfos(userDatas.data)
        })
        .catch((err) => console.log(err))
    }
  }, [token, reLoading])

  useEffect(() => {
    const cartInLoacalStorage = JSON.parse(localStorage.getItem("cart"))
    const favouritesInLoacalStorage = JSON.parse(
      localStorage.getItem("favourites")
    )
    if (cartInLoacalStorage) {
      setCart(cartInLoacalStorage)
    } else {
      setCart([])
    }
    if (favouritesInLoacalStorage) {
      setFavourites(favouritesInLoacalStorage)
    } else {
      setFavourites([])
    }
    getAllCategorys()
    getAllProducts()
    getInfos()

    AOS.init({})
  }, [])

  return (
    <div className="overflow-x-hidden">
      <ContextData.Provider
        value={{
          getAllCategorys,
          getAllProducts,
          login,
          logout,
          addToCart,
          minesCart,
          logoutHandler,
          setIsOpenSidebarMenu,
          setIsOpenSidebarCart,
          setIsOpenSideSearch,
          setCountProduct,
          setCart,
          setReLoading,
          setUserPanelSubMenu,
          setIsOpenSidebarMenuPAdmin,
          setFavourites,
          addfavouriteHandler,
          removefavourite,
          getAllArticles,
          userInfos,
          categorys,
          products,
          countProduct,
          cart,
          infos,
          isLoggedIn,
          isOpenSidebarMenu,
          isOpenSidebarCart,
          isOpenSideSearch,
          isOpenSidebarMenuPAdmin,
          reLoading,
          userPanelSubMenu,
          config,
          favourites,
          formDataConfig,
          articles,
        }}
      >
        {router}
        <ToastContainer autoClose={1000} rtl />
        {isScrollBtnVisible && offset > 400 && <ScrollToTop />}
      </ContextData.Provider>
    </div>
  )
}

export default App
