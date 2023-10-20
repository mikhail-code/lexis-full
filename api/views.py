from django.shortcuts import render

from rest_framework. response import Response
from rest_framework. decorators import api_view
from .models import Note
from .serializers import NoteSerializer # importing serialization
# Create your views here.

@api_view(['GET'])
def get_routes(request):
    routes = [
        {
            'Endpoint': '/notes/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/notes/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/notes/create/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Creates new note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/update/',
            'method': 'PUT',
            'body': {'body': ""},
            'description': 'Creates an existing note with data sent in post request'
        },
        {
            'Endpoint': '/notes/id/delete/',
            'method': 'DELETE',
            'body': None,
            'description': 'Deletes and exiting note'
        },
    ]
    return Response(routes)
@api_view(['POST'])
def create_note(request):
    data = request.data
    note = Note.objects.create(
        body=data['body']
    )
    serializer = NoteSerializer(note, many=False)
    return Response(serializer.data)
@api_view(['GET'])
def get_notes(request):
    # just notes = Note.objects.all() wont work, we need serialize data!
    notes = Note.objects.all().order_by('-updated')
    serializer = NoteSerializer(notes, many=True) #many=true if array of items needs to be serialized and we will return querySet
    return Response (serializer.data)

@api_view(['GET'])
def get_note(request, pk):
    # just notes = Note.objects.all() wont work, we need serialize data!
    note = Note.objects.get(id=pk)
    serializer = NoteSerializer(note, many=False)
    return Response (serializer.data)
@api_view(['DELETE'])
def delete_note(request, pk):
    note = Note.objects.get(id=pk)
    note.delete()
    # removes item from DB
    return Response('Note was deleted!')
@api_view(['PUT'])
def update_note(request, pk):
    data = request.data
    note = Note.objects.get(id=pk)
    serializer = NoteSerializer(instance=note, data=data)
    if serializer.is_valid():
        serializer.save()
    return Response (serializer.data)
# we’re getting the data
# we’re getting the note
# were using the serializer
# we’re passing in the instance of the note
# we are serializing that particular note then
# we’re passing in the new data into that and update it then
# we save it so whatever new date are we sending it’s gonna save it