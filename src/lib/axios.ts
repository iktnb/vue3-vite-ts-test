import axios, { AxiosInstance } from "axios";

const $axios: AxiosInstance = axios.create({
  baseURL: "http://registry.npmjs.com/-/v1"
});

export default $axios;
