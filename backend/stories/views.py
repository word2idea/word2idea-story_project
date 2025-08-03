from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Story
from .serializers import StorySerializer
import random

class StoryViewSet(viewsets.ModelViewSet):
    queryset = Story.objects.all().order_by('-created_at')
    serializer_class = StorySerializer

    @action(detail=False, methods=['get'])
    def words(self, request):
        word_list = ["해변", "나침반", "오래된 책", "별똥별", "비밀의 문"]
        words = random.sample(word_list, 3)
        return Response({'words': words}, status=status.HTTP_200_OK)
# Create your views here.
