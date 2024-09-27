from django.db import models
import csv
import random
from django.core.cache import cache
from datetime import datetime, timedelta

CSV_FILE_PATH = r'C:/Users/aidan/chordzzle/backend/transposed-chords.csv'

class ChordManager:
    def __init__(self, csv_file=CSV_FILE_PATH):
        self.csv_file = csv_file
        self.chords = self.load_chords()

    def load_chords(self):
        chords = []
        with open(self.csv_file, 'r') as file:
            reader = csv.reader(file)
            next(reader)
            for row in reader:
                chords.append({
                    'name': row[0],
                    'notes': row[1]
                })
        return chords

    def get_daily_chord(self):
        today = datetime.now().date()
        cached_chord = cache.get('daily_chord')

        if cached_chord and cached_chord['date'] == today:
            return cached_chord['chord']

        random_chord = random.choice(self.chords)
        cache.set('daily_chord', {'date': today, 'chord': random_chord}, timeout=86400)  # Cache for 24 hours

        return random_chord