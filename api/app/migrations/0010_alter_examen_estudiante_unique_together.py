# Generated by Django 3.2 on 2022-03-31 12:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0009_resultados_examen_estudiante_nro_pregunta'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='examen_estudiante',
            unique_together=set(),
        ),
    ]
