import { useSelector, useDispatch } from "react-redux";
import { setTab, setSearch } from "../store/layoutSlice";
export function useLayout() {
  const dispatch = useDispatch();
  const currentTab = useSelector((state) => state.layout.currentTab);
  const searchQuery = useSelector((state) => state.layout.searchQuery);

  const changeTab = (tabId) => {
    dispatch(setTab(tabId));
  };
  const handleSearch = (query) => {
    dispatch(setSearch(query));
  };
  return {
    currentTab,
    changeTab,
    searchQuery,
    handleSearch,
  };
}
