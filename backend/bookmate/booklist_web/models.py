from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify
from django.urls import reverse

# from user_web.models import CustomUser
from django.conf import settings
from django.db.models import UniqueConstraint
from django.db.models.functions import Lower
import os
from django.core.files.storage import FileSystemStorage


class Genre(models.Model):
    name = models.CharField(default="Story", max_length=32, unique=True)

    # book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='genres')
    def __str__(self):
        return self.name


class Book(models.Model):
    title = models.CharField(max_length=500)
    author = models.CharField(max_length=500)
    createdAt = models.DateTimeField(auto_now=True)
    publisher = models.CharField(max_length=500)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.CharField(max_length=2000)
    releaseDate = models.DateField()
    totalLike = models.PositiveIntegerField(default=0)
    username = models.ForeignKey(User, on_delete=models.CASCADE, related_name="person")
    genres = models.ManyToManyField(Genre)

    def cover_url(self, request):
        return request.build_absolute_uri(f"{self.cover}")

    def get_absolute_url(self):
        return reverse("book-detail", args=[str(self.id)])

    def __str__(self):
        return self.title

    def is_liked_by_user(self, username):
        return self.likes.filter(username=username).exists()


def user_directory_path(instance, filename):
    ext = filename.split(".")[-1]
    filename = f"{instance.book.id}.{ext}"
    return os.path.join("images", filename)


class OverwriteStorage(FileSystemStorage):
    def get_available_name(self, name, max_length=None):
        if self.exists(name):
            os.remove(os.path.join(settings.MEDIA_ROOT, name))
        return name


class Cover(models.Model):
    book = models.OneToOneField(Book, on_delete=models.CASCADE, related_name="cover")
    cover = models.ImageField(default="default.jpg", upload_to=user_directory_path)

    def __str__(self):
        return f"{settings.MEDIA_URL}{self.cover}"

    def save(self, *args, **kwargs):
        if self.pk:
            try:
                old_cover = Cover.objects.get(pk=self.pk)
                if old_cover.cover != self.cover:
                    if (
                        os.path.isfile(old_cover.cover.path)
                        and old_cover.cover.name != "default.jpg"
                    ):
                        os.remove(old_cover.cover.path)
            except Cover.DoesNotExist:
                pass
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        if self.cover and self.cover.name != "default.jpg":
            if os.path.isfile(self.cover.path):
                os.remove(self.cover.path)
        super().delete(*args, **kwargs)


class Like(models.Model):
    username = models.ForeignKey(User, on_delete=models.CASCADE, related_name="likes")
    created = models.DateTimeField(auto_now_add=True)
    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name="likes")

    def __str__(self):
        return str(self.username)
