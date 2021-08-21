const express = require('express');
const router = express.Router();
const RiotRequest = require('riot-lol-api');
const apiKey = require('../apiKey')
var riotRequest = new RiotRequest(apiKey.apiKey);
const async = require('async')

router.post('/search_user',(req,res)=>{
    const user_info = req.body[0]
    const startNumber = req.body[1]
   
    if(req.body){
        riotRequest.request(
            'ASIA',
        'summoner',
        `/lol/match/v5/matches/by-puuid/${user_info.puuid}/ids?start=${startNumber}&count=3`,
        (err,data) => {
            if(err) return res.json({success:false , err})
            return res.json({success : true , matchID : data})

        })
        
    }
    
})





router.post('/match', async (req,res)=>{
    const matchID = req.body
    console.log(matchID)
    
    riotRequest.request(
        'ASIA',
        'summoner',
        `/lol/match/v5/matches/${matchID}`,
            (err,data) => {
            res.json({match:data})
           })

    
    
     
   
    
    
    
       
    })
 
    
    


module.exports = router;