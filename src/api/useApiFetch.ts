import axios, { AxiosRequestConfig } from "axios";
import useAuth from "../auth/useAuth";
import config from "../utils/config";

function useApiFetch() {
  const { getToken } = useAuth();
  return async function apiFetch(path: string, opts?: AxiosRequestConfig) {
    if (path && path.length && path[0] !== "/") {
      path = `/${path}`;
    }
    const token = await getToken();
    const headers = {
      authorization: token,
    };
    opts = opts || {};
    opts.headers = Object.assign(opts.headers || {}, headers);
    return axios(`${config.apiUrl}${path}`, opts);
  };
}

export default useApiFetch;
