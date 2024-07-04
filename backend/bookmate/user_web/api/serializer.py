from django.contrib.auth.models import User
from rest_framework import serializers
from user_web.models import Profile
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class RegistrationSerializer(serializers.ModelSerializer):
    icon = serializers.ImageField(required=False)
    class Meta:
        model = User
        fields = ['username','email','password','icon']
        extra_kwargs = {
            'password': {'write_only': True},
            'style': {'input_type': 'password'}
        }

    def save(self):
        password = self.validated_data['password']
        icon = self.validated_data.get('icon', None)
        if User.objects.filter(email=self.validated_data['email']).exists():
            raise serializers.ValidationError({'error':'Email is not unique'})
        if User.objects.filter(username=self.validated_data['username']).exists():
            raise serializers.ValidationError({'error':'Username is not unique'})
        account = User(email=self.validated_data['email'], username =self.validated_data['username'])
        account.set_password(password)
        account.save()
        if not icon:
            icon = './profile_pics/default.jpg'
        Profile.objects.create(user=account, icon=icon)
        return account

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['icon']

class UserSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(read_only=True)
    class Meta:
        model = User
        fields = ['username','email','user_permissions','is_staff','profile']