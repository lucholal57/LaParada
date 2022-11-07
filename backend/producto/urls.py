from django.urls import path
from producto.views import ProductoListado, ProductoBuscarPorId,getProductoSerie

urlpatterns = [
    #Rutas para los productos
    path('producto',ProductoListado),
    path('producto/<int:pk>',ProductoBuscarPorId),
    path('producto/serie/<str:buscarSerie>', getProductoSerie)
]