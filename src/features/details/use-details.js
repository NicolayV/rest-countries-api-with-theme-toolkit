import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearDetails,
  loadCountryByName,
  selectDetails,
} from "./details-slice";

const useDetails = (name) => {
  const dispatch = useDispatch();

  const { status, error, currentCountry } = useSelector(selectDetails);

  useEffect(() => {
    dispatch(loadCountryByName(name));

    return () => dispatch(clearDetails());
  }, [dispatch, name]);

  return [currentCountry, { status, error }];
};
export { useDetails };
