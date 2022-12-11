import { ChakraProvider, Container, extendTheme, HStack, Spacer } from "@chakra-ui/react";
import React, { useState } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import ErrorPage from "./components/ErrorPage";
import FolderPage from "./components/FolderPage";
import HomePage from "./components/Homepage";
import LoginPage from "./components/SigninPage";
import NotePage from "./components/NotePage";
import SignupPage from "./components/SignupPage";
import ToggleColorModeButton from "./components/ToggleColorModeButton";
import { Folder, RoutingErrorProps, UserProps } from "./model/model";
import { mode } from "@chakra-ui/theme-tools";



export const customTheme = extendTheme({
  styles: {
    global: (props: any) => ({
      "html, body": {
        background: mode("white", "gray.900")(props),  //mode(light mode color, dark mode color)
      },
    }),
  },
})


const App = () => {
  const [userProps, setUserProps] = useState<UserProps | undefined>(userContextInitialState);
  const [errorProps, setErrorProps] = useState<RoutingErrorProps | undefined>(routingErrorContextInitialState);
  const [appProps, setAppProps] = useState<AppProps>(appContextInitialState);
  const errorNav = <Navigate replace to={"/error"} />;

  return (
    <ChakraProvider theme={customTheme}>
      <UserContext.Provider value={[userProps, setUserProps]}>
        <AppContext.Provider value={[appProps, setAppProps]}>
          <Routes>
            <Route path="/" element={<Navigate replace to={userProps ? "/home" : "/signin"} />} />
            <Route element={<AppWrap />}>
              <Route path="/signin" element={!userProps ? <LoginPage /> : (errorNav)} />
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

const userContextInitialState: UserProps | undefined = undefined;
export const UserContext = React.createContext<[
  UserProps | undefined,
  React.Dispatch<React.SetStateAction<UserProps | undefined>>
]>([userContextInitialState, () => { }]);

const routingErrorContextInitialState: RoutingErrorProps | undefined = undefined;
export const RoutingErrorContext = React.createContext<[
  RoutingErrorProps | undefined,
  React.Dispatch<React.SetStateAction<RoutingErrorProps | undefined>>
]>([[undefined], () => { }]);

export type AppProps = {
  folders: Folder[]
}

const appContextInitialState: AppProps = { folders: [] };
export const AppContext = React.createContext<[
  AppProps,
  React.Dispatch<React.SetStateAction<AppProps>>
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