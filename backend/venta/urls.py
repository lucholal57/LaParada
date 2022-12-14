from django.urls import path
from venta.views import VentaListado,VentaBuscarPorId,VentaClienteNotNull,VentaClienteNull

urlpatterns = [
    #Rutas para las ventas
    path('venta', VentaListado),
    path('venta/cliente/not_null', VentaClienteNotNull),
    path('venta/cliente/null', VentaClienteNull),
    path('venta/<int:pk>', VentaBuscarPorId)
]