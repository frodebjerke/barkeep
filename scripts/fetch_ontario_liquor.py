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

  category = {
    'primary': liquor['primary_category'],
    'secondary': liquor['secondary_category'],
    'tertiary': liquor['tertiary_category'],
    'style': liquor['style'],
    'varietal': liquor['varietal'],
    'tags': liquor['tags'].split(" ")
  }
  category = dict((k, v) for k, v in category.iteritems() if v)

  contents = {
    'sugar': liquor['sugar_content'],
    'kosher': liquor['is_kosher'],
    'alcohol_content': liquor['alcohol_content']
  }

  contents = dict((k, v) for k, v in contents.iteritems() if v)

  images = {
    'large': liquor['image_url'],
    'thumb': liquor['image_thumb_url']
  }
  images = dict((k, v) for k, v in images.iteritems() if v)

  origin = liquor['origin'].split(", ")
  about = {
    'producer': liquor['producer_name']
  }
  if len(origin) > 0:
    about['origin'] = origin[0]
  if len(origin) == 2 and origin[1] != "Region Not Specified":
    about['region'] = origin[1]

  about = dict((k, v) for k, v in about.iteritems() if v)

  notes = {
    'serving_suggestion': liquor['serving_suggestion'],
    'description': liquor['description'],
    'tasting_note': liquor['tasting_note']
  }
  notes = dict((k, v) for k, v in notes.iteritems() if v)

  ret = {
    'name': name,
    'updated_at': updated_at,
  }

  if len(category) > 0:
    ret['category'] = category
  if len(images) > 0:
    ret['images'] = images
  if len(contents) > 0:
    ret['contents'] =  contents
  if len(about) > 0:
    ret['about'] = about
  if len(notes) > 0:
    ret['notes'] = notes
  return ret

def product(liquor):
  return {
    'size_ml': liquor['volume_in_milliliters'],
    'material': liquor['package_unit_type'],
    'price_updated': datetime.datetime.now(),
    'price': liquor['regular_price_in_cents'] / 100 * 5 * 1.3,
    'units': liquor['total_package_units'],
    'logged': 0
  }

def keep(liquor):
  if liquor['category']['primary'] in ["Ready-to-Drink/Coolers", "Non-Alc"]:
    return False
  if 'secondary' in liquor['category'] and liquor['category']['secondary'] in ["Gift and Sampler Packs"]:
    return False
  return True

def parsePage(page):
  data = json.loads(page)
  if (data['status'] == 200):
    for b in data["result"]:
      liquor = transform(b)
      if (keep(liquor)):
        client['villevillavika']['liquor'].update({'name': b['name']},{"$push": {'products': product(b)}, "$set": liquor}, upsert=True)
    return data['pager']['next_page_path']
  else:
    raise Exception('status code', data['status'])

page = urllib2.urlopen(base_url + "/products?page=1").read()

uri = parsePage(page)

while (uri != None):
  print uri
  page = urllib2.urlopen(base_url + uri).read()
  uri = parsePage(page)
