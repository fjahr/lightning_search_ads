import config
import requests
import sys
import hashlib

amount = sys.argv[1]
search = sys.argv[2]
ad_text = sys.argv[3]
ad_url = sys.argv[4]

search_hash = hashlib.sha256(search.encode()).hexdigest()

req_data = {
    'amount': str(amount),
    'customer_name': search_hash + "|" + ad_text + "|" + ad_url
}
url = 'https://api.lightning.gifts/create'
r = requests.post(url, data=req_data).json()
print(r)
