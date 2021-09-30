from telegram.ext import Updater, CommandHandler, MessageHandler, Filters
import logging
import requests
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',level=logging.INFO)
bot_token = '2019504780:AAH6gEPrbZfnOlKMPLHp_V7WYgS0wRDv-kw'
updater = Updater(token=bot_token, use_context=True)
dispatcher = updater.dispatcher

status_xdk = ''

def start(update, context):
    context.bot.send_message(chat_id=update.effective_chat.id, text="Fala aí, colé?!")

def echo(update, context):
    context.bot.send_message(chat_id=update.effective_chat.id, text=update.message.text)

def status(update, context):
    context.bot.send_message(chat_id=update.effective_chat.id, text=status_xdk)

start_handler = CommandHandler('start', start)
start_handler = CommandHandler('status', status)
echo_handler = MessageHandler(Filters.text & (~Filters.command), echo)
dispatcher.add_handler(start_handler)
dispatcher.add_handler(echo_handler)


if __name__ == '__main__':
    while True:
        response = requests.get("http://192.168.101.28:3000/station/pull")
        status_xdk = response.json()
        updater.start_polling()