# Generated by Django 4.0.3 on 2022-12-14 00:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('producto', '0002_rename_peso_producto_precio'),
        ('venta', '0033_alter_venta_cliente'),
    ]

    operations = [
        migrations.AlterField(
            model_name='venta',
            name='producto',
            field=models.ManyToManyField(blank=True, to='producto.producto'),
        ),
    ]
