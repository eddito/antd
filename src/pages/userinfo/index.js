import React, { Component } from 'react';
import {
    Table, Input, Button, Popconfirm, Form,Modal,Row,Col
} from 'antd';
import {Link} from "react-router-dom";
// import './index.less';
const FormItem = Form.Item;
const Search = Input.Search;
const EditableContext = React.createContext();

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

export default class UserInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [{
                key: '0',
                name: 'Jone',
                age: '30',
                sex: '男',
                birthday: '1989-02-21',
                address: '四川省成都市温江区柳台大道1166号',
                time: '2018-12-24'
            },
                {
                    key: '1',
                    name: 'Mike',
                    age: '29',
                    sex: '男',
                    birthday: '1990-02-21',
                    address: '四川省成都市温江区柳台大道1166号',
                    time: '2018-12-24'
                },
                {
                    key: '2',
                    name: 'Rose',
                    age: '20',
                    sex: '女',
                    birthday: '1999-02-21',
                    address: '四川省成都市金牛区十二桥路37号',
                    time: '2018-12-24'
                }],
            count: 2,
            loading: false,
            modal1Visible: false,
            modal2Visible: false,
            modal3Visible: false,
            nameText: '',
            pyText: '',
            selectedRowKeys: [],
        };

        this.columns = [
            {
                title: '姓名',
                dataIndex: 'name',
                editable: true,
                align: 'center'
            },
            {
                title: '性别',
                dataIndex: 'sex',
                align: 'center'
            },
            {
                title: '出生日期',
                dataIndex: 'birthday',
                align: 'center'
            },
            {
                title: '家庭地址',
                dataIndex: 'address',
                align: 'center'
            },
            {
                title: '上一次操作时间',
                dataIndex: 'time',
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
                                <Link to="/history"><Button onClick={() => this.handleEdit}>查看</Button></Link>
                                <Popconfirm title="确认删除?" onConfirm={() => this.handleDelete(record.key)} okText="确认" cancelText="取消">
                                    <Button>删除</Button>
                                </Popconfirm>
                            </div>
                        ) : null
                ),
            }
        ];
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleEdit() {
        window.location.reload();
    }

    //选中记录条数
    onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys });
    };


    //显示编辑疾病Modal
    setModal1Visible = () => {
        this.setState({
            modal1Visible: true,
        });
    };

    //显示关联病症Modal
    setModal2Visible = () => {
        this.setState({
            modal2Visible: true,
        });
    };


    //显示增加疾病Modal
    setModal3Visible = () => {
        this.setState({
            modal3Visible: true,
        });
    };

    //确认编辑、修改、删除
    handleOk = (e) => {
        this.setState({
            visible: false,
        });
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
        const dataSource = [...this.state.dataSource];
        const dataKey=[...this.state.selectedRowKeys]
        this.setState({
            dataSource:dataSource.filter(item=>{
                dataKey.map(key=>{
                    return key.key !==item.key
                })
            })
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
                        添加患者
                    </Button>
                    <Modal
                        title='添加患者'
                        okText='添加'
                        cancelText='取消'
                        className={"form-modal1"}
                        visible={this.state.modal3Visible}
                        bodyStyle={{ padding: '32px 40px 48px' }}
                        onOk={this.handleAdd}
                        onCancel={this.handleCancel}
                    >
                        <Input placeholder="请输入患者名字" onChange={this.onChangeNameText} className={"name-input"} />
                        <Input placeholder="请输入疾病拼音" onChange={this.onChangePYText} className={"py-input"} />
                    </Modal>
                    <Popconfirm title="确认删除?" onConfirm={() => this.handleDeleteAll(key)} okText="确认" cancelText="取消">
                        <Button
                            disabled={!hasSelected}
                        >
                            批量删除
                        </Button>
                    </Popconfirm>
                    <span style={{ marginLeft: 8 }}>
                     {hasSelected ? `选中 ${selectedRowKeys.length} 条记录` : ''}
                     </span>
                    <Search
                        placeholder="根据姓名查询患者"
                        onSearch={value => console.log(value)}
                        style={{ width: 400, marginLeft: 900 }}
                    />
                </div>
                <Table
                    components={components}
                    rowSelection={rowSelection}
                    rowClassName={() => 'editable-row'}
                    dataSource={dataSource}
                    columns={columns}
                />
            </div>
        );
    }
}