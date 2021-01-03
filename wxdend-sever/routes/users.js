const express = require('express')
const router = express.Router()
const passport = require('passport')
router.get("/",passport.authenticate('jwt',{session:false}),(req,res)=>{
  return  res.json({
        data: req.user,
        msg: { 'code': 200 }
    })
})
module.exports = router