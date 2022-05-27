import { useDetails } from "./use-details";
import { Info } from "./Info";

const CountryDetails = (props) => {
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
