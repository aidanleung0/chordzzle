from django.urls import path
from . import views

urlpatterns = [
    path('daily-chord/', views.daily_chord, name='daily_chord'),
]