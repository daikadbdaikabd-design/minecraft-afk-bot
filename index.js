const mineflayer = require("mineflayer")
const express = require("express")

const app = express()

app.get("/", (req,res)=>{
  res.send("bot online")
})

app.listen(3000)

function createBot(){

const bot = mineflayer.createBot({
  host: "darkblademc.falix.dev",
  port: 31985,
  username: "_HuuThien_" + Math.floor(Math.random()*10000),
  version: "1.20.1"
})

bot.on("spawn", ()=>{

console.log("bot joined")

setInterval(()=>{
bot.setControlState("jump", true)

setTimeout(()=>{
bot.setControlState("jump", false)
},500)

},5000)

})

bot.on("messagestr",(msg)=>{
if(msg.includes("/register")){
bot.chat("/register 123123 123123")
}

if(msg.includes("/login")){
bot.chat("/login 123123")
}
})

bot.on("end", ()=>{
console.log("reconnect...")
setTimeout(createBot,10000)
})

bot.on("error",()=>{})

}

createBot()
