import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Map from "./components/Map";
import MapLegend from "./components/MapLegend";
import WelcomeModal from "./components/WelcomeModal";
import About from "./components/About";
import Blog from "./components/Blog";
import Links from "./components/Links";
import "./App.css";

function App() {
  const location = useLocation();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(location.pathname === "/");
  }, [location.pathname]);

  return (
    <div className="app-layout">
      <Header />
      <Routes>
        <Route
          index
          element={
            <>
              <Map />
              <MapLegend />
              <WelcomeModal
                open={showModal}
                onClose={() => setShowModal(false)}
              />
            </>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/links" element={<Links />} />
      </Routes>
    </div>
  );
}

export default App;
