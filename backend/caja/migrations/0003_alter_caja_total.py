# Generated by Django 4.0.3 on 2023-04-16 07:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('caja', '0002_alter_caja_total'),
    ]

    operations = [
        migrations.AlterField(
            model_name='caja',
            name='total',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
    ]