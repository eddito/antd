import React, { Component, Fragment } from 'react'
import { Menu, Icon } from 'antd';
import MenuConfig from './../../config/menuConfig';
import './index.less';
const SubMenu = Menu.SubMenu;
 export default class NavLeft extends Component {
    state = {
        currentKey: ''
    }
    // 菜单点击
    // handleClick = ({ item, key }) => {
    //     if (key === this.state.currentKey) {
    //         return false;
    //     }
    //     // 事件派发，自动调用reducer，通过reducer保存到store对象中
    //     const { dispatch } = this.props;
    //     dispatch(switchMenu(item.props.title));
    //
    //     this.setState({
    //         currentKey: key
    //     });
    //     // hashHistory.push(key);
    // };
    componentWillMount(){
        const menuTreeNode = this.renderMenu(MenuConfig);

        this.setState({
            menuTreeNode
        })
    }
    // 菜单渲染
    renderMenu =(data)=>{
        return data.map((item)=>{
            if(item.children){
                return (
                    <SubMenu title={item.title} key={item.key}>
                        { this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return <Menu.Item title={item.title} key={item.key}>{item.title}</Menu.Item>
        })
    };
    // homeHandleClick = () => {
    //     const { dispatch } = this.props;
    //     dispatch(switchMenu('首页'));
    //     this.setState({
    //         currentKey: ""
    //     });
    // };
    render() {
        return (
            <div className='nav-left'>
                {/*<NavLink to="/home" >*/}
                    <div className="logo">
                        <img src="/assets/logo.png" alt=""/>
                        <h1>病症分析</h1>
                    </div>
                {/*</NavLink>*/}
                <Menu
                    theme="dark"
                >
                    { this.state.menuTreeNode }
                </Menu>
            </div>
        );
    }
}