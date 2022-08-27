from django.urls import path
from caja.views import CajaListado,CajaBuscarPorId

urlpattern = [
    #Rutas para la caja
    path('caja',CajaListado),
    path('caja/<int:pk>', CajaBuscarPorId)
]