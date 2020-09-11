"""project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from django.shortcuts import render, redirect
#내가 만든거
from api import views

## RDF 관련
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'comment', views.CommentViewSet)
router.register(r'user_profile', views.UserProfileViewSet)
# router.register(r'comment_thumup', views.CommentThumbUpViewSet)

from api.views import ThumbUp, ThumbDown, deleteComment

urlpatterns = [
    path('thumbUP/<int:pk>/', ThumbUp),
    path('thumbDown/<int:pk>/', ThumbDown),
    path('delete-comment/<int:pk>/', deleteComment),


    path('admin/', admin.site.urls),

    path('', TemplateView.as_view(template_name="frontend/index.html")),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    path('accounts/', include('accounts.urls')),

    ##리액트 라우터에 걸리는 comment/chart 되돌릴 url
    path('comment/', lambda x : redirect('/')),
    path('chart/', lambda x : redirect('/')),
]


urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root = settings.STATIC_ROOT)