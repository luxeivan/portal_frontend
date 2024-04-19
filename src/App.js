import React, { useEffect } from "react";
import axios from "axios";
import { ConfigProvider, Flex, Layout, theme } from "antd";
import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Main from "./pages/Main";
import AppHeader from "./components/Global/AppHeader";
import AppFooter from "./components/Global/AppFooter";
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
import NewService from "./pages/Cabinet/NewService";
import Profile from "./pages/Cabinet/Profile/Profile";
import Subjects from "./pages/Cabinet/Subjects/Subjects";
import Objects from "./pages/Cabinet/Objects/Objects";
import Relations from "./pages/Cabinet/Relations/Relations";
import Drafts from "./pages/Cabinet/Drafts/Drafts";
import Checking from "./pages/Cabinet/Checking/Checking";
import Claims from "./pages/Cabinet/Claims/Claims";
import PuzzleGame from "./pages/Games/PuzzleGame";
import Contacts from "./pages/Contacts/Contacts";
import Claimers from "./pages/Cabinet/Claims/Claimers";
import Archives from "./pages/Cabinet/Claims/Archives";
import Law from "./pages/Documentation/Law";
import Documentation from "./pages/Documentation/Documentation";
// import JumpGame from "./pages/Game/JumpGame";

const { Content } = Layout;

export default function App() {
  const { darkMode, checkDarkMode } = useGlobal();
  const { auth, checkJWT } = useAuth();
  const { toggleModal, logout } = useAuth();

  //Надо проверить как работает(должен срабатывать на просроченный JWT
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

  const { colorPrimary } = theme.useToken().token;

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
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
                style={{ padding: "0 24px", minHeight: "calc(100vh - 120px)" }}
              >
                <Routes>
                  <Route path="/" element={<Main />} />
                  <Route
                    path="/services"
                    element={
                      // <Container>
                        <Services />
                      // </Container>
                    }
                  />
                  <Route
                    path="/services/:level2"
                    element={
                      // <Container>
                        <Services />
                      // </Container>
                    }
                  />
                  <Route
                    path="/services/:level2/:id"
                    element={
                      // <Container>
                        <ServiceItem />
                      // </Container>
                    }
                  />
                  <Route path="/about" element={<About />} />
                  <Route path="/calc" element={<Calc />} />
                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/docs" element={<Documentation />} />
                  {/* ----------------------------------------- */}
                  <Route
                    path="/cabinet/new-claim/:url/:id"
                    element={
                      auth ? (
                        <Container>
                          <NewService />
                        </Container>
                      ) : (
                        <Calc />
                      )
                    }
                  />
                  <Route path="/cabinet/profile" element={<Profile />} />
                  <Route path="/cabinet/subjects" element={<Subjects />} />
                  <Route path="/cabinet/relations" element={<Relations />} />
                  <Route path="/cabinet/objects" element={<Objects />} />
                  <Route path="/cabinet/drafts" element={<Drafts />} />
                  <Route path="/cabinet/checking" element={<Checking />} />
                  <Route path="/cabinet/claimers/" element={<Claimers />} />
                  <Route path="/cabinet/claimers/:id" element={<Claims />} />
                  <Route path="/cabinet/archives/" element={<Archives />} />
                  {/* ----------------------------------------- */}
                  <Route path="*" element={<Page404 />} />
                  <Route path="/puzzle-game" element={<PuzzleGame />} />
                  {/* <Route path="/jump-game" element={<JumpGame />} /> */}
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
