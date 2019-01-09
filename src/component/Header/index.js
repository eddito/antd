import React, { Component, Fragment } from 'react';
import { Row, Col } from 'antd';
import './index.less';

export default class Header extends  Component{
    constructor(props) {
        super(props);
        this.state={
            userName: 'snow'
        }
    }

    render() {
        return (
            <Fragment>
                <div className="header">
                    <Row className="header-top">
                            <span>成都中医药大学附属医院</span>
                    </Row>
                    <Row className="breadcrumb">
                        <Col span="4" className="breadcrumb-title">
                           首页
                        </Col>
                        <Col span="20" className="welcome">
                            <span>欢迎，{this.state.userName}</span>
                            <a href="#">退出</a>
                        </Col>
                    </Row>
                </div>
            </Fragment>
        )
    }
}
