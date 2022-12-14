import toast from "../helpers/toast";
import useGlobal from "./useGlobal";

function useRequests() {
  const { token, removeToken } = useGlobal();

  async function get(route) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/${route}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    } catch (error) {
      if (error.message === "Token expirou") {
        removeToken();
      }

      toast.messageError(error.message);
    }
  }

  async function getOne(route, id) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/${route}/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    } catch (error) {
      if (error.message === "Token expirou") {
        removeToken();
      }

      toast.messageError(error.message);
    }
  }

  async function post(route, body, withToken) {
    const config = withToken
      ? {
          Authorization: `Bearer ${token}`,
        }
      : {};

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/${route}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...config,
          },
          body: JSON.stringify(body),
        }
      );

      if (response.status === 201) {
        return true;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    } catch (error) {
      if (error.message === "Token expirou") {
        removeToken();
      }

      toast.messageError(error.message);
    }
  }

  async function del(route, id) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/${route}/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 204) {
        return true;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    } catch (error) {
      if (error.message === "Token expirou") {
        removeToken();
      }

      toast.messageError(error.message);
    }
  }

  async function put(route, body, id) {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/${route}/${id}`,
        {
          method: "PUT",
          body: JSON.stringify(body),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 204) {
        return true;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      return data;
    } catch (error) {
      if (error.message === "Token expirou") {
        removeToken();
      }

      toast.messageError(error.message);
    }
  }

  return {
    get,
    getOne,
    post,
    del,
    put,
  };
}

export default useRequests;
