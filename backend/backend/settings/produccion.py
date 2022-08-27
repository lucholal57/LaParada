#Agregamos desde base todo el contenido
from .base import *

# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DEBUG = False

#Aqui agregamos la ip del servidor y el dominio
ALLOWED_HOSTS = []


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'LaParada_db',
        'USER' : 'postgres',
        'PASSWORD': 'admin',
        'HOST': 'localhost',
        'PORT': '5432'
    }
}