import { ChakraProvider, Container, HStack, Spacer } from "@chakra-ui/react";
import React, { useState } from "react";

import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import FolderPage from "./components/FolderPage";
import HomePage from "./components/Homepage";
import LoginPage from "./components/LoginPage";
import NotePage from "./components/NotePage";
import SignupPage from "./components/SignupPage";
import ToggleColorModeButton from "./components/ToggleColorModeButton";
import { Folder, Note, RoutingErrorProps, User } from "./model/model";
import uuid from 'react-uuid';

const userContextInitialState: User | undefined = undefined;
export const UserContext = React.createContext<[
  User | undefined,
  React.Dispatch<React.SetStateAction<User | undefined>>
]>([userContextInitialState, () => { }]);

const routingErrorContextInitialState: RoutingErrorProps | undefined = undefined;
export const RoutingErrorContext = React.createContext<[
  RoutingErrorProps | undefined,
  React.Dispatch<React.SetStateAction<RoutingErrorProps | undefined>>
]>([[undefined], () => { }]);

// export type AppProps = {
//   folders: Folder[]
// }
// const appContextInitialState: AppProps | undefined = undefined;
// export const AppContext = React.createContext<[
//   AppProps | undefined,
//   React.Dispatch<React.SetStateAction<AppProps | undefined>>
// ]>([userContextInitialState, () => { }]);
export type AppProps = {
  folders: Folder[]
}

// const appContextInitialState: AppProps = { folders: [] };

const notes: Note[] = [1, 2, 3, 4].map(num => {
  return {
    id: uuid(),
    title: `I forgot to do hw ${num}`,
    description: "Good job!",
    lastEdit: new Date(),
    folderID: uuid(),
  }
})
const appContextInitialState: AppProps = {
  folders: ["Homework", "Videogames", "Keto", "Sleep"].map(name => {
    if (name === "Homework") {
      const f: Folder = {
        id: uuid(),
        name: name,
        notes: notes
      };
      return f;
    }
    const f: Folder = {
      id: uuid(),
      name: name,
      notes: []
    };
    return f;
  })
}

export const AppContext = React.createContext<[
  AppProps | undefined,
  React.Dispatch<React.SetStateAction<AppProps | undefined>>
]>([appContextInitialState, () => { }]);

const AppWrap = () => {
  return (
    <Container maxWidth="100wh">
      <HStack width="100wh" paddingTop='5px'>
        <Spacer />
        <ToggleColorModeButton />
      </HStack>
      <Outlet />
    </Container>
  )
}

const App = () => {
  const [userProps, setUserProps] = useState<User | undefined>(userContextInitialState);
  const [errorProps, setErrorProps] = useState<RoutingErrorProps | undefined>(routingErrorContextInitialState);
  const [appProps, setAppProps] = useState<AppProps | undefined>(appContextInitialState);
  const errorNav = <Navigate replace to={"/error"} />;
  return (

    <ChakraProvider>
      {/* <UserContext.Provider value={[userProps, setUserProps]}> */}
      <UserContext.Provider value={[userProps, setUserProps]}>
        <AppContext.Provider value={[appProps, setAppProps]}>
          <Routes>
            <Route path="/" element={<Navigate replace to={userProps ? "/home" : "/login"} />} />
            <Route element={<AppWrap />}>
              <Route path="/login" element={!userProps ? <LoginPage /> : (errorNav)} />
              <Route path="/signup" element={!userProps ? <SignupPage /> : (errorNav)} />
              <Route path="/home" element={userProps ? (<HomePage />) : (errorNav)} />
              <Route path="/folder/:id" element={userProps ? (<FolderPage />) : (errorNav)} />
              <Route path="/note/:id" element={userProps ? (<NotePage />) : (errorNav)} />
              <Route path="/error" element={<ErrorPage />} />
              <Route path="*" element={errorNav} />
            </Route>
          </Routes>
        </AppContext.Provider>
      </UserContext.Provider>
    </ChakraProvider >
  );
};

export default App;