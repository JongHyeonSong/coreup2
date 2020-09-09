from django.shortcuts import render



# 내가 만든거
from .models import UserProfile, Comment, Country
from .serializers import UserProfileSerializer, CommentSerializer


# RDF
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser, FileUploadParser
from rest_framework.response import Response
from rest_framework import viewsets, permissions


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    permissions_classes = [permissions.IsAuthenticated]

    parser_classes = (FormParser,MultiPartParser,FileUploadParser,JSONParser) #FormParser,MultiPartParser,FileUploadParser,JSONParser

    def get_queryset(self):
        id = self.request.GET.get("id") or None
        qs = super().get_queryset()
        if id:
            qs = qs.filter(user=id)
        return qs

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permissions_classes = [permissions.IsAuthenticated]

    parser_classes = (FormParser,MultiPartParser,FileUploadParser,JSONParser) #FormParser,MultiPartParser,FileUploadParser,JSONParser
    # def get(self, request, *args, **kwargs):
    #     print("now get")
    #     return Response({'get':"으로옴"})

    def get_queryset(self):
        print('get aquset @@')
        country = self.request.GET.get("country") or None
        qs = super().get_queryset()
        if country:
            qs = qs.filter(comment_country__name__iexact= country)
        return qs
   
    def post(self, request, *args, **kwargs):
        print("post 뷰에 진출")
        # images = request.data['images']
        # comment = request.data['comment']
        # # country = request.data['country']
        # country = "Japan"
        # user_profile = self.request.user.userprofile

        # Comment.objects.get_or_create(images=images, comment=comment, comment_country=Country.objects.all().first())
        print('첫번쨰 나라 ', Country.objects.all().first())
        request.data['country'] = 1
        serializer = CommentSerializer(data=request.data)
        if serializer.is_valid():
            print("유효")
            serializer.save()
        else:
            print("안유효")
        return Response({"post create comment": "succ"}, status=200)

    def create(self, request, *args, **kwargs):
        print('creating@@')
        print(request.data, args, kwargs)
        countryBack = request.data['comment_country']
        print('타입체크 ', type(countryBack))
        request.data['comment_country'] = str(Country.objects.filter(name=countryBack).first().id) or '1'
        return super().create(request, *args, **kwargs)