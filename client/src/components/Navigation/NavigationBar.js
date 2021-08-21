import React, { useState } from 'react';
import LeftMenu from './Sections/LeftMenu'
import RightMenu from './Sections/RightMenu';
import { Drawer, Button, Menu, PageHeader } from 'antd';
import Layout, { Header } from 'antd/lib/layout/layout';
import Password from 'antd/lib/input/Password';
import './Sections/Navbar.css';







function NavigationBar() {
    
    return (
        <PageHeader
        ghost={false}
        
        title="Title"
        subTitle="This is a subtitle"
        >

        </PageHeader>
        // <nav className="menu" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
        //   <div className="menu__container">
        //    <div style={{float:'left'}}>
        //     <Menu mode="horizontal">
        //     <Menu.Item>
        //         <a href="/" style={{fontSize:"20px"}}>TLQKF.kr</a>
        //     </Menu.Item>
        //     </Menu>
        //     </div> 
        //     <div style={{float:"right"}}> 
        //     <Menu mode="horizontal">
        //         <Menu.Item>
        //             <Password placeholder="비밀번호 입력"></Password>
        //         </Menu.Item>
        //         <Menu.Item>
        //             <Button>로그인</Button>
        //         </Menu.Item>
        //         </Menu>
        //     </div>
            
        //     </div>
        //     </nav>

        // <Layout>
        //     <Header>
        // <div className="logo" style={{float:"left",width:"120px",height: "31px",margin: "16px 24px 16px 0",background: "rgba(255, 255, 255, 0.3)"}}/>
        // <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        // <div style={{float:"right"}}>
        // <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        //   {new Array(15).fill(null).map((_, index) => {
        //     const key = index + 1;
        //     return <Menu.Item key={key}>{`nav ${key}`}</Menu.Item>;
        //   })}
        //   </Menu>
        // </div>
        // </Menu>
        
        // </Header>
        // </Layout>
    )
}

export default NavigationBar
