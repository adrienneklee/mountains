import React, { useEffect, useRef } from "react";
import "./App.css";
import WebGLApp from "./webgl-app/webgl-app";

function App() {
  const rootRef = useRef<HTMLDivElement>(null);
  const webglRef = useRef<WebGLApp | null>(null);

  useEffect(() => {
    // Initialize WebGLApp and append the WebGLRenderer camvas to rootRef.current

    if (!webglRef.current && rootRef.current) {
      webglRef.current = new WebGLApp(rootRef.current);
    }
  }, []);

  return <div ref={rootRef}></div>;
}

export default App;
