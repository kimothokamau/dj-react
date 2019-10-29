from django.db import models


#serializers are just a way of converting json data into a model
class Article(models.Model):
    title = models.CharField(max_length=120)
    content = models.TextField()

    def __str__(self):
        return self.title               
