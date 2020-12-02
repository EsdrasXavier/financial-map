import { Layout } from 'antd';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import Navbar from './components/Navbar/Navbar';
import Stocks from './components/Stocks/Stocks';
import News from './components/News/News';
import Currencies from './components/Currencies/Currencies';

const { Header, Footer, Content } = Layout;

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Header>Logo Empresa</Header>
        <Content>
          <Switch>
            <Route path="/stocks" component={Stocks} />
            <Route path="/currencies" component={Currencies} />  
            <Route path="/news" component={News} />
            <Route path="/" component={Dashboard} />
          </Switch>
        </Content>
        <Footer>
          <Navbar />
        </Footer>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
