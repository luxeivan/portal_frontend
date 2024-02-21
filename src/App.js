import React from 'react';
import { Breadcrumb, ConfigProvider, Layout, Menu, theme } from 'antd';
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

const { Header, Content, Footer, Sider } = Layout;


export default function App() {
  const global = useStore((state) => state.global);
  //console.log(global.darkMode)
  const {
    token: { colorBgContainer, borderRadiusLG, colorBgElevated },
  } = theme.useToken();
  //console.log(theme.useToken())
  return (
    <ConfigProvider
      theme={{
        algorithm: global.darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token:{
          fontSizeHeading1:"2.5rem",
          fontSizeHeading2:"2.1rem",
          fontSizeHeading3:"1.8rem",
          fontSizeHeading4:"1.5rem",
          //fontSize:"1rem"
        }
      }}>
      <Layout>

        <BrowserRouter>
        <AuthModal />
          <AppHeader />
          <Content  className='content'>
            <Layout style={{ padding: '24px 0', }}>
              {global.auth &&
                 <Sider style={{  }} width={200}>
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

                    <Route path='/about' element={<About />} />
                    <Route path='/calc' element={<Calc />} />
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
