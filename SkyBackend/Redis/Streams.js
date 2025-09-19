
// * Streams


import Redis from "ioredis";

const redis=new Redis({
  host:"localhost",
  port:6379,
});

async function main(){

  // * Streams

//   const entryId = await redis.xadd(
//   'user-events', '*', 
//   'userId', '123',
//   'action', 'purchase', 
//   'product', 'laptop',
//   'amount', '999.99'
// );
// console.log("Entry ID :",entryId);
// *read
// const entries=await redis.xread("STREAMS","user-events","0")
// console.log(entries);

// ** JSON.stringify

// const entries=await redis.xread("STREAMS","user-events","0")
// console.log(JSON.stringify(entries));

// *✅ So now entries contains all messages in the user-events stream.
const entries=await redis.xread("STREAMS","user-events","0")  // *✅ Without STREAMS, Redis won’t know where the options stop and where the stream list begins, so it gives a syntax error.


// entries[0][1].forEach(([id, fields])=>{
//   const data={}
//   for(let i=0;i<fields.length;i+=2){
//     data[fields[i]]=fields[i+1]
//   }
//   console.log(`Entry ${id}:`,data);
  
// })


//  * If you push two or more messages very quickly, Redis may assign sequence numbers:

// const id1=await redis.xadd("curr-id", "*", "userId", "1", "action", "click")
// const id2=await redis.xadd("curr-id", "*", "userId", "2", "action", "scroll");
// console.log("First ID:", id1);
// console.log("Second ID:", id2);

// const ids=await redis.xread("STREAMS","user-events","0")
// console.log(ids);

// *
// const ids = await redis.xrange("user-events", "-", "+");
// console.log(ids);


// await redis.del("user-events");
// console.log("Stream deleted.");

// const recentEntries=await redis.xrevrange("user-events","+","-","COUNT","4")
// console.log(recentEntries);


//  ** print one timestamp to other 
// const rangeEntries=await redis.xrange('user-events', '1758252855196-0','1758253165212-0');
// console.log(rangeEntries);

// **how to use 
// const longdi_lat=await redis.geoadd('restaurants',
//   -74.0059, 40.7128, 'Pizza Palace',    // NYC
//   -118.2437, 34.0522, 'Burger Barn',   // LA
//   -87.6298, 41.8781, 'Taco Town'       // Chicago
// );
// console.log(longdi_lat);

}


main()