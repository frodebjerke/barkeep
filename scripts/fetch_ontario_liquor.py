import urllib2
import json
import pymongo
import datetime

base_url = "http://www.lcboapi.com"

#url = "mongodb://barkeep:en gang i blandt@kahana.mongohq.com:10085/villevillavika"
client = pymongo.MongoClient()

def transform(liquor):
  name = liquor['name']
  updated_at = datetime.datetime.now()

  price = {
    'country': 'canada',
    'date': datetime.datetime.now(),
    'price': liquor['regular_price_in_cents'] / 100 * 5
  }

  category = {
    'primary': liquor['primary_category'],
    'secondary': liquor['secondary_category'],
    'tertiary': liquor['tertiary_category'],
    'style': liquor['style'],
    'varietal': liquor['varietal'],
    'tags': liquor['tags'].split(" ")
  }

  contents = {
    'sugar': liquor['sugar_content'],
    'kosher': liquor['is_kosher'],
    'alcohol_content': liquor['alcohol_content']
  }

  images = {
    'external': liquor['image_url'],
    'external_thumb': liquor['image_thumb_url']
  }

  packaging = {
    'size_ml': liquor['volume_in_milliliters'],
    'package': liquor['package']
  }

  about = {
    'origin': liquor['origin'],
    'producer': liquor['producer_name']
  }

  notes = {
    'serving_suggestion': liquor['serving_suggestion'],
    'description': liquor['description'],
    'tasting_note': liquor['tasting_note']
  }

  return {
    'name': name,
    'updated_at': updated_at,
    'price': [price],
    'category': category,
    'images': images,
    'contents': contents,
    'packaging': packaging,
    'about': about,
    'notes': notes
  }

def parsePage(page):
  data = json.loads(page)
  if (data['status'] == 200):
    for b in data["result"]:
      client['villevillavika']['liquor'].update({"id":b ['id']},{"$set": transform(b)}, upsert=True)
    return data['pager']['next_page_path']
  else:
    raise Exception('status code', data['status'])

page = urllib2.urlopen(base_url + "/products?page=1").read()

uri = parsePage(page)

while (uri != None):
  print uri
  page = urllib2.urlopen(base_url + uri).read()
  uri = parsePage(page)
