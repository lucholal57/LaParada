from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from producto.models import Producto
from producto.serializer import ProductoSerializer

# Create your views here.
@api_view(['GET', 'POST'])
@permission_classes((IsAuthenticated,))
def ProductoListado(request):
    # Listado
    if request.method == 'GET':
        producto = Producto.objects.all().order_by('id')
        serializer = ProductoSerializer(producto, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    # Create
    elif request.method == 'POST':
        serializer = ProductoSerializer(data=request.data)
        # Validacion
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Funcion para edicion y eliminacion pasando id
@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes((IsAuthenticated,))
def ProductoBuscarPorId(request,pk=None):
    #Consulta para obtener el listado sin First
    producto = Producto.objects.filter(id=pk)
    #Validacion
    if producto:
        if request.method == 'GET':
            serializer = ProductoSerializer(producto,many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)
        
        elif request.method == 'PUT':
            #Consulta para obtener el listado con First
            producto_edicion = Producto.objects.filter(id=pk).first()
            serializer = ProductoSerializer(producto_edicion,data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data,status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        
        elif request.method == 'DELETE':
            producto.delete()
            return Response({'message':'Producto eliminado correctamente'},status=status.HTTP_200_OK)
    
    #Validacion por si el producto no existe
    return Response({'message':'No se encontro el Producto'})

#Obtener producto por serie
@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def getProductoSerie(request,buscarSerie):
    producto = Producto.objects.filter(serie=buscarSerie)
    serializer = ProductoSerializer(producto, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

#Obtener producto por id y descontar stock
@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def getProductoStock(request,pk=None):
    #Buscamos el objeto por id
    producto = Producto.objects.filter(id=pk)
    serializer = ProductoSerializer(producto, many=True)
    #Una ves que lo encontro recorremos un for por que pueden existir varios objetos RARISIMO POR QUE FILTRA POR ID PERO BUE
    for obj in producto:
        #Recorremos y descontamos de a 1 despues guardamos y listo
        if(obj.cantidad>0):
            obj.cantidad-=1
            obj.save()
    return Response(serializer.data, status=status.HTTP_200_OK)


