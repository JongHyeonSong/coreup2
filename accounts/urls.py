from django.urls import path
from . import views

"""
ENDPOINT localhost:8000/accounts/
"""
# app_name='accounts'
urlpatterns =[
    path('login/', views.loginPage, name='login'),
    path('logout/', views.logoutPage, name='logout'),
    path('register/', views.registerPage, name='register'),

    
    
    


]