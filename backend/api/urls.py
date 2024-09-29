from django.urls import path
from . import views

urlpatterns = [
    path('daily-chord/', views.daily_chord_view, name='daily_chord'),
]