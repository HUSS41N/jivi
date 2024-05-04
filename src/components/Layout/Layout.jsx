import React from "react";
import "./Layout.scss";

const Layout = ({ children, heading }) => {
  return (
    <div className="layout-container flex flex-col items-center justify-center w-full h-screen">
      <div className="header fixed top-0 w-full">
        <p className="layout-header text-lg font-bold">{heading}</p>
        <div className="h-0.5 bg-black separator"></div>
      </div>
      <div className="content-container flex flex-col items-center justify-center w-full">
        {children}
      </div>
    </div>
  );
};

export default Layout;
