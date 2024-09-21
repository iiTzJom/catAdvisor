import React from "react";
import { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlogList from "./component/blog/bloglist";
import Home from "./component/home";
import BlogDetail from "./component/blog/BlogDetail";
import Navbar from "./ui/Navbar";
import Footer from "./ui/Footer";
import Map from "./map";
import CatBreed from "./component/catBreedList";
import CatBreedDetail from "./component/catBreedDetail";
import CompareCat from "./component/compare/CatCompare";
import ListBlogPage from "./component/blogList";
import TextBlogList from "./component/blogDetail";
import Manage from "./component/manage";
import ManageAdmin from "./component/uiAdmin";

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
  window.location.href = "Admin?adminPageManage";
}
root.render(
  <>
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
        <Route path="text-blog-list/:id" element={<TextBlogList />} />
        <Route path="manage" element={<Manage />} />
        <Route path="admin" element={<ManageAdmin />} />
      </Routes>
    </BrowserRouter>
    {window.location.pathname !== "/Manage" &&
      window.location.pathname !== "/admin" && <Footer />}
  </>
);

reportWebVitals();
