from django.db import models
from producto.models import Producto
from cliente.models import Cliente
from django.contrib.postgres.fields import ArrayField


# Create your models here.
class Venta(models.Model):
    forma_pago = models.CharField(max_length=20)
    fecha = models.DateTimeField()
    total = models.CharField(max_length=15)
    #model para Producto Manual
    productoManual = ArrayField(models.CharField(max_length=40),blank=True, null=True)
    #PrimaryKey
    cliente = models.ForeignKey(Cliente,blank=True, null=True, on_delete=models.DO_NOTHING)
    #ManyToMany
    #Se puede agregar blank true por que en el seriealizador de producto esta el required en False.
    producto = models.ManyToManyField(Producto,blank=True)
    #Metodo str para mostrar los datos en django admin
    def __str__(self):
        return f'Venta: {self.forma_pago} - {self.fecha} - {self.total} - {self.cliente}'