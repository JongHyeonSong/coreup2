# Generated by Django 3.0.6 on 2020-09-08 10:51

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_auto_20200908_1951'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='user_profile',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.UserProfile'),
        ),
    ]