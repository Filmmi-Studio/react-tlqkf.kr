const express = require('express');
const router = express.Router();
const RiotRequest = require('riot-lol-api');
const apiKey = require('../apiKey')
var riotRequest = new RiotRequest(apiKey.apiKey);
const { User } = require("../models/User");
const bcrypt = require('bcrypt')
const saltRounds = 10

router.post('/auth_icon',(req,res)=>{
    const user_name = req.body.user_name
    if(user_name){
        riotRequest.request('kr',
        'summoner',
        encodeURI(`/lol/summoner/v4/summoners/by-name/${user_name}`),
        (err,data) => {
            if(err) return res.json({success:false , err})
            return res.json({success : true , RiotInfo : data})

        })
        
        
    }else{
        
        return res.json({
            success : false
        })
    
    }
})


router.post('/register',(req,res)=>{

    bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) return console.log(err)
        
        bcrypt.hash(req.body.easyPassword, salt, function (err, hash) {
            if (err) return console.log(err)

            req.body.easyPassword = hash
            User.findOneAndUpdate(
                {userName:req.body.userName},
                {userName:req.body.userName,easyPassword:req.body.easyPassword},
                {upsert:true},
                (err,doc) => {
                    if(err) return res.json({err, success:false})
                    return res.status(200).send({
                        success: true
                    })
                }
            )
            
        })
    })
    
    

})




module.exports = router;