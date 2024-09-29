import csv
from django.core.management.base import BaseCommand
from api.models import Chord # Replace with your actual model

class Command(BaseCommand):
    help = 'Load data from a CSV file into the Person model'

    def add_arguments(self, parser):
        parser.add_argument('csv_file', type=str, help='The path to the CSV file')

    def handle(self, *args, **kwargs):
        csv_file = kwargs['csv_file']

        # Open the CSV file
        with open(csv_file, newline='', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            for row in reader:
               
                chord = Chord(
                    chord=row['Chord'],
                    notes=row['Notes']
                )
                chord.save()
                self.stdout.write(self.style.SUCCESS(f"Successfully added {chord.chord}"))
