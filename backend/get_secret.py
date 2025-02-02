from os import environ

def get_secret():
    buckets = environ.get('BUCKET').split(",")
    org = environ.get('ORG')
    token = environ.get('TOKEN')
    url = environ.get('URL')
    return buckets,org,token,url
