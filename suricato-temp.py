from telegram.ext import Updater, CommandHandler, MessageHandler, Filters
import logging
import requests
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',level=logging.INFO)
bot_token = '2019504780:AAH6gEPrbZfnOlKMPLHp_V7WYgS0wRDv-kw'
updater = Updater(token=bot_token, use_context=True)
dispatcher = updater.dispatcher

status_xdk = ''
status_out = ''

def start(update, context):
    context.bot.send_message\
        (chat_id=update.effective_chat.id,\
            text="Fala aí, beleza?!\n" \
            "Sou o bot responsável por ler as temperaturas! :)")

def echo(update, context):
    context.bot.send_message(chat_id=update.effective_chat.id, text=update.message.text)

def status(update, context):
    context.bot.send_message(chat_id=update.effective_chat.id, text=status_out)

def textinho(temp, hum, lum):
    texto = 'Olá, como vai?\n'\
        'O status atual da mesa de Levi é\n'\
        f'Temperatura: {temp}ºC\n'\
        f'Umidade do Ar: {hum}%\n'\
        f'Luminosidade: {lum} lummens\n'\
        'Até logo! :)'
    return texto

dispatcher.add_handler(CommandHandler('start', start))
dispatcher.add_handler(CommandHandler('status', status))
dispatcher.add_handler(MessageHandler(Filters.text & (~Filters.command), echo))

if __name__ == '__main__':
    while True:
        response = requests.get("http://192.168.101.28:3000/station/pull")
        status_xdk = response.json()
        umidade = status_xdk["data"][0]['H']
        temperatura = status_xdk["data"][0]['T']
        luminosidade = status_xdk["data"][0]['L']
        status_out = textinho(temperatura, umidade, luminosidade)
        updater.start_polling()
