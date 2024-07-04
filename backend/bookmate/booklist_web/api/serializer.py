from rest_framework import serializers,fields
from booklist_web.models import Book,Like,Cover,Genre
from user_web.models import Profile
from rest_framework.settings import api_settings


from django.contrib.auth.models import User
from user_web.api.serializer import ProfileSerializer

# class StringListField(serializers.ListField):
#     child = serializers.CharField()

class BookFullInfoSerializer(serializers.ModelSerializer):
    username = serializers.StringRelatedField()
    totalLike = serializers.ReadOnlyField()
    cover_url = serializers.SerializerMethodField()
    profile = ProfileSerializer(source='username.profile', read_only=True)
    cover = serializers.ImageField(write_only=True, required=False)
    releaseDate = fields.DateField(format=api_settings.DATE_FORMAT,input_formats=['%Y-%m-%dT%H:%M:%S.%fZ'])
    genres = serializers.ListField(child=serializers.CharField(), write_only=True)
    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = Book
        fields = "__all__"

    def get_is_liked(self, obj):
        user = self.context['request'].user
        return user.is_authenticated and obj.is_liked_by_user(user)

    def get_cover_url(self, obj):
        if hasattr(obj, 'cover') and obj.cover.cover:
            return self.context['request'].build_absolute_uri(obj.cover.cover.url)
        return None

    def create(self, validated_data):
        genre_data = validated_data.pop('genres')
        cover_data = validated_data.pop('cover', None)
        book = Book.objects.create(**validated_data)
        for genre_name in genre_data:
            genre, created = Genre.objects.get_or_create(name=genre_name.strip())
            book.genres.add(genre)
        if cover_data:
            Cover.objects.create(book=book, cover=cover_data)
        return book

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation['genres'] = [genre.name for genre in instance.genres.all()]
        return representation

    def update(self, instance, validated_data):
        genre_data = validated_data.pop('genres', None)
        cover_data = validated_data.pop('cover', None)
        instance = super().update(instance, validated_data)

        if genre_data:
            instance.genres.clear()
            for genre_name in genre_data:
                genre, created = Genre.objects.get_or_create(name=genre_name.strip())
                instance.genres.add(genre)

        if cover_data:
            cover, created = Cover.objects.get_or_create(book=instance)
            cover.cover.save(cover_data.name, cover_data, save=True)

        return instance


class GenreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Genre
        fields = ['name']

class BookSmallInfoSerializer(serializers.ModelSerializer):
    cover_url = serializers.SerializerMethodField()
    username = serializers.StringRelatedField()
    profileIcon = serializers.StringRelatedField(read_only=True)
    totalLike = serializers.ReadOnlyField()
    class Meta:
        model = Book
        fields = ['id','title','author','releaseDate','price','totalLike','username','profileIcon','cover_url']

    def get_cover_url(self, obj):
        if hasattr(obj, 'cover') and obj.cover.cover:
            return self.context['request'].build_absolute_uri(obj.cover.cover.url)
        return None


class LikeSerializer(serializers.ModelSerializer):
    username = serializers.StringRelatedField(read_only=True)
    class Meta:
        model = Like
        exclude = ("book",)

class LikeListSerializer(serializers.ModelSerializer):
    username = serializers.StringRelatedField()
    book = BookSmallInfoSerializer(read_only=True)

    class Meta:
        model = Like
        fields = "__all__"


