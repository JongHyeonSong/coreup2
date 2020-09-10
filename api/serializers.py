from rest_framework import serializers
from .models import Comment, Country, UserProfile


class UserProfileSerializer(serializers.ModelSerializer):
    user_nation = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = UserProfile
        fields = "__all__"

    def get_user_nation(self, obj):
        try:
            user_nation = obj.user_country.name
        except:
            user_nation = None
        return user_nation


class CommentSerializer(serializers.ModelSerializer):
    likes_count = serializers.SerializerMethodField(read_only=True)
    unlikes_count = serializers.SerializerMethodField(read_only=True)
    comment_nation = serializers.SerializerMethodField(read_only=True)
    comment_username = serializers.SerializerMethodField(read_only=True)
 
    # user_profile = UserProfileSerializer(instance=UserProfile.objects.all().first()) #모양은 예쁘게 나오는데 폼데이터 보내서 생성할때 foriegn키 엮어주기를 모르겠음
    class Meta:
        model = Comment
        fields ="__all__"
        # fields = ["user_profile","likes_count","comment_username","comment_nation","unlikes_count"]
    def get_likes_count(self, obj):
        # print("지금테스트 ", ) /왠지몰라도 엄청나게 불러짐
        return obj.likes.count()

    def get_unlikes_count(self, obj):
        return obj.unlikes.count()

    def get_comment_nation(self, obj):
        try:
            comment_nation = obj.comment_country.name
        except:
            comment_nation = None
        return comment_nation

    def get_comment_username(self, obj):
        try:
            comment_username = obj.user_profile.profile_name
        except:
            comment_username = None
        return comment_username



class CommentThumbUpSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ["likes", "unlikes","id", "comment"]