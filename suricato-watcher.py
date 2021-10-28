from telegram.ext import Updater, CommandHandler, MessageHandler, Filters, CallbackContext
from telegram import Update, Chat
import telegram
import time
import logging
import requests

logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',level=logging.INFO)
bot_token = '2033615689:AAHOKrylOujHa9fcPJGLn25Yhd78-luj5PQ'
api_to_pull ='http://192.168.1.6:3000/alarm/pull' #Criar variáveis de ambiente
updater = Updater(token=bot_token, use_context=True)
dispatcher = updater.dispatcher
chat_id = -524242677

status_out = ''
warning_out = ''
bot_init = False
status_alarms = {"janela1": '', 'janela2': '', 'janela3': ''}

def start(update, context):
    context.bot.send_message(chat_id=update.effective_chat.id,
            text=f"Fala aí, beleza?!\n" \
            f"Sou o bot responsável por controlar os alarmes.\n"\
            f"O chat_id dessa sala é:{update.effective_chat.id}.") 
    
def echo(update, context):
    context.bot.send_message(chat_id=update.effective_chat.id, text=update.message.text)

def send_status(update, context):
    context.bot.send_message(chat_id=update.effective_chat.id, text=status_out)

def warning(time_delay, message, chat_id):
    bot = telegram.Bot(token=bot_token)
    time_delay_in = time_delay
    if time_delay:
        bot.send_message(text=message, chat_id=chat_id)
    time_delay_in = time_delay_in-1
    time.sleep(1)

def text_warning(window):
    texto = f'Se liga, a janela {window} tá aberta!\n'\
            'Dá uma olhada pra ver quem tá lá'
    return texto

def text_status(status1, status2, status3):
    texto = f'A janela1 está {status1}!\n'\
            f'A janela2 está {status2}!\n'\
            f'A janela3 está {status3}!'
    return texto

def warning_check(status_in, chat_id):
    for spot in status_in['sensors']:
        if spot['control'] == 'true':
            # print('O dispositivo {} foi desativado'.format(spot['name']))
            warning_out = text_warning(spot['name'])
            warning(time_delay=5, message=warning_out, chat_id=chat_id)
        if spot['name'] == 'device1/Relay':
            if spot['control'] == 'false':
                status_alarms['janela1'] = 'fechada'
            else: status_alarms['janela1'] = 'aberta'
        elif spot['name'] == 'device2/Relay':
            if spot['control'] == 'false':
               status_alarms['janela2'] = 'fechada'
            else: status_alarms['janela2'] = 'aberta'
        elif spot['name'] == 'device3/Relay':
            if spot['control'] == 'false':
               status_alarms['janela3'] = 'fechada'
            else: status_alarms['janela3'] = 'aberta'

dispatcher.add_handler(CommandHandler('start', start))
dispatcher.add_handler(CommandHandler('status', send_status))
dispatcher.add_handler(MessageHandler(Filters.text & (~Filters.command), echo))

if __name__ == '__main__':
    while True:
        updater.start_polling()
        response = requests.get(api_to_pull)
        status_api = response.json()
        warning_check(status_api, chat_id)
        status_out = text_status(status_alarms['janela1'], status_alarms['janela2'], status_alarms['janela3'])