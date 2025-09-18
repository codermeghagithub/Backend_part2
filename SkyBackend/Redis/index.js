// import express from "express";
import Redis from "ioredis";

const redis=new Redis({
  host:"localhost",
  port:6379,
});

async function main(){
//  *list
// await redis.del("myList:2")
// * LPUSH :Add elements to the left (head) of list
// await redis.lpush("myList:1","a","b","c");

// *RPUSH - Add elements to the right (tail) of list

// await redis.rpush("myList:2","a","b","c");

// ** Check if the list exists first
// const listExists=await redis.exists("myList:2");
// if(!listExists){
//   await redis.rpush("myList:2", "a", "b", "c")
// }

// * Lpop
// const leftEle=await redis.lpop("myList:1");
// console.log(leftEle);

// RPOP

// const Rele=await redis.rpop("myList:2");
// console.log(Rele);

//  * LLEN
// const length=await redis.llen("myList:2");
// console.log(length);


// **So lrange("myList", 0, -1) means:

// *Start: Index 0 (first element)
// *Stop: Index -1 (last element)
// **start: Starting index (inclusive)
// * stop: Ending index (inclusive)
// const allelement=await redis.lrange("myList:2",0,-1);
// console.log(allelement);

// const somele=await redis.lrange("myList:2",0,2)
// console.log(somele);

// ** sadd
// const added=await redis.sadd("myset:1","apple","banana","orenge","banana","orenge")
// console.log(added);
// * srem
// const removed=await redis.srem("myset:1","banana");
// console.log(removed);
// *SISMEMBER - Check if member exists in set
// const exists=await redis.sismember("myset:1","orenge")
// console.log(exists);

// ** HASHMAP
// await redis.hset("user:1000","name","Sham","email","sham@gmail.com","age","30")


// Better approch previous one 
await redis.hset('user:1000', {
    name: 'John Doe',
    email: 'john@example.com',
    age: 30
});
const age=await redis.hget ('user:1000', 'age')
console.log(age);

}


main()





// *Day-1
// import {redis} from './redis.js'
// const app=express();


// app.get('/',async(req,res)=>{
//   try{
//     const views=await redis.incr("pageviews");
//     res.send(`This page was visited : ${views} times`);
//   }
//   catch(err){
//     res.status(500).send("Error accessing Redis.")
//   }
// });

// app.listen(3000,()=>{
//   console.log("Server is running on 3030");
  
// })

