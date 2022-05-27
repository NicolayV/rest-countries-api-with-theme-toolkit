import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectControls } from "../controls/controls-slice";
import {
  loadCountries,
  selectCountriesInfo,
  selectVisibleCountries,
} from "./countries-slice";

const useCountries = () => {
  const dispatch = useDispatch();
  const { search, region } = useSelector(selectControls);
  const { status, error, qty } = useSelector(selectCountriesInfo);
  const countries = useSelector((state) =>
    selectVisibleCountries(state, { search, region })
  );

  useEffect(() => {
    if (!qty) {
      dispatch(loadCountries());
    }
  }, [qty, dispatch]);

  return [countries, { error, status }];
};
export { useCountries };
