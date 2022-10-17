
from contextlib import nullcontext
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from venta.models import Venta
from venta.serializer import VentaSerializer,VentaPostPutSerializer,VentaObtenerEdicionSerializer
# Create your views here.
@api_view(['GET','POST'])
#@permission_classes((IsAuthenticated,))
def VentaListado(request,*args, **kwargs):
    #Listado
    if request.method == 'GET':
        venta = Venta.objects.all().order_by('id')
        serializer = VentaSerializer(venta,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    #Create
    if request.method == 'POST':
        serializer = VentaPostPutSerializer(data=request.data)
        #Valdiacion
        if serializer.is_valid():
            venta_productos = Venta.objects.create(**serializer.validated_data)
            venta_productos.producto.set(request.data.get('producto'))
            #Lo que validamos aqui es que si el request es distinto de None lo setee, y en el caso de ser None directamente no setea nada
            if (request.data.get('cliente') != None):{
                venta_productos.cliente.add(request.data.get('cliente'))
            }
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

#Funcion para edicion y eliminacion pasando id
@api_view(['GET','PUT','DELETE'])
#@permission_classes((IsAuthenticated,))
def VentaBuscarPorId(request,pk=None):
    #Consulta para obtener el listado sin First
    venta = Venta.objects.filter(id=pk)
    #Validacion
    if venta:
        if request.method == 'GET':
            serializer = VentaObtenerEdicionSerializer(venta,many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)
        
        elif request.method == 'PUT':
            #Consultar para obtener el objeto con First
            venta_edicion = Venta.objects.filter(id=pk).first()
            serializer = VentaPostPutSerializer(instance=venta_edicion,data=request.data)
            if serializer.is_valid():
                venta_actualizada = serializer.save()
                venta_actualizada.producto_id.set(request.data.get('producto_id'))
                return Response(serializer.data,status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        
        elif request.method == 'DELETE':
            venta.delete()
            return Response({'message':'Venta eliminada correctament'},status=status.HTTP_204_OK)

    #Validacion si no se encontro la venta
    return Response({'message':'No se encontro la venta'},status=status.HTTP_400_BAD_REQUEST)

