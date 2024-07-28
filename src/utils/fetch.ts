import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const fetch = (opt: AxiosRequestConfig): Promise<any> => {
  const options: AxiosRequestConfig = {
    baseURL: "https://v1.appbackend.io/",
    ...opt,
  };

  return new Promise((resolve, reject) => {
    axios(options)
      .then((res: AxiosResponse) => {
        resolve(res.data);
      })
      .catch((err) => {
        const defaultError = {
          code: 500,
          status: "error",
          message: "Failed to fetch data. Please contact developer.",
        };

        if (typeof err.response === "undefined") {
          reject(defaultError);
        } else if (typeof err.response.data === "undefined") {
          reject(defaultError);
        } else {
          reject(err.response.data);
        }
      });
  });
};

export default fetch;
