import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UsersClient from "../api/UsersClient";
import ErrorModal from "./UI/ErrorModal";

const CreateUser = (props) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState();

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const CreateUserHandler = async (event) => {
    event.preventDefault();
    if (username.trim().length === 0) {
      setError({
        title: "Invalid input!",
        message: "Please enter a valid username.(non-empty values)",
      });
      return;
    }
    if (password.trim().length < 6) {
      setError({
        title: "Invalid password!",
        message: "Please enter password more than 6 symbols.",
      });
      return;
    }
    if (!validateEmail(email)) {
      setError({
        title: "Invalid Email!",
        message: "Please enter a valid email.",
      });
      return;
    }

    const user = {
      username: username,
      password: password,
      email: email,
    };
    try {
      await UsersClient.createUser(user);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <>
      {error && (
        <ErrorModal
          onCofirm={errorHandler}
          title={error.message}
          message={error.message}
        />
      )}

      <div className="flex justify-center items-center h-screen">
        <div className="p-4 bg-white rounded-lg border w-[600px] mt-[-120px] border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form onSubmit={CreateUserHandler} action="#" className="space-y-6">
            <div className="font-bold text-white text-2xl text-center block w-full p-2.5">
              <h1>Create New User</h1>
            </div>
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300"
              >
                Your Username
              </label>
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="enter username"
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-lg  block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300"
              >
                Your Password
              </label>
              <input
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="..."
                type="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300"
              >
                Your Email
              </label>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="email@company.com"
                type="email"
                className="bg-gray-50 border mb-4 border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full p-2.5 h-12 mt-6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateUser;
