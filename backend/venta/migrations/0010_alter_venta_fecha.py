# Generated by Django 4.1 on 2022-09-24 21:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('venta', '0009_rename_producto_id_venta_producto'),
    ]

    operations = [
        migrations.AlterField(
            model_name='venta',
            name='fecha',
            field=models.DateTimeField(),
        ),
    ]
