const { veryfyToken } = require("../json_web_token/web_token");
const express = require("express");
const connection_database = require("../db/data");
const fs = require("fs");

const routers = express.Router();
routers.use(express.static("public"));

routers.route("/info").get(veryfyToken, async (req, res) => {
  const totaldata = await connection_database("posts_data").select();
  let post_comments = await connection_database("comments")
  // console.log(totaldata,post_comments);
  res.status(200).json({"totaldata":totaldata,'post_comments':post_comments});
});


routers.get('/likes/:id/:post_email/:update',veryfyToken, async (req,res)=>{
  try {
      let {id,post_email,update} = req.params;
      id = id.slice(1)
      post_email = post_email.slice(1)
      update = update.slice(1)
      let {email} = await JSON.parse(fs.readFileSync('login.json'))

      //getting data from database
      let this_post =  await connection_database('posts_data').where('email',post_email).where('id',id)
      let post_feedback = await connection_database("feedback").where('user_email',email).where('post_id',id)

      if (!post_feedback.length){
          this_post[0].likes += 1
          console.log(' this_post.likes: ', this_post[0].likes);
          await connection_database("feedback").insert({'date':new Date(),'user_email':email,'post_id':id,"feedback":'likes'})
      }else{
        if (post_feedback[0].feedback == 'likes'){
          this_post[0].likes -= 1
          
          await connection_database("feedback").where('user_email',email).where('post_id',id).delete()
          }
          if(post_feedback[0].feedback == 'dislike'){
              this_post[0].dislike -= 1
              await connection_database("feedback").where('user_email',email).where('post_id',id).where('feedback','dislike').delete()
          }
      }
      await connection_database('posts_data').where('email',post_email).where('id',id).update(this_post[0])
      res.redirect("http://localhost:3000/home")

  } catch (error) {
      console.log(error);
  }
})

routers.get('/dislike/:id/:post_email/:update',veryfyToken,async (req,res)=>{
  try {
      let {id,post_email,update} = req.params;
      id = id.slice(1)
      post_email = post_email.slice(1)
      update = update.slice(1)
      let {email} = await JSON.parse(fs.readFileSync('login.json'))

      let this_post =  await connection_database('posts_data').where('email',post_email).where('id',id)
      let post_feedback = await connection_database("feedback").where('user_email',email).where('post_id',id)

      if (!post_feedback.length){
          this_post[0].dislike += 1
          console.log(' this_post.likes: ', this_post[0].dislike);
          await connection_database("feedback").insert({'date':new Date(),'user_email':email,'post_id':id,"feedback":'dislike'})
      
      }else{
          if (post_feedback[0].feedback == 'dislike'){
              this_post[0].dislike -= 1
              await connection_database("feedback").where('user_email',email).where('post_id',id).delete()
          }
          if(post_feedback[0].feedback == 'likes'){
              this_post[0].likes -= 1
              await connection_database("feedback").where('user_email',email).where('post_id',id).where('feedback','likes').delete()
          }
      }
      await connection_database('posts_data').where('email',post_email).where('id',id).update(this_post[0])
      res.redirect("http://localhost:3000/home");

  } catch (error) {
      console.log(error);
  }
})

routers
  .route("/new_post")
  .get(veryfyToken,(req, res) => {
    res.render("new_post");
  })
  .post(veryfyToken, async (req, res) => {
    const data = JSON.parse(fs.readFileSync("./login.json"));
    req.body["email"] = data.email;
    req.body["date"] = new Date();
    req.body["likes"] = 0;
    req.body["dislike"] = 0;
    const bool = await connection_database("posts_data").insert(req.body);
    // res.json({ msg: "you posted new post!!!" });
    res.redirect("http://localhost:3000/home");
  });




// routers.get('/feedback/:id/:feeling', async (req,res)=>{
//   try{ 
//     var {id,feeling} = req.params
//     id = id.slice(1)
//     const jsonD = await JSON.parse(fs.readFileSync('login.json'))
//     email =  jsonD.email
//     const feedback_data = await connection_database("feedback").where('post_id',id).where("user_email",email)
//     console.log('feedback_data.length: ',feedback_data.length);
//     const this_post =  await connection_database('posts_data').where('id',id)
//     console.log(this_post.length);
//     if (!feedback_data.length){
//       if (feeling == ':likes'){
//         await connection_database('feedback').insert({"post_id":id,"user_email":email,"date":new Date(),"feedback":"likes"})
//         await connection_database('posts_data').where('id',id).update('likes',this_post.length +1)
//       }else{
//         await connection_database('feedback').insert({"post_id":id,"user_email":email,"date":new Date(),"feedback":"dislike"})
//         await connection_database('posts_data').where('id',id).update('dislike',this_post.length +1)
//       }
//     }else{
//       const res = await connection_database('posts_data').where('id',id).where('email',email)
//       const res2 = await connection_database('feedback').where('post_id',id).where('user_email',email)
//       if(feeling == ":likes" ){
//         if (res2.feedback != "likes" && !res2.length){
//           await connection_database('feedback').insert({"post_id":id,"user_email":email,"date":new Date(),"feedback":"likes"})
//           await connection_database('posts_data').where('id',id).update('likes',this_post.length  + 1)
//         }else{
//           await connection_database('posts_data').where('id',id).update('likes',this_post.length - 1)
//           const res2 = await connection_database('feedback').where('post_id',id).where('user_email',email).delete()
//         }
//       }else{
//         if (res2.feedback == "dislike"){
//           await connection_database('feedback').insert({"post_id":id,"user_email":email,"date":new Date(),"feedback":"dislike"})
//           await connection_database('posts_data').where('id',id).update('dislike',this_post.length  + 1)
//         }else{
//           await connection_database('posts_data').where('id',id).update('dislike',this_post.length  - 1)
//           const res2 = await connection_database('feedback').where('post_id',id).where('user_email',email).delete()
//         }
//       }
//     }
//     // if ()
//     res.redirect('http://localhost:3000/home')
//   }catch(error){
//     console.log(error);
//   }
// })



//   routers.get('/like/:id',async(req,res)=>{
//     try{
//       var {id} = req.params
//       id = id.slice(1)
//       const jsonD = await JSON.parse(fs.readFileSync('login.json'))
//       email =  jsonD.email
//       const value =  await connection_database('posts_data').where('id',id).where('email',email)
//       const value2 = await connection_database('feedback').where('post_id',id).where("user_email",email)
//       console.log(value2,'>>>>>>>>>');
//       console.log(value,'>>>>>>>>>');
//     if (!value2.length){
//       await connection_database('feedback').insert({"post_id":id,"user_email":email,"date":new Date(),"feedback":"likes"})
//       await connection_database('posts_data').where('id',id).update('likes',value[0].likes + 1)
//       await connection_database('feedback').where('post_id',id).where("user_email",email).where('feedback',"dislikes").delete()
//     }else{
//       console.log(value2[0].feedback ,value2[0].feedback == "likes", "likes");
//       if (value2[0].feedback == "likes"){
//         await connection_database('posts_data').where('id',id).update('likes',value[0].likes - 1)
//         await connection_database('feedback').where('post_id',id).where("user_email",email).where('feedback',"likes").delete()
//       }
//       else{
//         console.log('this will run ');
//         await connection_database('posts_data').where('id',id).where('email',email).update('dislike',value[0].dislike - 1).update('likes',value[0].likes +1)
//         await connection_database('feedback').where('post_id',id).where("user_email",email).where('feedback',"dislike").delete()
//         let res = await connection_database('feedback').insert({"post_id":id,"user_email":email,"date":new Date(),"feedback":"likes"})
//       }
//     }
//   }catch(error){
//       console.error(error);
//       res.send(error)
//     }
//     res.redirect('http://localhost:3000/home')
//   })

//   routers.get('/dislike/:id',async(req,res)=>{
//     var {id} = req.params
//     id = id.slice(1)
//     const jsonD = await JSON.parse(fs.readFileSync('login.json'))
//     console.log(jsonD);
//     email =  jsonD.email
//     const value =  await connection_database('posts_data').where('id',id).where('email',email)
//     const value2 = await connection_database('feedback').where('post_id',id).where("user_email",email)
//     if (!value2.length){
//       await connection_database('feedback').insert({"post_id":id,"user_email":email,"date":new Date(),"feedback":"dislike"})
//       await connection_database('posts_data').where('id',id).update('dislike',value[0].dislike + 1)
//       await connection_database('feedback').where('post_id',id).where("user_email",email).where('feedback',"likes").delete()
//     }else{
//       if (value2[0].feedback == "dislike"){
//         await connection_database('posts_data').where('id',id).update('dislike',value[0].dislike - 1)
//         await connection_database('feedback').where('post_id',id).where("user_email",email).where('feedback',"dislike").delete()
//       }else{
//         await connection_database('posts_data').where('id',id).where('email',email).update('likes',value[0].likes -1).update('dislike',value[0].dislike +1)
//         await connection_database('feedback').where('post_id',id).where("user_email",email).where('feedback',"likes").delete()
//         await connection_database('feedback').insert({"post_id":id,"user_email":email,"date":new Date(),"feedback":"dislike"})

//       }
//     }
//     res.redirect('http://localhost:3000/home')
//   })


// routers.get('/like/:id/:email',async(req,res)=>{
//   console.log('like');
//   var {id,email} = req.params
//   id = id.slice(1)
//   email = email.slice(1)
//   const value =  await connection_database('posts_data').where('id',id)
//   const value2 = await connection_database('feedback').where('post_id',id).where("user_email",email).where('feedback',"dislike")
//   console.log(value2,'>>>>>>>>>>>>>');
//   try{
//     if (value2.length){
//     await connection_database('feedback').insert({"post_id":id,"user_email":email,"date":new Date(),"feedback":"like"})
//     await connection_database('posts_data').where('id',id).update('likes',value[0].likes + 1).update
//     await connection_database('feedback').where('post_id',id).where("user_email",email).where('feedback',"dislike").delete()
//   }else{
//     await connection_database('feedback').insert({"post_id":id,"user_email":email,"date":new Date(),"feedback":"like"})
//     await connection_database('posts_data').where('id',id).update('likes',value[0].likes + 1)
//   }
//     res.redirect('http://localhost:3000/home')
//   }catch(error){
//       res.send(error)
//   }
// })

// routers.get('/dislike/:id/:email',async(req,res)=>{
//   console.log('dislike');
//   var {id,email} = req.params
//   id = id.slice(1)
//   email = email.slice(1)
//   const value =  await connection_database('posts_data').where('id',id)
//   try{
//     const names = await connection_database('feedback').insert({"post_id":id,"user_email":email,"date":new Date(),"feedback":"dislike"})
//     const value2 =  await connection_database('posts_data').where('id',id).update('dislike',value[0].dislike + 1)
//     res.redirect('http://localhost:3000/home')
//   }catch(error){
//     if (error.errno == 1062){
//       if (value[0].feedback != "like"){
//         await connection_database('posts_data').where('id',id).update('likes',value[0].likes - 1)
//         await connection_database('posts_data').where('id',id).update('dislike',value[0].dislike+1)
//         await connection_database('feedback').where("user_email",email).where('post_id',value[0].id).delete()
//       }
//       res.redirect('http://localhost:3000/home')
//     }
//   } 
// })
routers.get('/comments/:id/:email',async(req,res)=>{
  console.log(req.params);
  var {id,email} = req.params
  id = id.slice(1)
  email = email.slice(1)
  const value =  await connection_database('posts_data').where('id',id)
  res.send(value)
})

routers.get('/delete/:id',async (req,res)=>{
  var {id} = req.params
    id = id.slice(1)
    const jsonD = await JSON.parse(fs.readFileSync('login.json'))
    console.log(jsonD);
    email =  jsonD.email
  await connection_database('posts_data').where('id',id).where("email",email).delete()
  const r = await connection_database('feedback').where('post_id',id).delete()
  console.log(r);
  res.redirect('http://localhost:3000/profile')
})


module.exports = routers;
