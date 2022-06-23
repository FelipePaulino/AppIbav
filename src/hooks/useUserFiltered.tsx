import { useContext } from "react";

import { FilteredContext } from "../contexts/Filtered";

export default function useUserFiltered() {
  const { loading, user } = useContext(FilteredContext);

  return { loading, user };
}
