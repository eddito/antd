import React, { Component, Fragment } from 'react';
import { Row, Col } from 'antd';

export default class Footer extends  Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <div> This is Footer！</div>
            </Fragment>
        )
    }
}