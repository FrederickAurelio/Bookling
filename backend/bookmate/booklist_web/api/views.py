from booklist_web.models import Book,Like,Genre,Cover
from user_web.models import Profile
from booklist_web.api.serializer import (BookFullInfoSerializer,BookSmallInfoSerializer,
                                         LikeSerializer,LikeListSerializer)
from rest_framework import generics, status, filters
from rest_framework.permissions import IsAuthenticated
from booklist_web.api.permission import IsOwnerOrReadOnly
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser,JSONParser
from django.shortcuts import get_object_or_404
from rest_framework import serializers
from django_filters.rest_framework import DjangoFilterBackend
from .filter import BookFilter,BookSearchFilter,OrderingBook

# http://localhost:8000/booklist/                   GET
class BookListAV(generics.ListAPIView):
    queryset = Book.objects.all()
    serializer_class = BookFullInfoSerializer

# http://localhost:8000/booklist/7 (bookid)         GET,PUT,DELETE
class BookListDetailAV(generics.RetrieveUpdateDestroyAPIView):
    queryset = Book.objects.all()
    serializer_class = BookFullInfoSerializer
    parser_classes = (FormParser, MultiPartParser, JSONParser)
    # permission_classes = [IsOwnerOrReadOnly]

    def get_queryset(self):
        return Book.objects.all()

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)

        # Handle genres
        genres_data = request.data.get('genres')
        if genres_data:
            genres = []
            if isinstance(genres_data, str):
                genres_list = [g.strip() for g in genres_data.strip('[]').split(',')]
            elif isinstance(genres_data, list):
                genres_list = genres_data
            else:
                genres_list = [genres_data]

            for genre_name in genres_list:
                genre_name = genre_name.strip('"\'')
                genre, created = Genre.objects.get_or_create(name=genre_name)
                genres.append(genre)

            instance.genres.set(genres)

        # Handle cover image
        cover_image = request.FILES.get('cover')
        if cover_image:
            cover, created = Cover.objects.get_or_create(book=instance)
            cover.cover = cover_image
            cover.save()

        self.perform_update(serializer)

        return Response(serializer.data)

    def perform_update(self, serializer):
        genres = self.request.data.get('genres')
        if isinstance(genres, str):
            genres = [genre.strip() for genre in genres.strip('[]').split(',')]
        serializer.save(username=self.request.user,genres=genres)

# http://localhost:8000/booklist/create             POST
class BookCreateAV(generics.CreateAPIView):
    serializer_class = BookFullInfoSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = (FormParser, MultiPartParser, JSONParser)
    # throttle_classes = [ReviewCreateThrottle]
    def get_queryset(self):
        return Book.objects.all()

    def perform_create(self, serializer):
        user = self.request.user
        genres = self.request.data.get('genres')
        if isinstance(genres, str):
            genres = [genre.strip() for genre in genres.strip('[]').split(',')]
        serializer.save(username=user, genres=genres)


#User Post's Book                                   GET
# http://localhost:8000/booklist/owned/?name=stevanie
class UserPosted(generics.ListAPIView): #id
    serializer_class = BookSmallInfoSerializer
    # throttle_classes = [ReviewListThrottle]
    def get_queryset(self):
        name = self.request.query_params.get('name', None)
        return Book.objects.filter(username__username=name)

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context


#User's Like Book                                  GET
# http://localhost:8000/booklist/like/?name=stevanie
class LikeAV(generics.ListAPIView):
    serializer_class = LikeListSerializer
    # permission_classes = [IsAuthenticated]

    def get_queryset(self):
        name = self.request.query_params.get('name', None)
        likes = Like.objects.filter(username__username=name)
        return likes

# http://localhost:8000/booklist/8/like/            POST
class LikeCreateAV(generics.CreateAPIView):
    serializer_class = LikeSerializer
    permission_classes = [IsAuthenticated]
    # throttle_classes = [ReviewCreateThrottle]
    def get_queryset(self):
        return Like.objects.all()

    def perform_create(self, serializer):
        pk = self.kwargs.get('pk')
        bk = Book.objects.get(pk=pk)

        user = self.request.user
        review_queryset = Like.objects.filter(book=bk,username=user)
        if review_queryset.exists():
            raise ValidationError("You have already reviewed this movie!")

        like = serializer.save(book=bk, username = user)
        bk.totalLike = Like.objects.filter(book=bk).count()
        bk.save()
        return like

# http://localhost:8000/booklist/8/unlike/
class LikeDeleteAV(generics.DestroyAPIView):
    serializer_class = LikeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Like.objects.all()

    def destroy(self, request, *args, **kwargs):
        pk = self.kwargs.get('pk')
        book = get_object_or_404(Book, pk=pk)
        like = Like.objects.filter(book=book, username=request.user).first()
        if not like:
            return Response({"detail": "Like not found."}, status=status.HTTP_404_NOT_FOUND)
        like.delete()
        book.totalLike = Like.objects.filter(book=book).count()
        book.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

class FilterBook(generics.ListAPIView):
    queryset = Book.objects.all()
    serializer_class = BookSmallInfoSerializer
    filter_backends = [DjangoFilterBackend, BookSearchFilter, OrderingBook]
    filterset_class = BookFilter
    ordering_fields = ['recently','title','date','price']
    ordering = ['title']

#?genres=seaa&price=>10
#?search-author=frederick
#?sortBy=title
#?page=2
