import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./component/home";
import Navbar from "./ui/Navbar";
import Footer from "./ui/Footer";
import Map from "./map";
import CatBreed from "./component/catBreedList";
import CatBreedDetail from "./component/catBreedDetail";
import CompareCat from "./component/compare/CatCompare";
import ListBlogPage from "./component/blogList";
import TextBlogList from "./component/blogDetail";
import Manage from "./component/manage";
import ManageAdmin from "./component/admin";
import ConfirmUserLink from "./component/auth/ConfirmUser";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store";
import { sessionService } from "redux-react-session";
import Forbidden from "./component/notFoundPage/403";
import ResetPassword from "./component/auth/ResetPasswordPage";

const root = ReactDOM.createRoot(document.getElementById("root"));

if (
  window.location.pathname.toLocaleUpperCase() === "/MANAGE" &&
  window.location.search === ""
) {
  window.location.href = "Manage?profile";
}

if (
  window.location.pathname.toLocaleUpperCase() === "/ADMIN" &&
  window.location.search === ""
) {
  window.location.href = "Admin?cat-data-list";
}

sessionService
  .loadUser()
  .then((data) => {
    if (
      window.location.pathname.toLocaleUpperCase() === "/MANAGE" &&
      (data.type !== 2 || !data.type)
    ) {
      window.location.href = "/403";
    } else if (
      window.location.pathname.toLocaleUpperCase() === "/ADMIN" &&
      (data.type !== 1 || !data.type)
    ) {
      window.location.href = "/403";
    }
  })
  .catch((err) => {
    window.location.href = "/";
  });

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      {window.location.pathname.toLocaleUpperCase() !== "/MANAGE" &&
        window.location.pathname.toLocaleUpperCase() !== "/ADMIN" && <Navbar />}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="blogs" element={<ListBlogPage />} />
          {/* <Route path="blogs-detail/:id" element={<BlogDetail />} /> */}
          <Route path="cat-compare" element={<CompareCat />} />
          <Route path="map" element={<Map />} />
          <Route path="cat-breeds-list" element={<CatBreed />} />
          <Route path="cat-breeds-detail/:id" element={<CatBreedDetail />} />
          <Route path="text-blog-list" element={<TextBlogList />} />
          <Route path="manage" element={<Manage />} />
          <Route path="admin" element={<ManageAdmin />} />
          <Route path="confirmUser" element={<ConfirmUserLink />} />
          <Route path="403" element={<Forbidden />} />
          <Route path="resetPassword" element={<ResetPassword />} />
        </Routes>
      </BrowserRouter>
      {window.location.pathname.toLocaleUpperCase() !== "/MANAGE" &&
        window.location.pathname.toLocaleUpperCase() !== "/ADMIN" && <Footer />}
    </PersistGate>
  </Provider>
);

reportWebVitals();
