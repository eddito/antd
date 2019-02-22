import React, { Component } from 'react';
import {
    List, Avatar, Button, Skeleton, Popconfirm,
} from 'antd';
import {Link} from "react-router-dom";
const Data = [
    {
        type: '四诊',
        result: '良好',
    },
    {
        type: '问卷',
        result: '100',
    },
    {
        type: '理化',
        result: '额外付费哈咯海鸥',
    },
];

export default class History extends Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            list: [],
        }
    }

    componentDidMount() {
            this.setState({
                initLoading: false,
                data: Data,
                list: Data,
            });
    }

    render() {
        const { list } = this.state;

        return (
            <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                bordered="true"
                dataSource={list}
                renderItem={item => (
                    <List.Item actions={[<Link to="/historyDetail"><Button onClick={() => this.handleEdit}>查看</Button></Link>,
                    <Popconfirm title="确认删除?"  okText="确认" cancelText="取消">
                        <Button>删除</Button>
                        </Popconfirm>]}>
                        <Skeleton  title={false} loading={item.loading} active>
                            <List.Item.Meta
                                title={item.type}
                                description={item.result}
                            />
                        </Skeleton>
                    </List.Item>
                )}
            />
        );
    }
}

