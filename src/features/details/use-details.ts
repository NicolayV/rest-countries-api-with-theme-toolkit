import { Status } from "types";
import { Country } from "types/country";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "store";

import { selectDetails } from "./details-selectors";
import { clearDetails, loadCountryByName } from "./details-slice";

const useDetails = (
  name: string
): [Country | null, { error: string | null; status: Status }] => {
  const dispatch = useAppDispatch();

  const { status, error, currentCountry } = useSelector(selectDetails);

  useEffect(() => {
    dispatch(loadCountryByName(name));

    return () => {
      dispatch(clearDetails());
    };
  }, [dispatch, name]);

  return [currentCountry, { status, error }];
};
export { useDetails };
