from django.db import models
from django.conf import settings
from django.db.models.signals import pre_save, post_save
User = settings.AUTH_USER_MODEL


class Country(models.Model):
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=200, null=True)

    def __str__(self):
        return self.name
    class Meta:
        ordering=["-id"]

class UserProfile(models.Model):
    CATEGORY=( ('mail', 'mail'),('femail', 'femail'),)

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    images = models.ImageField(null=True, blank=True)
    profile_name = models.CharField(max_length=200)
    description = models.CharField(max_length=200)
    gender = models.CharField(max_length=200, choices=CATEGORY)
    user_country = models.ForeignKey(Country, models.CASCADE, null=True)
    def __str__(self):
        return self.profile_name

def user_did_save(sender, instance, created, *args, **kwargs):
    if created:
        UserProfile.objects.get_or_create(user=instance, profile_name=instance.username)
post_save.connect(user_did_save, sender=User)


class Comment(models.Model):
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE )
    comment = models.CharField(max_length=200)
    image = models.ImageField(null=True, blank=True)
    comment_country = models.ForeignKey(Country, models.CASCADE, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    likes = models.ManyToManyField(UserProfile, related_name="user_like", blank=True)
    unlikes = models.ManyToManyField(UserProfile, related_name="user_unlike" , blank=True)

    def __str__(self):
        return self.comment
    
    class Meta:
        ordering=["-id"]