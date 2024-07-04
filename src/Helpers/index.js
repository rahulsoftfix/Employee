import { deleteCookie } from "@/Hooks/cookie";
import axios from "axios";
import Cookies from "js-cookie";
import { confirmDialog } from "primereact/confirmdialog";

// FETCHING TOKEN FROM COOKIE
export const token = Cookies.get("qbc-auth-empolye");

export const request = async (props) => {
  try {
    const response = await axios?.[props?.method](
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${props?.url}`,
      props?.cred,
      {
        headers: {
          Authorization: `${token}`,
        },
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    if (error.response.status === 401) {
      deleteCookie("qbc-auth-empolye");
      deleteCookie("qbci");
      window != undefined &&
        (window.location.href = `${process.env.NEXT_PUBLIC_WEB_SIGNUP_URL}`);
    }

    throw error;
  }
};

export const getRequest = async (url) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`,
      {
        headers: {
          Authorization: `${token}`,
        },
        withCredentials: true,
      }
    );

    return response;
  } catch (error) {
    if (error.response.status === 401) {
      deleteCookie("qbc-auth-empolye");
      deleteCookie("qbci");
      window != undefined &&
        (window.location.href = `${process.env.NEXT_PUBLIC_WEB_SIGNUP_URL}`);
    }

    throw error;
  }
};
export const getRequestSms = async (url) => {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`,
      {
        headers: {
          "x-accept-language": `en-US`,
        },
        withCredentials: true,
      }
    );

    return response;
  } catch (error) {
    if (error.response.status === 401) {
      deleteCookie("qbc-auth-empolye");
      deleteCookie("qbci");
      window != undefined &&
        (window.location.href = `${process.env.NEXT_PUBLIC_WEB_SIGNUP_URL}`);
      console.error("Unauthorized: Redirecting to login page");
    }

    throw error;
  }
};

export const postRequest = async (props) => {
  try {
    const response = await axios?.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${props?.url}`,
      props?.cred,
      {
        headers: {
          Authorization: `${token}`,
        },
        withCredentials: true,
      }
    );

    return response;
  } catch (error) {
    if (error.response.status === 401) {
      deleteCookie("qbc-auth-empolye");
      deleteCookie("qbci");
      window != undefined &&
        (window.location.href = `${process.env.NEXT_PUBLIC_WEB_SIGNUP_URL}`);
    }

    throw error;
  }
};
export const postRequestSms = async (props) => {
  try {
    const response = await axios?.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${props?.url}`,
      props?.cred,
      {
        headers: {
          Authorization: `${token}`,
          "x-accept-language": `en-US`,
        },
        withCredentials: true,
      }
    );

    return response;
  } catch (error) {
    if (error.response.status === 401) {
      console.error("Unauthorized: Redirecting to login page");
    }

    throw error;
  }
};

export const putRequest = async (props) => {
  try {
    const response = await axios?.put(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${props?.url}`,
      props?.cred,
      {
        headers: {
          Authorization: `${token}`,
        },
        withCredentials: true,
      }
    );

    return response;
  } catch (error) {
    if (error.response.status === 401) {
      console.error("Unauthorized: Redirecting to login page");
    }

    throw error;
  }
};

export const patchRequest = async (props) => {
  try {
    const response = await axios?.patch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${props?.url}`,
      props?.cred,
      {
        headers: {
          Authorization: `${token}`,
        },
        withCredentials: true,
      }
    );

    return response;
  } catch (error) {
    if (error.response.status === 401) {
      console.error("Unauthorized: Redirecting to login page");
    }

    throw error;
  }
};

export const deleteRequest = async (url) => {
  try {
    const confirmed = await confirmDeletion(
      "Are you sure you want to delete this item?"
    );
    if (confirmed) {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`,
        {
          headers: {
            Authorization: `${token}`,
          },
          withCredentials: true,
        }
      );

      return response;
    } else {
      throw "An error occurred while deleting the item";
    }
  } catch (error) {
    if (error?.response?.status) {
      if (error.response.status === 401) {
        console.error("Unauthorized: Redirecting to login page");
      }
    }

    throw error;
  }
};

export const noTokenGetRequest = async (url) => {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`,
    {
      withCredentials: true,
    }
  );
  return response;
};

export const noTokenPostRequest = async (props) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${props?.url}`,
    props?.cred,
    {
      withCredentials: true,
    }
  );
  return response;
};

export const noTokenPutRequest = async (props) => {
  const response = await axios.put(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${props?.url}`,
    props?.cred,
    {
      withCredentials: true,
    }
  );
  return response;
};

export const noTokenPatchRequest = async (props) => {
  const response = await axios.patch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${props?.url}`,
    props?.cred,
    {
      withCredentials: true,
    }
  );
  return response;
};

export const noTokenDeleteRequest = async (url) => {
  const response = await axios.delete(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`,
    {
      withCredentials: true,
    }
  );
  return response;
};

export const fileUpload = async (props) => {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}${props?.url}`,
      props?.cred,
      {
        headers: {
          Authorization: `${token}`,
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );

    return response;
  } catch (error) {
    if (error.response.status === 401) {
      console.error("Unauthorized: Redirecting to login page");
    }

    throw error;
  }
};

const confirmDeletion = async (message) => {
  return new Promise((resolve) => {
    const accept = () => resolve(true);
    const reject = () => resolve(false);

    confirmDialog({
      message: message,
      header: "Confirm Deletion",
      icon: "warning",
      acceptClassName: "p-button-danger",
      acceptText: "Delete",
      accept: accept,
      reject: reject,
    });
  });
};
