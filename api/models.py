from django.db import models

# Create your models here for migrating into DB
# Every class is a Table
# Every attr - columns
# Every inst - row

class Note(models.Model):
    body = models.TextField(null=True, blank=True)
    # null=True - can be saved in DB without values
    # blank=True
    updated = models.DateTimeField(auto_now=True)
    # auto_now=True adds timestamp when we update or create note
    created = models.DateTimeField(auto_now_add=True)
    # auto_now_add=True only adds timestamp when we create note


    def __str__(self):
        return self.body[0:50]