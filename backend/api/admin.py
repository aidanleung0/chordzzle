from django.contrib import admin
from .models import Chord

@admin.register(Chord)
class ChordAdmin(admin.ModelAdmin):
    list_display = ('chord', 'notes')  # You can customize this based on your fields
