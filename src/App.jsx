import { useState } from "react";
import Details from "./pages/details/Details";

function App() {
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <div className="max-w-xs max-h-[600px] w-full">
        <Details />
      </div>
    </div>
  );
}

export default App;
