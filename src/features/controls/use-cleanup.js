import { useDispatch } from "react-redux";
import { clearControls } from "./controls-slice";

const useCleanUp = () => {
  const dispatch = useDispatch();

  const cleanUp = () => {
    dispatch(clearControls());
  };
  return cleanUp;
};

export { useCleanUp };
