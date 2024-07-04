from django.urls import path, include
from booklist_web.api.views import (BookListAV,BookListDetailAV,BookCreateAV,
                                    UserPosted,LikeCreateAV,LikeDeleteAV,FilterBook,LikeAV)

urlpatterns = [
    path('', FilterBook.as_view(), name='book-list'),
    path('<int:pk>/', BookListDetailAV.as_view(), name='book-detail'),
    path('like/', LikeAV.as_view(), name='like-list'),
    path('create/', BookCreateAV.as_view(), name='book-create'),
    path('owned/', UserPosted.as_view(), name='user-posted'),
    path('<int:pk>/like/', LikeCreateAV.as_view(), name='like-create'),
    path('<int:pk>/unlike/', LikeDeleteAV.as_view(), name='like-delete'),
]