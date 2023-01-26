import { useDetails } from "./use-details";
import { Info } from "./Info";
import { NavigateFunction } from "react-router-dom";

interface CountryDetailsProps {
  name?: string;
  navigate: NavigateFunction;
}

const CountryDetails = (props: CountryDetailsProps) => {
  const { name = "", navigate } = props;

  const [currentCountry, { status, error }] = useDetails(name);

  return (
    <>
      {status === "loading" && <h2>Loading...</h2>}
      {error && <h2>{error}</h2>}
      {currentCountry && <Info push={navigate} {...currentCountry} />}
    </>
  );
};
export { CountryDetails };
