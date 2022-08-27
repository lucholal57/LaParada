
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from backend.caja.serializer import CajaPostPutSerializer
from caja.models import Caja
from caja.serializer import CajaSerializer,CajaPostSerializer

# Create your views here.
@api_view(['GET','POST'])
def CajaListado(request):
    #Listado
    if request.method == 'GET':
        caja = Caja.objects.all().order_by('id')
        serializer = CajaSerializer(caja,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    #Create
    if request.method == 'POST':
        serializer = CajaPostPutSerializer(data=request.data)
        #Validacion
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
#Funcion para la edicion y eliminacion pasando id
@api_view(['GET','PUT','DELETE'])
def CajaBuscarPorId(request,pk=None):
    #Consulta para obtener el objeto sin First
    caja = Caja.objects.filter(id=pk)
    #Validacion
    if Caja:
        if request.method == 'GET':
            serializer = CajaPostPutSerializer(caja,many=True)
            return Response(serializer.data,status=status.HTTP_200_OK)

        elif request.method == 'PUT':
            #consulta para obtener el objeto con First
            caja_edicion = Caja.objects.filter(id=pk).first()
            serializer = CajaPostPutSerializer(caja_edicion,data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data,status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)
        
        elif request.method == 'DELETE':
            caja.delete();
            return Response({'message':'Caja eliminada con exito'},status=status.HTTP_200_OK)

    #Validacion si es que no se encuentra la caja que buscamos
    return Response({'message':'No se ha encontrado la caja'})