import React, { Component, Fragment } from 'react';
import Button from 'antd/lib/button';
import { Row, Col } from 'antd';
import Header from './component/Header';
import NavLeft from './component/Navleft';
import Content from './component/Content';
import './App.css';
import Footer from "./component/Footer";

class App extends Component {
  render() {
    return (
        <Fragment>
            <Row>
                <Col span={3}><NavLeft /></Col>
                <Col span={21}>
                    <Header />
                    <Content />
                    <Footer/>
                </Col>
            </Row>
        </Fragment>
    );
  }
}

export default App;