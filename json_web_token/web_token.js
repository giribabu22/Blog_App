const jwt = require('jsonwebtoken')

async function genrateToken(id){
    return jwt.sign(id,'oihskzdfdhsdkdhskdhskdhjdd')
}

async function veryfyToken(req,res,next){
    try{
    if(req.headers.cookie && req.headers.cookie.split('=')[1] != 'undefined'){
        const token = req.headers.cookie.split('=')[1]
        jwt.verify(token,'oihskzdfdhsdkdhskdhskdhjdd')
        next()
    }else{
        res.json({'msg':'log-in first'})
    }}catch(error){
        console.log(error);
    }
}

module.exports = {veryfyToken,genrateToken}