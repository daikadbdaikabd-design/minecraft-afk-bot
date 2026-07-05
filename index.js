const mineflayer = require("mineflayer");
const express = require("express");

let bot = null;
let afkInterval = null; // Biến dùng để quản lý vòng lặp chống AFK

function startBot() {
  console.log("Đang khởi động bot...");

  bot = mineflayer.createBot({
    host: "play1.nvnmc.top", // Tách riêng host và port cho chuẩn cấu trúc
    port: 25744,
    username: "MeMayBeo",
    version: "1.20.1"
  });

  bot.on("login", () => {
    console.log("Bot đã login server");
  });

  bot.on("spawn", () => {
    console.log("Bot đã vào world");

    // Xóa vòng lặp nhảy cũ nếu có trước khi tạo cái mới (Tránh lỗi ngốn RAM)
    if (afkInterval) clearInterval(afkInterval);

    // Chống AFK nhảy mỗi 5 giây
    afkInterval = setInterval(() => {
      if (!bot || !bot.entity) return;

      bot.setControlState("jump", true);
      setTimeout(() => {
        if (bot && bot.entity) {
          bot.setControlState("jump", false);
        }
      }, 300);
    }, 5000);
  });

  bot.on("messagestr", (msg) => {
    // Tối ưu bằng cách chuyển tin nhắn về chữ thường để nhận diện chính xác hơn
    const lowerMsg = msg.toLowerCase();

    if (lowerMsg.includes("/register")) {
      bot.chat("/register thien24092012 thien24092012");
    }

    if (lowerMsg.includes("/login")) {
      bot.chat("/login thien24092012");
    }
  });

  bot.on("kicked", (reason) => {
    console.log("Bot bị kick do:", reason);
  });

  bot.on("error", (err) => {
    console.log("Lỗi kết nối:", err.message);
  });

  bot.on("end", () => {
    console.log("Bot mất kết nối! Đang dọn dẹp bộ nhớ...");
    
    // Dừng vòng lặp nhảy khi bot mất kết nối
    if (afkInterval) clearInterval(afkInterval); 

    console.log("Sẽ tự động reconnect sau 30 giây...");
    setTimeout(() => {
      startBot();
    }, 30000);
  });
}

// Chạy bot lần đầu tiên
startBot();

// ==========================================
// WEB SERVER GIỮ CHO RENDER KHÔNG BỊ TẮT
// ==========================================
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Bot AFK Minecraft đang chạy 24/7!");
});

app.listen(PORT, () => {
  console.log("Web server chạy thành công trên port:", PORT);
});
