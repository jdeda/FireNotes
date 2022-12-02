import { Text, ChakraProvider } from "@chakra-ui/react";
import HomePage from "./components/Homepage";
import { Routes, Route } from "react-router-dom";
import FolderPage from "./components/FolderPage";

const App = () => {
  return (
    <ChakraProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/folder/:id" element={<FolderPage />} />
      </Routes>
    </ChakraProvider>
  );
};

export default App;