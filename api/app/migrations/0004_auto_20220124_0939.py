# Generated by Django 3.2 on 2022-01-24 09:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_alter_asistencia_docente_id_horario'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='asistencia_docente',
            options={'ordering': ['id'], 'verbose_name': 'Asistencia Docente', 'verbose_name_plural': 'Asistencias Docente'},
        ),
        migrations.AddField(
            model_name='asistencia_docente',
            name='observaciones',
            field=models.CharField(blank=True, max_length=300, null=True, verbose_name='Observaciones'),
        ),
    ]
