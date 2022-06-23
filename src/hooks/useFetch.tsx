import { AxiosRequestConfig } from "axios";
import { useState, useEffect } from "react";
import { connectApi } from "../common/services/ConnectApi";

export function useFetch<T = unknown>(
  url: string,
  options?: AxiosRequestConfig,
  stateActualize?: any
) {
  const [data, setData] = useState<T | any>(null);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    connectApi
      .get(url, options)
      .then((response) => {
        setData(Object.entries(response.data));
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setIsFetching(false);
      });
  }, [stateActualize]);

  return { data, isFetching, error };
}
