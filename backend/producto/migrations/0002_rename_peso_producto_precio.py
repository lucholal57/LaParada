# Generated by Django 4.1 on 2022-08-25 03:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('producto', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='producto',
            old_name='peso',
            new_name='precio',
        ),
    ]
