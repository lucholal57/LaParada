from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from user_app.api.serializer import RegistroSerializer
from rest_framework.authtoken.models import Token
from user_app import models
from rest_framework import status
from rest_framework.permissions import IsAuthenticated


#Creamos metodo para el logout, para cerrar sesion se envia el token desde el front
@api_view(['POST',])
def LogoutView(request):
    if request.method == 'POST':
        #Eliminamos el token
        request.user.auth_token.delete()
        return Response(status=status.HTTP_200_OK)


# Creamos un metodo de tipo POST que permita procesar el registro de usuario y desde aqui llamar al serializer que creamos para registrar usuarios
# Cada ves que se dispare este metodo se ejecutara el metodo de generacion del token para la instancia del usuario
@api_view(['POST', ])
def RegistroView(request):
    if request.method == 'POST':
        serializer = RegistroSerializer(data=request.data)

        data = {}

        if serializer.is_valid():
            # Guarda los datos despues de guardarlos en la base de datos en la variable cuenta
            cuenta = serializer.save()
            data['response'] = 'El registro del usuario fue Exitoso!'
            data['username'] = cuenta.username
            data['email'] = cuenta.email
            # Generamos el token para el usuario
            token = Token.objects.get(user=cuenta).key
            print("print tooken", token)
            data['token'] = token
        else:
            data = serializer.errors
            
        return Response(data)
    

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_view(request):
    user = request.user
    data = {
        'username': user.username,
        'email': user.email,
        'first_name': user.first_name,
        'last_name': user.last_name
    }
    return Response(data)

