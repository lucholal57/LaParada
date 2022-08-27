from tkinter import CASCADE
from django.db import models
from producto.models import Producto

# Create your models here.
class Venta(models.Model):
    forma_pago = models.CharField(max_length=10)
    fecha = models.DateField()
    #Forenkey
    producto = models.ManyToManyField(Producto)
    total = models.CharField(max_length=15)
    
    #Metodo str para mostrar los datos en django admin
    def __str__(self):
        return f'Venta: {self.forma_pago} . {self.fecha} - {self.total}'