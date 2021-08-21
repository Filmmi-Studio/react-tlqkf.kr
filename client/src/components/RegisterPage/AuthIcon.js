import React,{useRef,useState,useEffect} from 'react'

import { Typography,Button,Form,message,Input,Space } from 'antd'
import { Layout } from 'antd';
import axios from 'axios'
import {useDispatch} from 'react-redux'


import {registerUser} from '../../_actions/user_action';



function AuthIcon(props) {


   

    const dispatch = useDispatch();
    const {Title} = Typography
    const { Header, Sider, Content } = Layout;
    const SearchName = (props.match.params.searchName.replace(/(\s*)/g, ""))
    const [UserIcon, setUserIcon] = useState('')
    const [Password, setPassword] = useState('')
    const [ConfirmPassword, setConfirmPassword] = useState('')
    const [PasswordCheck, setPasswordCheck] = useState(false)
    const [ImgCheck, setImgCheck] = useState(false)
    const [RandomIcon, setRandomIcon] = useState()
    
    const divStyle = {
        display:'flex',
        justifyContent:'center'
    }


   

    useEffect(()=> {
       
        let randomNumber = Math.floor(Math.random() * 2)
        let userIcon
        let body = {
            user_name:SearchName
        }
        axios.post('/api/register/auth_icon',body)
        .then(response => {
           userIcon = response.data.RiotInfo.profileIconId
            while(true){
                if(randomNumber!==userIcon){
                    setRandomIcon(randomNumber)
                    setUserIcon(userIcon)
                    break
                }
                randomNumber = Math.floor(Math.random() * 29)
            }
            
        })
       

        
    },[])
    
    




    const onPasswordHandler = (e)=> {
        
        
        setPassword(e.currentTarget.value)
    }
    const ConfirmPasswordHandler = (e)=> {
        setConfirmPassword(e.currentTarget.value)
    }





    const onFinish = (val)=> {
        if(ConfirmPassword!==Password){
            setImgCheck(false)
            setPasswordCheck(true)
            return
       }
       
        let body2 = {
            user_name:SearchName
        }
        axios.post('/api/register/auth_icon',body2)
        .then(response => {
            if(response.data.RiotInfo.profileIconId === RandomIcon){
                let body = {
                    userName:SearchName,
                    easyPassword: val.password
                }
        
        
                dispatch(registerUser(body))
                .then(response => {
                    
                    if(response.payload.success){
                        props.history.push("/")
                    }else{
                        console.log(response.payload.err)
                        alert('회원가입 실패')
                    }
                })
            }else{
                setImgCheck(true)
                setPasswordCheck(false)
            }
        })
        
        
        
        
    
    }


    
    

    return (
       
        <div style={{display: 'flex', justifyContent: 'center', alignItems:'center',
        width: '100%', height: '100vh'
  }}>
    
    <Layout>
      <Header style={{display: 'flex', justifyContent: 'center' , backgroundColor:'white'}}>
        <Title>{SearchName}</Title>
      </Header>
      
      <Content style={{display: 'flex', justifyContent: 'center',backgroundColor:'white'}}>
          <Space direction='vertical' style={{display:'flex', justifyContent:'center'}}>
        
            <div style={divStyle}>현재 아이콘</div>
            <div style={divStyle}>
                <img width='150px' height='150px' src={`http://ddragon.leagueoflegends.com/cdn/11.16.1/img/profileicon/${UserIcon}.png`}/>
            </div>
            <div style={divStyle}>변경 해야할 아이콘</div>
            <div style={divStyle}>
                <img width='150px' height='150px' src={`http://ddragon.leagueoflegends.com/cdn/11.16.1/img/profileicon/${RandomIcon}.png`}/>
            </div>
            <br/>
            <Form
                onFinish={onFinish}
            >
            <Form.Item
                name="password"
                rules={[
                    {required:true,
                    message:'비밀번호를 입력해 주세요'
                    },
                    {min:6,
                    message:'6글자 이상 입력해주세요'
                    }
                ]}
            >
            <Input.Password
                value={Password}
                onChange={onPasswordHandler}
                placeholder="비밀번호 입력"
                
             />
            </Form.Item>
            <br/>
            <Form.Item
            >
            <Input.Password 

                value={ConfirmPassword}
                onChange={ConfirmPasswordHandler}
                placeholder="비밀번호 확인"
                
             />
             {PasswordCheck && <p style={{display:'flex',justifyContent:'center',color:'red'}}>비밀번호가 다릅니다</p>}
            </Form.Item>
            <br/>
            <div style={{display:'flex',justifyContent:'center'}}>
            <Form.Item>
            <Button htmlType="submit" style={{width:'100%'}}>회원가입</Button>
            {ImgCheck && <p style={{display:'flex',justifyContent:'center',color:'red'}}>이미지가 다릅니다</p>}
            </Form.Item>
            
            </div>
            </Form>
        </Space>    
    
    </Content>
    
  </Layout>
 


</div>
        

    )
}

export default AuthIcon
