import { Layout } from 'antd';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './app.css';
import Dashboard from './components/Dashboard/Dashboard';
import Navbar from './components/Navbar/Navbar';
import Stocks from './components/Stocks/Stocks';

const { Header, Footer, Content } = Layout;

const App = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Header>Header</Header>
        <Content>
          <Switch>
            <Route path="/stocks" component={Stocks} />
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
