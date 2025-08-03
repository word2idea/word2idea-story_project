from django.db import models

# Create your models here.
class Story(models.Model):
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.text[:50] # 관리자 페이지에서 보일 이름