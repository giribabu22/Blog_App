const expr = require('express');
const connection_database = require('../db/data')
const fs = require('fs');
const { veryfyToken } = require("../json_web_token/web_token");


const routers = expr.Router();


routers.get('/:id/:post_email',veryfyToken, async (req,res)=>{
    res.render('comments')
})
.post('/:id/:post_email',veryfyToken, async (req,res)=>{
    try {
        let {id,post_email} = req.params;
        id = id.slice(1)
        post_email = post_email.slice(1)
        let {email} = await JSON.parse(fs.readFileSync('login.json'))
        
        await connection_database('comments').insert({feeling_msg:req.body.massage,post_id:id,date:new Date(),user_email:email})

        //getting data from database
        // let this_post =  await connection_database('posts_data').where('email',post_email).where('id',id)
        // let post_comments = await connection_database("comments").where('user_email',email).where('post_id',id)

        
        // await connection_database('posts_data').where('email',post_email).where('id',id).update(this_post[0])
        res.redirect('http://localhost:3000/comments'+req.url);

    } catch (error) {
        console.log(error);
    }
})



module.exports = routers