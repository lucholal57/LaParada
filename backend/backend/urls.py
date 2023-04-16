
from xml.etree.ElementInclude import include
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('',include('caja.urls')),
    path('', include('venta.urls')),
    path('', include('producto.urls')),
    path('',include('cliente.urls')),
    path('',include('caja.urls')),

    #Rutas para api de user_app
    path('account/', include('user_app.api.urls')),
]
