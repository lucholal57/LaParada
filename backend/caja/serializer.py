from asyncore import read
from rest_framework import serializers
from caja.models import Caja


class CajaSerializer(serializers.ModelSerializer):
    """Serializador de Caja con Venta"""
    class Meta:
        model = Caja
        fields = '__all__'

class CajaPostPutSerializer(serializers.ModelSerializer):
    """Serializer Caja"""
    class Meta:
        model = Caja
        fields = '__all__'