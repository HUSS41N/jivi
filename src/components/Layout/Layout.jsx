import React from "react";
import "./Layout.scss";
const Layout = ({ children, heading }) => {
  return (
    <div>
      <div className="flex flex-col items-center justify-center w-full h-screen">
        <div>
          <p className="layout-header text-lg font-bold bold">{heading}</p>
          <div className="h-0.5 bg-black separator"></div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
