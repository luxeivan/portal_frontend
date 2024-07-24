import React, { useEffect } from "react";
import axios from "axios";
import { ConfigProvider, Flex, Layout, theme } from "antd";
import "./App.css";
import { Route, BrowserRouter, Routes, redirect, Navigate, createBrowserRouter, RouterProvider } from "react-router-dom";
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
import NewClaim from "./pages/Cabinet/NewClaim";
import NewServicetest from "./pages/Cabinet/NewServicetest";
import Profile from "./pages/Cabinet/Profile/Profile";
import Subjects from "./pages/Cabinet/Subjects/Subjects";
import Objects from "./pages/Cabinet/Objects/Objects";
import Documents from "./pages/Cabinet/Documents/Documents";
import Drafts from "./pages/Cabinet/Drafts/Drafts";
import Checking from "./pages/Cabinet/Checking/Checking";
import ClaimItem from "./pages/Cabinet/Claims/ClaimItem";
import PuzzleGame from "./pages/Games/PuzzleGame";
import Contacts from "./pages/Contacts/Contacts";
import Claimers from "./pages/Cabinet/Claims/Claimers";
import Archives from "./pages/Cabinet/Claims/Archives";
import Law from "./pages/Documentation/Law";
import Documentation from "./pages/Documentation/Documentation";
import FormOneC from "./components/test/FormOneC";
// import ServiceItemTest from "./pages/ServicesItemTest/ServiceItemTest";
// import ServicesTest from "./pages/ServicesTest/ServicesTest";
import PrivateRoute from "./pages/PrivateRouter";
import Login from "./pages/Login";
// import JumpGame from "./pages/Game/JumpGame";

const { Content } = Layout;

export default function App() {
  const { darkMode, checkDarkMode } = useGlobal();
  const auth = useAuth(state => state.auth);
  const checkJWT = useAuth(state => state.checkJWT);
  const toggleModal = useAuth(state => state.toggleModal);
  const logout = useAuth(state => state.logout);

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

  useEffect(() => {
    useAuth.getState().checkJWT();
  }, []);


  const { colorPrimary } = theme.useToken().token;

  const loader = () => {
    console.log(1)
    if (!auth) {
      return redirect("/");
    }
    return null;
  };
  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Main />,
  //     loader: ({ request }) => {
  //       console.log(request)
  //     },
  //     children: [
  //       {
  //         path: "servicestest",
  //         element: <ServicesTest />,
  //         loader: ({ request }) => {
  //           console.log(request)
  //         },
  //       },
  //     ],
  //   },
  // ]);

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
              <Content className={`${auth ? "mainContentAuth" : "mainContent"}`} 
              // style={{ margin: `64px 0 0 ${auth && document.documentElement.clientWidth > 575 ? "186px" : "0px"}` }}
              >
                <Routes>
                  <Route path="/" element={<Main />} />
                  <Route path="/formonec" element={<FormOneC />} />
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
                    path="/services/:level2/:key"
                    element={
                      <Container>
                        <ServiceItem />
                      </Container>
                    }
                  />


                  {/* ---Тестовая база-------------------------------------------------------------------- */}
                  {/* <Route
                    path="/servicestest"
                    element={
                      // <Container>
                      <ServicesTest />
                      // </Container>
                    }
                  />
                  <Route
                    path="/servicestest/:level2"
                    element={
                      // <Container>
                      <ServicesTest />
                      // </Container>
                    }
                  />
                  <Route
                    path="/servicestest/:level2/:key"
                    element={
                      <Container>
                        <ServiceItemTest />
                      </Container>
                    }
                  /> */}
                  {/* ----------------------------------------------------------------------- */}
                  <Route path="/about" element={<About />} />
                  <Route path="/calc" element={<Calc />} />
                  <Route path="/contacts" element={<Contacts />} />
                  <Route path="/docs" element={<Documentation />} />
                  <Route path="/login" element={<Login />} />
                  {/* ----------------------------------------- */}

                  <Route path="cabinet"
                    // action={() => {
                    //   console.log(123123)
                    // }}
                    element={<PrivateRoute />}
                  >

                    <Route path="new-claim/:id" element={<Container><NewClaim /></Container>} />
                    {/* <Route path="new-claimtest/:id" element={<Container><NewServicetest /></Container>} /> */}
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

                  {/* ----------------------------------------- */}
                  <Route path="/puzzle-game" element={<PuzzleGame />} />
                  <Route path="*" element={<Page404 />} />
                  {/* <Route path="/jump-game" element={<JumpGame />} /> */}
                </Routes>
              </Content>
            </Flex>
          </Layout>
          <AppFooter />
        </BrowserRouter>
      </Layout >
    </ConfigProvider >
  );
}
