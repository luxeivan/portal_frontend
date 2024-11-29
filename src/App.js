import React, { useEffect } from "react";
import axios from "axios";
import { ConfigProvider, Flex, Layout, theme } from "antd";
import "./App.css";
import { Route, BrowserRouter, Routes, redirect } from "react-router-dom";
import Main from "./pages/Main";
import AppHeader from "./components/Global/AppHeader/AppHeader";
import AppFooter from "./components/Global/AppFooter/AppFooter";
import Calc from "./pages/Calc/Calc";
import About from "./pages/About/About";
import Services from "./pages/Services/Services";
import useGlobal from "./stores/useGlobal";
import useAuth from "./stores/useAuth";
import CabinetMenu from "./components/Cabinet/CabinetMenu";
import AuthModal from "./components/Global/Auth/AuthModal/AuthModal";
import CodeModal from "./components/Global/Auth/Login/CodeModal";
import ServiceItem from "./pages/ServiceItem/ServiceItem";
import Page404 from "./pages/Page404";
import Container from "./components/Container";
import NewClaim from "./pages/Cabinet/NewClaim";
import Profile from "./pages/Cabinet/Profile/Profile";
import Subjects from "./pages/Cabinet/Subjects/Subjects";
import Objects from "./pages/Cabinet/Objects/Objects";
import Documents from "./pages/Cabinet/Documents/Documents";
import Drafts from "./pages/Cabinet/Drafts/Drafts";
import Checking from "./pages/Cabinet/Checking/Checking";
import ClaimItem from "./pages/Cabinet/Claims/ClaimItem/ClaimItem";
import Game from "./pages/Games/Game";
import Contacts from "./pages/Contacts/Contacts";
import Claimers from "./pages/Cabinet/Claims/Claimers/Claimers";
import Archives from "./pages/Cabinet/Claims/Archives";
import Documentation from "./pages/Documentation/Documentation";
import FormOneC from "./components/test/FormOneC";
import PrivateRoute from "./pages/PrivateRouter";
import Login from "./pages/Login";
import AddressInputTest from "./components/FormComponentsNew/addressComponents/AddressInputTest";
import Answers from "./pages/Answers/Answers";

const { Content } = Layout;

export default function App() {
  const { darkMode, checkDarkMode } = useGlobal();
  const auth = useAuth((state) => state.auth);
  const checkJWT = useAuth((state) => state.checkJWT);
  const toggleModal = useAuth((state) => state.toggleModal);
  const logout = useAuth((state) => state.logout);

  useEffect(() => {
    const interceptorId = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          logout();
          toggleModal("isAuthModalOpen", true);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptorId);
    };
  }, [logout, toggleModal]);

  useEffect(() => {
    checkJWT();
    checkDarkMode();
  }, []);

  useEffect(() => {
    useAuth.getState().checkJWT();
  }, []);

  const { colorPrimary } = theme.useToken().token;

  const loader = () => {
    console.log(1);
    if (!auth) {
      return redirect("/");
    }
    return null;
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          // fontFamily: 'ArialCustom, sans-serif',
          fontSizeHeading1: "2.5rem",
          fontSizeHeading2: "2.1rem",
          fontSizeHeading3: "1.8rem",
          fontSizeHeading4: "1.5rem",
          colorPrimary: "#0061aa",
          colorInfo: "#F37021",
          myCustomColor: "#00ffff",
          customfontSizeIcon: "16px",
        },
      }}
    >
      <Layout>
        <BrowserRouter>
          <AuthModal />
          <CodeModal />
          <AppHeader />
          <Layout>
            <Flex>
              {auth && <CabinetMenu />}
              <Content
                className={`${auth ? "mainContentAuth" : "mainContent"}`}
              >
                <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path="/formonec" element={<FormOneC />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/services/:level2" element={<Services />} />
                  <Route
                    path="/services/:level2/:key"
                    element={
                      <Container>
                        <ServiceItem />
                      </Container>
                    }
                  />

                  <Route path="/about" element={<About />} />
                  <Route path="/calc" element={<Calc />} />
                  <Route path="/contacts" element={<Contacts />} />

                  <Route path="/docs" element={<Documentation />} />
                  <Route path="/test" element={<AddressInputTest />} />
                  <Route path="/login" element={<Login />} />

                  <Route path="cabinet" element={<PrivateRoute />}>
                    <Route
                      path="new-claim/:id"
                      element={
                        <Container>
                          <NewClaim />
                        </Container>
                      }
                    />

                    <Route path="profile" element={<Profile />} />
                    <Route path="subjects" element={<Subjects />} />
                    <Route path="documents" element={<Documents />} />
                    <Route path="objects" element={<Objects />} />
                    <Route path="drafts" element={<Drafts />} />
                    <Route path="checking" element={<Checking />} />
                    <Route path="claimers" element={<Claimers />} />
                    <Route path="claimers/:id" element={<ClaimItem />} />
                    <Route path="archives" element={<Archives />} />
                  </Route>

                  <Route path="/answers" element={<Answers />} /> 
                  <Route path="/game" element={<Game />} />
                  <Route path="*" element={<Page404 />} />
                </Routes>
              </Content>
            </Flex>
          </Layout>
          <AppFooter />
        </BrowserRouter>
      </Layout>
    </ConfigProvider>
  );
}
