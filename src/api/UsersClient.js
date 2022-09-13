import axios from "axios";
import { stringify } from "postcss";

class UsersClient {
  static createUser = async (data) => {
    await axios
      .post("/users", data)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  };
  static getUsers = async () => {
    return await axios
      .get("/users")
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  };

  static getUser = async (id) => {
    return await axios
      .get(`/users/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  };

  static deleteUser = async (id) => {
    return await axios
      .delete(`/users/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  };
  static updateUser = async (updateUser) => {
    return await axios
      .put(`/users/${updateUser.id}`, updateUser)
      .then((response) => response.data)
      .catch((error) => {
        throw error;
      });
  };
}

export default UsersClient;
