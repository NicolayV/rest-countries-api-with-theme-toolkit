import { Status } from "types/status";
import { Country } from "types";
import { RootState, useAppDispatch } from "store";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import {
  selectCountriesInfo,
  selectVisibleCountries,
} from "./country-selectors";

import { loadCountries } from "./countries-slice";
import { selectControls } from "features/controls/controls-selectors";

const useCountries = (): [
  Country[],
  { error: string | null; status: Status }
] => {
  const dispatch = useAppDispatch();
  const { search, region } = useSelector(selectControls);

  const { status, error, qty } = useSelector(selectCountriesInfo);
  const countries = useSelector((state: RootState) =>
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
