from django.urls import path
from cliente.views import ClienteListado,ClienteBuscarPorId

urlpatterns = [
    #Rutas para los clientes
    path('cliente',ClienteListado),
    path('cliente/<int:pk>',ClienteBuscarPorId)
]