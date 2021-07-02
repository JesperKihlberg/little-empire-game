import React from "react";
import "./styles.css";
import Map from "./components/MapContainer";
import MapGrid from "./components/IsometricMapGrid";
import SizeWrapper from "./components/SizeWrapper";
import { useMachine } from "@xstate/react";
import mapMachine from "./machines/mapMachine";
export default function App() {
  // ,
  //   bounds: props.bounds || {
  //     x: 0,
  //     y: 0,
  //     height: 10000,
  //     width: 10000,
  //   },
  const [state, sendMachine] = useMachine(mapMachine, {});
  function send(event: string, payload: any) {
    console.log("Event - Payload", { event, payload });

    sendMachine(event, payload);
  }
  console.log(state);

  return (
    <div className="App">
      <div style={{ zIndex: 5, position: "absolute", width: "100%" }}>
        <h1>Hello CodeSandbox</h1>
        <div>
          <p className="mt-1">State</p>
          <pre>
            <code>{JSON.stringify(state.value, null, 2)}</code>
          </pre>
          <p className="mt-1">Context:</p>
          <pre>
            <code>{JSON.stringify(state.context, null, 2)}</code>
          </pre>
        </div>
      </div>
      <div style={{ position: "absolute", top: "0", bottom: "0", left: "0", right: "0" }}>
        <SizeWrapper onSizeChanged={(size) => send("SET_CONTAINER_BOUNDS", { size })}>
          <Map>
            <MapGrid
              mapBounds={{
                x: 0,
                y: 0,
                height: 1000,
                width: 1000,
              }}
            />
          </Map>
        </SizeWrapper>
      </div>
    </div>
  );
}
