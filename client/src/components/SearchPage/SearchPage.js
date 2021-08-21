import React,{useEffect, useState} from 'react'
import { Typography,Button,Form,message,Input,Icon,Col,Row,Title,Space, Card } from 'antd'
import axios from 'axios';
import { Layout,PageHeader } from 'antd';
import ReactDOM from 'react-dom';
import AuthIcon from '../RegisterPage/AuthIcon';




function SearchPage(props) {
    const ColStyle = {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        padding:'5px',
        
    }
    const SearchName = props.match.params.String
    const [Matchs, setMatchs] = useState([])
    const [MoreView, setMoreView] = useState(0)
    const [MatchInfo, setMatchInfo] = useState([])
    const [NoUser, setNoUser] = useState(true)
    const [ButtonLoading, setButtonLoading] = useState(true)
    const [Password, setPassword] = useState("")
    let Time = 1000
    useEffect(() => {
        matchs(SearchName)
        
    },[])

    useEffect(()=> {
        if(Matchs.length === 3){
        
        Matchs.map((match,i) => {
            let User = match.info.participants
            let SearchedUser
            let WinOrLose = ""
            let Color = ""
            User.map((user,i) => {
                if((user.summonerName.replace(/(\s*)/g, "")) === (SearchName.replace(/(\s*)/g, ""))){
                    SearchedUser = <div>Champ:{user.championName} {user.kills}/{user.deaths}/{user.assists}</div>
                    if(user.win){
                        WinOrLose = "Win!"
                        Color = "#386fc7"
                    }else{
                        WinOrLose = "Lose"
                        Color = "#db445d"
                    }
                }
            })
            setMatchInfo(MatchInfo => MatchInfo.concat(
            <Card title={WinOrLose} style={{backgroundColor:`${Color}`}}>
            <Row>
            <Col span={12} style={ColStyle}>{SearchedUser}</Col>
            <Col span={12} style={ColStyle}>
                <Row>
                    <Col sapn={12} style={{paddingRight:'5rem'}}>
                    {User.map((user,i) => {
                if(i>=5){
                    return <Col>{user.championName}</Col>
                }
                
            })}
                    </Col>
                    <Col sapn={12}>
                    {User.map((user,i) => {
                if(i<5){
                    return <Col>{user.championName}</Col>
                }
                
            })}
                    </Col>
                </Row>
            </Col>

            </Row>
            </Card>
            )
            )
        })
        
       
        setMatchs([])
        setButtonLoading(false)
    }
        
    },[Matchs])


    const matchs = (searchName)=> {
        let body = {
            user_name: searchName
        }
        searchFunction(body)
        
    }
    
   
    const onSubmitHandler =  (e) => {
        
        setButtonLoading(true)
        
        let body = {
            user_name:SearchName
        }
        searchFunction(body)
   
    }

    const onRegisterHandler = () => {
        window.location.href = `/register/${SearchName}`
    }

    
const searchFunction = (body)=> {
    axios.post('/api/register/auth_icon',body)

        .then(response => {
            if(response.data.success){
                

                axios.post('/api/search/search_user',[response.data.RiotInfo,MoreView])
                .then( async response => {
                    setMoreView(MoreView => MoreView+3)
                    if(response.data.success){
                        const matchID = response.data.matchID
                        let match = await Promise.all( matchID.map( async (match_id,i) => {
                            

                            return await axios.post('/api/search/match', [match_id] )
                            .then( response => {
                                return response.data.match
                                //  setMatchs(Matchs => Matchs.concat(response.data.match))
                                //  setButtonLoading(false)
                                    
                            })
                            
                        })
                        )
                            setMatchs(match)
                    }else{
                        console.log(response.data.success)
                        console.log(response.data.err)
                        alert('실패')
                    }
                })
            }else{
                console.log(response.data)
               
                }
        })
}


const onPasswordHandler = (e)=> {
    setPassword(e.currentTarget.value)
}


const onLoginHandler = ()=> {
    let body = {
        userName:SearchName,
        password:Password
    }
    axios.post('/api/user/login',body)
    .then(response => {
        if(response.data.loginSuccess){
            console.log('성공')
        }else{
            console.log('실패')
            console.log(response.data)
        }
    })
}

    const { Header, Sider, Content } = Layout;

    if(NoUser){
        
    return (
        
        
        <div style={{display: 'flex', justifyContent: 'center', 
                    width: '100%', height: '100vh',backgroundColor:'white'
            }}>
        
            <Layout style={{display:'flex',justifyContent:'center' ,backgroundColor:'white',marginTop:'20px'}}>
            
                
                <Header style={{backgroundColor:'white',display: 'flex', justifyContent: 'center',alignItems:'center',height:'150px'}}>
                    <div style={{display:'flex', width:'55%',justifyContent:'center',alignItems:'center'}}>
                    <Content style={{display:'flex',backgroundColor:'white',width:'55%',fontSize:'25px',height:'100%',alignItems:'center'}}>
                        {SearchName}
                        <Button style={{marginLeft:'1rem'}} onClick={onRegisterHandler}
                        >회원가입</Button> 
                        <Input.Password value={Password} onChange={onPasswordHandler} style={{width:'20%',marginLeft:'1rem'}} placeholder="비밀번호 입력"/>
                        <Button style={{marginLeft:'1rem'}} onClick ={onLoginHandler}
                        >로그인</Button> 
                    </Content>
                    
                    </div>
                </Header>
                
                <Layout style={{marginLeft:'15rem' , marginRight:'15rem',backgroundColor:'white'}}>
                
                    <Sider style={{display:'flex',backgroundColor:'white',justifyContent:'center' }}>여기 댓글</Sider>
                    <Content style={{display:'flex',backgroundColor:'white',justifyContent:'center' }}>

                    <Space direction="vertical" style={{width:'55%'}}>
                    
                        {MatchInfo}
                        <Button type="primary" loading={ButtonLoading} onClick={onSubmitHandler} block>
                        Load MatchInfo
                        </Button> 
                    
                    </Space>
                    
                    </Content>
                </Layout>
  
            
            </Layout>
            
            
            </div>
            
           
    
    )
}
    else{
        return (<div>유저를 찾을 수 없습니다...</div>)
    }
}

export default SearchPage
