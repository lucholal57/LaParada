from django.urls import path
from caja.views import CajaListado,CajaBuscarPorId

urlpatterns = [
    #Rutas para la caja
    path('caja',CajaListado),
    path('caja/<int:pk>', CajaBuscarPorId)
]