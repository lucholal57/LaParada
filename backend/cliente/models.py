from django.db import models

# Create your models here.
class Cliente(models.Model):
    nombre = models.CharField(max_length=70)
    descripcion = models.CharField(max_length=100)
    telefono = models.CharField(max_length=20)

    #Metodo srt para mostrar los datos en django admin
    def __str__(self):
        return f'Cliente: {self.nombre} - {self.descripcion} - {self.telefono}'

