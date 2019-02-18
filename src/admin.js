import React, { Component, Fragment } from 'react';
import Button from 'antd/lib/button';
import { Row, Col } from 'antd';
import Header from './component/Header';
import NavLeft from './component/Navleft';
import Content from './component/Content';
import './App.css';
import Footer from "./component/Footer";

class Admin extends Component {
    render() {
        return (
            <Fragment>
                <Row>
                    <Col span={3} className={"nav-left"}>
                        <NavLeft />
                    </Col>
                    <Col span={21}>
                        <Header />
                        <Row className={"content"}>
                            {/*<Home>*/}
                            {this.props.children}
                            {/*</Home>*/}

                        </Row>
                        <Footer/>
                    </Col>
                </Row>
            </Fragment>
        );
    }
}

export default Admin;