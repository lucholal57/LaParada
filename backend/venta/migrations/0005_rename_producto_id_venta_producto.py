# Generated by Django 4.1 on 2022-08-27 00:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('venta', '0004_rename_producto_venta_producto_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='venta',
            old_name='producto_id',
            new_name='producto',
        ),
    ]
