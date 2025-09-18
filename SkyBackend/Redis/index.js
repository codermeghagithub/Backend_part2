import express from "express";
import {redis} from './redis.js'
const app=express();


app.get('/',async(req,res)=>{
  try{
    const views=await redis.incr("pageviews");
    res.send(`This page was visited : ${views} times`);
  }
  catch(err){
    res.status(500).send("Error accessing Redis.")
  }
});

app.listen(3000,()=>{
  console.log("Server is running on 3030");
  
})

