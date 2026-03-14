const mineflayer = require('mineflayer')

const config = {
  host: "darkblademc.falix.dev", // IP server
  port: 25565,
  username: "YTBPhuongGM_",
  version: "1.20.1"
}

let bot

function createBot() {

  console.log("Starting bot...")

  bot = mineflayer.createBot(config)

  bot.on("spawn", () => {

    console.log("Bot joined server")

    startJump()

  })

  bot.on("end", () => {

    console.log("Bot disconnected. Reconnecting in 10s...")

    setTimeout(createBot, 10000)

  })

  bot.on("error", (err) => {

    console.log("Error:", err.message)

  })

}

function startJump() {

  setInterval(() => {

    if (!bot.entity) return

    bot.setControlState("jump", true)

    setTimeout(() => {
      bot.setControlState("jump", false)
    }, 200)

  }, 1000)

}

createBot()
