from django.shortcuts import render
from rest_framework import status


# 내가 만든거
from .models import UserProfile, Comment, Country
from .serializers import UserProfileSerializer, CommentSerializer, CommentThumbUpSerializer


# RDF
from rest_framework.parsers import JSONParser, MultiPartParser, FormParser, FileUploadParser
from rest_framework.response import Response
from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view

from .pagination import CommentPageNumberPagination

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
    # pagination_class = CommentPageNumberPagination 

    parser_classes = (FormParser,MultiPartParser,FileUploadParser,JSONParser) #FormParser,MultiPartParser,FileUploadParser,JSONParser
    # def get(self, request, *args, **kwargs):
    #     print("now get")
    #     return Response({'get':"으로옴"})

    def get_queryset(self):
        print('get_queryset @@')
        country = self.request.GET.get("country") or None
        comment_pk = self.request.GET.get("comment_pk") or None
        qs = super().get_queryset()
        if country:
            qs = qs.filter(comment_country__name__iexact= country)
        if comment_pk:
            qs = qs.filter(id=comment_pk)

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

    # def create(self, request, *args, **kwargs):
    #     print('creating@@')
    #     print(request.data, args, kwargs)
    #     countryBack = request.data['comment_country']
    #     print('타입체크 ', type(countryBack))
    #     request.data['comment_country'] = str(Country.objects.filter(name=countryBack).first().id) or '1'
    #     return super().create(request, *args, **kwargs)



    # def create(self, request):   //파일떄문에 -committed 에러난다
    #     print('create에 들어왔슴')
    #     print(request.data)
    #     obj = Comment.objects.create(**request.data)
    #     obj.user_profile = request.user.userprofile
    #     obj.comment_country = Country.objects.all().first()
    #     obj.save()
    #     return Response({}, status=200)

    # def create(self, request, *args, **kwargs):
    #     serializer = self.get_serializer(data=request.data)
    #     if serializer.is_valid(raise_exception=True):
    #         print('vaild')
    #         serializer.user_profile = UserProfile.objects.all().first()
    #         serializer.comment_country=Country.objects.all().first()
    #         serializer.save()
    #     else:
    #         print("no vaild")
    #     return Response(serializer.data)
        
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        #포린키 추가
        print(request.data)
        countryBack = request.data['comment_country']
        request.data['comment_country'] =str(Country.objects.filter(name=countryBack).first().id)

        tep_serializer = UserProfileSerializer(instance=request.user.userprofile)
        print(tep_serializer.data)
        request.data['user_profile'] = str(request.user.userprofile.id) or '1'

        #여기서부터 에러남 
        print(request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

   
# class CommentThumbUpViewSet(viewsets.ModelViewSet): 
#     queryset = Comment.objects.all()
#     serializer_class = CommentThumbUpSerializer
#     permissions_classes = [permissions.IsAuthenticated]

#     # parser_classes = (FormParser,MultiPartParser,FileUploadParser,JSONParser) #FormParser,MultiPartParser,FileUploadParser,JSONParser


@api_view(["POST"])
def ThumbUp(request,pk):
    comment = Comment.objects.filter(id=pk).first()
    serializer = CommentThumbUpSerializer(
        instance=comment, data=request.data or None,
        # user_profile=request.user.userprofile,
        )
    if serializer.is_valid():
        print(request.user.userprofile, comment.likes.all())
        if request.user.userprofile not in comment.likes.all():
            comment.likes.add(request.user.userprofile)
        else:
            comment.likes.remove(request.user.userprofile)
        qwer = serializer.save()
    return Response(serializer.data)
    

@api_view(["POST"])
def ThumbDown(request,pk):
    comment = Comment.objects.filter(id=pk).first()
    serializer = CommentThumbUpSerializer(
        instance=comment, data=request.data or None,
        # user_profile=request.user.userprofile,
        )
    if serializer.is_valid():
        print(request.user.userprofile, comment.unlikes.all())
        if request.user.userprofile not in comment.unlikes.all():
            comment.unlikes.add(request.user.userprofile)
        else:
            comment.unlikes.remove(request.user.userprofile)
        qwer = serializer.save()
    return Response(serializer.data)

@api_view(["DELETE"])
def deleteComment(request,pk):
    comment = Comment.objects.get(id=pk)
    comment.delete()
    return Response({"message":"삭제완료"})
