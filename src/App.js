import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import CreateUser from "./components/CreateUser";
import UpdateUser from "./components/UpdateUser";
import DataTable from "./components/DataTable";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" index element={<DataTable />} />
        <Route path="/create" element={<CreateUser />} />
        <Route path="/update/:id" element={<UpdateUser />} />
      </Routes>
    </>
  );
}

export default App;
