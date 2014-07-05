import urllib2
import json
import pymongo

base_url = "http://www.lcboapi.com"

url = "mongodb://barkeep:en gang i blandt@kahana.mongohq.com:10085/villevillavika"
client = pymongo.MongoClient(url)

def parsePage(page):
  data = json.loads(page)
  if (data['status'] == 200):
    for b in data["result"]:
      client['villevillavika']['liquor'].update({"id":b ['id']},{"$set": b}, upsert=True)
    return data['pager']['next_page_path']
  else:
    raise Exception('status code', data['status'])

page = urllib2.urlopen(base_url + "/products?page=1").read()

uri = parsePage(page)

while (uri != None):
  print uri
  page = urllib2.urlopen(base_url + uri).read()
  uri = parsePage(page)
