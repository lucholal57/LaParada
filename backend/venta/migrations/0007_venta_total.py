# Generated by Django 4.1 on 2022-09-24 05:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('venta', '0006_remove_venta_total'),
    ]

    operations = [
        migrations.AddField(
            model_name='venta',
            name='total',
            field=models.CharField(default=1, max_length=15),
            preserve_default=False,
        ),
    ]
