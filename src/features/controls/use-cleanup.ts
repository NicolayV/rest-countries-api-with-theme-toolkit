import { useAppDispatch } from "store";
import { clearControls } from "./controls-slice";

const useCleanUp = () => {
  const dispatch = useAppDispatch();

  const cleanUp = () => {
    dispatch(clearControls());
  };

  return cleanUp;
};

export { useCleanUp };

// const useCleanUp = () => {
//   const dispatch = useAppDispatch();

//   const cleanUp = () => dispatch(clearControls());

//   return () => dispatch(cleanUp());
// };

// export { useCleanUp };
