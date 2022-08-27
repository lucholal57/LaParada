from rest_framework import serializers
from producto.models import Producto

class ProductoSerializer(serializers.ModelSerializer):
    """Serializador Producto"""
    class Meta:
        model = Producto
        fields = '__all__'
