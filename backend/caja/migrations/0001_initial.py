# Generated by Django 4.1 on 2022-08-25 02:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('venta', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Caja',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('venta', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='venta.venta')),
            ],
        ),
    ]
