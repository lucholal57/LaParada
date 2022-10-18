#Agregamos desde base todo el contenido
from .base import *

# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DEBUG = False

#Aqui agregamos la ip del servidor y el dominio
ALLOWED_HOSTS = ['192.168.0.100']


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