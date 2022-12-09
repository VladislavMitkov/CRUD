import React, { useEffect, useState } from "react";
import { MdDeleteForever, MdOutlineModeEditOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import UsersClient from "../api/UsersClient";
import DeleteModal from "./UI/DeleteModal";

const DataTable = () => {
  const [data, setData] = useState([]);
  const [deletePopup, setDeletePopup] = useState(false);

  useEffect(() => {
    async function fetchData() {
      await getAllUsers();
    }
    fetchData();
  }, []);

  const getAllUsers = async () => {
    try {
      const users = await UsersClient.getUsers();
      setData(users);
    } catch (error) {
      alert(error.message);
      setData([]);
    }
  };

  const deleteUserHandler = async (id) => {
    try {
      await UsersClient.deleteUser(id);
    } catch (error) {
      alert(error.message);
    }
    await getAllUsers();
    setDeletePopup(false);
  };

  const cancelDeleteHandler = () => {
    setDeletePopup(false);
  };
  const deletePopupHandler = async () => {
    setDeletePopup(true);
  };

  return (
    <>
      <div className="border-2 mt-16 m-auto w-screen h-auto flex justify-center items-center shadow-md rounded-lg bg-gray-800">
        {data.length === 0 ? (
          <div className="flex justify-center">
            <h1 className=" text-2xl text-white font-semibold">
              There's currently no users.
            </h1>
          </div>
        ) : (
          <table className="w-full text-xl text-left  text-gray-400">
            <thead className="text-2xl uppercase  bg-gray-700 text-zinc-100">
              <tr className="border-b bg-gray-800 border-gray-700">
                <th scope="col" className="px-6 py-3 text-center border-r-2">
                  ID
                </th>
                <th scope="col" className="px-6 py-3 text-center border-r-2">
                  Username
                </th>
                <th scope="col" className="px-6 py-3 text-center border-r-2">
                  Password
                </th>
                <th scope="col" className="px-6 py-3 text-center border-r-2">
                  Email
                </th>
                <th scope="col" className="px-6 py-3 text-center border-r-2">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {data &&
                data.length > 0 &&
                data.map((user) => (
                  <tr
                    className=" border-b bg-gray-800 border-gray-700"
                    key={user.id}
                  >
                    <td className="px-6 py-4 border-r-2">{user.id}</td>
                    <td className="px-6 py-4 border-r-2">{user.username}</td>
                    <td className="px-6 py-4 border-r-2">{user.password}</td>
                    <td className="px-6 py-4 border-r-2">{user.email}</td>
                    <td className="px-6 py-4 border-r-2 justify-center flex">
                      <Link to={`/update/${user.id}`}>
                        <MdOutlineModeEditOutline
                          size={25}
                          href="/create"
                          className="mr-2 font-medium text-white cursor-pointer hover:bg-gray-900 hover:text-cyan-400"
                        />
                      </Link>
                      <div className="border-r-2 mr-2"></div>
                      <MdDeleteForever
                        onClick={deletePopupHandler}
                        size={25}
                        href="#"
                        className="font-medium text-white cursor-pointer hover:bg-gray-900 hover:text-red-600"
                      />
                      {deletePopup && (
                        <DeleteModal
                          key={user.id}
                          title="Delete User"
                          message="Are you sure you want to delete this user?"
                          onCancel={cancelDeleteHandler}
                          onConfirm={async () => deleteUserHandler(user.id)}
                        />
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default DataTable;
