import config
import requests
import json
import sys

amount = sys.argv[1]
search = sys.argv[2]
ad_text = sys.argv[3]
ad_url = sys.argv[4]

req_data = {
    'amount': str(amount),
    'senderName': search,
    'senderMessage': ad_text + "|" + ad_url
}
url = 'https://api.lightning.gifts/create'
r = requests.post(url, data=req_data).json()

def new_invoice(amount_mbtc):
    url = config.charge_url + '/invoice'
    amount_msat = int(amount_mbtc*100000000)
    req_data = {'msatoshi': str(amount_msat), 'description': ''}

    r = requests.post(url, data=req_data).json()

    return r['id'], r['payreq']

def invoice_paid(id):
    url = config.charge_url + '/invoice/' + id

    r = requests.get(url).json()

    if r['status'] == 'paid':
        return True
    else:
        return False
