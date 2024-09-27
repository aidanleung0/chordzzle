from django.shortcuts import render
from .models import ChordManager
from django.http import JsonResponse

def daily_chord(request):
    manager = ChordManager()
    chord = manager.get_daily_chord()
    return JsonResponse({'chord_name': chord['name'], 'notes': chord['notes']})
