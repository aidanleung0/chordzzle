from django.db import models
import random
from django.core.cache import cache
from datetime import datetime, timedelta


class Chord(models.Model):
    chord = models.CharField(max_length=100)
    notes = models.CharField(max_length=100)

    def __str__(self):
        return self.chord
    

class ChordManager:
    def get_daily_chord(self):
        today = datetime.now().date()

        cached_chord = cache.get('daily_chord')
        if cached_chord and cached_chord['date'] == today:
            return cached_chord['chord']

        chords = list(Chord.objects.all())

        # Choose a random chord
        if chords:
            random_chord = random.choice(chords)
            cache.set('daily_chord', {'date': today, 'chord': {'chord_name': random_chord.chord, 'notes': random_chord.notes}}, timeout=86400)
            return {'chord_name': random_chord.chord, 'notes': random_chord.notes}
        else:
            return {'error': 'No chords available in the database'}