import React, { useEffect } from "react";
import "./styles.css";
import Map from "./components/Map";
import { useSize } from "./components/useSize";
import SizeWrapper from "./components/SizeWrapper";
export default function App() {
  return (
    <div className="App">
      <div style={{ zIndex: 5, position: "absolute", width: "100%" }}>
        <h1>Hello CodeSandbox</h1>
      </div>
      <div style={{ position: "absolute", top: "0", bottom: "0", left: "0", right: "0" }}>
        <SizeWrapper onSizeChanged={(size) => console.log(size)}>
          <Map />
        </SizeWrapper>
      </div>
    </div>
  );
}
