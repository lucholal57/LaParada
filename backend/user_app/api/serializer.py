from dataclasses import field
from rest_framework import serializers
from django.contrib.auth.models import User

#Class para el registro de usuarios
class RegistroSerializer(serializers.ModelSerializer):
    #El modelo user no contiene el password de confirmacion por lo cual lo creamos
    password2 = serializers.CharField(style={'input_type':'password'}, write_only=True)

    class Meta:
        model = User
        fields = ['username','email','password','password2']
        extra_kwargs = {'write_only':True}

    def save(self):
        #Validaciones para guardar/registrar el nuevo usuario
        password = self.validated_data['password']    
        password2 = self.validated_data['password2']

        #Una ves capturado los dos password validamos
        if password != password2:
            #La funcion raise dispara una excepcion
            raise serializers.ValidationError({'Error :' ' El password de confirmacion no coincide'})

        #Validamos que un usuario no se pueda registrar si es que ya existe el mismo en nuestra base de datos
        if User.objects.filter(email=self.validated_data['email']).exists():
            #Si existe lanza una excepcion con raiser
            raise serializers.ValidationError({'Error :', ' El email del usuario ya existe'})

        #Si no se cumple ninguna de las condiciones anteriores vamos a crear/registrar nuestro nuevo usuario, tomando el email, usuario y guardandolo en la variable account
        account = User(email=self.validated_data['email'], username=self.validated_data['username'])
        #Seteamos el password al usuario
        account.set_password(password)
        #Guardamos el usuario
        account.save()
        #Retornamos el usuario
        return account

