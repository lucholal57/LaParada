from tkinter import CASCADE
from django.db import models
from cliente.models import Cliente
from producto.models import Producto

# Create your models here.
class Venta(models.Model):
    forma_pago = models.CharField(max_length=10)
    fecha = models.DateTimeField()
    total = models.CharField(max_length=15)
    #ManyToMany
    producto = models.ManyToManyField(Producto)
    #ForenKey
    cliente = models.ForeignKey(Cliente,blank=True,null=True, on_delete=models.SET_NULL)
    
    #Metodo str para mostrar los datos en django admin
    def __str__(self):
        return f'Venta: {self.forma_pago} - {self.fecha} - {self.total} - {self.cliente}'