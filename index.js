const mineflayer = require("mineflayer")

const config = {
  host: "darkblademc.falix.dev", // IP server
  port: 21985,
  username: "YTBPhuongGM_",
  password: "12345678" // mật khẩu AuthMe
}

let bot

function createBot() {

  console.log("Starting bot...")

  bot = mineflayer.createBot({
    host: config.host,
    port: config.port,
    username: config.username
  })

  bot.on("spawn", () => {
    console.log("Bot joined server")
  })

  bot.on("message", (msg) => {

    const text = msg.toString()

    if (text.includes("/register")) {

      bot.chat(`/register ${config.password} ${config.password}`)
      console.log("Registering...")

    }

    if (text.includes("/login")) {

      bot.chat(`/login ${config.password}`)
      console.log("Logging in...")

      setTimeout(startJump, 4000)
    }

  })

  bot.on("end", () => {

    console.log("Bot disconnected. Reconnecting in 10s...")

    setTimeout(createBot, 10000)

  })

  bot.on("error", err => {
    console.log("Error:", err.message)
  })

}

function startJump() {

  console.log("AFK jump started")

  setInterval(() => {

    if (!bot.entity) return

    bot.setControlState("jump", true)

    setTimeout(() => {
      bot.setControlState("jump", false)
    }, 200)

  }, 1000)

}

createBot()
