import axios, { AxiosRequestConfig } from "axios";
import config from "src/utils/config";
import { getToken } from "./authApi";

/* eslint-disable prefer-template */
export function serializeQueryParameters(json: any) {
  return (
    "?" +
    Object.keys(json)
      .filter((key) => json[key])
      .map(
        (key) => encodeURIComponent(key) + "=" + encodeURIComponent(json[key])
      )
      .join("&")
  );
}

export function useApiFetch() {
  return async function apiFetch(path: string, opts?: AxiosRequestConfig) {
    if (path && path.length && path[0] !== "/") {
      path = `/${path}`;
    }
    const token = getToken();
    const headers = {
      authorization: token,
    };
    opts = opts || {};
    opts.headers = Object.assign(opts.headers || {}, headers);
    return axios(`${config.apiUrl}${path}`, opts);
  };
}
