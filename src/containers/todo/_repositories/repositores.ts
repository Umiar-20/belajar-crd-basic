import fetch from "../../../utils/fetch";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getList = (opt: any) => {
  const options = {
    ...opt,
    method: "GET",
    url: "v1/rows/ND5Osojl0mAe",
  };
  return fetch(options);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deleteList = (opt: any) => {
  const options = {
    ...opt,
    method: "DELETE",
    url: "v1/rows/ND5Osojl0mAe",
  };
  return fetch(options);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postList = (opt: any) => {
  const options = {
    ...opt,
    method: "POST",
    url: "v1/rows/ND5Osojl0mAe",
  };
  return fetch(options);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const uploadFile = (opt: any) => {
  const options = {
    ...opt,
    method: "POST",
    url: "/uploadFileToCdn",
  };
  return fetch(options);
};
