from rest_framework import serializers
from producto.models import Producto

class ProductoSerializer(serializers.ModelSerializer):
    """Serializador Producto"""
    class Meta:
        model = Producto
        fields = '__all__'
        #El required se pone en falso por que el campo de producto al ser ManyToMany no puede estar la lista vacia para poder hacer el post
        #Poniendo este required en false, se puede pasar como parametro al objeto ManyToMany el blank True
        required = False
