# stories/views.py

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
        # 조금 더 풍부한 경험을 위해 단어 목록을 확장합니다.
        word_list = [
            "우주", "바다", "사막", "숲", "도시", "도서관", "실험실", "기차역",
            "피아노", "나침반", "망원경", "오래된 지도", "열쇠", "일기장", "비밀",
            "용기", "그림자", "메아리", "시간 여행", "꿈", "기억", "약속"
        ]

        # 1. 프론트엔드에서 보낸 'count' 파라미터를 받습니다.
        #    - request.query_params.get()을 사용합니다.
        try:
            # 기본값은 3으로 설정하고, 2와 6 사이의 값만 허용합니다.
            count = int(request.query_params.get('count', 3))
            if not 2 <= count <= 6:
                count = 3
        except (ValueError, TypeError):
            # 숫자가 아닌 값이 들어올 경우를 대비해 기본값 3을 사용합니다.
            count = 3

        # 2. 요청받은 개수(count)만큼 단어를 무작위로 선택합니다.
        if len(word_list) < count:
            words = random.sample(word_list, len(word_list))
        else:
            words = random.sample(word_list, count)
            
        return Response({'words': words}, status=status.HTTP_200_OK)