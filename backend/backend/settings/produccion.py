#Agregamos desde base todo el contenido
from .base import *

# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DEBUG = True

#Aqui agregamos la ip del servidor y el dominio
ALLOWED_HOSTS = ['192.168.17.201']


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'laparadaprod',
        'USER' : 'laparadauser',
        'PASSWORD': 'admin',
        'HOST': 'localhost',
        'PORT': '5432'
    }
}