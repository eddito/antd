import React, { Component, Fragment } from 'react';
import {
    Table, Input, Button, Popconfirm, Form,Modal,Row,Col
} from 'antd';
import './index.less';
const FormItem = Form.Item;
const Search = Input.Search;
const EditableContext = React.createContext();


const data1 = [
    {
    key: 1,
    name: '感冒',
},
    {
    key: 2,
    name: '慢性咽炎',
},
];

const data2= [
    {
        key: 3,
        name: '感冒',
    },
    {
        key: 4,
        name: '慢性咽炎',
    },
    {
        key: 5,
        name: '慢性咽炎',
    },
    {
        key: 6,
        name: '慢性咽炎',
    },
    {
        key: 7,
        name: '慢性咽炎',
    },
    {
        key: 8,
        name: '慢性咽炎',
    },
    {
        key: 9,
        name: '慢性咽炎',
    },
    {
        key: 10,
        name: '慢性咽炎',
    },
    {
        key: 11,
        name: '慢性咽炎',
    },
    {
        key: 12,
        name: '慢性咽炎',
    },
    {
        key: 13,
        name: '慢性咽炎',
    },
    {
        key: 14,
        name: '慢性咽炎',
    },
    {
        key: 15,
        name: '慢性咽炎',
    },
    {
        key: 16,
        name: '慢性咽炎',
    },
    {
        key: 17,
        name: '慢性咽炎',
    },
    {
        key: 18,
        name: '慢性咽炎',
    },
];

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);
 class EditableTable extends  Component{
    constructor(props) {
        super(props);
        this.state = {
            editing: false,
        }
    }

    componentDidMount() {
        if (this.props.editable) {
            document.addEventListener('click', this.handleClickOutside, true);
        }
    }

    componentWillUnmount() {
        if (this.props.editable) {
            document.removeEventListener('click', this.handleClickOutside, true);
        }
    }

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({ editing }, () => {
            if (editing) {
                this.input.focus();
            }
        });
    };

    handleClickOutside = (e) => {
        const { editing } = this.state;
        if (editing && this.cell !== e.target && !this.cell.contains(e.target)) {
            this.save();
        }
    };

    save = () => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            if (error) {
                return;
            }
            this.toggleEdit();
            handleSave({ ...record, ...values });
        });
    };

    render() {
        const { editing } = this.state;
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            ...restProps
        } = this.props;
        return (
            <td ref={node => (this.cell = node)} {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>
                        {(form) => {
                            this.form = form;
                            return (
                                editing ? (
                                    <FormItem style={{ margin: 0 }}>
                                        {form.getFieldDecorator(dataIndex, {
                                            rules: [{
                                                required: true,
                                                message: `${title} is required.`,
                                            }],
                                            initialValue: record[dataIndex],
                                        })(
                                            <Input
                                                ref={node => (this.input = node)}
                                                onPressEnter={this.save}
                                            />
                                        )}
                                    </FormItem>
                                ) : (
                                    <div
                                        className="editable-cell-value-wrap"
                                        style={{ paddingRight: 24 }}
                                        onClick={this.toggleEdit}
                                    >
                                        {restProps.children}
                                    </div>
                                )
                            );
                        }}
                    </EditableContext.Consumer>
                ) : restProps.children}
            </td>
        );
    }
}

export default class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [{
                key: '0',
                name: '头痛',
                pinyin: 'tt',
            },
                {
                key: '1',
                name: '慢性咽炎，感冒',
                pinyin: 'mxyy,gm',
            },
                {
                    key: '2',
                    name: '慢性咽炎',
                    pinyin: 'mxyy',
                }],
            data1:data1,
            data2:data2,
            count: 2,
            loading: false,
            modal1Visible: false,
            modal2Visible: false,
            modal3Visible: false,
            nameText: '',
            pyText: '',
            selectedRowKeys: [],
            rowKey:null
        };

        this.columns = [
            {
            title: '疾病名称',
            dataIndex: 'name',
            width: '30%',
            editable: true,
                align: 'center'
        },
            {
            title: '疾病拼音',
            dataIndex: 'pinyin',
                align: 'center'
        },
            {
            title: '操作',
            dataIndex: 'operation', 
                align: 'center',
            render: (text, record) => (
                this.state.dataSource.length >= 1
                    ? (
                        <div className='operation'>
                            <Button onClick={()=>this.setModal1Visible(record)} className='btn'>编辑</Button>
                            <Modal
                                visible={this.state.modal1Visible}
                                title="编辑"
                                okText='保存'
                                cancelText='取消'
                                className={"form-modal1"}
                                bodyStyle={{ padding: '32px 40px 48px' }}
                                onOk={()=>this.handleOk(this.state.rowKey)}
                                onCancel={this.handleCancel}
                                 >

                                <Input placeholder="编辑疾病名称" onChange={this.onChangeNameText} value={this.state.nameText} className={"name-input"}/>
                                <Input placeholder="编辑疾病拼音" onChange={this.onChangePYText} value={this.state.pyText} className={"py-input"} />
                            </Modal>
                            <Button onClick={this.setModal2Visible} className='btn'>关联证型</Button>
                            <Modal
                                width={1200}
                                title='关联证型'
                                okText='完成'
                                cancelText='取消'
                                visible={this.state.modal2Visible}
                                onCancel={this.handleCancel}
                                className="form-modal"
                            >
                                <Row className="breadcrumb">
                                    <Col span={12} className="breadcrumb-title">
                                        <div className="syndrome-title">已关联证型</div>
                                        <Table
                                            dataSource={this.state.data1}
                                            columns={this.columns1}
                                        />
                                    </Col>
                                    <Col span={12} className="breadcrumb-title">
                                        <div  className="syndrome-title">
                                            <span>未关联证型</span>
                                            <Search
                                                placeholder="根据疾病名称或疾病拼音搜索证型"
                                                onSearch={value => console.log(value)}
                                                style={{ width: 260, marginLeft: 240 }}
                                            />
                                        </div>
                                        <Table
                                            dataSource={this.state.data2}
                                            columns={this.columns2}
                                        />
                                        {console.log("data2",this.state.data2)}
                                        </Col>
                                    </Row>
                                </Modal>
                            <Popconfirm title="确认删除?" onConfirm={() => this.handleDelete(record.key)} okText="确认" cancelText="取消">
                                <Button>删除</Button>
                            </Popconfirm>
                        </div>
                    ) : null
            ),
        }
        ];
        this.columns2=[
            {
            title: '证型名称',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
        },{
            title: '操作',
            dataIndex: 'operate',
            key: 'operate',
            align: 'center',
            render: (text,record)=>(
                data1.length >= 1
                    ? (
                        <Popconfirm title="确认添加?" onConfirm={()=>this.addDiease(record)} okText="确认" cancelText="取消">
                            {console.log('@text',text,"@record",record)}
                            <Button >添加</Button>
                        </Popconfirm>
                    ):null
            ),
        }];
        this.columns1= [
            {
            title: '证型名称',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
        },{
            title: '操作',
            dataIndex: 'operate',
            key: 'operate',
            align: 'center',
            render: (text,record)=>(
                data1.length >= 1
                    ? (
                        <Popconfirm title="确认删除?" onConfirm={()=>this.handleDeleteDisease(record)} okText="确认" cancelText="取消">
                            <Button>删除</Button>
                        </Popconfirm>
                    ):null
            ),
        }];

    }

    //选中记录条数
    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    };


    //显示编辑疾病Modal
    setModal1Visible = (row) => {
        this.setState({
            modal1Visible: true,
            rowKey:row.key,
            nameText:row.name,
            pyText:row.pinyin
        });
    };

    //显示关联病症Modal
    setModal2Visible = () => {
        this.setState({
            modal2Visible: true,
        });
    };

    //添加关联证型
    addDiease=(row)=>{
        let data3=this.state.data1
        let repeat =true
        data3.map(data=>{
            if (data.key ===row.key){
                repeat =false
            }
        })
         if (repeat){
             data3.splice(data3.length,0,row)
         }
        this.setState({
            data1:data3
        })
    }


    //删除关联证型
    handleDeleteDisease=(key)=>{
        const dataA = [...this.state.data1];
        this.setState({ data1: dataA.filter(item => item.key !== key.key) });
}

    //显示增加疾病Modal
    setModal3Visible = () => {
        this.setState({
            modal3Visible: true,
        });
    };

    //确认编辑、修改、删除
    handleOk = (row) => {
        this.setState({
            modal1Visible: false,
        });
        let dataSource1=this.state.dataSource
        dataSource1.map((data,index)=>{
            if (data.key===row){
                data.name=this.state.nameText
                data.pinyin=this.state.pyText
            }
        })
        this.setState({
            dataSource:dataSource1
        })
            // this.state.dataSource[index].name=this.state.nameText
        // this.state.dataSource[index].pinyin=this.state.pyText

    };

    //取消编辑、修改、删除
    handleCancel = (e) => {
        this.setState({
            modal1Visible: false,
            modal2Visible: false,
            modal3Visible: false,
        });
    };

    //添加疾病名称
    onChangeNameText= (e) => {
        this.setState({ nameText: e.target.value });
    };

    //添加疾病拼音
    onChangePYText= (e) => {
        this.setState({ pyText: e.target.value });
    };

    //删除一条疾病
    handleDelete = (key) => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
    };

    //批量删除
    handleDeleteAll=(key)=>{
        const dataSource = this.state.dataSource;
        const dataKey=[...this.state.selectedRowKeys]
        {console.log('@key',dataSource[0])}

            dataKey.map((key)=>{
                dataSource.map((item,index)=>{
                    if (key===item.key){
                        dataSource.splice(index,1)
                    }
                })
            })

        this.setState({
            dataSource:dataSource
            })
    }

    //添加一条疾病
    handleAdd = () => {
        const { count, dataSource } = this.state;
        const newData = {
            key: count,
            name: this.state.nameText,
            pinyin: this.state.pyText ,
        };
        this.setState({
            dataSource: [...dataSource, newData],
            count: count + 1,
            nameText: '',
            pyText: '',
            modal3Visible: false,
        });
    };

    handleSave = (row) => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.setState({ dataSource: newData });
    };

    render() {
        const { dataSource, selectedRowKeys } = this.state;
        const key = dataSource.key;
        const hasSelected = selectedRowKeys.length > 0;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const components = {
            body: {
                row: EditableFormRow,
                // cell: EditableCell,
            },
        };
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <div className='content'>
                <div style={{ marginBottom: 16 }}>
                    <Button onClick={this.setModal3Visible}  style={{ marginRight: 5, marginBottom: 16 }}>
                        添加疾病
                    </Button>
                    <Modal
                        title='添加疾病'
                        okText='添加'
                        cancelText='取消'
                        className={"form-modal1"}
                        visible={this.state.modal3Visible}
                        bodyStyle={{ padding: '32px 40px 48px' }}
                        onOk={this.handleAdd}
                        onCancel={this.handleCancel}
                    >
                        <Input placeholder="请输入疾病名称" onChange={this.onChangeNameText} className={"name-input"} />
                        <Input placeholder="请输入疾病拼音" onChange={this.onChangePYText} className={"py-input"} />
                    </Modal>
                    <Popconfirm title="确认删除?" onConfirm={() => this.handleDeleteAll(key)} okText="确认" cancelText="取消">
                        <Button
                            disabled={!hasSelected}
                        >
                            批量删除
                        </Button>
                        {console.log("@key",this.state.selectedRowKeys)}
                    </Popconfirm>
                    <span style={{ marginLeft: 8 }}>
            {hasSelected ? `选中 ${selectedRowKeys.length} 条记录` : ''}
          </span>
                </div>
                <Table
                    components={components}
                    rowSelection={rowSelection}
                    rowClassName={() => 'editable-row'}
                    dataSource={this.state.dataSource}
                    columns={columns}
                />
            </div>
        );
    }
}