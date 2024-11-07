import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./Pages/Dashboard/Dashboard";
import FilePage from "./Pages/FilePage/FilePage";
import DataPage from "./Pages/DataPage/DataPage";
import NavBar from "./components/NavBar/NavBar";
import DataFileContextProvider from "./context/DataFileContextProvider";

function App() {
  return (
    <>
      <BrowserRouter>
        <DataFileContextProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/files" element={<FilePage />} />
            <Route path="/data" element={<DataPage />} />
          </Routes>
        </DataFileContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
