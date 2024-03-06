import React, { useEffect } from 'react';
import { ConfigProvider, Flex, Layout, theme } from 'antd';
import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Main from './pages/Main';
import AppHeader from './components/Global/AppHeader';
import AppFooter from './components/Global/AppFooter';
import Calc from './pages/Calc';
import About from './pages/About';
import Services from './pages/Services';
import useGlobal from './stores/useGlobal';
import useAuth from './stores/useAuth';
import CabinetMenu from './components/Cabinet/CabinetMenu';
import AuthModal from './components/Global/Auth/AuthModal/AuthModal';
import CodeModal from './components/Global/Auth/Login/CodeModal';
import ServiceItem from './pages/ServiceItem';
import Page404 from './pages/Page404';
import Container from './components/Container';
import NewClaim from './pages/Cabinet/NewClaim';

const { Content, Sider } = Layout;

export default function App() {
  const { darkMode, toggleDarkMode } = useGlobal();
  const { auth, checkJWT } = useAuth();

  useEffect(() => {
    checkJWT()
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
          customfontSizeIcon: "16px"
        }
      }}
    >
      <Layout>
        <BrowserRouter>
          <AuthModal />
          <CodeModal />
          <AppHeader />
          <Layout >
            <Flex>

              {auth && (
                // <Sider collapsed={true}>
                <CabinetMenu />
                // </Sider>
              )}
              {/* <Layout > */}
              <Content style={{ padding: '0 24px', minHeight: "calc(100vh - 120px)" }}>
                <Routes>
                  <Route path='/' element={<Main />} />
                  <Route path='/services' element={<Container><Services /></Container>} />
                  <Route path='/services/:level2' element={<Container><Services /></Container>} />
                  <Route path='/services/:level2/:level3' element={<Container><Services /></Container>} />
                  <Route path='/services/:level2/:level3/:id' element={<Container><ServiceItem /></Container>} />
                  <Route path='/about' element={<About />} />
                  <Route path='/calc' element={<Calc />} />
                  {/* ----------------------------------------- */}
                  <Route path='/cabinet/new-claim/:url/:id' element={auth ? <Container><NewClaim /></Container> : <Calc />} />
                  {/* ----------------------------------------- */}
                  <Route path='*' element={<Page404 />} />
                </Routes>
              </Content>
              {/* </Layout> */}
            </Flex>
          </Layout>
          <AppFooter />
        </BrowserRouter>
      </Layout>
    </ConfigProvider>
  );
};