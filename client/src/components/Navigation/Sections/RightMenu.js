import React from 'react'
import { withRouter } from 'react-router-dom';
import { Button, Menu, Space } from 'antd';
import Password from 'antd/lib/input/Password';

import './Navbar.css'

function RightMenu(props) {
    return (
        <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">Signin</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">Signup</a>
        </Menu.Item>
      </Menu>
        // <div style={{display:'flex',justifyContent:'center',alignContent:'center'}} >
        // <Space direction="horizontal">
        // <Password></Password>
        // <Button>aaa</Button>
        // </Space>
        // </div>
    )
}

export default RightMenu
