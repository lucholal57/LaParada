from rest_framework import serializers
from cliente.models import Cliente

class ClienteSerializer(serializers.ModelSerializer):
    """Serializador de clientes"""
    class Meta:
        model = Cliente
        fields = '__all__'