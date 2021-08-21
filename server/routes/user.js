const express = require('express');
const router = express.Router();
const { User } = require("../models/User");




router.post("/login", (req, res) => {
    User.findOne({userName:req.body.userName}, (err,user) => {
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch){
            return res.json({ loginSuccess: false, message: "비밀번호가 틀렸습니다." ,err })
            }else{
                return res.json({loginSuccess:true,message:'로그인 성공'})
            }
    });
    
    })

    

})


module.exports = router;