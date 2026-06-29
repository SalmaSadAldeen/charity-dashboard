import { useSelector, useDispatch } from "react-redux";
import { setTab, setSearch } from "../store/layoutSlice";
export function useLayout() {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state) => state.layout.searchQuery);

  const handleSearch = (query) => {
    dispatch(setSearch(query));
  };
  return {
    
    
    searchQuery,
    handleSearch,
  };
}
