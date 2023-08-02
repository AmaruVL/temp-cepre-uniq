from rest_framework import viewsets
from django.http.request import QueryDict
import datetime
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import Http404, HttpResponse
from app.models import *
from django.db.models import Q
from rest_framework.views import APIView
from datetime import datetime
from rest_framework import serializers

class serializer_modal(serializers.ModelSerializer):
    class Meta:
        model = modal
        fields = ['caption', 'imagen_url']

class verModal(APIView):
    def get(self, request):
        now = datetime.now()
        print('OK', now)
        query1 = Q(visible_desde = None) | Q(visible_desde__lte=now)
        query2 = Q(visible_hasta = None) | Q(visible_hasta__gte=now)
        retval = modal.objects.filter(activo=True).filter(query1).filter(query2).all()

        return Response(serializer_modal(retval, many = True).data)
