import { useDispatch, useSelector } from "react-redux";
import { selectSearch, setSearch } from "./controls-slice";
import { throttle } from "lodash";

const throttled = throttle((item) => item, 1000);

const useSearch = () => {
  const dispatch = useDispatch();
  const search = useSelector(selectSearch);

  const handleSearch = (event) => {
    throttled(dispatch(setSearch(event.target.value)));
  };

  return [search, handleSearch];
};
export { useSearch };
