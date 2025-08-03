from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from stories.views import StoryViewSet

router = DefaultRouter()
router.register(r'stories', StoryViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]