import React, { useEffect } from 'react';
import { ConfigProvider, Layout, theme } from 'antd';
import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Main from './pages/Main';
import AppHeader from './components/Global/AppHeader';
import AppFooter from './components/Global/AppFooter';
import Calc from './pages/Calc';
import About from './pages/About';
import Services from './pages/Services';
import useStore from './stores/GlobalStore';
import CabinetMenu from './components/Cabinet/CabinetMenu';
import AuthModal from './components/Global/Auth/AuthModal';
import CodeModal from './components/Global/Auth/CodeModal';
import ServiceItem from './pages/ServiceItem';
import Page404 from './pages/Page404';

const { Content, Sider } = Layout;


export default function App() {

  useEffect(() => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      useStore.setState({
        global: {
          ...useStore.getState().global,
          auth: true,
        }
      });
    }
  }, []);

  const global = useStore((state) => state.global);
  const {
    token: { colorBgContainer, borderRadiusLG, colorBgElevated },
  } = theme.useToken();
  return (
    <ConfigProvider
      theme={{
        algorithm: global.darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          fontSizeHeading1: "2.5rem",
          fontSizeHeading2: "2.1rem",
          fontSizeHeading3: "1.8rem",
          fontSizeHeading4: "1.5rem",
          //fontSize:"1rem"
          colorPrimary: "#0061aa"
        }
      }}>
      <Layout>

        <BrowserRouter>
          <AuthModal />
          <CodeModal />
          <AppHeader />
          <Content className='content'>
            <Layout style={{ padding: '24px 0', }}>
              {global.auth &&
                 <Sider style={{  }} width={200} >
                <CabinetMenu />
                 </Sider>
              }
              <Layout>

                <Content style={{ padding: '0 24px', minHeight: "calc(100vh - 180px)", }}>
                  <Routes>
                    <Route path='/' element={<Main />} />
                    <Route path='/services' element={<Services />} />
                    <Route path='/services/:level2' element={<Services />} />
                    <Route path='/services/:level2/:level3' element={<Services />} />
                    <Route path='/services/:level2/:level3/:id' element={<ServiceItem />} />

                    <Route path='/about' element={<About />} />
                    <Route path='/calc' element={<Calc />} />
                    <Route path='*' element={<Page404 />} />

                  </Routes>
                </Content>
              </Layout>
            </Layout>
          </Content>
          <AppFooter />
        </BrowserRouter>
      </Layout>
    </ConfigProvider>
  );
};
