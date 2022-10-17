from django.db import models

# Create your models here.
class Cliente(models.Model):
    nombre = models.CharField(max_length=30)
    descripcion = models.CharField(max_length=50)
    telefono = models.CharField(max_length=30)

    def __str__(self):
        return f'Cliente: {self.nombre} {self.descripcion}, {self.telefono}'
