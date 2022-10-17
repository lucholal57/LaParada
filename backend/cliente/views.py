from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from cliente.models import Cliente
from cliente.serializer import ClienteSerializer

# Create your views here.
@api_view(['GET','POST'])
#@permission_classes((IsAuthenticated,))
def ClienteListado(request):
    #Listado
    if request.method == 'GET':
        cliente = Cliente.objects.all().order_by('id')
        serializer = ClienteSerializer(cliente,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    #Create
    if request.method == 'POST':
        serializer = ClienteSerializer(data=request.data)
        # Validacion
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

#Funcion para edicion y eliminacion pasando id
@api_view(['GET', 'PUT', 'DELETE'])
#@permission_classes((IsAuthenticated,))
def ClienteBuscarPorId(request,pk=None):
    #Consulta para obtener el listado sin First
    cliente = Cliente.objects.filter(id=pk)
    #Validacion
    if cliente:
        if request.method == 'GET':
            serializer = ClienteSerializer(cliente,many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)
        
        elif request.method == 'PUT':
            #Consulta para obtener el listado con First
            cliente_edicion = Cliente.objects.filter(id=pk).first()
            serializer = ClienteSerializer(cliente_edicion,data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data,status=status.HTTP_200_OK)
            else:
                return Response(serializer.data,status=status.HTTP_400_BAD_REQUEST)

        elif request.method == 'DELETE':
            cliente.delete()
            return Response({'message':'Cliente eliminado correctamente'},status=status.HTTP_200_OK)

    #Validacion por si el cliente no existe
    return Response({'message':'No se encontro el Cliente'})

    

