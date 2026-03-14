const mineflayer = require('mineflayer')
const express = require("express")

const app = express()

app.get("/", (req,res)=>{
  res.send("Bot Alive")
})

app.listen(3000)

function createBot(){

const bot = mineflayer.createBot({
  host: "darkblademc.falix.dev",
  port: 31985,
  username: "FR333WILL"
})

bot.on('spawn', () => {
  console.log("Bot đã vào server")

  setInterval(() => {
    bot.setControlState('jump', true)
    setTimeout(()=>bot.setControlState('jump', false),500)
  }, 30000)

})

bot.on('end', () => {
  console.log("Bot bị thoát -> reconnect sau 10s")
  setTimeout(createBot, 10000)
})

bot.on('error', err => console.log(err))

}

createBot()
