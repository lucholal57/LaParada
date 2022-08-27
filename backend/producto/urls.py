from django.urls import path
from producto.views import ProductoListado, ProductoBuscarPorId

urlpatterns = [
    #Rutas para los productos
    path('producto',ProductoListado),
    path('producto/<int:pk>',ProductoBuscarPorId)
]