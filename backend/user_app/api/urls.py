
from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from user_app.api.views import RegistroView, LogoutView, user_view


urlpatterns = [
    # Obtiene el Request por el user y password para buscar el token con la funcion obtain_auth_token (metodo interno) busca en la base de datos el token y lo devuelve y se almacena dentro de mi front
    path('login/', obtain_auth_token, name='login'),
    # Ruta para crear usuario desde el front
    path('register/', RegistroView, name='register'),
    #Ruta para logout de usuario
    path('logout/', LogoutView, name='logout'),
    #Ruta para obtener los usuarios enviando el token
    path('user/', user_view, name='user_view'),
]