import urllib2
# data = urllib2.urlopen("http://www.oregonliquorprices.com/api/v1/product/?limit=5000").read()
# print data

def parseSize(raw):
  if raw == "LITER":
    return 1000
  elif raw == "":
    return 0;
  elif raw.find("ML") == -1:
    return int(float(raw.split(" ")[0]) * 1000)
  else:
    return int(raw.split(" ")[0])

data = open('oregon_liquors.raw').readline()

data = data.replace('"', '\"')
import json
sweet_data = json.loads(data)

print "age,code,id,proof,volume_ml,slug,name"
for bottle in sweet_data['objects']:
  age = int(float(bottle['age']))
  size = parseSize(bottle['size'])
  proof = int(float(bottle['proof']))
  id = int(bottle['id'])

  print "{},{},{},{},{},{},{}".format(age, bottle['code'], id, proof, size, bottle['slug'], bottle['title'])
