from rest_framework import serializers
from cliente.serializer import ClienteSerializer
from venta.models import Venta
from producto.serializer import ProductoSerializer

class VentaSerializer(serializers.ModelSerializer):
    """Serializer Venta con Producto"""
    #many true es para realaciones de many to many
    producto = ProductoSerializer(many=True)
    #read_only true es para relaciones de forenkey
    cliente = ClienteSerializer(read_only=True)
    class Meta:
        model = Venta
        fields = '__all__'
        depth = 3

class VentaPostPutSerializer(serializers.ModelSerializer):
    """Serializador de Venta"""
    class Meta:
        model = Venta
        fields = '__all__'
        
class VentaObtenerEdicionSerializer(serializers.ModelSerializer):
    """Serializador sin depth solo para obtener datos para la edicion"""
    class Meta:
        model = Venta
        fields = '__all__'