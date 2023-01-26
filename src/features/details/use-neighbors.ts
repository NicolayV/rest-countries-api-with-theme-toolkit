import { useAppDispatch } from "store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectNeighbors } from "./details-selectors";
import { loadNeighborsByBorder } from "./details-slice";

const useNeighbors = (borders: string[] = []) => {
  const dispatch = useAppDispatch();
  const neighbors = useSelector(selectNeighbors);

  useEffect(() => {
    if (borders.length) {
      dispatch(loadNeighborsByBorder(borders));
    }
  }, [borders, dispatch]);

  return [neighbors];
};
export { useNeighbors };
