import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import UsersClient from "../api/UsersClient";
import ErrorModal from "./UI/ErrorModal";

const UpdateUser = () => {
  let { id } = useParams();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState();

  const getUser = async (id) => {
    try {
      const user = await UsersClient.getUser(id);
      setUsername(user.username);
      setPassword(user.password);
      setEmail(user.email);
    } catch (error) {
      alert(error.message);
    }
  };

  useEffect(() => {
    async function fetchData() {
      await getUser(id);
    }
    fetchData();
  }, []);

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const UpdateUserHandler = async (event) => {
    if (username.trim().length === 0 || password.trim().length < 6) {
      setError({
        title: "Invalid input!",
        message: "Please enter valid username and password.",
      });
      return;
    }
    if (!validateEmail(email)) {
      setError({
        title: "Invalid input!",
        message: "Please enter valid email.",
      });
      return;
    }

    event.preventDefault();
    const user = {
      id: id,
      username: username,
      password: password,
      email: email,
    };
    try {
      await UsersClient.updateUser(user);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };
  const errorHandler = () => {
    setError(null);
  };
  // prevent from using spaces.
  const handleKeyDown = (e) => {
    if (e.key === " ") {
      setError({
        title: "Invalid input!",
        message: "Please don't use spaces for the password.",
      });
      e.preventDefault();
    }
  };
  //
  const handlePassword = (event) => {
    if (event.currentTarget.value.includes(" ")) {
      event.currentTarget.value = event.currentTarget.value.replace(/\s/g, "");
    }
    setPassword(event.target.value);
  };
  //
  const handleUsername = (event) => {
    if (event.currentTarget.value.includes(" ")) {
      event.currentTarget.value = event.currentTarget.value.replace(/\s/g, "");
    }
    setUsername(event.target.value);
  };

  return (
    <>
      {error && (
        <ErrorModal
          onCofirm={errorHandler}
          title={error.title}
          message={error.message}
        />
      )}
      <div className="flex justify-center items-center h-screen">
        <div className="p-4 bg-white rounded-lg border w-[600px] mt-[-120px] border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form onSubmit={UpdateUserHandler} action="#" className="space-y-6">
            <div className="font-bold text-white text-2xl text-center block w-full p-2.5">
              <h1>Update User Info</h1>
            </div>
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300"
              >
                New Username
              </label>
              <input
                value={username}
                onKeyDown={handleKeyDown}
                onChange={handleUsername}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-lg  block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300"
              >
                New Password
              </label>
              <input
                value={password}
                onKeyDown={handleKeyDown}
                onChange={handlePassword}
                type="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-lg font-medium text-gray-900 dark:text-gray-300"
              >
                New Email
              </label>
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
              />
            </div>
            <div className="flex justify-between">
              <Link
                to="/"
                className="w-full mr-1 mt-6 p-2.5 h-12 text-lg text-white bg-red-700  hover:bg-red-900 focus:ring-4 focus:outline-none  font-medium rounded-lg text-center "
              >
                <button type="submit">Cancel update</button>
              </Link>
              <button
                type="submit"
                //onClick={UpdateUserHandler}
                className="w-full ml-1 mt-6 p-2.5 h-12 text-lg text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none  font-medium rounded-lg text-center"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateUser;
