const mineflayer = require('mineflayer')

const bot = mineflayer.createBot({
  host: "darkblademc.falix.dev",
  port: 31985,
  username: "_LayerBung_MC",
  version: "1.20.1"
})

const password = "12345678"

bot.once("spawn", () => {
  console.log("Bot joined")

  // login AuthMe
  setTimeout(() => {
    bot.chat(`/login ${password}`)
    bot.chat(`/register ${password} ${password}`)
  }, 2000)

  // bắt đầu nhảy
  setTimeout(() => {
    setInterval(() => {
      bot.setControlState("jump", true)
      setTimeout(() => bot.setControlState("jump", false), 200)
    }, 1000)
  }, 5000)
})

bot.on("kicked", reason => {
  console.log("Kicked:", reason)
})

bot.on("error", err => {
  console.log("Error:", err)
})
