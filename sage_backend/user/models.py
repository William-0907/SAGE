from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    class Role(models.TextChoices):
        STUDENT = 'STUDENT', 'Student'
        TEACHER = 'TEACHER', 'Teacher'
        ADMIN = 'ADMIN', 'Admin'

    full_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    username = models.CharField(max_length=20, unique=True)
    role = models.CharField(
        max_length=10, 
        choices=Role.choices, 
        default=Role.STUDENT
    )

    # We use username and password from AbstractUser
    REQUIRED_FIELDS = ['full_name', 'email', 'role']