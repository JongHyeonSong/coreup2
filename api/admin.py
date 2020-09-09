from django.contrib import admin
from .models import UserProfile, Comment, Country


admin.site.register(Comment)
admin.site.register(UserProfile)
admin.site.register(Country)