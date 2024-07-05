// panel admin pages
import PAdminPrivate from "./components/Privates/PAdminPrivate"
import AdminPanel from "./pages/Admin-panel/Index"
import MainAdminPanel from "./pages/Admin-panel/Main/Main"
import Users from "./pages/Admin-panel/Users/Users"
import AdminProducts from "./pages/Admin-panel/Products/Products"
import AdminArticles from "./pages/Admin-panel/Articles/Articles"
import AdminCategory from "./pages/Admin-panel/Category/Category"
import AdminContacts from "./pages/Admin-panel/Messages/Messages"
import Comments from "./pages/Admin-panel/Comments/Comments"
import Offers from "./pages/Admin-panel/Offers/Offers"
import DiscountG from "./pages/Admin-panel/DiscountG/DiscountG"

//main pages
import Index from "./pages/Main/Index/Index"
import About from "./pages/Main/About/About"
import Blogs from "./pages/Main/Blogs/Blogs"
import BlogInfo from "./pages/Main/BlogInfo/BlogInfo"
import Branches from "./pages/Main/Branches/Branches"
import Cart from "./pages/Main/Cart/Cart"
import Contact from "./pages/Main/Contacts/Contacts"
import Favourites from './pages/Main/Favorites/Favorites'
import Login from "./pages/Main/Login/Login"
import Shop from "./pages/Main/Shop/Shop"
import ProductCategory from "./pages/Main/Product-category/Product-category"
import ProductInfo from "./pages/Main/Product-info/Product-info"
import Register from "./pages/Main/Register/Register"
import Search from "./pages/Main/Search/Search"
import Checkout from "./pages/Main/Checkout/Checkout"

// user panel
import PUserPrivate from "./components/Privates/PUserPrivate"
import UserPanel from "./pages/UserPanel/Index"
import MainUserPanel from "./pages/UserPanel/Main/Main"
import Orders from "./pages/UserPanel/Orders/Orders"
import ViewOrder from "./pages/UserPanel/ViewOrder/ViewOrder"
import EditAccount from "./pages/UserPanel/EditAccount/EditAccount"

import NotFound from "./pages/404/404"

const routes = [
  { path: "/", element: <Index /> },
  { path: "/about", element: <About /> },
  { path: "/blogs", element: <Blogs /> },
  { path: "/blogInfo/:shortName", element: <BlogInfo /> },
  { path: "/locations", element: <Branches /> },
  { path: "/cart", element: <Cart /> },
  { path: "/contact", element: <Contact /> },
  { path: "/favourites", element: <Favourites /> },
  { path: "/login", element: <Login /> },
  { path: "/shop/:page", element: <Shop /> },
  { path: "/productCategory/:shortName", element: <ProductCategory /> },
  { path: "/productInfo/:shortName", element: <ProductInfo /> },
  { path: "/register", element: <Register /> },
  { path: "/search/:searchValue", element: <Search /> },
  { path: "/checkout", element: <Checkout /> },

  //admin panel
  {
    path: "/p-admin/*",
    element: (
      <PAdminPrivate>
        <AdminPanel />
      </PAdminPrivate>
    ),
    children: [
      { path: "", element: <MainAdminPanel /> },
      { path: "users/:page", element: <Users /> },
      { path: "products/:page", element: <AdminProducts /> },
      { path: "articles", element: <AdminArticles /> },
      { path: "messages", element: <AdminContacts /> },
      { path: "comments/:page", element: <Comments /> },
      { path: "offers", element: <Offers /> },
      { path: "discount", element: <DiscountG /> },
      { path: "category", element: <AdminCategory /> },
    ],
  },
  // user panel
  {
    path: "/my-account/*",
    element: (
      <PUserPrivate>
        <UserPanel />
      </PUserPrivate>
    ),
    children: [
      { path: "", element: <MainUserPanel /> },
      { path: "orders", element: <Orders /> },
      { path: "view-order/:orderID", element: <ViewOrder /> },
      { path: "edit-account", element: <EditAccount /> },
    ],
  },
  { path: "*", element: <NotFound /> },
]

export default routes
