from django.db import models

# Create your models here.
class Producto(models.Model):
    nombre = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=100)
    serie = models.CharField(max_length=50)
    cantidad = models.IntegerField()
    precio = models.CharField(max_length=10)

    #Metodo str para mostrar los datos en django admin
    def __str__(self):
        return f'Producto: {self.nombre} - {self.descripcion} - {self.serie} - {self.cantidad} - {self.precio}'