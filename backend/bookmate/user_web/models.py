from django.db import models
# from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _
from django.conf import settings
from django.contrib.auth.models import User
import os


def user_directory_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = f'{instance.user.id}.{ext}'
    return os.path.join('profile_pics', filename)

class Profile(models.Model):
   user = models.OneToOneField(User, on_delete=models.CASCADE)
   icon = models.ImageField(default='default.jpg',
                                     upload_to=user_directory_path)
   def __str__(self):
      # return f'{self.user.username} Profile'
      return f'{settings.MEDIA_URL}{self.icon}'
