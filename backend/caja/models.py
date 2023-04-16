from django.utils import timezone
from django.db import models

# Create your models here.
class Caja(models.Model):
    fecha = models.DateTimeField(default=timezone.now)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    
    def __str__(self):
        return f"Caja {self.fecha}"
