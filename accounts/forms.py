from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from api.models import UserProfile
from api.models import Country


class ProfileForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields="__all__"
        exclude = ["user"]