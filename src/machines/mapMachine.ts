import { Machine, assign } from "xstate";

const zoomLevels = [0.1, 0.5, 1, 2, 3, 4, 5, 10];

interface IBounds {
  x: number;
  y: number;
  width: number;
  height: number;
}

type MapContext = { zoomLevelIndex: number; containerBounds?: IBounds; viewBox?: IBounds };
const setContainerBounds = {
  cond: "notUndefined",
  target: "recalculating",
  actions: ["setContainerBounds"],
};

const mapMachine = Machine<MapContext>(
  {
    id: "mapMachine",
    context: {
      zoomLevelIndex: 1,
      viewBox: undefined,
      containerBounds: undefined,
    },
    strict: true,
    initial: "preinitialize",
    states: {
      preinitialize: {
        on: {
          SET_CONTAINER_BOUNDS: setContainerBounds,
        },
      },
      recalculating: {
        invoke: {
          id: "recalculateBounds",
          src: "recalculateBounds",
          onDone: {
            target: "initialized",
            actions: "setViewBox",
          },
          onError: {
            target: "failure",
          },
        },
      },
      initialized: {
        on: {
          SET_CENTER: {
            target: "initialized",
            actions: [],
          },
          ZOOM: {},
          SET_CONTAINER_BOUNDS: setContainerBounds,
        },
      },
      failure: {},
    },
  },
  {
    guards: {
      notUndefined: (_, event) => event.size != undefined,
    },
    actions: {
      setContainerBounds: assign({
        containerBounds: (_, event) => {
          return event.size;
        },
      }),
      setViewBox: assign({
        viewBox: (_, event) => {
          return event.size;
        },
      }),
    },
  }
);

export default mapMachine;
