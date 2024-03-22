import os
import yaml

with open(os.path.dirname(os.path.abspath(__file__)) + '/application.yml', 'r') as yaml_conf:
    conf = yaml.safe_load(yaml_conf)[os.environ.get('APP_ENV', 'dev')]


class Config:
    DB = conf['DB']
    ES = conf['ES']
