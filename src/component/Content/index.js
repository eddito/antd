import React, { Component, Fragment } from 'react';
import {
    Table, Input, Button, Popconfirm, Form,Modal,Row,Col
} from 'antd';
import './index.less';
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
    }

    handleClickOutside = (e) => {
        const { editing } = this.state;
        if (editing && this.cell !== e.target && !this.cell.contains(e.target)) {
            this.save();
        }
    }

    save = () => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            if (error) {
                return;
            }
            this.toggleEdit();
            handleSave({ ...record, ...values });
        });
    }

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
        this.columns = [{
            title: '疾病名称',
            dataIndex: 'name',
            width: '30%',
            editable: true,
        }, {
            title: '疾病拼音',
            dataIndex: 'pinyin',
        },  {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record) => (
                this.state.dataSource.length >= 1
                    ? (
                        <div className='operation'>
                            <Button onClick={this.setModal3Visible} className='btn'>编辑</Button>
                            <Modal
                                visible={this.state.modal3Visible}
                                title="编辑"
                                okText='保存'
                                cancelText='取消'
                                onOk={this.handleOk}
                                onCancel={this.handleCancel}
                                >
                                <Input placeholder="编辑疾病名称" onChange={this.onChangeNameText} />
                                <Input placeholder="编辑疾病拼音" onChange={this.onChangePYText} />
                            </Modal>
                                <Button onClick={this.setModal2Visible} className='btn'>关联证型</Button>
                                <Modal
                                    width={1200}
                                    title='关联病症'
                                    okText='完成'
                                    cancelText='取消'
                                    visible={this.state.modal2Visible}
                                    onCancel={this.handleCancel}
                                >
                                    <Row>
                                        <Col span={12}>
                                            <div>已关联证型</div>
                                            <div>
                                                <span>风寒感冒</span>
                                                <Popconfirm title="确认删除?" onConfirm={() => this.showModal} okText="确认" cancelText="取消">
                                                    <Button>删除</Button>
                                                </Popconfirm>
                                            </div>
                                        </Col>
                                        <Col span={12}>
                                            <span>未关联证型</span>
                                            <Search
                                                placeholder="请输入疾病名称或疾病拼音"
                                                onSearch={value => console.log(value)}
                                                style={{ width: 240 }}
                                            />
                                            <div>
                                                <span>风寒感冒</span>
                                                <Popconfirm title="确认添加?" onConfirm={() => this.showModal} okText="确认" cancelText="取消">
                                                    <Button>添加</Button>
                                                </Popconfirm>
                                            </div>
                                        </Col>
                                    </Row>
                                </Modal>
                            <Popconfirm title="确认删除?" onConfirm={() => this.handleDelete(record.key)} okText="确认" cancelText="取消">
                                <Button>删除</Button>
                            </Popconfirm>
                        </div>
                    ) : null
            ),
        }];

        this.state = {
            dataSource: [{
                key: '0',
                name: '头痛',
                pinyin: 'tt',
            }, {
                key: '1',
                name: '慢性咽炎，感冒',
                pinyin: 'mxyy,gm',
            }],
            count: 2,
            loading: false,
            modal1Visible: false,
            modal2Visible: false,
            modal3Visible: false,
            nameText: '',
            pyText: '',
        };
    }

    //显示Modal
    setModal1Visible = () => {
        this.setState({
            modal1Visible: true,
        });
    }

    setModal2Visible = () => {
        this.setState({
            modal2Visible: true,
        });
    }

    setModal3Visible = () => {
        this.setState({
            modal3Visible: true,
        });
    }

    //确认编辑、修改、删除
    handleOk = (e) => {
        this.setState({
            visible: false,
        });
    }

    //取消编辑、修改、删除
    handleCancel = (e) => {
        this.setState({
            modal1Visible: false,
            modal2Visible: false,
            modal3Visible: false,
        });
    }

    //添加疾病名称
    onChangeNameText= (e) => {
        this.setState({ nameText: e.target.value });
    }

    //添加疾病拼音
    onChangePYText= (e) => {
        this.setState({ pyText: e.target.value });
    }

    //删除一条疾病
    handleDelete = (key) => {
        const dataSource = [...this.state.dataSource];
        this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
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
            visible: false,
        });
    }

    handleSave = (row) => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.key === item.key);
        const item = newData[index];
        newData.splice(index, 1, {
            ...item,
            ...row,
        });
        this.setState({ dataSource: newData });
    }

    render() {
        const { dataSource } = this.state;
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
            <div>
                <Button onClick={this.setModal1Visible}  style={{ marginBottom: 16 }}>
                    添加疾病
                </Button>
                <Modal
                title='添加疾病'
                okText='添加'
                cancelText='取消'
                visible={this.state.modal1Visible}
                destroyOnClose={true}
                onOk={this.handleAdd}
                onCancel={this.handleCancel}
                >
                    <Input placeholder="请输入疾病名称" onChange={this.onChangeNameText} />
                    <Input placeholder="请输入疾病拼音" onChange={this.onChangePYText} />
                </Modal>
                <Button  style={{ marginBottom: 16 }}>
                    删除
                </Button>
                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                />
            </div>
        );
    }
}