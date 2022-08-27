from django.db import models
from venta.models import Venta

# Create your models here.
class Caja(models.Model):
    #forenKey
    venta = models.ForeignKey(Venta,on_delete=models.CASCADE, null=True, blank=True)

    #Metodo str para mostrar los datos en django admin
    def __str__(self):
        return f'Caja: {self.venta}'
