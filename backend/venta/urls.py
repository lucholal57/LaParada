from django.urls import path
from venta.views import VentaListado,VentaBuscarPorId

urlpatterns = [
    #Rutas para las ventas
    path('venta', VentaListado),
    path('venta/<int:pk>', VentaBuscarPorId)
]