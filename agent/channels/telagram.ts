// agent/channels/telegram.ts
import { defaultTelegramAuth, telegramChannel } from "eve/channels/telegram";

export default telegramChannel({
	botUsername: "your_bot_username",
	credentials: {
		botToken: process.env.TELEGRAM_BOT_TOKEN,
		webhookSecretToken: process.env.TELEGRAM_WEBHOOK_SECRET_TOKEN,
	},
	onMessage: async (ctx, message) => {
		if (message.chat.type !== "private" || !message.from || message.from.isBot)
			return null;

		await ctx.telegram.startTyping();
		await ctx.telegram.sendMessage("Hello");

		return { auth: defaultTelegramAuth(message) };
	},
});