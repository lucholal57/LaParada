from rest_framework import serializers
from venta.models import Venta
from producto.serializer import ProductoSerializer

class VentaSerializer(serializers.ModelSerializer):
    """Serializer Venta con Producto"""
    producto = ProductoSerializer(many=True)
    class Meta:
        model = Venta
        fields = '__all__'
        depth = 2

class VentaPostPutSerializer(serializers.ModelSerializer):
    """Serializador de Venta"""
    class Meta:
        model = Venta
        fields = '__all__'
        depth = 2
        

class VentaObtenerEdicionSerializer(serializers.ModelSerializer):
    """Serializador sin depth solo para obtener datos para la edicion"""
    class Meta:
        model = Venta
        fields = '__all__'