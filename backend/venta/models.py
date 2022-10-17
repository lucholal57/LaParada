from django.db import models
from producto.models import Producto
from cliente.models import Cliente

# Create your models here.
class Venta(models.Model):
    forma_pago = models.CharField(max_length=20)
    fecha = models.DateTimeField()
    total = models.CharField(max_length=15)
    #PrimaryKey
    cliente = models.ManyToManyField(Cliente,blank=True)
    #ManyToMany
    producto = models.ManyToManyField(Producto)
    #Metodo str para mostrar los datos en django admin
    def __str__(self):
        return f'Venta: {self.forma_pago} - {self.fecha} - {self.total} - {self.cliente}'