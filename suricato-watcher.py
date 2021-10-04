from telegram.ext import Updater, CommandHandler, MessageHandler, Filters
import logging
import requests
from telegram.ext.callbackcontext import CallbackContext
logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',level=logging.INFO)
bot_token = '2033615689:AAHOKrylOujHa9fcPJGLn25Yhd78-luj5PQ'

updater = Updater(token=bot_token, use_context=True)
dispatcher = updater.dispatcher

status_out = ''
warning_out = ''
status_alarms = {"janela1": '', 'janela2': '', 'janela3': ''}

def start(update, context):
    context.bot.send_message\
        (chat_id=update.effective_chat.id,\
            text="Fala aí, beleza?!\n" \
            "Sou o bot responsável por controlar os alarmes! :)")

def echo(update, context):
    context.bot.send_message(chat_id=update.effective_chat.id, text=update.message.text)

def status(update, context):
    context.bot.send_message(chat_id=update.effective_chat.id, text=status_out)
    
# def warning(context: CallbackContext):
#     job = context.job
#     context.bot.send_message(job.context, text=warning_out)

def text_warning(window):
    texto = 'Se liga, a janela {window} tá aberta!\n'\
            'Dá uma olhada pra ver quem tá lá'
    return texto

def text_status(status1, status2, status3):
    texto = f'A janela1 está {status1}!\n'\
            f'A janela2 está {status2}!\n'\
            f'A janela3 está {status3}!'
    return texto

def warning_check(status_in):
    for spot in status_in['sensors']:
        if spot['control'] == 'true':
            print('O dispositivo {} foi desativado'.format(spot['name']))
            warning_out = text_warning(spot['name'])
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
dispatcher.add_handler(CommandHandler('status', status))
dispatcher.add_handler(MessageHandler(Filters.text & (~Filters.command), echo))

if __name__ == '__main__':
    while True:
        response = requests.get("http://192.168.101.28:3000/alarm/pull")
        status_api = response.json()
        warning_check(status_api)
        status_out = text_status(status_alarms['janela1'], status_alarms['janela2'], status_alarms['janela3'])
        updater.start_polling()
        # updater.idle()