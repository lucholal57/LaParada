from django.db import models
from producto.models import Producto

# Create your models here.
class Venta(models.Model):
    forma_pago = models.CharField(max_length=20)
    fecha = models.DateTimeField()
    total = models.CharField(max_length=15)
    cliente_nombre = models.CharField(max_length=100,null=True)
    cliente_descripcion = models.CharField(max_length=100,null=True)
    cliente_telefono = models.CharField(max_length=20,null=True)
    #ManyToMany
    producto = models.ManyToManyField(Producto)
    #Metodo str para mostrar los datos en django admin
    def __str__(self):
        return f'Venta: {self.forma_pago} - {self.fecha} - {self.total} - {self.cliente}'