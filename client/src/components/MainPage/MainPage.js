import React,{useState} from 'react';
import { Layout } from 'antd';
import { Input, Typography,Button } from 'antd';
const {Title} = Typography
const { Search } = Input;

function MainPage() {


    const { Header, Content } = Layout;
    const onSearch = value => {
    window.location.href = `/search/${value}`
    }
    

   

    return (
      <div style={{display: 'flex', justifyContent: 'center', alignItems:'center',
            width: '100%', height: '100vh'
      }}>
        <Layout>
          <Header style={{display: 'flex', justifyContent: 'center' , backgroundColor:'white'}}>
            <Title>TLQKF.kr</Title>
          </Header>
          
          <Content style={{display: 'flex', justifyContent: 'center',backgroundColor:'white'
              }}>
                
          
            <Search
              style={{width:'30%'}}
              placeholder="유저 닉네임 입력"
              allowClear
              name="name"
              enterButton="Search"
              size="large"
              onSearch={onSearch}
            />
        
        </Content>
        
      </Layout>



    </div>
    )
}

export default MainPage
