from django.http import JsonResponse
from .models import ChordManager

def daily_chord_view(request):
    chord_manager = ChordManager()
    daily_chord = chord_manager.get_daily_chord()
    return JsonResponse(daily_chord)
