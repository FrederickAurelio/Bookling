from django.urls import path
from rest_framework.authtoken.views import obtain_auth_token
from user_web.api.views import (registration_view,CookieTokenRefreshView,
                                CookieTokenObtainPairView,user_view)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)
from rest_framework.routers import DefaultRouter
from django.urls import path, include

router = DefaultRouter()
router.register(r'', user_view, basename='Userview')
urlpatterns = [
    # path('login/', obtain_auth_token, name='login'),
    path('registration/', registration_view, name='registration'),
    path('', include(router.urls)),
    # path('', user_view.as_view(), name='user-list'),
    # path('<int:pk>/', user_detail.as_view(), name='user-detail'),
    # path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/', CookieTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', CookieTokenRefreshView.as_view(), name='token_refresh'),
]