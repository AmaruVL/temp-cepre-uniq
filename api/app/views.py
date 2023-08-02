from rest_framework import viewsets
from django.http.request import QueryDict
import datetime
import ast
from .exceptions import *
from rest_framework import generics
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser, FileUploadParser, JSONParser
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.http import Http404, HttpResponse
from rest_framework.views import APIView
from app.models import *
from .serializers import *
from django.http import HttpResponse 
from django.db.models import Q, Sum
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, RetrieveUpdateAPIView
import csv
import json
import re
import pdfkit
from .scrap import *
import bcrypt
from django.shortcuts import get_object_or_404
from django.core.files.storage import FileSystemStorage #To upload Profile Picture
import random
import jwt
from jwt import PyJWKClient
# Email Field
from django.core.mail import *
from django.conf import settings
from django.views.generic import View
from datetime import date, timedelta
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string, get_template 
from django.template import Context
from django.utils.html import strip_tags
from datetime import datetime

from django.db import transaction

# CONFIGURACION DEL AUTHORITY 
from decouple import config
AUTHORIZATION = config('AUTHORITY')

import reportlab
# 

### RECUPERACION UBIGEO
def recuperaUbigeo(distrito):
    ubigeoDistrito = ubigeo.objects.get(codigo_ubigeo=distrito, tipo_ubigeo='I')
    departamento = ubigeo.objects.get(codigo_ubigeo__startswith=distrito[0:2], tipo_ubigeo='D')
    provincia = ubigeo.objects.get(codigo_ubigeo__startswith=distrito[0:4], tipo_ubigeo='P')
    
    lugar_ = departamento.nombre +" - "+ provincia.nombre +" - "+ ubigeoDistrito.nombre
    return lugar_

#FICHA DE INSCRIPCION
class viewPDF(View):
    def get(self,request, pk):
        inscrito = inscripcion.objects.get(id=pk)
        disc = inscrito.id_compromiso_pago.id_preinscripcion.condicion_discapacidad
        if disc==True:
            estado_discap = inscrito.id_compromiso_pago.id_preinscripcion.detalle_discapacidad
        else:
            estado_discap = "Ninguna"
        f_nac = inscrito.id_compromiso_pago.id_preinscripcion.dni_persona.fecha_nacimiento
        hoy = datetime.date.today()
        edad = abs((hoy - f_nac).days)//365
        det_pago = detalle_compromiso_de_pago.objects.filter(id_compromiso_pago=inscrito.id_compromiso_pago.id)
        total = det_pago[0].id_compromiso_pago.id_pago.monto_total

        #UBIGEO
        ubiColegio = inscrito.id_compromiso_pago.id_preinscripcion.id_colegio.id_ubigeo.codigo_ubigeo
        ubiNacimiento = inscrito.id_compromiso_pago.id_preinscripcion.dni_persona.lugar_nacimiento.codigo_ubigeo
        ubiActual = inscrito.id_compromiso_pago.id_preinscripcion.id_ubigeo.codigo_ubigeo

        data = {
            'dni': inscrito.id_compromiso_pago.id_preinscripcion.dni_persona.dni,
            'ciclo': inscrito.id_compromiso_pago.id_preinscripcion.id_ciclo.denominacion,
            'apellido_paterno': inscrito.id_compromiso_pago.id_preinscripcion.dni_persona.apellido_paterno,
            'apellido_materno': inscrito.id_compromiso_pago.id_preinscripcion.dni_persona.apellido_materno,
            'nombres': inscrito.id_compromiso_pago.id_preinscripcion.dni_persona.nombres,
            'escuela_profesional': inscrito.id_compromiso_pago.id_preinscripcion.id_escuela_profesional.nombre_escuela_profesional,
            'institucion_educativa': inscrito.id_compromiso_pago.id_preinscripcion.id_colegio.nombre_colegio,
            'tipo_colegio': inscrito.id_compromiso_pago.id_preinscripcion.id_colegio.tipo_colegio,
            'ubigeo_ie': recuperaUbigeo(ubiColegio),
            'ubigeo_procedencia': recuperaUbigeo(ubiActual),
            'idioma': inscrito.id_compromiso_pago.id_preinscripcion.idioma,
            'direccion': inscrito.id_compromiso_pago.id_preinscripcion.direccion,
            'ubigeo_nacimiento': recuperaUbigeo(ubiNacimiento),
            'discapacidad': estado_discap,
            'sexo': inscrito.id_compromiso_pago.id_preinscripcion.dni_persona.sexo,
            'fecha_nac': inscrito.id_compromiso_pago.id_preinscripcion.dni_persona.fecha_nacimiento,
            'edad': edad,
            'telefono': inscrito.id_compromiso_pago.id_preinscripcion.telefono_personal,
            'email': inscrito.id_compromiso_pago.id_preinscripcion.email_respaldo,
            'telef_apoderado': inscrito.id_compromiso_pago.id_preinscripcion.telefono_apoderado,
            'nombres_apoderado': inscrito.id_compromiso_pago.id_preinscripcion.nombres_apoderado, 
            'detalle_cuotas': det_pago,
            'total_pago': total
        }
        pdf = render_to_pdf('ficha-inscripcion.html', data)
        return HttpResponse(pdf, content_type='application/pdf')


class prueb(View):
    def get(self,request, pk):
        inscrito = inscripcion.objects.get(id=pk)
        data = {
            'dni': inscrito.id_compromiso_pago.id_preinscripcion.dni_persona.dni,
            'ciclo': inscrito.id_compromiso_pago.id_preinscripcion.id_ciclo.denominacion            
        }
        pdf = render_to_pdf('prueba.html', data)
        return HttpResponse(pdf, content_type='application/pdf')
class descargarPDF(View):
    def get(self,request, pk):
        inscrito = inscripcion.objects.get(id=pk)
        disc = inscrito.id_compromiso_pago.id_preinscripcion.condicion_discapacidad
        if disc==True:
            estado_discap = inscrito.id_compromiso_pago.id_preinscripcion.detalle_discapacidad
        else:
            estado_discap = "Ninguna"
        f_nac = inscrito.id_compromiso_pago.id_preinscripcion.dni_persona.fecha_nacimiento
        hoy = datetime.date.today()
        edad = abs((hoy - f_nac).days)//365
        det_pago = detalle_compromiso_de_pago.objects.filter(id_compromiso_pago=inscrito.id_compromiso_pago.id)
        total = det_pago[0].id_compromiso_pago.id_pago.monto_total
        #UBIGEO
        ubiColegio = inscrito.id_compromiso_pago.id_preinscripcion.id_colegio.id_ubigeo.codigo_ubigeo
        ubiNacimiento = inscrito.id_compromiso_pago.id_preinscripcion.dni_persona.lugar_nacimiento.codigo_ubigeo
        ubiActual = inscrito.id_compromiso_pago.id_preinscripcion.id_ubigeo.codigo_ubigeo

        data = {
            'dni': inscrito.id_compromiso_pago.id_preinscripcion.dni_persona.dni,
            'ciclo': inscrito.id_compromiso_pago.id_preinscripcion.id_ciclo.denominacion,
            'apellido_paterno': inscrito.id_compromiso_pago.id_preinscripcion.dni_persona.apellido_paterno,
            'apellido_materno': inscrito.id_compromiso_pago.id_preinscripcion.dni_persona.apellido_materno,
            'nombres': inscrito.id_compromiso_pago.id_preinscripcion.dni_persona.nombres,
            'escuela_profesional': inscrito.id_compromiso_pago.id_preinscripcion.id_escuela_profesional.nombre_escuela_profesional,
            'institucion_educativa': inscrito.id_compromiso_pago.id_preinscripcion.id_colegio.nombre_colegio,
            'tipo_colegio': inscrito.id_compromiso_pago.id_preinscripcion.id_colegio.tipo_colegio,
            'ubigeo_ie': recuperaUbigeo(ubiColegio),
            'ubigeo_procedencia': recuperaUbigeo(ubiActual),
            'idioma': inscrito.id_compromiso_pago.id_preinscripcion.idioma,
            'direccion': inscrito.id_compromiso_pago.id_preinscripcion.direccion,
            'ubigeo_nacimiento': recuperaUbigeo(ubiNacimiento),
            'discapacidad': estado_discap,
            'sexo': inscrito.id_compromiso_pago.id_preinscripcion.dni_persona.sexo,
            'fecha_nac': inscrito.id_compromiso_pago.id_preinscripcion.dni_persona.fecha_nacimiento,
            'edad': edad,
            'telefono': inscrito.id_compromiso_pago.id_preinscripcion.telefono_personal,
            'email': inscrito.id_compromiso_pago.id_preinscripcion.email_respaldo,
            'telef_apoderado': inscrito.id_compromiso_pago.id_preinscripcion.telefono_apoderado,
            'nombres_apoderado': inscrito.id_compromiso_pago.id_preinscripcion.nombres_apoderado, 
            'detalle_cuotas': det_pago,
            'total_pago': total
        }
        pdf = render_to_pdf('ficha-inscripcion.html', data)
        response = HttpResponse(pdf, content_type='application/pdf')        
        response['Content-Disposition'] = "attachment; filename=F_INSCRIPCION.pdf"

        return response




# Create your views here.
class enviarEmailPreinscripcion(APIView):
    def post(self, request, pk):
        preinsc = preinscripcion.objects.get(id=pk)
        email_destino = preinsc.email_respaldo
        nombre_completo = preinsc.dni_persona
        dni = preinsc.dni_persona.dni
        escuela_prof = preinsc.id_escuela_profesional.nombre_escuela_profesional
        nombre_ciclo = preinsc.id_ciclo.denominacion
        cant_cuotas = preinsc.id_pago.nro_cuotas
        if cant_cuotas > 1: tipo_pago = 'En cuotas' 
        else: tipo_pago = 'Unico'
        compro = compromiso_pago.objects.get(id_preinscripcion=preinsc.id)
        detalle_cuotas = detalle_compromiso_de_pago.objects.filter(id_compromiso_pago=compro.id)

        email_to = email_destino
        hmtl_content = render_to_string(
            "preinscripcion.html",{
                'nombre_completo': nombre_completo,
                'dni': dni,
                'escuela_profesional': escuela_prof,
                'denominacion_ciclo': nombre_ciclo,
                'tipo_pago': tipo_pago,
                'cantidad_cuotas' : cant_cuotas,
                'detalle_cuotas': detalle_cuotas
            },
        )
        text_content = strip_tags(hmtl_content)

        email = EmailMultiAlternatives(
            "BIENVENIDO AL CENTRO PREUNIVERSITARIO - UNIQ",
            text_content,
            settings.EMAIL_HOST_USER,
            [email_to]
        )

        email.attach_alternative(hmtl_content, "text/html")
        email.send()
    

        return Response({"message":"Enviado con exito"})

# Create your views here.
# ············ REGION EXTERNO ··············· {{{
class vista_ubigeo(viewsets.ModelViewSet):
    queryset = ubigeo.objects.all()
    serializer_class = serializer_ubigeo

    def get_queryset(self):
        tipo = self.request.GET.get('tipo', '')
        padre = self.request.GET.get('padre', '')

        q1 = Q(tipo_ubigeo = tipo)

        if tipo == 'P':
            q2 = Q(codigo_ubigeo__startswith = padre)
            return self.queryset.filter(q1, q2)


        return self.queryset.filter(q1)

class persona_list(ListCreateAPIView):
    queryset = persona.objects.all()
    serializer_class = serializer_persona

class persona_rud(RetrieveUpdateDestroyAPIView):
    queryset = persona.objects.all()
    serializer_class = serializer_persona

class colegio_list(ListCreateAPIView):
    queryset = colegio.objects.all()
    serializer_class = serializer_colegio

class colegio_rud(RetrieveUpdateDestroyAPIView):
    queryset = colegio.objects.all()
    serializer_class = serializer_colegio

@api_view(['POST'])
def login(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    user = CustomUser.objects.get(email=body['username'])
    if not bcrypt.hashpw(body['password'].encode('utf-8'), user.password.encode('utf-8')):
        return HttpResponse('No autorizado', status=401)
    token = jwt.encode({"sub": user.id}, "secret", algorithm="HS256")
    return Response(token)

class verificar_token_uniq(APIView):
    def post(self, request, *args, **kwargs):
        authheader =(request.META['HTTP_AUTHORIZATION'] if request.META['HTTP_AUTHORIZATION'] else '').split(' ')
        print(authheader)
        if len(authheader)<1:
            return Response({"message":"Token no válido"}, status=status.HTTP_400_BAD_REQUEST)
        token = authheader[1]
        print("TOKEN", token)
        jwks_client = PyJWKClient(str(AUTHORIZATION)+'/.well-known/openid-configuration/jwks')
        print('3.1 AUTH', str(AUTHORIZATION))
        print("JWKS_CLIENT",jwks_client)
        signing_key = jwks_client.get_signing_key_from_jwt(token)
        print("SIGNIN_KEY", signing_key)
        try:
            print("3. OOK", signing_key.key)
            decodedPayload = jwt.decode(token,
                                        signing_key.key, algorithms=['RS256'],
                                        audience=str(AUTHORIZATION)+'/resources',
                                        options={'verify_exp': True},
                                        leeway=600
                                        )
            print("2. OOOK ", decodedPayload)
            sub = decodedPayload['sub']
            print("SUB - USERNAME", sub)
            #print(email)
            try:
                admin = administrador.objects.get(user_type__username=sub)
                if admin.estado == True:
                    dict = {}
                    dict['id'] = admin.id
                    dict['user_type'] = admin.user_type.user_type
                    dict['correo'] = admin.user_type.email
                    dict['nombres'] = admin.user_type.first_name+" "+admin.user_type.last_name+" "+admin.user_type.sur_name
                    return Response(dict)
                else:
                    return Response({"message":"Usted se encuentra inhabilitado del sistema"}, status=status.HTTP_401_UNAUTHORIZED)
            except administrador.DoesNotExist:
                return Response({"message":"No hay datos"}, status=404)
        except Exception as ex:
            print(ex)
            return Response({"message":"token invalido."}, status=status.HTTP_401_UNAUTHORIZED)

# ············ ENDREGION EXTERNO ··············· }}}
@api_view(['GET'])
def consulta_persona(request):
    dni = ""
    dni = request.GET.get('dni')
    if dni == None or re.compile('[0-9]{8}').match(dni) == None:
        raise serializers.ValidationError('DNI no válido')
    try:
        opersona = persona.objects.get(dni=dni)
        return Response(serializer_persona(opersona).data)
    except persona.DoesNotExist:
        raise Http404

class credencialesUserEstudiante(APIView):
    def post(self, request):
        correo = request.data['email']
        try:
            estudiante_ = estudiante.objects.get(user_type__email = correo)
            dict = {}
            dict['id'] = estudiante_.id
            dict['user_type'] = estudiante_.user_type.user_type
            dict['correo'] = correo
            dict['nombres'] = estudiante_.user_type.first_name+" "+estudiante_.user_type.last_name+" "+estudiante_.user_type.sur_name
            dict['nombre_corto'] = estudiante_.user_type.first_name.split(' ')[0] + estudiante_.user_type.last_name +" "+ estudiante_.user_type.sur_name
            # !REVISION DE PAGOS PENDIENTES
            dni = estudiante_.id_inscripcion.id_compromiso_pago.id_preinscripcion.dni_persona.dni
            lista_deudas = extract_data_debt(dni)
            if len(lista_deudas) > 1:
                c = 1  #contador
                k = True  #estado
                final_res = True # Flag para controlar el resultado final de las deudas
                while k == True and c < len(lista_deudas):
                    obj = lista_deudas[c]
                    detalle_item_deuda = obj['det_all']
                    # buscar deudas de cepre


                    cuerpo_det = obj['det_all'][0]

                    
                

                    if cuerpo_det['dat_rec'] is None: #no realizo el pago
                        nro_cuota = (c+1)
                        fecha_vec = cuerpo_det['deu_amn']['fch_vto']
                        fecha = datetime.datetime.strptime(fecha_vec, '%Y-%m-%d').date()
                        k = False
                        final_res = False

                    else: # procesamos los pagos
                        with transaction.atomic():
                            detalle_pag = detalle_compromiso_de_pago.objects.get(id_compromiso=estudiante_.id_inscripcion.id_compromiso_pago, numero_cuota=c+1)
                            if detalle_pag.esta_pagado == False: #si no se registro su pago
                                detalle_pag.esta_pagado = True
                                detalle_pag.codigo_compromiso_pago = cuerpo_det['dat_rec'][0]['nro_doc']
                                detalle_pag.fecha_pagado = cuerpo_det['dat_rec'][0]['fch_emi']
                                detalle_pag.save()
                                # TESORERIA
                                tesorer = registro_tesoreria.objects.get(id_detalle_compromiso=detalle_pag.id)
                                tesorer.esta_pagado = True
                                tesorer.fecha_pago = cuerpo_det['dat_rec'][0]['fch_emi']
                                tesorer.save()
                    # k = json.dumps(obj)
                    # m = json.loads(k)
                    # if m['imp_tot_sld'] != "0.00":
                    #     nro_cuota = (c+1)
                    #     fecha_vec = m['deu_amn']['fch_vto']
                    #     fecha = datetime.datetime.strptime(fecha_vec, '%Y-%m-%d').date()
                    #     k = False
                    #     final_res = False
                    c+=1
                if final_res == False:
                    total_days = fecha - datetime.datetime.now().date()
                    if (total_days.days > 2):
                        mensaje = "Bienvenido al campus virtual"
                    if (total_days.days < 2 and total_days.days > 0):
                        mensaje = "Recuerde pagar su cuota parcial para evitar inconvenientes"
                    if (total_days.days < 0):
                        mensaje = "Usted no pago su cuota Nº "+str(nro_cuota)+", se le aconseja que realice el pago para evitar inconvenientes"
                mensaje = "Bienvenido al campus virtual"
                dict['mensaje'] = mensaje
                return Response(dict)
            # ! END REVISION
            mensaje = "Bienvenido al campus virtual"
            dict['mensaje'] = mensaje
            return Response(dict)
        except estudiante.DoesNotExist:
            return Response({"message":"No hay datos"}, status=404)

class credencialesUserDocente(APIView):
    def post(self, request):
        correo = request.data['email']
        try:
            docente_ = docente.objects.get(user_type__email = correo)
            if docente_.estado_Activo == True:
                dict = {}
                dict['id'] = docente_.id
                dict['user_type'] = docente_.user_type.user_type
                dict['correo'] = correo
                dict['nombres'] = docente_.user_type.first_name +" "+ docente_.user_type.last_name+" "+docente_.user_type.sur_name
                return Response(dict)
            else:
                return Response({"message": "Usted se encuentra deshabilitado del sistema academico"},status=status.HTTP_401_UNAUTHORIZED)
        except docente.DoesNotExist:
            return Response({"message":"Docente no registrado en el sistema"}, status=status.HTTP_400_BAD_REQUEST)
# ············ REGION PIDE ··············· {{{


# ············ ENDREGION PIDE ··············· }}}

# ············ REGION INFRAESTRUCTURA ··············· {{{
class grupo_academico_list(ListCreateAPIView):
    queryset = grupo_academico.objects.all()
    serializer_class = serializer_grupo_academico

class grupo_academico_rud(RetrieveUpdateDestroyAPIView):
    queryset = grupo_academico.objects.all()
    serializer_class = serializer_grupo_academico


class escuela_profesional_list(ListCreateAPIView):
    queryset = escuela_profesional.objects.all()
    serializer_class = serializer_escuela_prof_mostrar

    def get_queryset(self):
        grupo = self.request.GET.get('grupo', None)
        if grupo != None:
            q = Q(grupo = grupo)
            return self.queryset.filter(q)

        return self.queryset.all()

class escuela_profesional_rud(RetrieveUpdateDestroyAPIView):
    queryset = escuela_profesional.objects.all()
    serializer_class = serializer_escuela_profesional


class sede_list(ListCreateAPIView):
    queryset = sede.objects.all()
    serializer_class = serializer_sede

class sede_rud(RetrieveUpdateDestroyAPIView):
    queryset = sede.objects.all()
    serializer_class = serializer_sede


class pabellon_list(ListCreateAPIView):
    queryset = pabellon.objects.all()
    serializer_class = serializer_pabellon

class pabellon_rud(RetrieveUpdateDestroyAPIView):
    queryset = pabellon.objects.all()
    serializer_class = serializer_pabellon

class verAulas(APIView):
    def get(self, request, *args, **kwargs):
        aula_ = aula.objects.all()
        serializer = serializer_aula_mostrar(aula_, many=True)
        return Response(serializer.data)
    
    def post(self, request, *args, **kwargs):
        serializer = serializer_aula(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
class aula_list(ListCreateAPIView):
    queryset = aula.objects.all()
    serializer_class = serializer_aula

class aula_rud(RetrieveUpdateDestroyAPIView):
    queryset = aula.objects.all()
    serializer_class = serializer_aula
# ············ END REGION INFRAESTRUCTURA ··············· }}}

# ············ REGION CICLO ··············· {{{
class ciclo_list(ListCreateAPIView):
    queryset = ciclo.objects.all().order_by('-fecha_registro')
    serializer_class = serializer_ciclo

class ciclo_rud(RetrieveUpdateDestroyAPIView):
    queryset = ciclo.objects.all()
    serializer_class = serializer_ciclo


class documento_publicacion_list(ListCreateAPIView):
    queryset = documento_publicacion.objects.all()
    serializer_class = serializer_documento_publicacion

class documento_publicacion_rud(RetrieveUpdateDestroyAPIView):
    queryset = documento_publicacion.objects.all()
    serializer_class = serializer_documento_publicacion

# ············ END REGION CICLO ··············· }}}

# ············ REGION INSCRIPCION ··············· {{{
class pago_list(ListCreateAPIView):
    queryset = pago.objects.all()
    serializer_class = serializer_pago

class pago_rud(RetrieveUpdateDestroyAPIView):
    queryset = pago.objects.all()
    serializer_class = serializer_pago


class detalle_pago_list(ListCreateAPIView):
    queryset = detalle_pago.objects.all()
    serializer_class = serializer_detalle_pago

class detalle_pago_rud(RetrieveUpdateDestroyAPIView):
    queryset = detalle_pago.objects.all()
    serializer_class = serializer_detalle_pago


class preinscripcion_list(ListCreateAPIView):
    queryset = preinscripcion.objects.all()
    serializer_class = serializer_preinscripcion

class preinscripcion_rud(RetrieveUpdateDestroyAPIView):
    queryset = preinscripcion.objects.all()
    serializer_class = serializer_preinscripcion


class compromiso_pago_list(ListCreateAPIView):
    queryset = compromiso_pago.objects.all()
    serializer_class = serializer_compromiso_pago

class compromiso_pago_rud(RetrieveUpdateDestroyAPIView):
    queryset = compromiso_pago.objects.all()
    serializer_class = serializer_compromiso_pago


class detalle_compromiso_de_pago_list(ListCreateAPIView):
    queryset = detalle_compromiso_de_pago.objects.all()
    serializer_class = serializer_detalle_compromiso_de_pago

class detalle_compromiso_de_pago_rud(RetrieveUpdateDestroyAPIView):
    queryset = detalle_compromiso_de_pago.objects.all()
    serializer_class = serializer_detalle_compromiso_de_pago


class inscripcion_list(ListCreateAPIView):
    queryset = inscripcion.objects.all()
    serializer_class = serializer_inscripcion

class inscripcion_rud(RetrieveUpdateDestroyAPIView):
    queryset = inscripcion.objects.all()
    serializer_class = serializer_inscripcion


class docente_list(ListCreateAPIView):
    queryset = docente.objects.all()
    serializer_class = serializer_docente_mostrar

class docente_rud(RetrieveUpdateDestroyAPIView):
    queryset = docente.objects.all()
    serializer_class = serializer_docente

class admin_list(ListCreateAPIView):
    queryset = administrador.objects.all()
    serializer_class = serializer_administrador

class admin_rud(RetrieveUpdateDestroyAPIView):
    queryset = administrador.objects.all()
    serializer_class = serializer_administrador

class user_list(ListCreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = serializer_user

class user_rud(RetrieveUpdateDestroyAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = serializer_user
    # ············ END REGION INSCRIPCION ··············· }}}


# ············· REGION CURSOS ······················ {{{
class padron_curso_list(ListCreateAPIView):
    queryset = padron_curso.objects.all()
    serializer_class = serializer_padron_curso

class padron_curso_rud(RetrieveUpdateDestroyAPIView):
    queryset = padron_curso.objects.all()
    serializer_class = serializer_padron_curso

# ············· REGION CONFIG ······················ {{{
class tabla_configuraciones_list(ListCreateAPIView):
    queryset = tabla_configuraciones.objects.all()
    serializer_class = serializer_configuraciones

class tabla_configuraciones_rud(RetrieveUpdateDestroyAPIView):
    queryset = tabla_configuraciones.objects.all()
    serializer_class = serializer_configuraciones

class padron_cursos_grupo_list(ListCreateAPIView):
    queryset = padron_cursos_grupo.objects.all()
    serializer_class = serializer_padron_curso_grupo

class padron_cursos_grupo_rud(RetrieveUpdateDestroyAPIView):
    queryset = padron_cursos_grupo.objects.all()
    serializer_class = serializer_padron_curso_grupo


class horario_list(ListCreateAPIView):
    queryset = horario.objects.all()
    serializer_class = serializer_horario

class horario_rud(RetrieveUpdateDestroyAPIView):
    queryset = horario.objects.all()
    serializer_class = serializer_horario


class horario_curso_list(ListCreateAPIView):
    queryset = horario_curso.objects.all()
    serializer_class = serializer_horario_curso

class horario_curso_rud(RetrieveUpdateDestroyAPIView):
    queryset = horario_curso.objects.all()
    serializer_class = serializer_horario_curso
# ············· ENDREGION CURSOS ······················ }}}

# ············· REGION ESTUDIANTE ······················ {{{
class estudiante_list(ListCreateAPIView):
    queryset = estudiante.objects.all()
    serializer_class = serializer_estudiante

class estudiante_rud(RetrieveUpdateDestroyAPIView):
    queryset = estudiante.objects.all()
    serializer_class = serializer_estudiante


class estudiante_horario_list(ListCreateAPIView):
    queryset = estudiante_horario.objects.all()
    serializer_class = serializer_estudiante_horario

class estudiante_horario_rud(RetrieveUpdateDestroyAPIView):
    queryset = estudiante_horario.objects.all()
    serializer_class = serializer_estudiante_horario


class estudiante_horario_list(ListCreateAPIView):
    queryset = estudiante_horario.objects.all()
    serializer_class = serializer_estudiante_horario

class estudiante_horario_rud(RetrieveUpdateDestroyAPIView):
    queryset = estudiante_horario.objects.all()
    serializer_class = serializer_estudiante_horario

class asistencia_estudiante_list(ListCreateAPIView):
    queryset = asistencia_estudiante.objects.all()
    serializer_class = serializer_asistencia_estudiante

class asistencia_estudiante_rud(RetrieveUpdateDestroyAPIView):
    queryset = asistencia_estudiante.objects.all()
    serializer_class = serializer_asistencia_estudiante

# ············· ENDREGION ESTUDIANTE ······················ }}}

# ············· REGION ASISTENCIA DOCENTE ······················ {{{
class asistencia_docente_list(ListCreateAPIView):
    queryset = asistencia_docente.objects.all()
    serializer_class = serializer_asistencia_docente

class asistencia_docente_rud(RetrieveUpdateDestroyAPIView):
    queryset = asistencia_docente.objects.all()
    serializer_class = serializer_asistencia_docente
# ············· ENDREGION ASISTENCIA DOCENTE ······················ }}}

# ············· REGION EXAMENES ······················ {{{
class examen_list(ListCreateAPIView):
    queryset = examen.objects.all()
    serializer_class = serializer_examen_mostrar

class examen_rud(RetrieveUpdateDestroyAPIView):
    queryset = examen.objects.all()
    serializer_class = serializer_examen

class examen_estudiante_list(ListCreateAPIView):
    queryset = examen_estudiante.objects.all()
    serializer_class = serializer_examen_estudiante

class examen_estudiante_rud(RetrieveUpdateDestroyAPIView):
    queryset = examen_estudiante.objects.all()
    serializer_class = serializer_examen_estudiante

class estudiante_notas_por_curso_list(ListCreateAPIView):
    queryset = estudiante_notas_por_curso.objects.all()
    serializer_class = serializer_estudiante_notas_por_curso

class estudiante_notas_por_curso_rud(RetrieveUpdateDestroyAPIView):
    queryset = estudiante_notas_por_curso.objects.all()
    serializer_class = serializer_estudiante_notas_por_curso
# ············· ENDREGION EXAMENES ······················ }}}

# ············· REGION TESORERIA ······················ {{{
class registro_tesoreria_list(ListCreateAPIView):
    queryset = registro_tesoreria.objects.all()
    serializer_class = serializer_registro_tesoreria

class registro_tesoreria_rud(RetrieveUpdateDestroyAPIView):
    queryset = registro_tesoreria.objects.all()
    serializer_class = serializer_registro_tesoreria
# ············· ENDREGION TESORERIA ······················ }}}
# ············· REGION ASISTENCIA DOCENTE ······················ {{{
class configuracion_list(ListCreateAPIView):
    queryset = tabla_configuraciones.objects.all()
    serializer_class = serializer_configuraciones

class configuracion_rud(RetrieveUpdateDestroyAPIView):
    queryset = tabla_configuraciones.objects.all()
    serializer_class = serializer_configuraciones
# ············· ENDREGION ASISTENCIA DOCENTE ······················ }}}


# ············· PROCESOS APIView·······························
 
# ·············· REGION PREINSCRIPCION ··················{{{
class preinscripcionListCreateAPIView(APIView):
    def get(self, request, format=None):
        snippets = preinscripcion.objects.all()
        serializer = serializer_preinscripcion(snippets, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        entrada_data = request.data
        dni_entrada = entrada_data['dni']
        try:
            persona_entr = persona.objects.get(dni=dni_entrada)
            data = json.dumps(entrada_data)
            data = json.loads(data)
            data['dni_persona'] = persona_entr.id
            preinscripcion_nuevo = serializer_preinscripcion(data=data)
            if preinscripcion_nuevo.is_valid(raise_exception=True):
                preinscripcion_save = preinscripcion_nuevo.save()
            return Response({
                "persona_data" : serializer_persona(persona_entr).data,
                "preinscripcion_data": preinscripcion_nuevo.data
            })
        except persona.DoesNotExist:
            serializer_person = serializer_persona(data = entrada_data)
            if serializer_person.is_valid(raise_exception=True):
                persona_save = serializer_person.save()

            ult_persona = persona.objects.get(dni=dni_entrada)
            data = json.dumps(entrada_data)
            data = json.loads(data)
            data['dni_persona'] = ult_persona.id
            serializer_preinscr = serializer_preinscripcion(data = data)
            if serializer_preinscr.is_valid(raise_exception=True):
                preinsc_save = serializer_preinscr.save()         

            return Response({
                "persona_data" : serializer_person.data,
                "preinscripcion_data": serializer_preinscr.data
            })
    def put(self, request, format=None, pk=None):
        if pk:
            try:
                preinsc = preinscripcion.objects.get(id=pk)
                print("preincripcion",preinsc)
                persona_ = persona.objects.get(id=preinsc.dni_persona.id)
                print("persona", persona_)
                preinscrito_update = serializer_preinscripcion(preinsc, data = request.data)
                if preinscrito_update.is_valid():
                    preinscripcion_update = preinscrito_update.save()

                persona_update = serializer_persona(persona_, data = request.data)
                if persona_update.is_valid():
                    preinscripcion_update = persona_update.save()

                return Response({
                    "persona_data" : persona_update.data,
                    "preinscripcion_data": preinscrito_update.data
                })                

            except preinscripcion.DoesNotExist:
                return Response({
                    "error": "No existe registros"
                })
@api_view(['GET', 'POST', 'PUT', 'PATCH'])
def preinscripcion_update(request, pk=None):
    entrada_data = request.data
    preinscrito = preinscripcion.objects.get(id=pk) #! CAMBIOS HERE!!! filter -> get
    persona_ = persona.objects.get(id=preinscrito.dni_persona.id)
    if preinscrito:
        #RETRIEVE INFORMATION
        if request.method == 'GET':
            preinscrito_serializer = serializer_preinscripcion(preinscrito)
            return Response(preinscrito_serializer.data, status = status.HTTP_200_OK)
        #UPDATE INFORMATION
        elif request.method == 'PUT':
            preinscrito_serializer = serializer_preinscripcion(preinscrito, data = request.data)
            if preinscrito_serializer.is_valid(raise_exception=True):
                preinscripcion_update = preinscrito_serializer.save()
            persona_serializer = serializer_persona(persona_, data = request.data, partial=True)
            if persona_serializer.is_valid(raise_exception=True):
                persona_update = persona_serializer.save()
                return Response({
                    "preinscripcion_data": preinscrito_serializer.data,
                    "persona_data" : persona_serializer.data
                })
        elif request.method == 'PATCH':
            preinscrito_serializer = serializer_preinscripcion(preinscrito, data = request.data, partial=True)
            if preinscrito_serializer.is_valid(raise_exception=True):
                preinscripcion_update = preinscrito_serializer.save()
            
            preinsc_ = preinscripcion.objects.get(id=preinscripcion_update.id)
            if (preinsc_.id_colegio != None):
                colegio_datos = {
                "id_ubigeo_colegio": preinsc_.id_colegio.id_ubigeo.codigo_ubigeo,
                "tipo_colegio": preinsc_.id_colegio.tipo_colegio
            }
            else:
                colegio_datos = {
                "id_ubigeo_colegio": "",
                "tipo_colegio": ""
            }
            persona_serializer = serializer_persona(persona_, data = request.data, partial=True)
            if persona_serializer.is_valid(raise_exception=True):
                persona_update = persona_serializer.save()
                return Response({
                    "preinscripcion_data": preinscrito_serializer.data,
                    "persona_data" : persona_serializer.data,
                    "colegio_datos": colegio_datos
                })

        elif request.method == 'POST' and preinscrito.esta_enviado == True:
            """················· COMPROMISO DE PAGO ··················"""
            with transaction.atomic():
                ultimo_reg_preinsc = preinscrito
                print(preinscrito)
                #Se agrega el campo id_preinscripcion
                data = json.dumps(entrada_data)
                data = json.loads(data)
                data['id_preinscripcion'] = ultimo_reg_preinsc.id
            
                # ············ CREACION DE REG CONTRIBUYENTES ···············
                dni_cont = preinscrito.dni_persona.dni
                nombre_cont = preinscrito.dni_persona.nombres
                ap_paterno_cont = preinscrito.dni_persona.apellido_paterno
                ap_materno_cont = preinscrito.dni_persona.apellido_materno
                fecha_nac_cont = preinscrito.dni_persona.fecha_nacimiento
                print("FECHA NAC", fecha_nac_cont)
                print("FECHA NAC-STR", str(fecha_nac_cont))

                ide_reg_cont = create_cont_or_retrieve(dni_cont, ap_paterno_cont.upper(), ap_materno_cont.upper(), nombre_cont.upper(), str(fecha_nac_cont))
                print("CONT-CREADO", ide_reg_cont)
                # ············ CREACION DE REG CONTRIBUYENTES ···············

                # ············ DATOS A GUARDAR ···············
                print(data)
                serializerCompromisoPago = serializer_compromiso_pago_oficial(data=data)
                if serializerCompromisoPago.is_valid(raise_exception=True):
                    compromiso_pago_save = serializerCompromisoPago.save()
                """ ·········· DETALLE COMPROMISO DE PAGO & TESORERIA ··········· """
                #RECUPERANDO EL ULTIMO REGISTRO
                ultimo_reg_compromiso_pago = compromiso_pago_save.id #! compromiso_pago.objects.filter(id_preinscripcion=preinscrito.id).first()
                pago_det = ultimo_reg_preinsc.id_pago
                nroCuotas = pago_det.nro_cuotas
                # EDITAR LA INFORMACION DENTRO DEL REQUEST
                datos_det_compromiso = json.dumps(entrada_data)
                datos_det_compromiso = json.loads(datos_det_compromiso)
                        
                #DATOS DE LA TABLA CICLO
                dni = ultimo_reg_preinsc.dni_persona.dni
                info_anio_ciclo = ultimo_reg_preinsc.id_ciclo.anio
                info_nro_ciclo = ultimo_reg_preinsc.id_ciclo.nro_ciclo_de_anio
                tipo_colegio = ultimo_reg_preinsc.id_colegio.tipo_colegio
                if tipo_colegio == 'PU':
                    colegio_tip = "MATRICULA COLEGIO PUBLICO"
                else:
                    colegio_tip = "MATRICULA COLEGIO PRIVADO"
                #generarCod(dni, info_nro_ciclo, (i+1), tipo_colegio)
                now = datetime.now().date()
                
                # Para el sistema de TESORERIA
                if nroCuotas == 1:
                    detalles_pago = detalle_pago.objects.get(id_pago = pago_det)
                    body = {
                        "fch_deu": str(now),
                        "ide_cnt": ide_reg_cont,
                        "gls_deu": "---",
                        "flg_cer": 1,
                        "flg_sun": 0,
                        "deudas_det": [
                            {
                                "ide_itm": detalles_pago.ide_itm,
                                "cnt_itm": 1,
                                "des_itm": detalles_pago.concepto,
                                "val_unt": int(pago_det.monto_total),
                                "val_tot": int(pago_det.monto_total),
                                "ide_esp": detalles_pago.ide_esp,
                                "ide_afe": 9,
                                "fch_vto": str(detalles_pago.fecha_fin),
                                "deudas_det_par": [
                                    {
                                        "imp_par": int(detalles_pago.monto_parcial),
                                        "fch_vto": str(detalles_pago.fecha_fin)
                                    }
                                ]
                            }
                        ]
                    }
                    print("JSON JSON JSON --->" , body)
                    # real_body = json.dumps(body, indent=4)
                    # Realizar el grabado de deudas
                    # print("JSON DUMPEADO XD", real_body)
                    # token, fecha = review_token_from_file()
                    token = generar_token()

                    uri = config("AUTHORITY_TESORERIA")
                    response = requests.post(
                        url=uri, 
                        json=body,
                        headers={
                            'Authorization': "Bearer "+token
                        })
                    print("CODIGO DE RESPUESTA", response.status_code)
                    print("JSON", response.json())
                    if response.status_code != 200: # TODO OK
                        respuesta_serv = "FALLO AL CREAR REGISTROS"
                        text_response = response.json()
                        response_code = response.status_code
                        # return Response({
                        #     "message": "Error al generar deudas, intentelo nuevamente"
                        # })
                    else:
                        respuesta_serv = "REGISTROS CREADOS CORRECTAMENTE"
                        text_response = response.json()
                        response_code = response.status_code
                        # return Response({
                        #     "message": "TODO OK!!!"
                        # })

                else:
                    detalles_pago = detalle_pago.objects.filter(id_pago = pago_det)
                    body = {
                        "fch_deu": str(now),
                        "ide_cnt": ide_reg_cont, # ID DE CONTRIBUYENTE
                        "gls_deu": "---",
                        "flg_cer": 1,
                        "flg_sun": 0,
                    }
                    deudas_det_body = []
                    for i in detalles_pago:
                        int_body = {
                            "ide_itm": int(i.ide_itm), # ID DEL CONCEPTO A PAGAR
                            "cnt_itm": 1,
                            "des_itm": i.concepto,
                            "val_unt": int(i.monto_parcial), #int(pago_det.monto_total),
                            "val_tot": int(i.monto_parcial), #int(pago_det.monto_total),
                            "ide_esp": int(i.ide_esp), #ID DE SUBPATIDAS PRESUPUESTALES
                            "ide_afe": 9,
                            "fch_vto": str(i.fecha_fin),
                            "deudas_det_par": [
                                    {
                                        "imp_par": int(i.monto_parcial),
                                        "fch_vto": str(i.fecha_fin)
                                    }
                                ]
                        }
                        deudas_det_body.append(int_body)

                    body['deudas_det'] = deudas_det_body
                    # "deudas_det": [
                    #     {
                    #         "ide_itm": 3272, # ID DEL CONCEPTO A PAGAR
                    #         "cnt_itm": 1,
                    #         "des_itm": colegio_tip,
                    #         "val_unt": int(pago_det.monto_total),
                    #         "val_tot": int(pago_det.monto_total),
                    #         "ide_esp": 29938, #ID DE SUBPATIDAS PRESUPUESTALES
                    #         "ide_afe": 9
                    #     }
                    # ]
                    

                    # lista_parciales = []
                    # for i in detalles_pago:
                    #     parciales = {}
                    #     parciales["imp_par"] = int(i.monto_parcial)
                    #     parciales["fch_vto"] = str(i.fecha_fin)
                    #     lista_parciales.append(parciales)                    

                    # body['deudas_det'][0]['deudas_det_par'] = lista_parciales            
                
                    # Realizar el grabado de deudas
                    # token, fecha = review_token_from_file()
                    token = generar_token()
                    uri = config("AUTHORITY_TESORERIA")
                    response = requests.post(
                        url=uri, 
                        json=body,
                        headers={
                            'Authorization': "Bearer "+token
                        })
                    print("CODIGO DE RESPUESTA", response.status_code)
                    print("JSON", response.json())
                    if response.status_code != 200: # TODO OK
                        respuesta_serv = "FALLO AL CREAR REGISTROS"
                        text_response = response.json()
                        response_code = response.status_code
                        # return Response({
                        #     "message": "Error al generar deudas, intentelo nuevamente"
                        # })
                    else:
                        respuesta_serv = "REGISTROS CREADOS CORRECTAMENTE"
                        text_response = response.json()
                        response_code = response.status_code
            
                print("----------",text_response)
                # Para el sistema de CEPRE
                for i in range(0,nroCuotas):
                    detalle_pago_seleccionado = detalle_pago.objects.get(id_pago=pago_det.id, nro_cuota=(i+1))
                    datos_det_compromiso['id_compromiso_pago'] = ultimo_reg_compromiso_pago
                    datos_det_compromiso['codigo_compromiso_pago'] = str(text_response['ide_deu']) +"-"+ str(text_response['deuda_det'][i]['deudas_det_par'][0]['ide_ddd_par'])
                    #!generarCod(dni, info_nro_ciclo, (i+1), tipo_colegio)
                    datos_det_compromiso['numero_cuota'] = (i+1)
                    datos_det_compromiso['monto'] = detalle_pago_seleccionado.monto_parcial
                    datos_det_compromiso['fecha_inicio'] = detalle_pago_seleccionado.fecha_inicio
                    datos_det_compromiso['fecha_fin'] = detalle_pago_seleccionado.fecha_fin
                    datos_det_compromiso['esta_pagado'] = False
                    datos_det_compromiso['monto_mora'] = 0
                    datos_det_compromiso['modalidad_pago'] = ""
                    
                    serializerDetCompromisoPago = serializer_detalle_compromiso_de_pago(data=datos_det_compromiso)
                    if serializerDetCompromisoPago.is_valid(raise_exception=True):
                        det_compromiso_pago_save = serializerDetCompromisoPago.save()
                    """ ················ TESORERIA ···················· """
                    ultimo_detalle_compromiso = detalle_compromiso_de_pago.objects.filter(id_compromiso_pago=ultimo_reg_compromiso_pago, numero_cuota=(i+1)).first()
                    datos_det_compromiso['id_detalle_compromiso'] = ultimo_detalle_compromiso.id
                    print(datos_det_compromiso)
                    serializerRegistroTesoreria = serializer_registro_tesoreria(data=datos_det_compromiso)
                    if serializerRegistroTesoreria.is_valid(raise_exception=True):
                        compromiso_pago_save = serializerRegistroTesoreria.save()
                if response_code == 201:
                    return Response({
                            "respuesta_serv": respuesta_serv,
                            "text_response": text_response,
                            "response_code": response_code
                        })
                else:
                    return Response({
                            "respuesta_serv": respuesta_serv,
                            "text_response": text_response,
                            "response_code": response_code
                        })

            
class eliminar_preinscripcion_incompleta(APIView):
    @transaction.atomic
    def delete(self, request,pk, format=None):
        try:
            compromiso = compromiso_pago.objects.get(id_preinscripcion_id=pk)
            try:
                inscripcion_ = inscripcion.objects.get(id_compromiso_pago_id = compromiso.id)
                documentos = documentos_inscripcion.objects.\
                    filter(id_inscripcion_id = inscripcion_.id).all()
                for di in documentos:
                    if di.documento != '' and di.documento != None:
                        raise DocumentoPresentadoxception(di)
                    di.delete()

                if inscripcion_.estado_finalizado != 0:
                    raise YaInscritoException()
                inscripcion_.delete()
            except inscripcion.DoesNotExist:
                pass

            detalle_compromiso = detalle_compromiso_de_pago.objects.\
                filter(id_compromiso_pago=compromiso.id).all()
            for d in detalle_compromiso:
                if d.esta_pagado:
                    raise CuotaPagadaException(d.numero_cuota)
                try:
                    r = registro_tesoreria.objects.get(id_detalle_compromiso_id = d.id)
                    if r.esta_pagado:
                        raise CuotaPagadaException(d.numero_cuota)
                    r.delete()
                except registro_tesoreria.DoesNotExist:
                    pass
                d.delete()
            compromiso.delete()
        except compromiso_pago.DoesNotExist:
            #No compromiso no hay problema
            pass
        except YaInscritoException as ex:
            return Response({
                "message": str(ex)
            })
        except CuotaPagadaException as ex:
            return Response({
                "message": str(ex)
            })
        except DocumentoPresentadoxception as ex:
            return Response({
                "message": str(ex)
            })
            
        try:
            preinsc = preinscripcion.objects.get(id=pk)
            #print('OK', preinsc)
            preinsc.delete()
            return Response({
                "message":"eliminado correctamente"
            })
        except preinscripcion.DoesNotExist:
            return Response({
                "message":"No se encontraron registros"
            })
# ··············· ENDREGION PREINSCRIPCION ··············}}}

# ··············· REGION VALDACION DNI ··············}}}


class validacionConsultaDNI2(APIView):
    def post(self, request, format=None):
        entrada_data = request.data
        dni = entrada_data['dni']
        ciclo = entrada_data['id_ciclo']
        #status, datosWeb = consultaDNI(dni)
        #data_person = json.loads(datosWeb)
        data_person = {}
        try:
            #consulta si exite una persona con ese dni en la tabla persona
            persona_consulta = persona.objects.get(dni=dni)            
            if persona_consulta:
                try:
                    #consulta si exite un registro de preinscricion activa
                    preinscripcion_consulta = preinscripcion.objects.get(dni_persona=persona_consulta, id_ciclo=ciclo)
                    if preinscripcion_consulta:
                        serializer_preins = serializer_preinscripcion(preinscripcion_consulta)
                        serializer_person = serializer_persona(persona_consulta)
                        data_person['dni'] = serializer_person.data['dni']
                        data_person['nombres'] = serializer_person.data['nombres']
                        data_person['sexo'] = serializer_person.data['sexo']
                        data_person['apellido_paterno'] = serializer_person.data['apellido_paterno']
                        data_person['apellido_materno'] = serializer_person.data['apellido_materno']
                        data_person['fecha_nacimiento'] = serializer_person.data['fecha_nacimiento']
                        data_person['lugar_nacimiento'] = serializer_person.data['lugar_nacimiento']
                        
                        if preinscripcion_consulta.id_colegio != None:
                            colegio_datos = {
                            "id_ubigeo_colegio": preinscripcion_consulta.id_colegio.id_ubigeo.codigo_ubigeo,
                            "tipo_colegio": preinscripcion_consulta.id_colegio.tipo_colegio
                        }
                        else:
                            colegio_datos = {
                            "id_ubigeo_colegio": "",
                            "tipo_colegio": ""
                        }
                        # olegio_datos['id_ubigeo_colegio'] = preinscripcion_consulta.id_colegio.id_ubigeo.codigo_ubigeo
                        # colegio_datos['tipo_colegio'] = preinscripcion_consulta.id_colegio.tipo_colegio
                        return Response({
                            "exists_preinscripcion": True,
                            "preinscripcion_data": serializer_preins.data,
                            "persona_data": data_person,
                            "colegio_datos": colegio_datos
                        })
                except preinscripcion.DoesNotExist:
                    return Response({
                        "exists_preinscripcion": False,
                        "is_valid_person" : True,
                        "with_data": True,
                        "persona_data": data_person
                    })
                edad = datetime.date.today().year - int(persona_consulta.fecha_nacimiento.strftime('%Y'))
                if edad >= 18:
                    serializer = serializer_persona(persona_consulta)
                    return Response({
                        "exists_preinscripcion": False,
                        "is_valid_person" : True,
                        "with_data": True,
                        "persona_data": data_person
                    })
                else:
                    return Response({
                        "exists_preinscripcion": False,
                        "is_valid_person" : True,
                        "with_data": False,
                        "dni":dni
                    })
        except persona.DoesNotExist:
            return Response({
            "exists_preinscripcion": False,
            "persona_data": data_person
        })

        return Response({
            "exists": False,
            "dni": dni
        })
# ··············· ENDREGION VALIDACION DNI ··············}}}
class validacionConsultaDNI(APIView):
    def post(self, request, format=None):
        entrada_data = request.data
        dni = entrada_data['dni']
        ciclo = entrada_data['id_ciclo']
        status, datosWeb = consultaDNI(dni)
        data_person = json.loads(datosWeb)
        if status == 200:
            try:
            #consulta si exite una persona con ese dni en la tabla persona
                persona_consulta = persona.objects.get(dni=dni)            
                if persona_consulta:
                    try:
                        #consulta si exite un registro de preinscricion activa
                        preinscripcion_consulta = preinscripcion.objects.get(dni_persona=persona_consulta, id_ciclo=ciclo)
                        if preinscripcion_consulta:
                            serializer_preins = serializer_preinscripcion(preinscripcion_consulta)
                            serializer_person = serializer_persona(persona_consulta)
                            data_person['sexo'] = serializer_person.data['sexo']
                            data_person['fecha_nacimiento'] = serializer_person.data['fecha_nacimiento']
                            data_person['lugar_nacimiento'] = serializer_person.data['lugar_nacimiento']
                            
                            if preinscripcion_consulta.id_colegio != None:
                                colegio_datos = {
                                "id_ubigeo_colegio": preinscripcion_consulta.id_colegio.id_ubigeo.codigo_ubigeo,
                                "tipo_colegio": preinscripcion_consulta.id_colegio.tipo_colegio
                            }
                            else:
                                colegio_datos = {
                                "id_ubigeo_colegio": "",
                                "tipo_colegio": ""
                            }
                            # olegio_datos['id_ubigeo_colegio'] = preinscripcion_consulta.id_colegio.id_ubigeo.codigo_ubigeo
                            # colegio_datos['tipo_colegio'] = preinscripcion_consulta.id_colegio.tipo_colegio
                            return Response({
                                "exists_preinscripcion": True,
                                "preinscripcion_data": serializer_preins.data,
                                "persona_data": data_person,
                                "colegio_datos": colegio_datos
                            })
                    except preinscripcion.DoesNotExist:
                        return Response({
                            "exists_preinscripcion": False,
                            "is_valid_person" : True,
                            "with_data": True,
                            "persona_data": data_person
                        })
                    edad = datetime.date.today().year - int(persona_consulta.fecha_nacimiento.strftime('%Y'))
                    if edad >= 18:
                        serializer = serializer_persona(persona_consulta)
                        return Response({
                            "exists_preinscripcion": False,
                            "is_valid_person" : True,
                            "with_data": True,
                            "persona_data": data_person
                        })
                    else:
                        return Response({
                            "exists_preinscripcion": False,
                            "is_valid_person" : True,
                            "with_data": False,
                            "dni":dni
                        })
            except persona.DoesNotExist:
                return Response({
                "exists_preinscripcion": False,
                "persona_data": data_person
            })
        else:
            return Response({
                "exists": False,
                "dni": dni
            })
# ··············· ENDREGION VALIDACION DNI ··············}}}
# ··············· REGION COMPROMISO PAGO ··············{{{
class compromisoPagoView(APIView):
    def get(self, request, format=None):
        snippets = compromiso_pago.objects.all()
        serializer = serializer_compromiso_pago(snippets, many=True)
        return Response(serializer.data)
# ··············· ENDREGION COMPROMISO PAGO ··············}}}
# ··············· REGION DETALLES COMPROMISO PAGO ··············{{{
class detalleCompromisoPagoView(APIView):
    def get(self, request, format=None,pk=None):
        if pk:
            try:
                preinsc = preinscripcion.objects.get(id=pk)
                print(preinsc.id)
                try:
                    compromiso_pago_id = compromiso_pago.objects.get(id_preinscripcion=preinsc.id)
                    print(compromiso_pago_id.id)
                    escuela_prof = preinsc.id_escuela_profesional.nombre_escuela_profesional
                    ciclo = preinsc.id_ciclo.denominacion
                    nrocuotas = preinsc.id_pago.nro_cuotas
                    snippets = detalle_compromiso_de_pago.objects.filter(id_compromiso_pago=compromiso_pago_id.id)
                    serializer = serializer_detalle_compromiso_de_pago(snippets, many=True)
                    return Response({
                        "data": serializer.data,
                        "escuela_profesional": escuela_prof,
                        "ciclo": ciclo,
                        "nroCuotas": nrocuotas
                    })
                except compromiso_pago.DoesNotExist:
                    return Response({
                        "error": "something goes wrong"
                    })

            except preinscripcion.DoesNotExist:
                return Response({
                    "error": "No existe registros"
                })
        else:
            snippets = detalle_compromiso_de_pago.objects.all()
            serializer = serializer_detalle_compromiso_de_pago(snippets, many=True)
            return Response(serializer.data)
# ··············· ENDREGION DETALLES COMPROMISO PAGO ··············}}}


# ·················· INSCRIPCION ·····························
# ··············· REGION VALIDACION DE PREINSCRIPCION ··············{{{
class validacion_preinscripcion(APIView):
    def post(self, request, format=None):
        #print('OOK')
        entrada_data = request.data
        dni = entrada_data['dni']
        fecha_nac = entrada_data['fecha_nacimiento']
        id_ciclo = entrada_data['id_ciclo']
        r_ciclo = ciclo.objects.get(id=id_ciclo)

        fecha_dato = datetime.strptime(fecha_nac, "%Y-%m-%d").date()
        print('FECHA_DATO', fecha_dato)

        persona_dni = None
        try:
            persona_dni = persona.objects.get(dni=dni, fecha_nacimiento=fecha_dato)
        except persona.DoesNotExist:
            return Response({
                "is_valid" : False,
                "esta_pagado": False,
                "message": "La información ingresada no es correcta "+
                            "o no has realizado el pago por derechos de matrícula"
            })

        preinscripcion_consulta = None
        try:
            preinscripcion_consulta = preinscripcion.objects.get(\
                dni_persona=persona_dni, id_ciclo=id_ciclo)
        except preinscripcion.DoesNotExist:
            return Response({
                "is_valid": False,
                "esta_pagado": False,
                "message": "Realiza tu preinscripcion para iniciar con los procesos de matricula"
            })                        


        try:
            with transaction.atomic():
                compromiso_consulta = compromiso_pago.objects.get(\
                    id_preinscripcion=preinscripcion_consulta.id)
                # SECCION PARA REVISAR SI SE PAGO LA PRIMERA CUOTA Y 
                # HACER UN UPDATE A LOS REGISTROS CORRESPONDIENTES
                # ------------------------------------------------------
                primera_cuo = detalle_compromiso_de_pago.objects.get(\
                    id_compromiso_pago=compromiso_consulta.id,\
                    numero_cuota=1)

                fecha_inicio_ciclo = r_ciclo.fecha_inicio_preinscripcion

                lista_deudas = obtener_deudas_cepre(str(dni), fecha_inicio_ciclo, \
                    pagadas_parcialmente = True)
                primer_pago = None
                #print('DEUDAS', lista_deudas)
                if len(lista_deudas)>0:
                    for deuda in lista_deudas:
                        print('DD==>', deuda)

                        if float(deuda['imp_tot_pag_net']) >= float(primera_cuo.monto):
                            primer_pago = deuda['det_all_deu'][0]['det_all'][0]
                            break

                #lista_deb = extract_data_debt(str(dni))
                #print("XDADADAS",lista_deb)
                #data = json.dumps(lista_deb[0])
                #data = json.loads(data)
                #print('VERIF', data['imp_tot_sld'], float(primera_cuo.monto))

                if primer_pago == None:
                    return Response({
                        "is_valid": False,
                        "esta_pagado": False,
                        "message": "Realiza el pago de tu primera cuota para poder inscribirte"
                    })

                primera_cuo.esta_pagado = True
                primera_cuo.codigo_compromiso_pago = \
                        primer_pago['dat_rec'][0]['nro_doc']
                primera_cuo.fecha_pagado = primer_pago['dat_rec'][0]['fch_emi']
                primera_cuo.save()
                
                print("ACTUALIZADO PAGO PRIMER PAGO DET COMP")
                #! Generar inscripcion
                try:
                    print('PCID', primera_cuo)
                    registro_pago_tesor = registro_tesoreria.objects.get(\
                        id_detalle_compromiso=primera_cuo.id)
                    print('REGG', registro_pago_tesor)
                    registro_pago_tesor.esta_pagado = True
                    registro_pago_tesor.fecha_pago = primer_pago['dat_rec'][0]['fch_emi']
                    registro_pago_tesor.admin = administrador.objects.first() 
                    registro_pago_tesor.save()
                    print("ACTUALIZADO PAGO TESORERIA CON", \
                        primera_cuo.id_compromiso_pago.id)
                    #crear una inscripcion
                    serializer_insc = serializer_inscripcion(\
                        data={"id_compromiso_pago": primera_cuo.id_compromiso_pago.id})
                    print('SERIALIZAR', serializer_insc)
                    if serializer_insc.is_valid(raise_exception=True):
                        serializer_insc.save()
                    print("CREANDO DOCUMENTOS")
                    #crear campos para depositar documentos
                    documentos_Req = documento_solicitado_ciclo.objects.filter(id_ciclo=id_ciclo)
                    print(documentos_Req)
                    for i in documentos_Req:
                        data = {
                            "id_inscripcion": serializer_insc.data['id'],
                            "nombre_documento" : i.id_padron_documento_requisito.nombre_documento
                        }
                        serializer_doc_insc = serializer_documentos_inscripcion(data=data)
                        if serializer_doc_insc.is_valid(raise_exception=True):
                            serializer_doc_insc.save()
                                # return Response({
                                #     "message": "Primer pago realizado correctamente, creado nueva inscripcion y registro de documentos"
                                # })
                            
                except Exception as ex:
                    print('EX', str(ex))
                    pass

                # ------------------------------------------------------

                detalles = detalle_compromiso_de_pago.objects.get(\
                    id_compromiso_pago=compromiso_consulta, numero_cuota=1)
                if detalles.esta_pagado == True:
                    serializer = serializer_preinscripcion_mostrar(preinscripcion_consulta)
                    insc = inscripcion.objects.get(id_compromiso_pago=compromiso_consulta.id)
                    serial = serializer_inscripcion(insc)
                    return Response({
                            "is_valid" : True,
                            "with_data": True,
                            "preinscripcion_data": serializer.data,
                            "inscripcion": serial.data
                        })
                else:
                    return Response({
                        "is_valid": False,
                        "esta_pagado": False,
                        "message": "Realiza el pago de tu primera cuota para poder inscribirte"
                    })
        except compromiso_pago.DoesNotExist:
            return Response({
                "is_valid": False,
                "esta_pagado": False,
                "message": "Finaliza tu preinscripcion para poder realizar tu pago e inscrbirte"
            })

@api_view(['PUT', 'PATCH', 'DELETE', 'POST'])
def subirDocumentosInsc(request, pk):
    try:
        registro_recuperado = documentos_inscripcion.objects.get(pk=pk)
        registro_modificado = request.data
        serializar = serializer_documentos_inscripcion(registro_recuperado, data=registro_modificado, partial=True)
        if serializar.is_valid(raise_exception=True):
            serializar.save()
            return Response(serializar.data)
        return Response(serializar.errors, status=status.HTTP_400_BAD_REQUEST)

    except documentos_inscripcion.DoesNotExist:
        return Response({'message': 'Entro al except de doc_expediente'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['PUT', 'PATCH', 'DELETE', 'POST'])
def revisarDocumentosAdmin(request, pk):
    try:
        id_administrador = request.data['id_administrador']
        observaciones = request.data["observaciones"]
        esta_aprobado = request.data["esta_aprobado"]
        registro_recuperado = documentos_inscripcion.objects.get(pk=pk)
        registro_modificado = request.data
        serializar = serializer_documentos_inscripcion(registro_recuperado, data=registro_modificado, partial=True)
        if serializar.is_valid(raise_exception=True):
            serializar.save()
            return Response({"message":"Actualizado correctamente"})
        return Response(serializar.errors, status=status.HTTP_400_BAD_REQUEST)

    except documentos_inscripcion.DoesNotExist:
        return Response({'message': 'No se encuentra documento'}, status=status.HTTP_404_NOT_FOUND)
class postRevision(APIView):
    def post(self, request, pk):
        #REVISAR SI LOS DOCUMENTOS YA FUERON APROBADOS
        inscr_ = documentos_inscripcion.objects.filter(id_inscripcion=pk)
        final_result = True
        for i in inscr_:
            if i.esta_aprobado != 1:
                final_result = False
        
        if final_result == True:
            inscripcion_ = inscripcion.objects.get(id=inscr_[0].id_inscripcion.id)
            get_preinsc = inscripcion_.id_compromiso_pago.id_preinscripcion
            nombre_completo = str(get_preinsc)
            nombres = get_preinsc.dni_persona.nombres
            apPaterno = get_preinsc.dni_persona.apellido_paterno
            apMaterno = get_preinsc.dni_persona.apellido_materno
            dni = get_preinsc.dni_persona.dni
            password = generarPass(nombre_completo, dni)
            nro_ciclo = get_preinsc.id_ciclo.nro_ciclo_de_anio
            anio = get_preinsc.id_ciclo.anio
            correo = generarEmail(dni, nro_ciclo, anio)
            nombre_usuario = dni
            dict={
                "username": nombre_usuario,
                "email": correo,
                "password": password,
                "user_type": '3',
                "first_name": nombres,
                "last_name": apPaterno,
                "sur_name": apMaterno,
            }
            serializer_newuser = serializer_user(data=dict)
            if serializer_newuser.is_valid(raise_exception=True):
                serializer_newuser.save()
                dict_est = {
                    "id_inscripcion": inscripcion_.id,
                    "user_type": serializer_newuser.data['id'],
                }
                serializer_est = serializer_estudiante_xd(data=dict_est)
                if serializer_est.is_valid(raise_exception=True):
                    serializer_est.save()                            
                    inscripcion_.estado_finalizado=True
                    inscripcion_.save()
                    #ENVIAR CORREO COMNICANDO QUE TODO FUE EXISTOSO + CREDENCIALES
                    email_to = inscr_[0].id_inscripcion.id_compromiso_pago.id_preinscripcion.email_respaldo

                    hmtl_content = render_to_string(
                        "inscripcion-success.html",{
                            'nombre_completo': nombre_completo,
                            'dni': dni,
                            'escuela_profesional': inscr_[0].id_inscripcion.id_compromiso_pago.id_preinscripcion.id_escuela_profesional.nombre_escuela_profesional,
                            'fecha_inicio': inscr_[0].id_inscripcion.id_compromiso_pago.id_preinscripcion.id_ciclo.fecha_inicio_ciclo,
                            'correo': correo,
                            'password': password
                        },
                    )
                    text_content = strip_tags(hmtl_content)

                    email = EmailMultiAlternatives(
                        "COMUNICADO - REVISION DE DOCUMENTOS DE INSCRIPCION",
                        text_content,
                        settings.EMAIL_HOST_USER,
                        [email_to]
                    )
                    email.attach_alternative(hmtl_content, "text/html")
                    email.send()
            return Response({"message":"Estudiante creado y enviado informacion al correo"})
        else:
            #ENVIAR CORREO ENVIANDO LA OBSERVACION
            inscr_ = documentos_inscripcion.objects.filter(id_inscripcion=pk, esta_aprobado=2)
            email_to = inscr_[0].id_inscripcion.id_compromiso_pago.id_preinscripcion.email_respaldo
            hmtl_content = render_to_string(
                "inscripcion-wrong.html",{
                    'nombre_completo': str(inscr_[0].id_inscripcion.id_compromiso_pago.id_preinscripcion.dni_persona),
                    'dni': inscr_[0].id_inscripcion.id_compromiso_pago.id_preinscripcion.dni_persona.dni,
                    'escuela_profesional': inscr_[0].id_inscripcion.id_compromiso_pago.id_preinscripcion.id_escuela_profesional.nombre_escuela_profesional,
                    'denominacion_ciclo': inscr_[0].id_inscripcion.id_compromiso_pago.id_preinscripcion.id_ciclo.denominacion,
                    'documentos': inscr_
                },
            )
            text_content = strip_tags(hmtl_content)

            email = EmailMultiAlternatives(
                "COMUNICADO - REVISION DE DOCUMENTOS DE INSCRIPCION",
                text_content,
                settings.EMAIL_HOST_USER,
                [email_to]
            )

            email.attach_alternative(hmtl_content, "text/html")
            email.send()
            return Response({"message":"Mensaje enviado con exito"})
# ··············· ENDREGION VALIDACION DE INSCRIPCION ··············}}}

# ···················· REGION UBIGEO ······················{{{
class ubigeoDepartamento(APIView):
    def get(self, request, format=None):        
        departamentos = ubigeo.objects.filter(tipo_ubigeo='D')
        serializer = serializer_ubigeo(departamentos, many=True)
        if len(serializer.data) != 0:
            return Response(serializer.data)
        else:
            departamentos = extraerDepartamentos()
            departamentos_ = json.dumps(departamentos)
            departamentos_ = json.loads(departamentos_)
            for i in departamentos_:
                i['codigo_ubigeo'] = i['codigo']
                i['tipo_ubigeo'] = i['tipo']
                del i['codigo']
                del i['tipo']
            for i in departamentos_:
                serializer_dep = serializer_ubigeo(data=i)
                if serializer_dep.is_valid(raise_exception=True):
                    serializer_dep.save()
            #serializer = serializer_ubigeo(departamentos_, many=True)
            return Response(departamentos_)
class ubigeoProv(APIView):
    def get(self, request, ubigeo_, format=None):
        #dep = request.data['departamento']
        prov_ubigeo = ubigeo.objects.filter(codigo_ubigeo__startswith=ubigeo_[0:2], tipo_ubigeo='P')
        serializer_prov = serializer_ubigeo(prov_ubigeo, many=True)
        if len(serializer_prov.data) != 0:
            return Response(serializer_prov.data)
        else:
            provincia = extraerProvincia(ubigeo_)
            provincia_ = json.dumps(provincia)
            provincia_ = json.loads(provincia_)
            for i in provincia_:
                i['codigo_ubigeo'] = i['codigo']
                i['tipo_ubigeo'] = i['tipo']
                del i['codigo']
                del i['tipo']
            for i in provincia_:
                serializer_pro = serializer_ubigeo(data=i)
                if serializer_pro.is_valid(raise_exception=True):
                    serializer_pro.save()
            prov_ubigeo = ubigeo.objects.filter(codigo_ubigeo__startswith=ubigeo_[0:2], tipo_ubigeo='P')
            serializer_prov = serializer_ubigeo(prov_ubigeo, many=True)
            return Response(serializer_prov.data)
        
        ''' try:
            departamento_ubigeo = ubigeo.objects.filter(codigo_ubigeo__startswith=dep[0:2], tipo_ubigeo='P')
            serializer_prov = serializer_ubigeo(departamento_ubigeo, many=True)
            return Response(serializer_prov.data)
        except ubigeo.DoesNotExist:
            return Response({
                "message": "no hay datos"
            }) '''
class ubigeoDist(APIView):
    def get(self, request, prov ,format=None):
        #dist_ubigeo = ubigeo.objects.filter(codigo_ubigeo__startswith=prov[0:4], tipo_ubigeo='I')
        #serializer_dis = serializer_ubigeo(dist_ubigeo, many=True)
        distrito = extraerDistrito(prov)
        distrito_ = json.dumps(distrito)
        distrito_ = json.loads(distrito_)
        for i in distrito_:
            i['codigo_ubigeo'] = i['codigo']
            i['tipo_ubigeo'] = i['tipo']
            del i['codigo']
            del i['tipo']

        for k in distrito_:
            try:
                dist_ = ubigeo.objects.get(codigo_ubigeo=k['codigo_ubigeo'])
                serializer_act = serializer_ubigeo(dist_, data=k, partial=True)
                if serializer_act.is_valid(raise_exception=True):
                    serializer_act.save()
            except ubigeo.DoesNotExist:
                serializer_dis = serializer_ubigeo(data=k)
                if serializer_dis.is_valid(raise_exception=True):
                    serializer_dis.save()
        #retornar a informacion grabada/actuaclizada
        dist_ubigeo = ubigeo.objects.filter(codigo_ubigeo__startswith=prov[0:4], tipo_ubigeo='I')
        serializer_dis = serializer_ubigeo(dist_ubigeo, many=True)
        return Response(serializer_dis.data)
class UbigeoColegio(APIView):
    def get(self, request, distr, tipo, format=None):
        #distr = request.data['distrito']
        colegio_s = consultaColegios(distr)
        colegio_ = json.dumps(colegio_s)
        colegio_ = json.loads(colegio_)
        
        for i in colegio_:
            i['id_ubigeo'] = distr
            i['nombre_colegio'] = i['nombre']
            i['codigo_modular'] = i['codigo']
            i['direccion_colegio'] = i['direccion']
            i['ubigeo_nombre'] = i['distritoNombre']
            del i['codigo']
            del i['nombre']
            del i['direccion']
            del i['distritoNombre']
            del i['id']
            del i['distrito']
            del i['nivelEscuelaNombre']
            if i['tipoNombre']=="Privado":
                i['tipo_colegio'] = "PR"
                del i['tipoNombre']
            elif i['tipoNombre']=="Público":
                i['tipo_colegio'] = "PU"
                del i['tipoNombre']
        #print(colegio_)
        for k in colegio_:
            try:
                colegio_mod = colegio.objects.get(codigo_modular=k['codigo_modular'])
                serializer_act = serializer_colegio(colegio_mod, data = k, partial=True)
                if serializer_act.is_valid(raise_exception=True):
                    serializer_act.save()
            except colegio.DoesNotExist:
                serializer = serializer_colegio(data=k)
                if serializer.is_valid(raise_exception=True):
                    serializer.save()
        #retornar la data grabada en la bd
        colegios_bd = colegio.objects.filter(id_ubigeo=distr, tipo_colegio=tipo)
        serializ = serializer_colegio(colegios_bd, many=True)
        return Response(serializ.data)
class recuperarUbicacion(APIView):
    def get(self, request, distrito,format=None):
        #distrito = request.data['distrito']
        try:
            ubigeoDistrito = ubigeo.objects.get(codigo_ubigeo=distrito, tipo_ubigeo='I')
            departamento = ubigeo.objects.get(codigo_ubigeo__startswith=distrito[0:2], tipo_ubigeo='D')
            provincia = ubigeo.objects.get(codigo_ubigeo__startswith=distrito[0:4], tipo_ubigeo='P')
            return Response({
                "departamento" : serializer_ubigeo(departamento).data,
                "provincia" : serializer_ubigeo(provincia).data,
                "distrito" : serializer_ubigeo(ubigeoDistrito).data
            })
        except ubigeo.DoesNotExist:
            return Response({
                "message": "No existen datos"
            })
# ···················· ENDREGION UBIGEO ······················}}}

# ···················· REGION ADMIN ························{{{
class creacionCiclo(APIView):
    def post(self, request):
        turno_mañana = request.data['turno_maniana']
        turno_tarde = request.data['turno_tarde']
        turno_noche = request.data['turno_noche']

        
        if (turno_mañana == "True" or turno_tarde == "True") or turno_noche== "True":
            anio = int(request.data['anio'])
            nro_ciclo = int(request.data['nro_ciclo_de_anio'])
            # print("*******************************************************")
            # print("DATA",request.data)
            # print("*******************************************************")
            # print("POST",request.POST)
            # print("*******************************************************")
            # print("FILES",request.FILES)
            # print("FILES",request.data['portada_ciclo'])
            # print("*******************************************************")
            if turno_mañana == "True":
                admin = administrador.objects.get(id=request.data['id_administrador'])
                nuevo_ciclo = ciclo.objects.create(
                    denominacion = str(request.data['denominacion'] + " - Turno Mañana"),
                    anio = anio,
                    nro_ciclo_de_anio = nro_ciclo,
                    requisitos = request.data['requisitos'],
                    fecha_inicio_ciclo = request.data['fecha_inicio_ciclo'],
                    fecha_fin_ciclo = request.data['fecha_fin_ciclo'],
                    fecha_inicio_preinscripcion = request.data['fecha_inicio_preinscripcion'],
                    fecha_fin_preinscripcion = request.data['fecha_fin_preinscripcion'],
                    fecha_inicio_inscripcion = request.data['fecha_inicio_inscripcion'],
                    fecha_fin_inscripcion = request.data['fecha_fin_inscripcion'],
                    id_administrador = admin,
                    org_unit_path = request.data['org_unit_path'],
                    portada_ciclo = request.data['portada_ciclo']
                )
                nuevo_ciclo.save()
            if turno_tarde == "True":
                admin = administrador.objects.get(id=request.data['id_administrador'])
                nuevo_ciclo = ciclo.objects.create(
                    denominacion = str(request.data['denominacion'] + " - Turno Tarde"),
                    anio = anio,
                    nro_ciclo_de_anio = nro_ciclo,
                    requisitos = request.data['requisitos'],
                    fecha_inicio_ciclo = request.data['fecha_inicio_ciclo'],
                    fecha_fin_ciclo = request.data['fecha_fin_ciclo'],
                    fecha_inicio_preinscripcion = request.data['fecha_inicio_preinscripcion'],
                    fecha_fin_preinscripcion = request.data['fecha_fin_preinscripcion'],
                    fecha_inicio_inscripcion = request.data['fecha_inicio_inscripcion'],
                    fecha_fin_inscripcion = request.data['fecha_fin_inscripcion'],
                    id_administrador = admin,
                    org_unit_path = request.data['org_unit_path'],
                    portada_ciclo = request.data['portada_ciclo']
                )
                nuevo_ciclo.save()
            if turno_noche == "True":
                admin = administrador.objects.get(id=request.data['id_administrador'])
                nuevo_ciclo = ciclo.objects.create(
                    denominacion = str(request.data['denominacion'] + " - Turno Noche"),
                    anio = anio,
                    nro_ciclo_de_anio = nro_ciclo,
                    requisitos = request.data['requisitos'],
                    fecha_inicio_ciclo = request.data['fecha_inicio_ciclo'],
                    fecha_fin_ciclo = request.data['fecha_fin_ciclo'],
                    fecha_inicio_preinscripcion = request.data['fecha_inicio_preinscripcion'],
                    fecha_fin_preinscripcion = request.data['fecha_fin_preinscripcion'],
                    fecha_inicio_inscripcion = request.data['fecha_inicio_inscripcion'],
                    fecha_fin_inscripcion = request.data['fecha_fin_inscripcion'],
                    id_administrador = admin,
                    org_unit_path = request.data['org_unit_path'],
                    portada_ciclo = request.data['portada_ciclo']
                )
                nuevo_ciclo.save()
            return Response({
                "message":"success"
                })
        else:
            return Response({"message":"Debe escoger al menos un turno para el ciclo"}, status=status.HTTP_400_BAD_REQUEST)

        
    
    def put(self, request, pk):
        lista_req = request.data['docs_requisito']
        lista_req = ast.literal_eval(lista_req)
        print(lista_req)
        print(type(lista_req))
        try:
            get_ciclo = ciclo.objects.get(id=pk)
            serializer = serializer_ciclo(get_ciclo, data= request.data, partial=True)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                for i in lista_req:
                    if i[1] == "true":
                        try:
                            obj = documento_solicitado_ciclo.objects.get(id_padron_documento_requisito=i[0], id_ciclo=pk)
                        except documento_solicitado_ciclo.DoesNotExist:
                            dict = {}
                            dict['id_padron_documento_requisito'] = i[0]
                            dict['id_ciclo'] = serializer.data['id']
                            serializer_req = serializer_documentos_requisito_inscripcion(data=dict)
                            if serializer_req.is_valid(raise_exception=True):
                                serializer_req.save()
                    else:
                        try:
                            obj = documento_solicitado_ciclo.objects.get(id_padron_documento_requisito=i[0], id_ciclo=pk)
                            obj.delete()
                        except documento_solicitado_ciclo.DoesNotExist:
                            pass
            return Response({"message":"Actualizado correctamente"})
        except ciclo.DoesNotExist:
            return Response(status=404)
class verRequisitosCiclo(APIView):
    def get(self, request, id_ciclo):
        doc_ciclo = documento_solicitado_ciclo.objects.filter(id_ciclo=id_ciclo)
        docs_requisito_act = padron_documento_requisito.objects.filter(estado=True)
        if doc_ciclo.count() == 0:
            #se le envian todos los documentos disponibles             
            asignados = []
            noasignados = []
            for i in docs_requisito_act:
                dict = {}
                k = padron_documento_requisito.objects.get(id=i.id)
                dict['requisito'] = serializer_padron_documento_requisito(k).data
                noasignados.append(dict)
            return Response({
                "asignados": asignados,
                "no_asignados": noasignados
            })
        else:
            asignados = []
            noasignados = []
            for i in doc_ciclo:
                dict = {}
                k = padron_documento_requisito.objects.get(id=i.id_padron_documento_requisito.id)
                dict['requisito'] = serializer_padron_documento_requisito(k).data
                asignados.append(dict)

            lista_act =[]
            for i in doc_ciclo:
                lista_act.append(i.id_padron_documento_requisito.id)

            list_sin_asig = []
            for j in docs_requisito_act:
                list_sin_asig.append(j.id)

            for l in list_sin_asig:
                if l not in lista_act:
                    dict = {}
                    k = padron_documento_requisito.objects.get(id=l)
                    dict['requisito'] = serializer_padron_documento_requisito(k).data
                    noasignados.append(dict)
            return Response({
                "asignados": asignados,
                "no_asignados": noasignados
            })

class verCompromisosPago(APIView):
    def get(self, request, ciclo, format=None):
        snippets = compromiso_pago.objects.filter(id_preinscripcion__id_ciclo = ciclo)
        serializer = serializer_compromiso_pago(snippets, many=True)
        return Response(serializer.data)

class verCompromisosDetalle(APIView):
    def get(self, request, ciclo):
        snippets = compromiso_pago.objects.filter(id_preinscripcion__id_ciclo = ciclo)
        lista = []
        for i in snippets:
            nro_cuotas_total = i.id_pago.nro_cuotas
            detalles_compr = detalle_compromiso_de_pago.objects.filter(id_compromiso_pago=i.id)
            nro_cuotas_pagadas=0
            for j in detalles_compr:
                if j.esta_pagado == True:
                    nro_cuotas_pagadas+=1
            dict = {}
            dict['data'] = serializer_compromiso_pago(i).data
            dict['nro_total_cuotas'] = nro_cuotas_total
            dict['nro_cuotas_pagadas'] = nro_cuotas_pagadas
            lista.append(dict)    
        return Response(lista)

class verPagosCiclo(APIView):
    def get(self, request, id_ciclo):
        pagos = pago.objects.filter(id_ciclo=id_ciclo)
        serializer = serializer_pago(pagos, many=True)
        return Response(serializer.data)
class verDetalleCompromisosPago(APIView):
    def get(self, request, pk, format=None):
        #id_compromiso=request.data['id_compromiso_pago']
        try:
            snippets = detalle_compromiso_de_pago.objects.filter(id_compromiso_pago=pk)
            serializer_det_comp = serializer_detalle_compromiso_de_pago(snippets, many=True)
            return Response(serializer_det_comp.data)
        except:
            return Response({
                "message": "no se encuentra el item"
            })
class actualizarPagos(APIView):
    def patch(self, request, format=None):
        compromiso_id = request.data["id_compromiso_pago"]
        nro_cuota = request.data["numero_cuota"]
        id_administrador = request.data["id_administrador"]

        try:
            admin = administrador.objects.get(id=id_administrador)
            try:
                compromiso_consulta = compromiso_pago.objects.get(id=compromiso_id)
                ciclo = compromiso_consulta.id_preinscripcion.id_ciclo
                docs_req_ciclo = documento_solicitado_ciclo.objects.filter(id_ciclo=ciclo)
                if docs_req_ciclo.count() > 0:
                    if nro_cuota == 1:#Se actualiza el estado y se crean regitros de incripcion y campos para poner sus documentos
                        try:
                            detalle_compr = detalle_compromiso_de_pago.objects.get(id_compromiso_pago=compromiso_consulta.id, numero_cuota=nro_cuota)
                            detalle_compr.esta_pagado = True
                            detalle_compr.save()
                            # #?????????'
                            serializer_detalle = serializer_detalle_compromiso_de_pago(detalle_compr, data=request.data, partial=True)
                            if serializer_detalle.is_valid(raise_exception=True):
                                update_detalle = serializer_detalle.save()
                            #Actualizar en la parte de tesoreria
                            registro_pago_tesor = registro_tesoreria.objects.get(id_detalle_compromiso=detalle_compr.id)
                            registro_pago_tesor.esta_pagado = True
                            registro_pago_tesor.fecha_pago = datetime.datetime.now()
                            registro_pago_tesor.admin = admin
                            registro_pago_tesor.save()
                            #crear una inscripcion
                            serializer_insc = serializer_inscripcion(data=serializer_detalle.data)
                            if serializer_insc.is_valid(raise_exception=True):
                                serializer_insc.save()
                                #crear campos para depositar documentos
                                documentos_Req = documento_solicitado_ciclo.objects.filter(id_ciclo=ciclo)
                                print(documentos_Req)
                                for i in documentos_Req:
                                    data = {
                                        "id_inscripcion": serializer_insc.data['id'],
                                        "nombre_documento" : i.id_padron_documento_requisito.nombre_documento
                                    }
                                    serializer_doc_insc = serializer_documentos_inscripcion(data=data)
                                    if serializer_doc_insc.is_valid(raise_exception=True):
                                        serializer_doc_insc.save()
                                return Response({
                                    "message": "Primer pago realizado correctamente, creado nueva inscripcion y registro de documentos"
                                })
                                
                        except detalle_compromiso_de_pago.DoesNotExist:
                            pass
                    else:
                        try:
                            detalle_compr = detalle_compromiso_de_pago.objects.get(id_compromiso_pago=compromiso_consulta.id, numero_cuota=nro_cuota)
                            detalle_compr.esta_pagado = True
                            detalle_compr.save()
                            serializer_detalle = serializer_detalle_compromiso_de_pago(detalle_compr, data=request.data, partial=True)
                            if serializer_detalle.is_valid(raise_exception=True):
                                update_detalle = serializer_detalle.save()

                            serializer_tesor = registro_tesoreria.objects.get(id_detalle_compromiso=detalle_compr.id)
                            serializer_tesor.esta_pagado = True
                            serializer_tesor.fecha_pago = datetime.datetime.now()
                            serializer_tesor.admin = admin
                            serializer_tesor.save()
                            return Response({
                                "detalle_act_data": serializer_detalle.data
                            })
                        except detalle_compromiso_de_pago.DoesNotExist:
                            return Response({"message":"No existe el detalle"})
                else:
                     return Response({"message":"Los documentos requisitos para la isncripcion no fueron definidos"}, status=status.HTTP_400_BAD_REQUEST)
            except compromiso_pago.DoesNotExist:
                return Response({"message":"No existe el compromiso"}, status=status.HTTP_404_NOT_FOUND)
        except administrador.DoesNotExist:
            return Response({"message":"No se encuentra el administrador"}, status=status.HTTP_404_NOT_FOUND)
class aprobarDocumentosInscripcion(APIView):
    def get(self, request, pk, format=None):
        documentos_est = documentos_inscripcion.objects.filter(id_inscripcion=pk)
        serializer = serializer_documentos_inscripcion_mostrar(documentos_est, many=True)
        return Response(serializer.data)
    def patch(self, request, format=None):
        id_administrador = request.data['id_administrador']
        documento_insc_id = request.data["id_documento_inscripcion"]
        try:
            admin = administrador.objects.get(id=id_administrador)
            try:
                documento_ = documentos_inscripcion.objects.get(id=documento_insc_id)
                try:
                    dict = {
                        "id_administrador": admin.id,
                        "esta_aprobado": True
                    }
                    dict = json.dumps(dict)
                    dict = json.loads(dict)
                    doc_rev = documentos_inscripcion_revision.objects.get(id_documento_inscripcion=documento_.id)
                    serializer_upt = serializer_documentos_inscripcion_revision(doc_rev, data=dict, partial=True)
                    if serializer_upt.is_valid(raise_exception=True):
                        serializer_upt.save()
                        documento_.esta_aprobado = True
                        documento_.save()
                        
                        #REVISAR SI YA SON TODOS LOS ACTUALIZADOS
                        inscr_ = documentos_inscripcion.objects.filter(id_inscripcion=documento_.id_inscripcion)
                        final_result = True
                        for i in inscr_:
                            final_result = final_result and i.esta_aprobado

                        if final_result == True:
                            inscripcion_ = inscripcion.objects.get(id=inscr_[0].id_inscripcion.id)
                            get_preinsc = inscripcion_.id_compromiso_pago.id_preinscripcion
                            nombre_completo = str(get_preinsc)
                            nombres = get_preinsc.dni_persona.nombres
                            apPaterno = get_preinsc.dni_persona.apellido_paterno
                            apMaterno = get_preinsc.dni_persona.apellido_materno
                            dni = get_preinsc.dni_persona.dni
                            password = generarPass(nombre_completo, dni)
                            print(password)
                            correo = generarEmail(dni)
                            nombre_usuario = dni
                            dict={
                                "username": nombre_usuario,
                                "email": correo,
                                "password": password,
                                "user_type": '3',
                                "first_name": nombres,
                                "last_name": apPaterno,
                                "sur_name": apMaterno,
                            }
                            serializer_newuser = serializer_user(data=dict)
                            if serializer_newuser.is_valid(raise_exception=True):
                                serializer_newuser.save()
                                dict_est = {
                                    "id_inscripcion": inscripcion_.id,
                                    "user_type": serializer_newuser.data['id'],
                                }
                                serializer_est = serializer_estudiante_xd(data=dict_est)
                                if serializer_est.is_valid(raise_exception=True):
                                    serializer_est.save()                            
                                    inscripcion_.estado_finalizado=True
                                    inscripcion_.save()
                            return Response({"message":"Estudiante creado"})                    
                        return Response({"message":"Aprobado correctamente"})
                except documentos_inscripcion_revision.DoesNotExist:
                    return Response({"message":"No se encuentran datos documento inscripcion rev"})
            except documentos_inscripcion.DoesNotExist:
                return Response({"message":"No se encuentran datos documentos inscripcion"})
        except administrador.DoesNotExist:
            return Response({"message":"No se encuentran el admin"})
class documentosRequisito(APIView):
    def get(self, request, ciclo):
        snippets = documento_solicitado_ciclo.objects.filter(id_ciclo=ciclo)
        serializer_requisitos = serializer_documentos_requisito_inscripcionver(snippets, many=True)
        return Response(serializer_requisitos.data)

# ···················· ENDREGION ADMIN ·····················}}}

class DocumentosInscripcionViewset(viewsets.ViewSet):
    def list(self,request):
        docs=documentos_inscripcion.objects.all()
        serializer=serializer_documentos_inscripcion(docs,many=True,context={"request":request})
        response_dict={"error":False,"message":"All Customer Request Data","data":serializer.data}
        return Response(response_dict)

    def create(self, request):
        serializer=serializer_documentos_inscripcion(data=request.data,context={"request":request})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            #Crear registros para la revision
            id_ = serializer.data['id']
            data = {}
            data = json.dumps(data)
            data = json.loads(data)
            data['id_documento_inscripcion'] = id_
            serializer_doc_rev = serializer_documentos_inscripcion_revision(data=data)
            if serializer_doc_rev.is_valid(raise_exception=True):
                serializer_doc_rev.save()

            return Response({"message":"Creado con exito"})
        return Response({"message":"Error al crear datos"})

    def retrieve(self, request, pk=None):
        queryset = documentos_inscripcion.objects.all()
        customer_request = get_object_or_404(queryset, pk=pk)
        serializer = serializer_documentos_inscripcion(customer_request, context={"request": request})

        serializer_data = serializer.data

        return Response({"error": False, "message": "Single Data Fetch", "data": serializer_data})

    def update(self,request,pk=None):
        try:
            queryset=documentos_inscripcion.objects.all()
            customer_request=get_object_or_404(queryset,pk=pk)
            serializer=serializer_documentos_inscripcion(customer_request,data=request.data,context={"request":request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response={"error":False,"message":"Successfully Updated Customer Data"}
        except:
            dict_response={"error":True,"message":"Error During Updating Customer Data"}

        return Response(dict_response)
class verDocumentosPorEstudiante(APIView):
    def get(self, request, pk, format=None):
        inscr_ = documentos_inscripcion.objects.filter(id_inscripcion=pk)
        serializer = serializer_documentos_inscripcion(inscr_, many=True)
        return Response(serializer.data)
#··················· REGION VISTAS DE ADMIN ·······················{{{
class procesoCiclo(APIView):
    def get(self, request, format=None):
        snippets = ciclo.objects.all()
        serializer = serializer_ciclo(snippets, many=True)
        return Response(serializer.data)

    def post(self, request, format=None):
        datos = request.data
        #DATOS PARA VALIDACION DE FECHAS - CICLO
        fecha_ini_ciclo = datos['fecha_inicio_ciclo']
        fecha_fin_ciclo = datos['fecha_fin_ciclo']
        dias_ciclo = validarFechas(fecha_ini_ciclo, fecha_fin_ciclo)
        #DATOS PARA VALIDACION DE FECHAS - PREINSCRIPCION
        fecha_ini_preinsc = datos['fecha_inicio_preinscripcion']
        fecha_fin_preinsc = datos['fecha_fin_preinscripcion']
        dias_preins = validarFechas(fecha_ini_preinsc, fecha_fin_preinsc)
        #DATOS PARA VALIDACION DE FECHAS - INSCRIPCION
        fecha_ini_insc = datos['fecha_inicio_inscripcion']
        fecha_fin_insc = datos['fecha_fin_inscripcion']
        dias_insc = validarFechas(fecha_ini_insc, fecha_fin_insc)
        serializer_cic = serializer_ciclo(data=datos)

        if dias_ciclo > 0:
            if dias_preins > 0:
                if dias_insc > 0:
                    if serializer_cic.is_valid(raise_exception=True):            
                        save_serializer = serializer_cic.save()
                        return Response(serializer_cic.data)
                else:
                    return Response({"message": "Asegurece de configurar adecuadamente las fechas de la etapa de inscripcion"}) 
            else:
                return Response({"message": "Asegurece de configurar adecuadamente las fechas de la etapa de preinscripcion"}) 
        else:
            return Response({"message": "Asegurece de configurar adecuadamente las fechas que va durar ciclo"})       

    def put(self, request, pk, format=None):
        try:
            ciclo_consulta = ciclo.objects.get(id=pk)
            serializer_cons = serializer_ciclo(ciclo_consulta, data=request.data, partial=True)
            if serializer_cons.is_valid(raise_exception=True):
                serializer_cons.save()
                return Response(serializer_cons.data)

        except ciclo.DoesNotExsist:
            return Response({
                "error": "No existe registro con ese codigo"
            })
class padronCursosGeneral(APIView):
    def get(self, request, pk=None, activo=None,format=None):
        if pk:
            try:
                curso = padron_curso.objects.get(id=pk)
                serializer = serializer_padron_curso(curso)
                return Response(serializer.data)
            except padron_curso.DoesNotExist:
                return Response({
                    "error":"Objeto no existe"
                })
        if activo is None:
            cursos = padron_curso.objects.all()
            serializer = serializer_padron_curso(cursos, many=True)
            return Response(serializer.data)
        else:
            cursos = padron_curso.objects.filter(estado=True)
            serializer = serializer_padron_curso(cursos, many=True)
            return Response(serializer.data)
    
    def post(self, request, format=None):
        serializer = serializer_padron_curso(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
    
    def put(self, request, pk, format=None):
        try:
            curso = padron_curso.objects.get(id=pk)
            serializer = serializer_padron_curso(curso,data=request.data, partial=True)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data)
        except padron_curso.DoesNotExist:
            return Response({
                "error":"No existe objeto"
            })
    
    def delete(self, request, pk, format=None):
        try:
            curso = padron_curso.objects.get(id=pk)
            curso.delete()
            return Response({"message": "Objecto eliminado"})
        except padron_curso.DoesNotExist:
            return Response({
                "error":"No existe objeto"
            })
class padronCursoGrupo(APIView):
    def get(self, request, pk=None, grupo=None, format=None):
        if pk is None and grupo is None:
            snippets = padron_cursos_grupo.objects.all()
            serializer = serializer_padron_curso_grupo_mostrar(snippets, many=True)
            return Response(serializer.data)
        elif pk is None and grupo is not None:
            snippets = padron_cursos_grupo.objects.filter(id_grupo_academico=grupo)
            serializer = serializer_padron_curso_grupo_mostrar(snippets, many=True)
            return Response(serializer.data)
        else:
            try:
                snippet = padron_cursos_grupo.objects.get(id=pk)
                serializer = serializer_padron_curso_grupo_mostrar(snippet)
                return Response(serializer.data)
            except padron_cursos_grupo.DoesNotExist:
                return Response({"message":"No hay datos"})
    
    def post(self, request, format=None):
        serializer = serializer_padron_curso_grupo(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
    
    def put(self, request, pk, format=None):
        try:
            obj_curso_grup = padron_cursos_grupo.objects.get(id=pk)
            serializer = serializer_padron_curso_grupo(obj_curso_grup, data=request.data, partial=True)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data)
        except padron_cursos_grupo.DoesNotExist:
            return Response({"message":"No hay datos"})
    
    def delete(self, request, pk, format=None):
        try:
            obj_curso_grup = padron_cursos_grupo.objects.get(id=pk)
            obj_curso_grup.delete()
            return Response({"message":"Objeto eliminado"})
        except padron_cursos_grupo.DoesNotExist:
            return Response({"message":"No hay datos"})

    def post(self, request, format=None):
        new_data = serializer_padron_curso_grupo(data=request.data)
        if new_data.is_valid(raise_exception=True):
            new_data.save()
            return Response(new_data.data)
class verPadronCursosActivos(APIView):
    def get(self, request):
        snippets = padron_curso.objects.filter(estado=True)
        serializer = serializer_padron_curso(snippets, many=True)
        return Response(serializer.data)
class horarioCurso(APIView):
    def get(self, request, ciclo, pk=None, format=None):
        if pk is None:
            snippets = horario.objects.filter(id_ciclo=ciclo)
            serializer = serializer_horario_mostrar(snippets, many=True)
            return Response(serializer.data)
        else:
            try:
                snippet = horario.objects.get(id=pk)
                serializer = serializer_horario_mostrar(snippet)
                return Response(serializer.data)
            except horario.DoesNotExist:
                return Response({
                    "error": "No se encuentra el curso que se ingreso"
                })
    def post(self, request, format=None):
        serializer = serializer_horario(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            estudiantes_aula = estudiante.objects.filter(id_inscripcion__id_compromiso_pago__id_preinscripcion__id_ciclo = serializer.data['id_ciclo'], id_aula = serializer.data['id_aula'])
            for i in estudiantes_aula:
                dict = {}
                dict['id_estudiante'] = i.id
                dict['id_horario'] = serializer.data['id']
                serializer_ = serializer_estudiante_horario(data=dict)
                if serializer_.is_valid(raise_exception=True):
                    serializer_.save()
            horario_rec = horario.objects.get(id=serializer.data['id'])
            return Response(serializer_horario_mostrar(horario_rec).data)

    def put(self, request,ciclo, pk, format=None):
        try:
            horario_ = horario.objects.get(id=pk)
            serializer = serializer_horario(horario_, data=request.data, partial=True)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data)
        except horario.DoesNotExist:
            return Response({"message":"No hay datos"})
    def delete(self, request, ciclo, pk, format=None):
        try:
            horario_ = horario.objects.get(id=pk)
            asistencias = asistencia_docente.objects.filter(id_horario=pk)
            flag = True
            for i in asistencias:
                if i.estado_asistencia == True:
                    flag = False
            if flag == True:
                horario_.delete()
                return Response({"message":"Se ha elminado correctamente"})
            else:
                return Response({"message":"No se pudo eliminar, curso con datos actualmente"}, status=status.HTTP_403_FORBIDDEN)
        except horario.DoesNotExist:
            return Response({"message":"No hay datos"}, status=status.HTTP_404_NOT_FOUND)

class verCursosGrupoxGrupo(APIView):
    def get(self, request, id_ga):
        cursos = padron_cursos_grupo.objects.filter(id_grupo_academico=id_ga)
        serializer = serializer_padron_curso_grupo_mostrar(cursos, many=True)
        return Response(serializer.data)

class verHorariosCiclo(APIView):
    def get(self, request, id_ciclo, id_ga):
        horario_ = horario.objects.filter(id_ciclo = id_ciclo, id_padron_cursos_grupo__id_grupo_academico=id_ga)
        serializer = serializer_horario_mostrar(horario_, many=True)
        return Response(serializer.data)

class verAulasSegunCurso(APIView):
    def get(self, request, id_curso_grupo, id_ciclo):
        try:
            grupo_academico_ = padron_cursos_grupo.objects.get(id=id_curso_grupo).id_grupo_academico
            estudiantes = estudiante.objects.filter(id_inscripcion__id_compromiso_pago__id_preinscripcion__id_escuela_profesional__id_grupo_academico=grupo_academico_, id_inscripcion__id_compromiso_pago__id_preinscripcion__id_ciclo = id_ciclo, id_aula__isnull=False).values('id_aula').order_by('id_aula').distinct()
            #aulas = estudiantes.only('id_aula')
            listatemp = []
            for i in estudiantes:
                dict = {}
                try:
                    k = aula.objects.get(id=i['id_aula'])
                    dict['aula'] = serializer_aula_mostrar(k).data
                    listatemp.append(dict)
                except aula.DoesNotExist:
                    return Response({
                        "message":"No hay aulas que coincidan"
                    })
            return Response(listatemp)
        except padron_cursos_grupo.DoesNotExist:
            return Response({
                        "message":"No hay aulas que coincidan"
                    })
class horarioCursoConDias(APIView):
    def get(self, request, pk, format=None):
        try:
            id_horarios = horario_curso.objects.filter(id_horario=pk)
            serializer = serializer_horario_curso_mostrar(id_horarios, many=True)
            return Response(serializer.data)               
        except padron_cursos_grupo.DoesNotExist:
            return Response({"message":"No existe tal curso"})
    
    def post(self, request, format=None):
        serializer = serializer_horario_curso(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        
    def put(self, request, pk, format=None):
        try:
            horario_curso_ = horario_curso.objects.get(id=pk)
            serializer = serializer_horario_curso(horario_curso_, data=request.data, partial=True)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data)
        except horario_curso.DoesNotExist:
            return Response({"message":"No hay datos"})

    def delete(self, request, pk, format=None):
        try:
            horario_curso_ = horario_curso.objects.get(id=pk)
            horario_curso_.delete()
            return Response({"message":"Se ha eliminado correctamente"})
        except horario_curso.DoesNot:
            return Response({"message":"No hay datos"}) 


class eliminar_asistencia_docente(APIView):
    def delete(self, request, pk):
        # eliminar los horarios_curso
        horario_cursos_ = horario_curso.objects.filter(id_horario=pk)
        horario_cursos_.delete()

        # eliminar asistencias generadas
        asistencias_ = asistencia_docente.objects.filter(id_horario=pk)
        asistencias_.delete()
        return Response({
            'message': 'Limpiado correctamente'
        })


class horarioCursoEstudianteConDias(APIView):
    def get(self, request, pk, format=None):
        try:
            id_horarios = horario_curso.objects.filter(id_horario=pk)
            serializer = serializer_horario_curso_mostrar(id_horarios, many=True)
            return Response(serializer.data)               
        except padron_cursos_grupo.DoesNotExist:
            return Response({"message":"No existe tal curso"})
    
    def post(self, request, format=None):
        serializer = serializer_horario_curso(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
        
    def put(self, request, pk, format=None):
        try:
            horario_curso_ = horario_curso.objects.get(id=pk)
            serializer = serializer_horario_curso(horario_curso_, data=request.data, partial=True)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data)
        except horario_curso.DoesNotExist:
            return Response({"message":"No hay datos"})

    def delete(self, request, pk, format=None):
        try:
            horario_curso_ = horario_curso.objects.get(id=pk)
            horario_curso_.delete()
            return Response({"message":"Se ha eliminado correctamente"})
        except horario_curso.DoesNot:
            return Response({"message":"No hay datos"})      
class exportarEstudiantes(APIView):
    def get(self, request, ciclo, fechaini, fechafin):
        # ciclo = request.data['ciclo']
        # f_inicio = request.data['f_inicio']
        # f_fin = request.data['f_fin']
        #estudiantes = estudiante.objects.all()
        #print(estudiantes)
        estudiantes = estudiante.objects.filter(id_inscripcion__id_compromiso_pago__id_preinscripcion__id_ciclo=ciclo, fecha_registro__range=(fechaini, fechafin))
        if estudiantes.count() > 0:
            #response = HttpResponse(content_type='text/csv')
            response = HttpResponse(
            content_type='text/csv',
            headers={'Content-Disposition': 'attachment; filename="reporte_estudiantes.csv"'},)

            #response['Content-Disposition'] = 'attachment; filename="students.csv"'
            writer = csv.writer(response)
            #writer.writerow(['First Name','Last Name','Email Address','Password','Org Unit Path','New Primary Email','Recovery Email','Recovery Phone'])
            writer.writerow(["First Name","Last Name","Email Address","Password","Org Unit Path","New Primary Email","Recovery Email","Recovery Phone","Home Address"])
            for i in estudiantes:
                dni = i.id_inscripcion.id_compromiso_pago.id_preinscripcion.dni_persona.dni
                first_name = i.user_type.first_name
                last_name = i.user_type.last_name +" "+ i.user_type.sur_name
                nombre_completo = last_name + " " + first_name
                email = i.user_type.email
                password = generarPass(nombre_completo, dni)
                org_unit_path = i.id_inscripcion.id_compromiso_pago.id_preinscripcion.id_ciclo.org_unit_path
                primary_email = i.id_inscripcion.id_compromiso_pago.id_preinscripcion.email_respaldo
                recovery_email = primary_email
                recovery_phone = '+51'+ i.id_inscripcion.id_compromiso_pago.id_preinscripcion.telefono_personal
                address = i.id_inscripcion.id_compromiso_pago.id_preinscripcion.direccion
                lista = [first_name, last_name, email, password, org_unit_path, primary_email, recovery_email, recovery_phone, address]
                writer.writerow(lista)
            return response
        else:
            return Response({"message":"No existen estudiantes entre las fechas dadas"}, status=400)

# CARGAR NOTAS DE ADMISION
class notasExamenCSV(APIView):
    def post(self, request, anio_ciclo, nro_ciclo, nro_examen):

        dict = {}
        for file in request.FILES.values():
            with open(file.name, 'wb') as file_obj:
                texto = file.read()
                texto_plano = texto.decode()
                k = texto_plano.split('\r\n')
                for i in range(len(k)-1):
                    datos = k[i].split(',')
                    dni = datos[0]
                    nota = datos[1]
                    dict[str(dni)] = float(nota)
                file_obj.close()
        dict_not_found = {}
        for key in dict:
            try:
                #RECUPERAR EL ESTUDIANTE CON SU DNI Y EL AÑO Y NRO DE CICLO
                estudiante_ciclo = estudiante.objects.get(id_inscripcion__id_compromiso_pago__id_preinscripcion__dni_persona__dni=key,id_inscripcion__id_compromiso_pago__id_preinscripcion__id_ciclo__anio=anio_ciclo,
                id_inscripcion__id_compromiso_pago__id_preinscripcion__id_ciclo__nro_ciclo_de_anio=nro_ciclo)
                print("estudiante", estudiante_ciclo)
                ciclo = estudiante_ciclo.id_inscripcion.id_compromiso_pago.id_preinscripcion.id_ciclo.id

                examen = examenCiclo.objects.get(id_ciclo=ciclo, id_examen__nro_examen=nro_examen, id_examen__tipo_examen="PARCIAL").id_examen.id

                examenes_dados = examen_estudiante.objects.filter(id_examen=examen, id_examen__nro_examen=nro_examen)
                if examenes_dados.count() == 0:
                    #CREAR EL EXAMEN ESTUDIANTE
                    data_examen_est = {
                        "id_estudiante": estudiante_ciclo.id,
                        "id_examen": examen,
                        "nota_promedio":  dict[key]
                    }
                    serializer = serializer_examen_estudiante(data=data_examen_est)
                    if serializer.is_valid(raise_exception=True):
                        serializer.save()
                else:
                    return Response({"message": "Ya se subireron las notas para este examen"},status=status.HTTP_400_BAD_REQUEST)
            
            except estudiante.DoesNotExist:
                dict_not_found[key] = dict[key]
        
        if len(dict_not_found.keys()) == 0:
            return Response({"message": "Todas las notas fueron asignados satisfactoriamente", "estado_correcto":True})
        else:
            return Response({"message":"DNI's no encontrados", "estado_correcto":False,"data":dict_not_found})

class verCiclosActivosPublicadosExamen(APIView):
    def get(self, request):
        snippets = ciclo.objects.filter(activo=True, estado_publicar=True)
        serializer = serializer_ciclo(snippets, many=True)
        return Response(serializer.data)

class verCiclosActivosPublicadosExamenNro(APIView):
    def get(self, request):
        snippets = ciclo.objects.filter(activo=True, estado_publicar=True).values('nro_ciclo_de_anio') #'anio', 'nro_ciclo_de_anio'| , 'anio'
        unicos = []
        for i in snippets:
            temp = [i['nro_ciclo_de_anio']]
            if temp not in unicos:
                unicos.append(temp)
        snippets_ = []
        for j in unicos:
            ciclo_rec = ciclo.objects.filter(nro_ciclo_de_anio=j[0])[0]
            snippets_.append(ciclo_rec)
        serializer = serializer_ciclo(snippets_, many=True)

        return Response(serializer.data)

class verCiclosActivosPublicadosExamenNroTest(APIView):
    def get(self, request):
        #snippets = ciclo.objects.filter(activo=True, estado_publicar=True).values_list('nro_ciclo_de_anio', 'anio').distinct() #'anio', 'nro_ciclo_de_anio'
        #snippets = ciclo.objects.raw("SELECT DISTINCT id, activo, estado_publicar FROM app_ciclo WHERE activo='1' AND estado_publicar='1'")
        #serializer = serializer_ciclo(snippets, many=True)
        #return Response(serializer.data)

        snippets = ciclo.objects.filter(activo=True, estado_publicar=True).values('nro_ciclo_de_anio', 'anio') #'anio', 'nro_ciclo_de_anio'
        unicos = []
        for i in snippets:
            temp = [i['nro_ciclo_de_anio'], i['anio']]
            if temp not in unicos:
                unicos.append(temp)
        snippets_ = []
        for j in unicos:
            ciclo_rec = ciclo.objects.filter(nro_ciclo_de_anio=j[0], anio=j[1])[0]
            snippets_.append(ciclo_rec)
        serializer = serializer_ciclo(snippets_, many=True)

        return Response(serializer.data)


class verCiclosUnitarios(APIView):
    def get(self, request):
        ciclos_act = ciclo.objects.filter(activo=True).distinct()

#··················· ENDREGION VISTAS DE ADMIN ·······················}}}

#······················ REGION CONSULTAS ·····························{{{
class preinscripciones(APIView):
    def get(self, request, id_ciclo=None, format=None):
        if id_ciclo is None:
            snippets = preinscripcion.objects.all()
            serializer = serializer_preinscripcion_most(snippets, many=True)
            return Response(serializer.data)
        else:
            snippets = preinscripcion.objects.filter(id_ciclo=id_ciclo)
            serializer = serializer_preinscripcion_most(snippets, many=True)
            return Response(serializer.data)
class inscripciones(APIView):
    def get(self, request, id_ciclo=None, format=None):
        if id_ciclo is None:
            snippets = inscripcion.objects.all()
            serializer = serializer_inscripcion_most(snippets, many=True)
            return Response(serializer.data)
        else:
            snippets = inscripcion.objects.filter(id_compromiso_pago__id_preinscripcion__id_ciclo=id_ciclo)
            lista = []
            for i in snippets:
                docs_insc = documentos_inscripcion.objects.filter(id_inscripcion=i.id)
                total_docs = docs_insc.count()
                aprobados = 0
                desaprobados = 0
                pendientes = 0
                for doc in docs_insc:
                    if doc.esta_aprobado == 0:
                        pendientes+=1
                    elif doc.esta_aprobado == 1:
                        aprobados+=1
                    else:
                        desaprobados+=1
                dict = {}
                dict['data'] = serializer_inscripcion_most(i).data
                dict['total_docs'] = total_docs
                dict['aprobados'] = aprobados
                dict['pendientes'] = pendientes
                dict['desaprobados'] = desaprobados
                lista.append(dict)
            return Response(lista)
class estudiantes(APIView):
    def get(self, request, id_ciclo=None, format=None):
        if id_ciclo is None:
            snippets = estudiante.objects.all()
            serializer = serializer_estudiante_most(snippets, many=True)
            return Response(serializer.data)
        else:
            snippets = estudiante.objects.filter(id_inscripcion__id_compromiso_pago__id_preinscripcion__id_ciclo=id_ciclo)
            serializer = serializer_estudiante_most(snippets, many=True)
            return Response(serializer.data)
class reporteAsistenciaEstudiante(APIView):
    def get(self, request, format=None):
        f_inicio = request.data['f_inicio']
        f_fin = request.data['f_fin']
        #ciclo = request.data['id_ciclo']
        estudiante = request.data['id_estudiante']
        registros_recuperados = asistencia_estudiante.objects.filter(fecha_sesion__range=(f_inicio, f_fin), id_estudiante_horario__id_estudiante=estudiante)
        serializar = serializer_asistencia_estudiante(registros_recuperados, many=True)
        return Response(serializar.data)
#ver grupos academicos
class verGruposAcademicos(APIView):
    def get(self, request):
        grupos = grupo_academico.objects.all()
        serializer = serializer_grupo_academico(grupos, many=True)
        return Response(serializer.data)
class verAulas(APIView):
    def get(self, request, format=None):
        aulas_rec = aula.objects.all()
        serializer = serializer_aula_mostrar(aulas_rec, many=True)
        return Response(serializer.data)
class consultaEstudiantesAula(APIView):
    def get(self, request, ciclo, grupo_academico, aula):
        estudiantes_ciclo = estudiante.objects.filter(id_inscripcion__id_compromiso_pago__id_preinscripcion__id_ciclo=ciclo)
        print("estudiantes por ciclo",estudiantes_ciclo)
        estudiantes_por_grupo = estudiantes_ciclo.filter(id_inscripcion__id_compromiso_pago__id_preinscripcion__id_escuela_profesional__id_grupo_academico=grupo_academico)
        estudiantes_aula = estudiantes_por_grupo.filter(id_aula = aula)
        
        estudiantes_en_aula = estudiantes_ciclo.filter(id_aula=aula)
        #Si no hay estudiantes en ese aula se devuelve todos los estudiantes no asignados
        if estudiantes_en_aula.count() == 0:
            estudiantes_no_asignados = estudiantes_por_grupo.filter(id_aula = None)
            lista = []
            for i in estudiantes_no_asignados:
                dict = {}
                k = estudiante.objects.get(id=i.id)
                dict['estudiante'] = serializer_estudiante_most(k).data
                lista.append(dict)            
            return Response({
                "vacio": True,
                "data": lista
            })
        #Si existen estudiantes en ese aula se revisa si corresponden al mismo grupo que el dado
        else:
            if estudiantes_aula.count() > 0:
                estudiantes_no_asignados = estudiantes_por_grupo.filter(id_aula = None)
                lista = []
                for i in estudiantes_no_asignados:
                    dict = {}
                    k = estudiante.objects.get(id=i.id)
                    dict['estudiante'] = serializer_estudiante_most(k).data
                    lista.append(dict)
                for k in estudiantes_aula:
                    dict = {}
                    est = estudiante.objects.get(id=k.id)
                    dict['estudiante'] = serializer_estudiante_most(est).data
                    lista.append(dict)

                return Response({
                    "vacio": False,
                    "data": lista
                })
            else:
                return Response({
                    "vacio": False,
                    "error": True,
                    "mensaje": "Existen estudiantes de otro grupo academico"
                },status = 400)

#BACK HERE
class consultaDocenteSegunCurso(APIView):
    def get(self, request, id_curso_grupo):
        try:
            cursogrupo = padron_cursos_grupo.objects.get(id=id_curso_grupo)
            docente_ = docente_curso.objects.filter(id_curso = cursogrupo.id_padron_curso)
            serializer = serializer_docente_curso_mostrar(docente_, many=True)
            return Response(serializer.data)
        except padron_cursos_grupo.DoesNotExist:
            return Response({"message":"No se econtro objeto"})

class docenteCursoAPI(APIView):
    def get(self, request, pk):
        docente_q = docente.objects.get(id=pk)
        # cursos vinculados
        cursos_vinc = docente_curso.objects.filter(id_docente=pk)
        serializer = serializer_docente_curso_mostrar(cursos_vinc, many=True)
        return Response(serializer.data)

    
    def post(self, request):
        docente_ = docente.objects.get(id=request.data['id_docente'])
        with transaction.atomic():
            for i in request.data['id_cursos']:
                obj = {
                    "id_docente": docente_.id,
                    "id_curso": i
                }
                serializer = serializer_docente_curso(data=obj)
                if serializer.is_valid(raise_exception=True):
                    serializer.save()

        return Response({"message":"Agregado correctamente"})
    
    def put(self, request):
        docente_ = docente.objects.get(id=request.data['id_docente'])
        # Limpiar los cursos existentes
        with transaction.atomic():
            cursoss = docente_curso.objects.filter(id_docente=docente_.id)
            cursoss.delete()

            # actualzar los registros
            for i in request.data['id_cursos']:
                obj = {
                    "id_docente": docente_.id,
                    "id_curso": i
                }
                serializer = serializer_docente_curso(data=obj)
                if serializer.is_valid(raise_exception=True):
                    serializer.save()

        return Response({"message":"Actualizado correctamente correctamente"})

class asignarEstudiantesAula(APIView):
    def patch(self, request, id_aula):
        lista_est = request.data['estudiantes']
        aula_ = aula.objects.get(id=id_aula)
        for i in lista_est:
            estudiante_ = estudiante.objects.get(id=i[0])
            if i[1]==True:
                estudiante_.id_aula = aula_
                estudiante_.save()
            else:
                estudiante_.id_aula = None
                estudiante_.save()
        return Response({
            "Asignados correctamente"
        })

# ······················ ENDREGION CONSULTAS ··················}}}


#······················ REGION PAGO-PROTO ·····························{{{
class cicloActivo(APIView):
    def get(self, request, format=None):
        snippets = ciclo.objects.filter(activo=True, estado_publicar=True)
        lista = []
        for i in snippets:
            dict = {}
            docs_requisito = documento_solicitado_ciclo.objects.filter(id_ciclo=i.id)
            dict['ciclo'] = serializer_ciclo(i).data
            dict['requisitos'] = serializer_documentos_requisito_inscripcionver(docs_requisito, many=True).data

            lista.append(dict)
        return Response(lista)

class cicloParaHorario(APIView):
    def get(self, request):
        snippets = ciclo.objects.filter(activo=True).order_by('-fecha_registro')
        serializer = serializer_ciclo(snippets, many=True)        
        return Response(serializer.data)

class listadoPagosCiclo(APIView):
    def get(self, request, pk,format=None):
        snippets = pago.objects.filter(id_ciclo=pk)
        serializer = serializer_pago(snippets, many=True)
        return Response(serializer.data)
class definirPago(APIView):
    def post(self, request, format=None):
        cantidad = request.data['cantidad_pagos']
        for i in range(0, cantidad):
            data = json.dumps(request.data)
            data = json.loads(data)
            data['nro_cuotas'] = (i+1)
            data['tipo_colegio'] = 'PU'
            serializer = serializer_pago(data=data)
            if serializer.is_valid(raise_exception=True):
                save_ser = serializer.save()
        for i in range(0, cantidad):
            data = json.dumps(request.data)
            data = json.loads(data)
            data['nro_cuotas'] = (i+1)
            data['tipo_colegio'] = 'PR'
            serializer = serializer_pago(data=data)
            if serializer.is_valid(raise_exception=True):
                save_ser = serializer.save()
        return Response({
            "message": "success"
        })
class listaDetallePago_porPago(APIView):
    def get(self, request, pk, format=None):
        snippets = detalle_pago.objects.filter(id_pago=pk)
        serializer = serializer_detalle_pago(snippets, many=True)
        return Response(serializer.data)
class detalle_pago_algo(APIView):
    def post(self, request, format=None):
        serializer = serializer_detalle_pago_det(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
    def put(self, request, pk, format=None):
        try:
            obj_detalle_pago = detalle_pago.objects.get(id=pk)
            serializer = serializer_detalle_pago_det(obj_detalle_pago, data=request.data,partial=True)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data)
        except detalle_pago.DoesNotExist:
            return Response({
                "error": "data not found"
            })
# ······················ ENDREGION PAGO ··················}}}
class addPagos(APIView):
    def post(self, request,pk, format=None):
        #ciclo = request.data['id_ciclo']
        pagos_exists = pago.objects.filter(id_ciclo=pk).count()
        print("pagos total",pagos_exists)
        if pagos_exists > 0:
            to_add = int(pagos_exists/2) + 1
            print("pagos a agregar",to_add)
            data = json.dumps(request.data)
            data = json.loads(data)
            data['nro_cuotas'] = to_add
            data['tipo_colegio'] = 'PR'
            data['monto_total'] = 0
            
            serializer_pub = serializer_pago(data = data)
            if serializer_pub.is_valid(raise_exception=True):
                save_pub = serializer_pub.save()

            data['tipo_colegio'] = 'PU'
            serializer_priv = serializer_pago(data = data)
            if serializer_priv.is_valid(raise_exception=True):
                save_pri = serializer_priv.save()
            return Response({
                "publico": serializer_pub.data,
                "privado": serializer_priv.data
            })
        else:
            data = json.dumps(request.data)
            data = json.loads(data)
            data['nro_cuotas'] = 1
            data['tipo_colegio'] = 'PR'
            data['monto_total'] = 0
            
            serializer_pub = serializer_pago(data = data)
            if serializer_pub.is_valid(raise_exception=True):
                save_pub = serializer_pub.save()
            data['tipo_colegio'] = 'PU'
            serializer_priv = serializer_pago(data = data)
            if serializer_priv.is_valid(raise_exception=True):
                save_pri = serializer_priv.save()
            return Response({
                "publico": serializer_pub.data,
                "privado": serializer_priv.data
            })
class deletePagos(APIView):
    def delete(self, request, pk ,format=None):
        priv = pago.objects.filter(id_ciclo=pk, tipo_colegio='PR').last()
        pub = pago.objects.filter(id_ciclo=pk, tipo_colegio='PU').last()
        serializer_priv = serializer_pago(priv)        
        serializer_pub = serializer_pago(pub)
        priv.delete()
        pub.delete()
        return Response({
            "priv": serializer_priv.data,
            "pub": serializer_pub.data
        })

class eliminarPagoConDetalles(APIView):
    def delete(self, request, pk):
        pago_ = pago.objects.get(id=pk)
        detalles_ = detalle_pago.objects.filter(id_pago=pk)
        detalles_.delete()
        pago_.delete()
        return Response({"message": "success"}, status=status.HTTP_200_OK)
# ························ REGION DOCENTE ····················{{{
class inicioDocente(APIView):
    def get(self, request, pk, format=None):
        #id_docente = request.data['id_docente']
        try:
            #recuperar docente
            det_docente = docente.objects.get(id=pk)
            #recuperar horarios y cursos por ciclo activo
            horarios = horario.objects.filter(id_docente=det_docente.id, id_ciclo__activo=True)
            #serializer = serializer_horario_mostrar(horarios, many=True)
            lista = []
            for i in horarios:
                tempo = {}
                snippets = horario_curso.objects.filter(id_horario = i.id)
                serializer = serializer_horario_curso_mostrar(snippets, many=True)
                tempo["id_horario"] = i.id
                tempo["curso"] = i.id_padron_cursos_grupo.id_padron_curso.nombre_curso
                tempo["enlace"] = i.enlace_meet 
                tempo["grupo_ac"] = i.id_padron_cursos_grupo.id_grupo_academico.denominacion
                tempo["grupo_ac_ab"] = i.id_padron_cursos_grupo.id_grupo_academico.abreviacion
                tempo["ciclo"] = i.id_ciclo.denominacion
                tempo["datos"] = serializer.data  
                lista.append(tempo)
            return Response(lista)
        except docente.DoesNotExist:
            return Response([])
class seleccionarCurso(APIView):
    def get(self, request,pk, format=None):
        try:
            get_horario = horario.objects.get(id=pk)
            #get_horario = horario.objects.get(id=pk)
            return Response({
                "id": get_horario.id_padron_cursos_grupo.id,
                "nombre_curso": get_horario.id_padron_cursos_grupo.id_padron_curso.nombre_curso,
                "abreviacion": get_horario.id_padron_cursos_grupo.id_padron_curso.abreviacion,
                "grupo_acad": get_horario.id_padron_cursos_grupo.id_grupo_academico.abreviacion,
                "enlace_meet": get_horario.enlace_meet
            })
        except horario.DoesNotExist:
            return Response({"message":"No hay datos"})
class sesionClase(APIView):
    def post(self, request, format=None):
        horario_ = horario.objects.get(id=request.data['id_horario'])

        #BACK HERE!!!

        serializer = serializer_asistencia_docente(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
class verAsistenciaCurso(APIView):
    def get(self, request, ciclo, pk=None, format=None):
        if pk is not None:
            estudiante_curso_ = estudiante_horario.objects.get(id=pk)
            snippets = asistencia_estudiante.objects.filter(id_estudiante_horario__id_estudiante=estudiante.id)
            serializer = serializer_asistencia_estudiante(snippets, many=True)
            return Response(serializer.data)
        else:
            snippets = asistencia_estudiante.objects.filter(id_horario_estudiante__id_ciclo=ciclo)            
            serializer = serializer_asistencia_estudiante(snippets, many=True)
            return Response(serializer.data)
class generarAsistencias(APIView):
    def post(self, request, pk, format=None):
        horario_det = horario.objects.get(id=pk)
        estudiantes = estudiante_horario.objects.filter(id_horario=horario_det.id)
        dia_actual = datetime.date.today()
        asistencias_dia = asistencia_estudiante.objects.filter(id_estudiante_horario__id_horario=pk, fecha_sesion__startswith=str(dia_actual))
        if asistencias_dia.count() == 0:
            for i in estudiantes:
                dict = {}
                new_data = json.dumps(dict)
                new_data = json.loads(new_data)
                new_data['id_estudiante_horario'] = i.id
                print(new_data)
                serializer = serializer_asistencia_estudiante(data=new_data)
                if serializer.is_valid(raise_exception=True):
                    serializer.save()
            asistencias_dia = asistencia_estudiante.objects.filter(id_estudiante_horario__id_horario=pk, fecha_sesion__startswith=str(dia_actual))
            serializer = serializer_asistencia_estudiante_mostrar(asistencias_dia, many=True)
            return Response({
                "fecha": dia_actual,
                "data": serializer.data
            })
        else:
            asistencias_dia = asistencia_estudiante.objects.filter(id_estudiante_horario__id_horario=pk, fecha_sesion__startswith=str(dia_actual))
            serializer = serializer_asistencia_estudiante_mostrar(asistencias_dia, many=True)
            return Response({
                "fecha": dia_actual,
                "data": serializer.data
            })
class registrarAsistencia(APIView):
    def patch(self, request, pk,format=None):
        id_estudiante = request.data['id_estudiante']
        horario_est = estudiante_horario.objects.get(id_estudiante=id_estudiante, id_horario = pk)
        dia_actual = datetime.date.today()
        registro_asistencia_del_dia = asistencia_estudiante.objects.get(fecha_sesion__startswith=str(dia_actual), id_estudiante_horario=horario_est)
        if registro_asistencia_del_dia.estado_asistencia == False:
            registro_asistencia_del_dia.estado_asistencia = True
            registro_asistencia_del_dia.save()
            serializer = serializer_asistencia_estudiante(registro_asistencia_del_dia)
            return Response(serializer.data)
        else:
            registro_asistencia_del_dia.estado_asistencia = False
            registro_asistencia_del_dia.save()
            serializer = serializer_asistencia_estudiante(registro_asistencia_del_dia)
            return Response(serializer.data)

class actualizarAsitenciaFueraFecha(APIView):
    def patch(self, request, pk):
        asistencia = asistencia_estudiante.objects.get(id=pk)
        serializer = serializer_asistencia_estudiante(asistencia, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

class materialCurso(APIView):
    def get(self, request, horario, pk=None, format=None):
        if pk is None:
            materiales = material_curso.objects.filter(id_horario=horario)
            serializer = serializer_material_curso_mostrar(materiales, many=True)
            return Response(serializer.data)
        else:
            try:
                material = material_curso.objects.get(id=pk)
                serializer = serializer_material_curso_mostrar(material)
                return Response(serializer.data)
            except material_curso.DoesNotExist:
                return Response({"message": "No existe objeto"})
    def post(self, request, format=None):
        serializer = serializer_material_curso(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
    
    def put(self, request, horario, pk, format=None):
        try:
            material_upt = material_curso.objects.get(id=pk, id_horario=horario)
            serializer = serializer_material_curso(material_upt, data=request.data, partial=True)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data)
        except material_curso.DoesNotExist:
            return Response({"message":"No hay datos"})

    def delete(self, request, horario, pk, format=None):
        try:
            material_del = material_curso.objects.get(id=pk, id_horario=horario)
            material_del.delete()
            return Response({"message":"Objeto eliminado"})
        except material_curso.DoesNotExist:
            return Response({"message":"No hay datos"})
class comentariosClase(APIView):
    def get(self, request, horario, pk=None, format=None):
        if pk is None:
            comentarios = comentarios_clase.objects.filter(id_horario=horario)
            serializer = serializer_comentario_clase_docente_mostrar(comentarios, many=True)
            return Response(serializer.data)
        else:
            try:
                comentario = comentarios_clase.objects.get(id=pk)
                serializer = serializer_comentario_clase_docente_mostrar(comentario)
                return Response(serializer.data)
            except comentarios_clase.DoesNotExist:
                return Response({"message": "No existe objeto"})
    
    def post(self, request, format=None):
        serializer = serializer_comentarios_clase(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
    
    def put(self, request, horario, pk, format=None):
        try:
            comentario_upt = comentarios_clase.objects.get(id=pk, id_horario=horario)
            serializer = serializer_comentarios_clase(comentario_upt, data=request.data, partial=True)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data)
        except comentarios_clase.DoesNotExist:
            return Response({"message":"No hay datos"})

    def delete(self, request, horario, pk, format=None):
        try:
            comentarios_del = comentarios_clase.objects.get(id=pk, id_horario=horario)
            comentarios_del.delete()
            return Response({"message":"Objeto eliminado"})
        except comentarios_clase.DoesNotExist:
            return Response({"message":"No hay datos"})
class balotaCurso(APIView):
    def get(self, request, curso_grupo, pk=None, format=None):
        if pk is None:
            balotas = balota_preguntas_curso.objects.filter(id_padron_curso_grupo=curso_grupo)
            serializer = serializer_balota_preguntas_curso_mostrar(balotas, many=True)
            return Response(serializer.data)
        else:
            try:
                balota = balota_preguntas_curso.objects.get(id_padron_curso_grupo=curso_grupo,id=pk)
                serializer = serializer_balota_preguntas_curso_mostrar(balota)
                return Response(serializer.data)
            except balota_preguntas_curso.DoesNotExist:
                return Response({"message":"No hay datos"})
    def post(self, request, curso_grupo, format=None):
        serializer = serializer_balota_preguntas_curso(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
    
    def put(self, request, curso_grupo, pk, format=None):
        try:
            balota_upt = balota_preguntas_curso.objects.get(id=pk, id_padron_curso_grupo= curso_grupo)
            serializer = serializer_balota_preguntas_curso(balota_upt, data=request.data, partial=True)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data)
        except balota_preguntas_curso.DoesNotExist:
            return Response({"message":"No hay datos"}, status=status.HTTP_404_NOT_FOUND)
    
    def delete(self, request, curso_grupo, pk, format=None):
        try:
            balota_del = balota_preguntas_curso.objects.get(id=pk, id_padron_curso_grupo=curso_grupo)
            balota_del.delete()
            return Response({"message":"Objeto eliminado"})
        except balota_preguntas_curso.DoesNotExist:
            return Response({"message":"No hay datos"})
class alternativasBalotario(APIView):
    def get(self, request, balota, pk=None,  format=None):
        if pk is None:
            alternativa_curso_grup = alternativas_balotario.objects.filter(id_balota = balota)
            serializer = serializer_alternativas_balota_mostrar(alternativa_curso_grup, many=True)
            return Response(serializer.data)
        else:
            try:
                alternativa_curso_grup = alternativas_balotario.objects.get(id_balota = balota, id=pk)
                serializer = serializer_alternativas_balota_mostrar(alternativa_curso_grup)
                return Response(serializer.data)
            except alternativas_balotario.DoesNotExist:
                return Response({"message":"No hay datos"})

    def post(self, request, balota, format=None):
        valor_alternativa = request.data['es_respuesta']
        alternativas = alternativas_balotario.objects.filter(id_balota=balota)
        if alternativas.count() == 4:
            incorrectos = alternativas.filter(es_respuesta=False)
            if incorrectos.count() == 4 and valor_alternativa==False:
                return Response({"message": "La pregunta debe tener necesariamente una alternatica correcta"}, status=405)
        if alternativas.count() == 5:
            return Response({"message": "Alcanzo el maximo de alternativas para esta pregunta"}, status=405)
        cont_verdaderos = 0
        for i in alternativas:
            if i.es_respuesta == True:
                cont_verdaderos += 1
        if cont_verdaderos >= 0 and valor_alternativa==False:
            serializer = serializer_alternativas_balotario(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data)
        elif cont_verdaderos == 0 and valor_alternativa==True:
            serializer = serializer_alternativas_balotario(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data)
        else:
            return Response({"message": "Ya existe una respuesta correcta para esa pregunta"}, status=405)

    def put(self, request, balota, pk, format=None):
        valor_alternativa = request.data['es_respuesta']
        alternativas = alternativas_balotario.objects.filter(id_balota=balota)
        try:
            alternativa_upt = alternativas_balotario.objects.get(id=pk,id_balota=balota)
            valor_alternativa = request.data['es_respuesta']
            #RECUPERAR DEMAS ALTERNATIVAS Y VER SI YA HAY UNA RESPUETA CORRECTA
            alternativas = alternativas_balotario.objects.filter(id_balota=balota)
            cont_verdaderos = 0
            for i in alternativas:
                if i.es_respuesta == True:
                    cont_verdaderos += 1
            #VALIDAR LO ANTERIOR CON EL REQUEST DADO
            if cont_verdaderos >= 0 and valor_alternativa==False:
                serializer = serializer_alternativas_balotario(alternativa_upt, data=request.data)
                if serializer.is_valid(raise_exception=True):
                    serializer.save()
                    return Response(serializer.data)
            elif cont_verdaderos == 0 and valor_alternativa==True:
                serializer = serializer_alternativas_balotario(alternativa_upt, data=request.data)
                if serializer.is_valid(raise_exception=True):
                    serializer.save()
                    return Response(serializer.data)
            else:
                return Response({"Error": "Ya existe una respuesta correcta para esa pregunta"})
            
        except alternativas_balotario.DoesNotExist:
            return Response({"message": "no hay datos"})

    def delete(self, request, balota, pk, format=None):
        try:
            alternativa_upt = alternativas_balotario.objects.get(id=pk, id_balota=balota)
            alternativa_upt.delete()
            return Response({"message":"Eliminado correctamente"})
        except alternativas_balotario.DoesNotExist:
            return Response({"message": "no hay datos"})
class DocentehorarioCursoEstudianteConDias(APIView):
    def get(self, request, pk, format=None):
        try:
            id_horarios = horario_curso.objects.filter(id_horario=pk)
            serializer = serializer_horario_curso_mostrar(id_horarios, many=True)
            return Response(serializer.data)               
        except padron_cursos_grupo.DoesNotExist:
            return Response({"message":"No existe tal curso"})
    
    def post(self, request, format=None):
        serializer = serializer_horario_curso(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
class consultarAsistenciaDeEstudiante(APIView):
    def post(self, request, id_estudiante, format=None):
        f_inicio = request.data['f_inicio']
        f_fin = request.data['f_fin']
        id_horario = request.data['id_horario']
        registros_recuperados = asistencia_estudiante.objects.filter(fecha_sesion__range=(f_inicio, f_fin), id_estudiante_horario__id_estudiante=id_estudiante, id_estudiante_horario__id_horario = id_horario)
        serializar = serializer_asistencia_estudiante(registros_recuperados, many=True)
        return Response(serializar.data)
class consultaEstudiantesCurso(APIView):
    def get(self, request, id_horario):
        horarios_est = estudiante_horario.objects.filter(id_horario=id_horario)
        serializer = serializer_estudiante_horario_most(horarios_est, many=True)
        return Response(serializer.data)
class horarioActualizar(APIView):
    def patch(self, request, pk, format=None):
        try:
            horario_ = horario.objects.get(id=pk)
            serializer = serializer_horario(horario_, data= request.data,partial=True)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data)
        except horario.DoesNotExist:
            return Response({
                "message": "No se encontro objeto"
            }, status=404)
class verListaEstudiantesAsistencia(APIView):
    def post(self, request, id_horario, format=None):
        f_inicio = request.data['f_inicio']
        f_fin = request.data['f_fin']
        horarios_est = estudiante_horario.objects.filter(id_horario=id_horario)
        lista = []
        for i in horarios_est:
            dict = {}
            registros_recuperados = asistencia_estudiante.objects.filter(fecha_sesion__range=(f_inicio, f_fin), id_estudiante_horario__id_estudiante=i.id_estudiante, id_estudiante_horario__id_horario = id_horario)
            asistencias = 0
            for a in registros_recuperados:
                if a.estado_asistencia == True:
                    asistencias+=1
            dict['nombres'] = i.id_estudiante.user_type.get_full_name()
            dict['cantidad'] = registros_recuperados.count()
            dict['asistido'] = asistencias
            dict['asistencias'] = serializer_asistencia_estudiante(registros_recuperados, many=True).data
            lista.append(dict)
        return Response(lista)


# ···························· USING VIEWSET ························
class MaterialCursoViewset(viewsets.ViewSet):
    def list(self,request):
        materiales = material_curso.objects.all()
        serializer = serializer_material_curso_mostrar(materiales,many=True,context={"request":request})
        response_dict = {
                "error":False,
                "message":"Todos los objetos de la tabla recuperados",
                "data":serializer.data
            }
        return Response(response_dict)

    def create(self, request):
        serializer = serializer_material_curso(data=request.data,context={"request":request})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = material_curso.objects.all()
        customer_request = get_object_or_404(queryset, pk=pk)
        serializer = serializer_material_curso_mostrar(customer_request, context={"request": request})

        serializer_data = serializer.data

        return Response({
            "error": False,
            "message": "Single Data Fetch",
            "data": serializer_data
        })

    def update(self,request,pk=None):
        try:
            queryset = material_curso.objects.all()
            customer_request = get_object_or_404(queryset,pk=pk)
            serializer = serializer_material_curso(customer_request,data=request.data,context={"request":request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response={
                "error":False,
                "message":"Datos actualizados"
            }
        except:
            dict_response={
                "error":True,
                "message":"Error durante el proceso de actualizacion"
            }

        return Response(dict_response)  

    def delete(self, request, pk, format=None):
        try:
            queryset = material_curso.objects.all()
            customer_request = get_object_or_404(queryset,pk=pk)
            customer_request.delete()
            dict_response={
                "error":False,
                "message":"Objeto eliminado correctamente"
            }
        except:
            dict_response={
                "error":True,
                "message":"Error durante el proceso de eliminacion"
            }
        return Response(dict_response)
class ComentariosClaseViewset(viewsets.ViewSet):
    def list(self,request):
        materiales = comentarios_clase.objects.all()
        serializer = serializer_comentario_clase_docente_mostrar(materiales,many=True,context={"request":request})
        response_dict = {
                "error":False,
                "message":"Todos los objetos de la tabla recuperados",
                "data":serializer.data
            }
        return Response(response_dict)

    def create(self, request):
        serializer = serializer_comentarios_clase(data=request.data,context={"request":request})
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = comentarios_clase.objects.all()
        customer_request = get_object_or_404(queryset, pk=pk)
        serializer = serializer_comentario_clase_docente_mostrar(customer_request, context={"request": request})

        serializer_data = serializer.data

        return Response({
            "error": False,
            "message": "Single Data Fetch",
            "data": serializer_data
        })

    def update(self,request,pk=None):
        try:
            queryset = comentarios_clase.objects.all()
            customer_request = get_object_or_404(queryset,pk=pk)
            serializer = serializer_comentarios_clase(customer_request,data=request.data,context={"request":request})
            serializer.is_valid(raise_exception=True)
            serializer.save()
            dict_response={
                "error":False,
                "message":"Datos actualizados"
            }
        except:
            dict_response={
                "error":True,
                "message":"Error durante el proceso de actualizacion"
            }

        return Response(dict_response)  

    def delete(self, request, pk, format=None):
        try:
            queryset = comentarios_clase.objects.all()
            customer_request = get_object_or_404(queryset,pk=pk)
            customer_request.delete()
            dict_response={
                "error":False,
                "message":"Objeto eliminado correctamente"
            }
        except:
            dict_response={
                "error":True,
                "message":"Error durante el proceso de eliminacion"
            }
        return Response(dict_response)

# ························ ENDREGION DOCENTE ····················}}}
#························ REGON ESTUDIANTE ·····················{{{
class inicioEstudiante(APIView):
    def get(self, request, pk,format=None):
        try:
            #recuperar horarios y cursos
            est_horarios = estudiante_horario.objects.filter(id_estudiante=pk)
            #serializer = serializer_horario_mostrar(eest_horarios, many=True)
            lista = []        
            for i in est_horarios:                
                tempo = {}
                snippets = horario_curso.objects.filter(id_horario = i.id_horario.id)
                serializer = serializer_horario_curso_mostrar(snippets, many=True)
                tempo['ciclo'] = i.id_horario.id_ciclo.denominacion
                tempo['aula'] = i.id_horario.id_aula.codigo_aula
                tempo["curso"] = i.id_horario.id_padron_cursos_grupo.id_padron_curso.nombre_curso
                tempo["nombre_docente"] = i.id_horario.id_docente.user_type.get_full_name()
                tempo["datos"] = serializer.data
                tempo["id_inscripcion"] = i.id_estudiante.id_inscripcion.id
                lista.append(tempo)
            return Response(lista)
        except estudiante.DoesNotExist:
            return Response([])
class seleccionarCursoEstudiante(APIView):
    def get(self, request, pk, format=None):
        try:
            get_horario = horario.objects.get(id=pk)
            #get_horario = horario.objects.get(id=pk)
            return Response({
                "nombre_curso": get_horario.id_padron_cursos_grupo.id_padron_curso.nombre_curso,
                "abreviacion": get_horario.id_padron_cursos_grupo.id_padron_curso.abreviacion,
                "grupo_acad": get_horario.id_padron_cursos_grupo.id_grupo_academico.abreviacion,
                "enlace_meet": get_horario.enlace_meet,
                "aula": get_horario.id_aula.codigo_aula,
                "nombre_docente" : get_horario.id_docente.user_type.get_full_name()
            })
        except horario.DoesNotExist:
            return Response({"message":"No hay datos"})
class comentariosClaseEstudiante(APIView):
    def get(self, request, horario, pk=None, format=None):
        if pk is None:
            comentarios = comentarios_clase.objects.filter(id_horario=horario)
            serializer = serializer_comentario_clase_estudiante_mostrar(comentarios, many=True)
            return Response(serializer.data)
        else:
            try:
                comentario = comentarios_clase.objects.get(id=pk)
                serializer = serializer_comentario_clase_estudiante_mostrar(comentario)
                return Response(serializer.data)
            except comentarios_clase.DoesNotExist:
                return Response({"message": "No existe objeto"})
    
    def post(self, request, horario, format=None):
        serializer = serializer_comentarios_clase(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
    
    def put(self, request, horario, pk, format=None):
        try:
            comentario_upt = comentarios_clase.objects.get(id=pk, id_horario=horario)
            serializer = serializer_comentarios_clase(comentario_upt, data=request.data, partial=True)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data)
        except comentarios_clase.DoesNotExist:
            return Response({"message":"No hay datos"})

    def delete(self, request, horario, pk, format=None):
        try:
            comentarios_del = comentarios_clase.objects.get(id=pk, id_horario=horario)
            comentarios_del.delete()
            return Response({"message":"Objeto eliminado"})
        except comentarios_clase.DoesNotExist:
            return Response({"message":"No hay datos"})
class materialCursoEstudiante(APIView):
    def get(self, request, horario, pk=None, format=None):
        if pk is None:
            materiales = material_curso.objects.filter(id_horario=horario)
            serializer = serializer_material_curso_mostrar(materiales, many=True)
            return Response(serializer.data)
        else:
            try:
                material = material_curso.objects.get(id=pk)
                serializer = serializer_material_curso_mostrar(material)
                return Response(serializer.data)
            except material_curso.DoesNotExist:
                return Response({"message": "No existe objeto"})
class verNotasEstudiante(APIView):
    def get(self, request, pk, format=None):        
        examen_est = examen_estudiante.objects.filter(id_estudiante=pk)
        serializer = serializer_examen_estudiante_mostrar(examen_est, many=True)
        return Response(serializer.data)
class verPagosEstudiante(APIView):
    def get(self, request, pk, format=None):
        estudiante_det = estudiante.objects.get(id=pk)
        id_compromiso_est = estudiante_det.id_inscripcion.id_compromiso_pago
        snippets = detalle_compromiso_de_pago.objects.filter(id_compromiso_pago = id_compromiso_est)
        serializer = serializer_detalle_compromiso_de_pago(snippets, many=True)
        return Response(serializer.data)
class verAsistenciaEstudiante(APIView):
    def get(self, request, pk, format=None):
        horario_est = estudiante_horario.objects.filter(id_estudiante=pk)
        dict = {}
        for i in horario_est:
            snippets = asistencia_estudiante.objects.filter(id_estudiante_horario=i.id)
            serializer = serializer_asistencia_estudiante(snippets, many=True)
            dict[str(i.id_horario.id_padron_cursos_grupo.id_padron_curso.nombre_curso)] = serializer.data
        return Response(dict)
            #return Response(serializer.data)
class consultarAsistenciaEstudiante(APIView):
    def post(self, request, id_estudiante, id_horario, format=None):
        registros_recuperados = asistencia_estudiante.objects.filter(id_estudiante_horario__id_horario = id_horario, id_estudiante_horario__id_estudiante=id_estudiante)
        serializar = serializer_asistencia_estudiante(registros_recuperados, many=True)
        return Response(serializar.data)
#························ ENDREGION ESTUDIANTE··················}}}

#························ REGION EXAMEN ··················{{{
class programarExamen(APIView):
    def get(self, request, ciclo, pk=None):
        if pk is None:
            snippets = examen.objects.filter(id_ciclo=ciclo)
            return Response(serializer_examen(snippets, many=True).data)
        else:
            snippet = examen.objects.get(id=pk)
            return Response(serializer_examen(snippet).data)
    def post(self, request, ciclo):
        ciclos_id = request.data['id_ciclos']
        flag = False
        for i in ciclos_id:
            if i[1]==True:
                flag=True
            
        if flag==True:  
            if request.data['tipo_examen']=='SIMULACRO':
                
                #Crear el examen
                serializer = serializer_examen(data=request.data)
                if serializer.is_valid(raise_exception=True):
                    serializer.save()
                    #Sacar los grupos academicos
                    grupos_examen = grupo_academico.objects.all()
                    #recorrer los ciclos dados
                    for j in ciclos_id:
                        if j[1] == True:#Si es true se crea el enlace en la tabla examen_ciclo
                            dictionario = {}
                            dictionario['id_examen'] = serializer.data['id']
                            dictionario['id_ciclo'] = j[0]
                            serializer_examen_ciclo = serializer_examenCiclo(data=dictionario)
                            if serializer_examen_ciclo.is_valid(raise_exception=True):
                                serializer_examen_ciclo.save()
                    #Crear los examen grupo para cada ciclo
                    for i in grupos_examen:
                        dict={}
                        dict['id_grupo_academico'] = i.id
                        dict['id_examen'] = serializer.data['id']
                        serializer_exagrupo = serializer_examen_grupo(data=dict)
                        if serializer_exagrupo.is_valid(raise_exception=True):
                            serializer_exagrupo.save()
                    return Response({"message":"Creado correctamente"})
            
            else:
                serializer = serializer_examen(data=request.data)
                if serializer.is_valid(raise_exception=True):
                    serializer.save()
                    #recorrer los ciclos dados
                    for j in ciclos_id:
                        if j[1] == True:#Si es true se crea el enlace en la tabla examen_ciclo
                            dictionario = {}
                            dictionario['id_examen'] = serializer.data['id']
                            dictionario['id_ciclo'] = j[0]
                            serializer_examen_ciclo = serializer_examenCiclo(data=dictionario)
                            if serializer_examen_ciclo.is_valid(raise_exception=True):
                                serializer_examen_ciclo.save()
                    return Response({"message":"Creado correctamente"})
        else:
            return Response({"message":"No se ha creado datos, debe seleccionar al menos un ciclo"}, status=status.HTTP_400_BAD_REQUEST)

class crearExamenNuevo(APIView):
    def post(self, request, anio_ciclo, nro_ciclo, tipo_examen):
        ciclos_turno = ciclo.objects.filter(anio=anio_ciclo, nro_ciclo_de_anio=nro_ciclo)
        if tipo_examen =='SIMULACRO':
            #Crear el examen
            serializer = serializer_examen(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                #Sacar los grupos academicos
                grupos_examen = grupo_academico.objects.all()
                #recorrer los ciclos dados
                for j in ciclos_turno:
                    dictionario = {}
                    dictionario['id_examen'] = serializer.data['id']
                    dictionario['id_ciclo'] = j.id
                    serializer_examen_ciclo = serializer_examenCiclo(data=dictionario)
                    if serializer_examen_ciclo.is_valid(raise_exception=True):
                        serializer_examen_ciclo.save()
                #Crear los examen grupo para cada ciclo
                for i in grupos_examen:
                    dict={}
                    dict['id_grupo_academico'] = i.id
                    dict['id_examen'] = serializer.data['id']
                    serializer_exagrupo = serializer_examen_grupo(data=dict)
                    if serializer_exagrupo.is_valid(raise_exception=True):
                        serializer_exagrupo.save()
                return Response({"message":"Creado correctamente"})        
        else:
            serializer = serializer_examen(data=request.data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                #recorrer los ciclos dados
                for j in ciclos_turno:
                    dictionario = {}
                    dictionario['id_examen'] = serializer.data['id']
                    dictionario['id_ciclo'] = j.id
                    serializer_examen_ciclo = serializer_examenCiclo(data=dictionario)
                    if serializer_examen_ciclo.is_valid(raise_exception=True):
                        serializer_examen_ciclo.save()
                return Response({"message":"Creado correctamente"})

class verCiclosAnio(APIView):
    def get(self, request, anio):
        ciclo_act = ciclo.objects.filter(activo=True, anio=anio)
        serializer = serializer_ciclo(ciclo_act, many=True)
        return Response(serializer.data)

class listarDetalleExamenGrupo(APIView):
    def get(self, request, ciclo, pk=None, format=None):
        if pk is None:
            snippets = examen_grupo.objects.filter(id_examen__id_ciclo=ciclo)
            serializer = serializer_examen_grupo(snippets, many=True)
            return Response(serializer.data)
        else:
            try:
                snippet = examen_grupo.objects.get(id=pk)
                serializer = serializer_examen_grupo(snippet)
                return Response(serializer.data)
            except examen_grupo.DoesNotExist:
                return Response({
                    "error":"No existen datos"
                })
#············· AUTOMATICO ·····························
class crearExamenGrupoPreguntas(APIView):
    def post(self, request, pk, format=None):
        try:
            examen_grupo_ = examen_grupo.objects.get(id=pk)
            if examen_grupo_.finalizado == False:
                id_grupo = examen_grupo_.id_grupo_academico.id
                cursos = padron_cursos_grupo.objects.filter(id_grupo_academico=id_grupo)
                print(cursos)
                #Revisar si todos los cursos tienen al menos la cantidad minima de preguntas en su balotario
                for i in cursos:
                    max_preguntas = i.nro_preguntas_examen
                    preguntas_balotario = balota_preguntas_curso.objects.filter(id_padron_curso_grupo=i.id)
                    if max_preguntas > preguntas_balotario.count():
                        return Response({
                            "error": "La cantidad de preguntas no es suficiente",
                            "Curso": i.id_padron_curso.nombre_curso
                        },status=status.HTTP_400_BAD_REQUEST)
                for i in cursos:
                    #extrer cantidad de preguntas por curso
                    max_preguntas = i.nro_preguntas_examen
                    #listar balotarios segun cursos
                    preguntas_balotario = balota_preguntas_curso.objects.filter(id_padron_curso_grupo=i.id)
                    if max_preguntas > preguntas_balotario.count():
                        return Response({
                            "error":"La cantidad de preguntas del balotario no es suficiente"
                        },status=status.HTTP_400_BAD_REQUEST)
                    else:
                        #tomar una cantidad fija de preguntas para un determinado curso
                        lista = random.sample(list(preguntas_balotario), max_preguntas)
                        for j in lista:
                            dict ={
                                "id_examen_grupo": pk,
                                "id_balota_curso": j.id
                            }
                            serializer_preg_examen = serializer_preguntas_examen_grupo(data=dict)
                            if serializer_preg_examen.is_valid(raise_exception=True):
                                serializer_preg_examen.save()
                # examen_grupo_.finalizado = True
                # examen_grupo_.save()
                # PROCESADO DE PUNTAJES
                cant_pregntas = preguntas_examen_grupo.objects.filter(id_examen_grupo=examen_grupo_.id).count()
                print("AQUIIIIIII!! CANT PREG AUTO", cant_pregntas)
                puntaje_correcto_ = 20/cant_pregntas
                examen_grupo_.puntaje_correcto = puntaje_correcto_
                if request.data['max_blancos'] and request.data['max_errado']:
                    puntaje_blank = float(request.data['max_blancos'])/cant_pregntas
                    examen_grupo_.puntaje_blanco = puntaje_blank
                    puntaje_err = float(request.data['max_errado'])/cant_pregntas
                    examen_grupo_.puntaje_errado = puntaje_err
                    examen_grupo_.permitir_blancos = True
                if request.data['max_blancos']:
                    puntaje_blank = float(request.data['max_blancos'])/cant_pregntas
                    examen_grupo_.puntaje_blanco = puntaje_blank
                    examen_grupo_.permitir_blancos = True
                if request.data['max_errado']:
                    puntaje_err = float(request.data['max_errado'])/cant_pregntas
                    examen_grupo_.puntaje_errado = puntaje_err 
                examen_grupo_.finalizado = True
                examen_grupo_.save()
                return Response({"message": "successful"})
            else:
                return Response({"message": "El examen ya tiene sus preguntas asignadas"},status=status.HTTP_400_BAD_REQUEST)
        except examen_grupo.DoesNotExist:
            return Response({"message": "No existe examen con ese ID"},status=status.HTTP_400_BAD_REQUEST)
#············· MANUAL ·····························
class crearExamenGrupoManual(APIView):
    def get(self, request, examen_pk, curso_pk=None, format=None):
        if curso_pk is None:
            try:
                #Recuperamos el examen segun el id dado
                examen_grupo_ = examen_grupo.objects.get(id=examen_pk)
                #Sacamos sus datos (ciclo y grupo academico con el objetivo de hacer filtros)
                id_grupo = examen_grupo_.id_grupo_academico.id
                #Filtramos  los cursos segun el grupo academico del exxamen actual
                cursos_ = padron_cursos_grupo.objects.filter(id_grupo_academico=id_grupo)
                serializer = serializer_padron_curso_grupo_mostrar(cursos_, many=True)
                return Response(serializer.data)
            except examen_grupo.DoesNotExist:
                return Response({"message":"No hay datos"},status=status.HTTP_400_BAD_REQUEST)
        else:
            try:
                #Recuperamos el examen segun el id dado
                examen_grupo_ = examen_grupo.objects.get(id=examen_pk)
                #Sacamos sus datos (ciclo y grupo academico con el objetivo de hacer filtros)
                id_grupo = examen_grupo_.id_grupo_academico.id
                #Filtramos  los cursos segun el grupo academico del exxamen actual
                curso_ = padron_cursos_grupo.objects.get(id_grupo_academico=id_grupo, id=curso_pk)
                serializer = serializer_padron_curso_grupo_mostrar(curso_)
                return Response(serializer.data)
            except examen_grupo.DoesNotExist:
                return Response({"message":"No hay datos"},status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        id_examen_grupo = request.data['id_examen_grupo']
        lista = request.data['preguntas']

        curso_nro_pregs = balota_preguntas_curso.objects.get(id=lista[0][0]).id_padron_curso_grupo.nro_preguntas_examen
        pregs_true = 0
        for i in lista:
            if i[1] == True:
                pregs_true+=1
        
        if pregs_true <= curso_nro_pregs: 
            for i in lista:
                if i[1]==True:
                    try:
                        obj = preguntas_examen_grupo.objects.get(id_balota_curso=i[0], id_examen_grupo=id_examen_grupo)
                    except preguntas_examen_grupo.DoesNotExist:
                        dict={}
                        dict['id_examen_grupo'] = request.data['id_examen_grupo']
                        dict['id_balota_curso'] = i[0]
                        serializer = serializer_preguntas_examen_grupo(data=dict)
                        if serializer.is_valid(raise_exception=True):
                            serializer.save()
                else:
                    try:
                        obj = preguntas_examen_grupo.objects.get(id_balota_curso=i[0], id_examen_grupo=id_examen_grupo)
                        obj.delete()
                    except preguntas_examen_grupo.DoesNotExist:
                        pass
                    
            return Response({"message":"Success"})
        else:
            return Response({"message":"No es posible agregar mas preguntas que el limite por curso"}, status= status.HTTP_400_BAD_REQUEST)

    def patch(self, request):
        lista = request.data['preguntas']
        for i in lista:
            if i[1]==True:
                try:
                    preg_examen = preguntas_examen_grupo.objects.get(id_balota_curso=i[0])
                except preguntas_examen_grupo.DoesNotExist:
                    return Response({"message":"No hay datos"}, status=status.HTTP_404_NOT_FOUND)
                if preg_examen is None:
                    dict={}
                    dict['id_examen_grupo'] = request.data['id_examen_grupo']
                    dict['id_balota_curso'] = i[0]
                    serializer = serializer_preguntas_examen_grupo(data=dict)
                    if serializer.is_valid(raise_exception=True):
                        serializer.save()
            else:
                preg_examen = preguntas_examen_grupo.objects.get(id=i[0])
                preg_examen.delete()
        return Response({"message":"Success"})
class verPreguntasExamenCrear(APIView):
    def get(self, request, pk_examen, pk_curso_grupo):
        preg_exam_current = preguntas_examen_grupo.objects.filter(id_examen_grupo = pk_examen, id_balota_curso__id_padron_curso_grupo= pk_curso_grupo)
        if preg_exam_current.count() == 0:
            balotas = balota_preguntas_curso.objects.filter(id_padron_curso_grupo=pk_curso_grupo)
            lista_sin_asig = []
            for i in balotas:
                dict = {}
                serializer = serializer_balota_preguntas_curso_mostrar(i)
                dict['data'] = serializer.data
                lista_sin_asig.append(dict)
            
            #serializer = serializer_balota_preguntas_curso_mostrar(balotas, many=True)
            return Response({
                "sin_asignar": lista_sin_asig,
                "asignados": []
            })
        else:
            balotas_current = preg_exam_current.values('id_balota_curso')
            balotas = balota_preguntas_curso.objects.filter(id_padron_curso_grupo=pk_curso_grupo)
            lista_sin_asig = []
            lista_asig = []
            #para los asignados
            for i in balotas_current:
                balota_act = balota_preguntas_curso.objects.get(id=i['id_balota_curso'])
                if balota_act in balotas:
                    dict = {}
                    serializer = serializer_balota_preguntas_curso_mostrar(balota_act)
                    dict['data'] = serializer.data
                    lista_asig.append(dict)
            #para los no asignados
            lista_act = []
            for i in balotas_current:
                lista_act.append(i['id_balota_curso'])
            lista_act_no_asign = []
            for i in balotas:
                lista_act_no_asign.append(i.id)

            for k in lista_act_no_asign:
                if k not in lista_act:
                    dict = {}
                    j = balota_preguntas_curso.objects.get(id=k)
                    serializer = serializer_balota_preguntas_curso_mostrar(j)
                    dict['data'] = serializer.data
                    lista_sin_asig.append(dict)
            
            return Response({
                "sin_asignar": lista_sin_asig,
                "asignados": lista_asig
                # "balotas_current": list(balotas_current),
                # "balotas": serializer_balota_preguntas_curso_mostrar(balotas, many=True).data
            })

#························ ENDREGION EXAMEN ··················}}}

# ············ REGION SINCRONIZAR INFRAESTRUCTURA ···············{{{
@api_view(['POST'])
def sincronizarEEPP(request):
    eepp_bd = escuela_profesional.objects.all()
    if eepp_bd.count() == 0:
        eepp_uniq = escuelasProfesionales()
        eepp_ = json.dumps(eepp_uniq)
        eepp_ = json.loads(eepp_)
        for i in eepp_:
            i['codigo_escuela'] = i['codigo']
            i['nombre_escuela_profesional'] = i['nombre']
            i['abreviacion'] = i['codigo']
            del i['nombre']
            del i['codigo']
        for i in eepp_:
            serializer_crear = serializer_escuela_profesional(data=i)
            if serializer_crear.is_valid(raise_exception=True):
                serializer_crear.save()

        esc_act = escuela_profesional.objects.all()
        serializer_res = serializer_escuela_profesional(esc_act, many=True)
        return Response(serializer_res.data)
    
    else:
        eepp_uniq = escuelasProfesionales()
        eepp_ = json.dumps(eepp_uniq)
        eepp_ = json.loads(eepp_)
        for i in eepp_:
            i['codigo_escuela'] = i['codigo']
            i['nombre_escuela_profesional'] = i['nombre']
            i['abreviacion'] = i['codigo']
            del i['nombre']
            del i['codigo']
            try:                    
                esc_act = escuela_profesional.objects.get(codigo_escuela=i['codigo_escuela'])
                serializer_act = serializer_escuela_profesional(esc_act, data = i)
                if serializer_act.is_valid(raise_exception=True):
                    serializer_act.save()
            except:
                serializer_crear = serializer_escuela_profesional(data = i)
                if serializer_crear.is_valid(raise_exception=True):
                    serializer_crear.save()
        
        esc_act = escuela_profesional.objects.all()
        serializer_res = serializer_escuela_profesional(esc_act, many=True)
        return Response(serializer_res.data)
@api_view(['POST'])
def sincronizarPabellones(request):
    pabellones_q = pabellon.objects.all()
    if pabellones_q.count() == 0:
        pabellones_uniq = pabellones()
        pabellon_ = json.dumps(pabellones_uniq)
        pabellon_ = json.loads(pabellon_)
        for i in pabellon_:
            i['codigo_pabellon'] = i['codigo']
            i['nombre_pabellon'] = i['nombre']
            del i['nombre']
            del i['codigo']
        for i in pabellon_:
            serializer_crear = serializer_pabellon(data=i)
            if serializer_crear.is_valid(raise_exception=True):
                serializer_crear.save()

        pabellon_act = pabellon.objects.all()
        serializer_res = serializer_pabellon(pabellon_act, many=True)
        return Response(serializer_res.data)
    else:
        pabellon_uniq = pabellones()
        pabellon_ = json.dumps(pabellon_uniq)
        pabellon_ = json.loads(pabellon_)
        for i in pabellon_:
            i['codigo_pabellon'] = i['codigo']
            i['nombre_pabellon'] = i['nombre']
            del i['nombre']
            del i['codigo']
            try:                    
                pab_act = pabellon.objects.get(codigo_pabellon=i['codigo_pabellon'])
                serializer_act = serializer_pabellon(pab_act, data = i)
                if serializer_act.is_valid(raise_exception=True):
                    serializer_act.save()
            except:
                serializer_crear = serializer_pabellon(data = i)
                if serializer_crear.is_valid(raise_exception=True):
                    serializer_crear.save()
        
        pab_act = pabellon.objects.all()
        serializer_res = serializer_pabellon(pab_act, many=True)
        return Response(serializer_res.data)
@api_view(['POST'])
def sincronizarAulas(request):
    aulas_q = aula.objects.all()
    if aulas_q.count() == 0:
        aulas_uniq = aulas()
        aulas_ = json.dumps(aulas_uniq)
        aulas_ = json.loads(aulas_)
        for i in aulas_:
            i['codigo_aula'] = i['codigo']
            i['sillas_fijas'] = i['sillasFijas']
            i['sillas_moviles'] = i['sillasMoviles']
            i['capacidad'] = i['sillasMoviles'] + i['sillasFijas']
            del i['codigo']
            del i['sillasFijas']
            del i['sillasMoviles']
        for i in aulas_:
            try:
                pabellon_rec = pabellon.objects.get(codigo_pabellon=i['codigoPabellon'])
                i['id_pabellon'] = pabellon_rec.id
                serializer_crear = serializer_aula(data=i)
                if serializer_crear.is_valid(raise_exception=True):
                    serializer_crear.save()
            except:
                return Response({"message":"Error"})

        aulas_t = aula.objects.all()
        serializer_res = serializer_aula(aulas_t, many=True)
        return Response(serializer_res.data)
    else:
        aulas_uniq = aulas()
        aulas_ = json.dumps(aulas_uniq)
        aulas_ = json.loads(aulas_)
        for i in aulas_:
            i['codigo_aula'] = i['codigo']
            i['sillas_fijas'] = i['sillasFijas']
            i['sillas_moviles'] = i['sillasMoviles']
            i['capacidad'] = i['sillasMoviles'] + i['sillasFijas']
            del i['codigo']
            del i['sillasFijas']
            del i['sillasMoviles']
            try:
                aula_act = aula.objects.get(codigo_aula=i['codigo_aula'])
                serializer_act = serializer_aula(aula_act, data = i, partial=True)
                if serializer_act.is_valid(raise_exception=True):
                    serializer_act.save()
            except:
                pabellon_rec = pabellon.objects.get(codigo_pabellon=i['codigoPabellon'])
                i['id_pabellon'] = pabellon_rec.id
                serializer_crear = serializer_aula(data = i)
                if serializer_crear.is_valid(raise_exception=True):
                    serializer_crear.save()
        
        aula_act = aula.objects.all()
        serializer_res = serializer_aula(aula_act, many=True)
        return Response(serializer_res.data)

class algo(APIView):
    def get(self, request, *args, **kwargs):
        user = request.user
        return Response({
            "user": user,
            "all": request.data
        })

class calcularNroCicloAnio(APIView):
    def get(self, request, anio, format=None):
        # anio = datetime.datetime.now().strftime("%Y")
        ciclos = ciclo.objects.filter(anio=anio).values('nro_ciclo_de_anio').order_by('nro_ciclo_de_anio').distinct()
        max = 0
        for i in ciclos:
            if i['nro_ciclo_de_anio'] > max:
                max = i['nro_ciclo_de_anio']
        
        return Response({
            "anio": anio,
            "nro_ciclo": max + 1
        })
        #seria = serializer_ciclo(ciclos, many=True)
        # return Response({"message":"some message", "xd": ciclos})

class crearUser(APIView):
    def post(self, request, *args, **kwargs):
        serializer_ = serializer_user(data=request.data)
        if serializer_.is_valid(raise_exception=True):
            serializer_.save()
            return Response(serializer_.data)
#·············· REGION SINCRONIZAR INFRAESTRUCTURA ·············}}}
class documentos_inscripcion_por_id(APIView):
    def get(self, request, pk):
        snippets = documentos_inscripcion.objects.filter(id_inscripcion=pk)
        serializer_ = serializer_documentos_inscripcion(snippets, many=True)
        return Response(serializer_.data)
class registrarDocente(APIView):
    def get(self, request, pk=None):
        if pk is None:
            docentes = docente.objects.all()
            lista = []
            for i in docentes:
                data = {
                    'docente': serializer_docente_mostrar(i).data,
                    'cursos': serializer_docente_curso_mostrar_solo_curso(docente_curso.objects.filter(id_docente=i.id), many=True).data
                }
                lista.append(data)
            #serializer = serializer_docente_mostrar(docentes, many=True)
            return Response(lista)
        else:
            try:
                docente_ = docente.objects.get(id=pk)
                serializer = serializer_docente_mostrar(docente_)
                return Response(serializer.data)
            except docente.DoesNotExist:
                return Response({
                    "message":"No existe docente"
                }, status=status.HTTP_400_BAD_REQUEST)
    
    def post(self, request, format=None):
        dni = request.data['dni']
        first_name = request.data['nombres']
        last_name = request.data['apellido_paterno']
        sur_name = request.data['apellido_materno']
        nombre_completo = first_name + " " +last_name +" "+sur_name
        dict={
            "username": dni,
            "email": request.data['email'],
            "password": generarPass(nombre_completo, dni),
            "user_type": '2',
            "first_name": first_name,
            "last_name": last_name,
            "sur_name": sur_name,
        }
        serializer_newuser = serializer_user(data=dict)
        if serializer_newuser.is_valid(raise_exception=True):
            serializer_newuser.save()
            #Crear docentes
            dict_docente = {
                "user_type": serializer_newuser.data['id'],
                "codigo_docente": request.data['codigo_docente'],
                "regimen_docente": request.data['regimen_docente']#,
                #"id_curso": request.data['id_curso']
            }
            serializer_dic = serializer_docente(data=dict_docente)
            if serializer_dic.is_valid(raise_exception=True):
                serializer_dic.save()
                last_doc = docente.objects.get(id=serializer_dic.data['id'])

                return Response({
                    "message": "Success",
                    "data": serializer_docente_mostrar(last_doc).data
                })

    def put(self, request, pk):
        try:
            docente_ = docente.objects.get(id=pk)   
            user_ = CustomUser.objects.get(id=docente_.user_type.id)
            user_.email = request.data['email']
            user_.save()
            serializer = serializer_docente(docente_, data=request.data, partial=True)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data)
        except docente.DoesNotExist:
            return Response({
                "message": "No se encuentra el objeto"
            }, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request, pk):
        try:
            docente_ = docente.objects.get(id=pk)            
            serializer = serializer_docente(docente_, data=request.data, partial=True)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data)
        except docente.DoesNotExist:
            return Response({
                "message": "No se encuentra el objeto"
            }, status=status.HTTP_400_BAD_REQUEST)
class registrarAdmin(APIView):
    def get(self, request, pk=None):
        if pk is None:
            admins = administrador.objects.all()
            serializer = serializer_administrador_mostrar(admins, many=True)
            return Response(serializer.data)
        else:
            try:
                admin_ = administrador.objects.get(id=pk)
                serializer = serializer_administrador_mostrar(admin_)
                return Response(serializer.data)
            except administrador.DoesNotExist:
                return Response({
                    "message":"No existe docente"
                }, status=status.HTTP_400_BAD_REQUEST)
    def post(self, request):
        dni = request.data['dni']
        first_name = request.data['nombres']
        last_name = request.data['apellido_paterno']
        sur_name = request.data['apellido_materno']
        nombre_completo = first_name + " " +last_name +" "+sur_name
        dict={
            "username": dni,
            "email": request.data['email'],
            "password": generarPass(nombre_completo, dni),
            "user_type": '1',
            "first_name": first_name,
            "last_name": last_name,
            "sur_name": sur_name,
        }
        serializer_newuser = serializer_user(data=dict)
        if serializer_newuser.is_valid(raise_exception=True):
            serializer_newuser.save()
            #Crear administrador
            dict_admin = {
                "user_type": serializer_newuser.data['id'],
                "codigo_administrador": request.data['codigo_administrador']
            }
            serializer_adm = serializer_administrador(data=dict_admin)
            if serializer_adm.is_valid(raise_exception=True):
                serializer_adm.save()
                last_adm = administrador.objects.get(id=serializer_adm.data['id'])

                return Response({
                    "message": "Success",
                    "data": serializer_administrador_mostrar(last_adm).data
                })
    
    def put(self, request, pk):
        try:
            admin = administrador.objects.get(id=pk)
            user_ = CustomUser.objects.get(id=admin.user_type.id)
            user_.email = request.data['email']
            user_.save()
            serializer = serializer_administrador(admin, data=request.data,partial=True)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data)
        except administrador.DoesNotExist:
            return Response({"message":"No hay datos"}, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request, pk):
        try:
            admin = administrador.objects.get(id=pk)           
            serializer = serializer_administrador(admin, data=request.data, partial=True)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data)
        except administrador.DoesNotExist:
            return Response({
                "message": "No se encuentra el objeto"
            }, status=status.HTTP_400_BAD_REQUEST)

class documentosRequisito(APIView):
    def get(self, request, pk=None):
        if pk is None:
            documentos_ = padron_documento_requisito.objects.all()
            serializer = serializer_padron_documento_requisito(documentos_, many=True)
            return Response(serializer.data)
        else:
            try:
                documentos_ = padron_documento_requisito.objects.get(id=pk)
                serializer = serializer_padron_documento_requisito(documentos_)
                return Response(serializer.data)
            except padron_cursos_grupo.DoesNotExist:
                return Response({"message":"No hay datos"}, status=status.HTTP_404_NOT_FOUND)
    
    def post(self, request):
        serializer = serializer_padron_documento_requisito(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
    
    def put(self, request, pk):
        try:
            doc = padron_documento_requisito.objects.get(id=pk)
            serializer = serializer_padron_documento_requisito(doc, data=request.data, partial=True)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response(serializer.data)
        except padron_documento_requisito.DoesNotExist:
            return Response({"message":"No hay datos"}, status=status.HTTP_404_NOT_FOUND)
    
    def delete(self, request, pk):
        try:
            doc = padron_documento_requisito.objects.get(id=pk)
            doc.delete()
            return Response({"message":"Eliminado con exito"}, status= status.HTTP_200_OK)
        except padron_documento_requisito.DoesNotExist:
            return Response({"message":"No hay datos"}, status=status.HTTP_404_NOT_FOUND)
            
class modificarRequisitosCiclo(APIView):
    def put(self, request):
        padron_req = request.data['requisitos']
        ciclo = request.data['id_ciclo']
        #ciclo con sus requisitos
        



class eliminarCiclo(APIView):
    def delete(self, request, pk , format=None):
        k = preinscripcion.objects.filter(id_ciclo = pk)
        if k.count() > 0:
            return Response({"message":"No se puede eliminar, existen elementos asociados"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            ciclo_ = ciclo.objects.get(id=pk)
            ciclo_.delete()
            return Response({"message":"Eliminado correctamente"}, status= status.HTTP_200_OK)

class verExamenesGrupo(APIView):
    def get(self, request, examen_pk):
        examen_ciclo = examenCiclo.objects.filter(id_examen=examen_pk).values('id_ciclo').order_by('id_ciclo').distinct()
        lista = []
        for i in examen_ciclo:
            dict = {}
            ciclo_ = ciclo.objects.get(id=i['id_ciclo'])
            dict['nombre_ciclo'] = ciclo_.denominacion
            lista.append(dict)

        examenes = examen_grupo.objects.filter(id_examen=examen_pk)
        serializer = serializer_examen_grupo_mostrar(examenes, many=True)
        return Response({
            "ciclos": lista,
            "examenes": serializer.data
        })

class verPreguntasExamen(APIView):
    def get(self, request, id_examen, id_pregunta=None):
        if id_pregunta is None:
            preg_examen_ = preguntas_examen_grupo.objects.filter(id_examen_grupo=id_examen)
            serializer = serializer_preguntas_examen_grupo_mostrar_todo(preg_examen_, many=True)
            return Response(serializer.data)
        else:
            preg_examen_ = preguntas_examen_grupo.objects.filter(id_examen_grupo=id_examen, id_balota_curso=id_pregunta)
            serializer = serializer_preguntas_examen_grupo_mostrar_todo(preg_examen_)
            return Response(serializer.data)
    # def get(self, request, id_examen, id_pregunta=None):
    #     if id_pregunta is None:
    #         preg_examen_ = preguntas_examen_grupo.objects.filter(id_examen_grupo=id_examen)
    #         #cursos_preg = preg_examen_.values('id_aula').order_by('id_aula').distinct()
    #         lista = []
    #         temp = []
    #         for i in preg_examen_:
    #             temp.append(i.id_balota_curso.id_padron_curso_grupo)            
    #         cursos_grupo_ = list(set(temp))
    #         for k in cursos_grupo_:
    #             dict = {}
    #             curso_ = padron_cursos_grupo.objects.get(id=k)
    #             preguntas = balota_preguntas_curso.objects.select_related('id_examen_grupo')
    #             #k = a.objects.prefetch_related('balota_set').filter(id=1)
    #             dict['nombre_curso'] = curso_.id_padron_curso.nombre_curso
    #             dict['data'] = 1# BACK HERE!!!!

    #         serializer = serializer_preguntas_examen_grupo_mostrar_todo(preg_examen_, many=True)
    #         return Response(serializer.data)
    #     else:
    #         preg_examen_ = preguntas_examen_grupo.objects.get(id_examen_grupo=id_examen, id_balota_curso=id_pregunta)
    #         serializer = serializer_preguntas_examen_grupo_mostrar_todo(preg_examen_)
    #         return Response(serializer.data)

class verAlternativasPregunta(APIView):
    def get(self, request, id_balota):
        alternatvas_ = alternativas_balotario.objects.filter(id_balota=id_balota)
        serializer = serializer_alternativas_balota_mostrar(alternatvas_, many=True)
        return Response(serializer.data)

    
class examenEstudiante(APIView):
    def post(self, request):
        id_examen = request.data['id_examen']
        id_estudiante = request.data['id_estudiante']
        serializer = serializer_examen_estudiante(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

class procesarNotas(APIView):
    def post(self, request):
        id_examen_grupo = request.data['id_examen_grupo']
        id_estudiante = request.data['id_estudiante']
        letra_alternativa = request.data['letra_alternativa']
        id_alternativa = request.data['id_alternativa']
        examen_grup = examen_grupo.objects.get(id=id_examen_grupo)
        examen_estudiante_ = examen_estudiante.objects.get(id_estudiante=id_estudiante, id_examen=examen_grup.id_examen).id

        preguntas_exam = preguntas_examen_grupo.objects.filter(id_examen_grupo=id_examen_grupo)
        total_preg = preguntas_exam.count()

        
class verAsistenciaDocentes(APIView): #! HELP
    def get(self, request, id_ciclo):
        horarios_ciclo = horario.objects.filter(id_ciclo=id_ciclo)
        lista = []
        for i in horarios_ciclo:
            dict = {}
            asistencias = asistencia_docente.objects.filter(id_horario=i.id)
            dict['docente'] = i.id_docente.user_type.get_full_name()
            dict['curso'] = i.id_padron_cursos_grupo.id_padron_curso.nombre_curso +" "+ i.id_padron_cursos_grupo.id_grupo_academico.abreviacion
            dict['data'] = serializer_asistencia_docente(asistencias, many=True).data
            lista.append(dict)
        
        return Response(lista)

class actualizarNroPreguntasExamen(APIView):
    def put(self, request):
        lista_cursos = request.data['lista_cursos']
        print("LISTA CURSOS", lista_cursos)
        for i in lista_cursos:
            print("AQUI LA I", i)
            curso = padron_cursos_grupo.objects.get(id=i[0])
            curso.nro_preguntas_examen = i[1]
            curso.save()
        return Response({"message":"OK"})

class actualizacionEstadoExamen(APIView): # ! AQUIIII CAMBIOS
    def patch(self, request, pk):
        examen = examen_grupo.objects.get(id=pk)
        cant_pregntas = preguntas_examen_grupo.objects.filter(id_examen_grupo=examen.id).count()
        if cant_pregntas != 0:
            puntaje_correcto_ = 20/cant_pregntas
            examen.puntaje_correcto = puntaje_correcto_
            if request.data['max_blancos'] and request.data['max_errado']:
                puntaje_blank = float(request.data['max_blancos'])/cant_pregntas
                examen.puntaje_blanco = puntaje_blank
                puntaje_err = float(request.data['max_errado'])/cant_pregntas
                examen.puntaje_errado = puntaje_err
                examen.permitir_blancos = True
            if request.data['max_blancos']:
                puntaje_blank = float(request.data['max_blancos'])/cant_pregntas
                examen.puntaje_blanco = puntaje_blank
                examen.permitir_blancos = True
            if request.data['max_errado']:
                puntaje_err = float(request.data['max_errado'])/cant_pregntas
                examen.puntaje_errado = puntaje_err
            else:
                examen.puntaje_errado = 0
                examen.puntaje_blanco = 0
            examen.finalizado = True
            examen.save()
            return Response({"message":"Examen guardado correctamente"})
        else:
            return Response({"message":"Examen guardado correctamente"}, status=status.HTTP_400_BAD_REQUEST)


class limpiarPreguntasExamen(APIView):
    def delete(self, request, pk):
        examen_grup = examen_grupo.objects.get(id=pk)
        preg_ = preguntas_examen_grupo.objects.filter(id_examen_grupo=pk)
        for i in preg_:
            i.delete()
        examen_grup.finalizado = False
        examen_grup.save()
        return Response({"message":"Correctamente limpiado"})

class eliminarExamenPadre(APIView):
    def delete(self, request, pk):
        examen_ = examen.objects.get(id=pk)
        #verificar si hay registros detras del examen_grup
        examenes_grupo = examen_grupo.objects.filter(id_examen=pk)

        flag = True
        for i in examenes_grupo:
            if i.finalizado == True:
                flag = False
        
        if flag == True:
            examen_.delete()
            return Response({"message":"Objeto eliminado"})
        else:
            return Response({"message":"Error al eliminar examen, ya contienen registros de preguntas para evaluacion"}, status=status.HTTP_400_BAD_REQUEST)

#NOT USED
class verExamenesGrupoEstudiante(APIView):
    def get(self, request, id_estudiante):
        estudiante_ = estudiante.objects.get(id=id_estudiante)
        g_academico = estudiante_.id_inscripcion.id_compromiso_pago.id_preinscripcion.id_escuela_profesional.id_grupo_academico
        e_ciclo = estudiante_.id_inscripcion.id_compromiso_pago.id_preinscripcion.id_ciclo
        examen_grup = examenCiclo.objects.filter(id=1)
        
class consultaPersonaDNI(APIView):
    def get(self, request, dni):
        statusRes, datosWeb = consultaDNI(str(dni))
        if statusRes == 200:
            data_person = json.loads(datosWeb)
            return Response(data_person)
        else:
            return Response({"message":"No se encontraron datos"}, status=status.HTTP_400_BAD_REQUEST)

class verExamenesCiclo(APIView):
    def get(self, request, id_ciclo):
        snippets = examenCiclo.objects.filter(id_ciclo=id_ciclo, id_examen__tipo_examen="PARCIAL")#.order_by('id_examen').distinct('id_examen')
        serializer = serializer_examenCiclo_mostrar(snippets, many=True)
        return Response(serializer.data)

class verExamenesCicloParcialSimulacro(APIView):
    def get(self, request, id_ciclo, tipo_exam):
        #ciclo_ = ciclo.objects.filter(id=id_ciclo)
        ciclo_ = ciclo.objects.filter(nro_ciclo_de_anio=id_ciclo)[0]
        examenes = examenCiclo.objects.filter(id_ciclo=ciclo_.id, id_examen__tipo_examen=tipo_exam)
        total = examenes.count()
        
        return Response({
            "nro_actual": total + 1
        })


class fechaxd(APIView):
    def get(self, request):
        hoy = datetime.datetime.now()
        p = hoy.strftime("%A")
        q = hoy.strftime("%a")
        return Response({
            "completo": p,
            "abrev": q
        })

class generarAsistenciaDocente(APIView):
    def post(self, request, pk):
        # Eliminar asistencias pasadas en caso se modifiquen los dias
        asistencias_ = asistencia_docente.objects.filter(id_horario=pk)
        if len(asistencias_) > 0:
            asistencias_.delete()
        #--------------------------------------------------------- 
        dict_trad = {
            "MON": "LUN", 
            "TUE": "MAR", 
            "WED": "MIE", 
            "THU": "JUE", 
            "FRI": "VIE", 
            "SAT": "SAB", 
            "SUN": "DOM"
        }
        horario_ = horario.objects.get(id=pk)
        dias_ = horario_curso.objects.filter(id_horario=pk)
        
        if dias_.count() > 0:

            asist_doc_exist = asistencia_docente.objects.filter(id_horario=pk)
            if asist_doc_exist.count() > 0:
                asist_doc_exist.delete()

            #RECUPERAR LOS DIAS DEL HORARIO
            dias_horario = {}
            for i in dias_:
                dias_horario[str(i.dia_dictado)] = str(i.hora_inicio)

            
            #RECUPERAR DIAS DEL CICLO
            fecha_in = horario_.id_ciclo.fecha_inicio_ciclo
            fecha_fin = horario_.id_ciclo.fecha_fin_ciclo
            delta = fecha_fin - fecha_in
            dias_ciclo = []
            for i in range(delta.days + 1):
                dict_fecha = {}
                day = fecha_in + timedelta(days=i)
                dia_es = dict_trad[day.strftime("%a").upper()]
                dict_fecha[dia_es] = day
                dias_ciclo.append(dict_fecha)
            for i in dias_ciclo:
                day_esp = list(i.keys())[0]
                if day_esp in list(dias_horario.keys()):
                    fecha = i[day_esp]
                    hora = dias_horario[day_esp]
                    data = str(fecha) + "T" + str(hora)
                    datetime_obj = datetime.datetime.strptime(data, "%Y-%m-%dT%H:%M:%S")
                    dict_to_create = {
                        "fecha_sesion": datetime_obj,
                        "id_horario": pk
                    }
                    serializer = serializer_asistencia_docente(data=dict_to_create)
                    if serializer.is_valid(raise_exception=True):
                        serializer.save()
            
            asist_doc = asistencia_docente.objects.filter(id_horario=pk)
            if asist_doc.count() > 0:
                return Response({"message": "success"})
            else:
                return Response({"message": "Error al crear las asistencias"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({"message": "De establecer los dias y horas del curso"}, status=status.HTTP_400_BAD_REQUEST)
        
        

class actualizarAsistenciaDocente(APIView):
    def patch(self, request, id_horario):
        dia_actual = datetime.date.today()
        #--------------------------------------------------------- 
        dict_trad = {
            "MON": "LUN", 
            "TUE": "MAR", 
            "WED": "MIE", 
            "THU": "JUE", 
            "FRI": "VIE", 
            "SAT": "SAB", 
            "SUN": "DOM"
        }
        try:
            now = datetime.datetime.now()
            asistencias_dia = asistencia_docente.objects.get(id_horario=id_horario, fecha_sesion__startswith=str(dia_actual))

            day_name = now.strftime("%A").upper()
            detalles_horario = horario_curso.objects.get(id_horario=id_horario, dia_dictado=dict_trad[day_name])
            hora_ini = detalles_horario.hora_inicio
            hora_fin = detalles_horario.hora_fin
            if now.time() > hora_ini and now.time() < hora_fin:
                asistencias_dia.estado_asistencia = True
                asistencias_dia.save()
                return Response({"message": "Actualizado correctamente"})
            else:
                return Response({"message": "Asistencia fuera de hora de clases"}, status=status.HTTP_406_NOT_ACCEPTABLE)
        except asistencia_docente.DoesNotExist:
            return Response({"message":"No es posible marcar la asistencia, no es su dia de dictar clases"}, status=status.HTTP_406_NOT_ACCEPTABLE)

class verHorariosCicloAdmin(APIView):
    def get(self, request, id_ciclo, id_ga):
        horarios_ = horario.objects.filter(id_ciclo=id_ciclo, id_padron_cursos_grupo__id_grupo_academico=id_ga)
        lista = []
        for i in horarios_:
            dict = {}
            dict['id_horario'] = i.id
            dict['nombre_docente'] = i.id_docente.user_type.get_full_name()
            dict['nombre_curso'] = str(i.id_padron_cursos_grupo)
            lista.append(dict)
        return Response(lista)

class asistenciaDocenteAdministrador(APIView):
    def get(self, request, id_horario):
        asistencias = asistencia_docente.objetcs.filter(id_horario=id_horario)
        serializer = serializer_asistencia_docente(asistencias, many=True)
        return Response(serializer.data)

    def patch(self, request, pk):
        asistencia = asistencia_docente.objects.get(id=pk)
        serializer = serializer_asistencia_docente(asistencia, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)

class verNotasExamenEstudiante(APIView):
    def get(self, request, id_estudiante):
        examen_ = examen_estudiante.objects.filter(id_estudiante=id_estudiante)
        return Response(serializer_examen_estudiante_mostrar(examen_, many=True).data)


#CONSULTAS PREINSCRIPCION
class consultaPreinscripcion(APIView):
    def get(elf, request, id_ciclo, id_escuela_prof=None):
        if id_escuela_prof is None:
            snippets = preinscripcion.objects.filter(id_ciclo=id_ciclo).order_by('dni_persona__apellido_paterno')
            return Response(serializer_preinscripcion_most(snippets, many=True).data)
        else:
            snippets = preinscripcion.objects.filter(id_ciclo=id_ciclo, id_escuela_profesional = id_escuela_prof).order_by('dni_persona__apellido_paterno')
            return Response(serializer_preinscripcion_most(snippets, many=True).data)

class consultaPreinscripcionPDF(APIView):
    def get(self, request, id_ciclo, id_escuela_prof=None):
        snippets = None
        if id_escuela_prof is None:
            snippets = preinscripcion.objects.filter(id_ciclo=id_ciclo)
        else:
            snippets= preinscripcion.objects.filter(id_ciclo=id_ciclo, id_escuela_profesional=id_escuela_prof)

        ddata = serializer_preinscripcion_most( \
                        snippets.order_by('dni_persona__apellido_paterno') \
                      , many=True).data
        i = 1
        for d in ddata:
            d.nro = i
            i = i + 1

        data = { 'data': ddata }
        pdf = render_to_pdf('reporte-preinscripcion.html', data)

        return HttpResponse(pdf, content_type='application/pdf')

#CONSULTAS INSCRIPCION
class consultaInscripcionConFiltros(APIView):
    def post(self, request, id_ciclo):
        if request.data['id_procedencia']:
            snippets = inscripcion.objects.filter(id_compromiso_pago__id_preinscripcion__id_ciclo = id_ciclo, id_compromiso_pago__id_preinscripcion__id_ubigeo=request.data['id_procedencia']).order_by('id_compromiso_pago__id_preinscripcion__dni_persona__apellido_paterno')
            lista = []
            for i in snippets:
                docs_insc = documentos_inscripcion.objects.filter(id_inscripcion=i.id)
                total_docs = docs_insc.count()
                aprobados = 0
                desaprobados = 0
                pendientes = 0
                for doc in docs_insc:
                    if doc.esta_aprobado == 0:
                        pendientes+=1
                    elif doc.esta_aprobado == 1:
                        aprobados+=1
                    else:
                        desaprobados+=1
                dict = {}
                dict['data'] = serializer_inscripcion_most(i).data
                dict['total_docs'] = total_docs
                dict['aprobados'] = aprobados
                dict['pendientes'] = pendientes
                dict['desaprobados'] = desaprobados
                lista.append(dict)
            return Response(lista)
        elif request.data['id_colegio']:
            snippets = inscripcion.objects.filter(id_compromiso_pago__id_preinscripcion__id_ciclo = id_ciclo, id_compromiso_pago__id_preinscripcion__id_colegio=request.data['id_colegio']).order_by('id_compromiso_pago__id_preinscripcion__dni_persona__apellido_paterno')
            lista = []
            for i in snippets:
                docs_insc = documentos_inscripcion.objects.filter(id_inscripcion=i.id)
                total_docs = docs_insc.count()
                aprobados = 0
                desaprobados = 0
                pendientes = 0
                for doc in docs_insc:
                    if doc.esta_aprobado == 0:
                        pendientes+=1
                    elif doc.esta_aprobado == 1:
                        aprobados+=1
                    else:
                        desaprobados+=1
                dict = {}
                dict['data'] = serializer_inscripcion_most(i).data
                dict['total_docs'] = total_docs
                dict['aprobados'] = aprobados
                dict['pendientes'] = pendientes
                dict['desaprobados'] = desaprobados
                lista.append(dict)
            return Response(lista)
        else:
            snippets = inscripcion.objects.filter(id_compromiso_pago__id_preinscripcion__id_ciclo = id_ciclo).order_by('id_compromiso_pago__id_preinscripcion__dni_persona__apellido_paterno')
            lista = []
            for i in snippets:
                docs_insc = documentos_inscripcion.objects.filter(id_inscripcion=i.id)
                total_docs = docs_insc.count()
                aprobados = 0
                desaprobados = 0
                pendientes = 0
                for doc in docs_insc:
                    if doc.esta_aprobado == 0:
                        pendientes+=1
                    elif doc.esta_aprobado == 1:
                        aprobados+=1
                    else:
                        desaprobados+=1
                dict = {}
                dict['data'] = serializer_inscripcion_most(i).data
                dict['total_docs'] = total_docs
                dict['aprobados'] = aprobados
                dict['pendientes'] = pendientes
                dict['desaprobados'] = desaprobados
                lista.append(dict)
            return Response(lista)

class consultaEstudiantes(APIView):
    def get(self, request, id_ciclo, id_escuela_prof=None):
        if id_escuela_prof is None:
            snippets = estudiante.objects.filter(id_inscripcion__id_compromiso_pago__id_preinscripcion__id_ciclo = id_ciclo).order_by('user_type__last_name')
            
            lista=[]
            for i in snippets:
                #RECUPERAR LOS COMPROMISOS DE PAGO
                com_pagos = detalle_compromiso_de_pago.objects.filter(id_compromiso_pago=i.id_inscripcion.id_compromiso_pago.id)
                total = com_pagos.count()
                pagados=0
                for k in com_pagos:
                    if k.esta_pagado == True:
                        pagados+=1
                dict = {}
                dict['ap_nombres'] = i.user_type.get_formal_representation()
                dict['escuela_prof'] = i.id_inscripcion.id_compromiso_pago.id_preinscripcion.id_escuela_profesional.nombre_escuela_profesional
                dict['total_cuotas'] = total
                dict['cuotas_pagadas'] = pagados
                lista.append(dict)
            return Response(lista)
        
        else:
            snippets = estudiante.objects.filter(id_inscripcion__id_compromiso_pago__id_preinscripcion__id_ciclo = id_ciclo, id_inscripcion__id_compromiso_pago__id_preinscripcion__id_escuela_profesional=id_escuela_prof).order_by('user_type__last_name')
            lista=[]
            for i in snippets:
                #RECUPERAR LOS COMPROMISOS DE PAGO
                com_pagos = detalle_compromiso_de_pago.objects.filter(id_compromiso_pago=i.id_inscripcion.id_compromiso_pago.id)
                total = com_pagos.count()
                pagados=0
                for k in com_pagos:
                    if k.esta_pagado == True:
                        pagados+=1
                dict = {}
                dict['ap_nombres'] = i.user_type.get_formal_representation()
                dict['escuela_prof'] = i.id_inscripcion.id_compromiso_pago.id_preinscripcion.id_escuela_profesional.nombre_escuela_profesional
                dict['total_cuotas'] = total
                dict['cuotas_pagadas'] = pagados
                lista.append(dict)
            return Response(lista)

class consultaVerCantidadEstudiantesEscuelaProf(APIView):
    def get(self, request, id_ciclo):
        esc_prof = escuela_profesional.objects.all()
        dict = {}
        for i in esc_prof:
            
            snippets = estudiante.objects.filter(id_inscripcion__id_compromiso_pago__id_preinscripcion__id_ciclo = id_ciclo, id_inscripcion__id_compromiso_pago__id_preinscripcion__id_escuela_profesional=i.id)
            dict[str(i)] = snippets.count()

        return Response(dict)

#FICHA DE INSCRIPCION
class viewPDFNuevo(View):
    def get(self,request, pk):
        # inscrito = inscripcion.objects.get(id=pk)
        # disc = inscrito.id_compromiso_pago.id_preinscripcion.condicion_discapacidad
        # if disc==True:
        #     estado_discap = inscrito.id_compromiso_pago.id_preinscripcion.detalle_discapacidad
        # else:
        #     estado_discap = "Ninguna"
        # f_nac = inscrito.id_compromiso_pago.id_preinscripcion.dni_persona.fecha_nacimiento
        # hoy = datetime.date.today()
        # edad = abs((hoy - f_nac).days)//365
        # det_pago = detalle_compromiso_de_pago.objects.filter(id_compromiso_pago=inscrito.id_compromiso_pago.id)
        # total = det_pago[0].id_compromiso_pago.id_pago.monto_total

        # #UBIGEO
        # ubiColegio = inscrito.id_compromiso_pago.id_preinscripcion.id_colegio.id_ubigeo.codigo_ubigeo
        # ubiNacimiento = inscrito.id_compromiso_pago.id_preinscripcion.dni_persona.lugar_nacimiento.codigo_ubigeo
        # ubiActual = inscrito.id_compromiso_pago.id_preinscripcion.id_ubigeo.codigo_ubigeo
        #PROCESAMIENTO
        data = {
            'dni': "87471412",
            'ciclo': "UN CICLO",
            'apellido_paterno': "SAMPLE TEXT",
            'apellido_materno': "SAMPLE TEXT",
            'nombres': "SAMPLE TEXT",
            'escuela_profesional': "SAMPLE TEXT",
            'institucion_educativa': "SAMPLE TEXT",
            'tipo_colegio': "SAMPLE TEXT",
            'ubigeo_ie': "SAMPLE TEXT",
            'ubigeo_procedencia': "SAMPLE TEXT",
            'idioma': "SAMPLE TEXT",
            'direccion': "SAMPLE TEXT",
            'ubigeo_nacimiento': "SAMPLE TEXT",
            'discapacidad': "SAMPLE TEXT",
            'sexo': "SAMPLE TEXT",
            'fecha_nac': "SAMPLE TEXT",
            'edad': "SAMPLE TEXT",
            'telefono': "SAMPLE TEXT",
            'email': "SAMPLE TEXT",
            'telef_apoderado': "SAMPLE TEXT",
            'nombres_apoderado': "SAMPLE TEXT", 
            'detalle_cuotas': "SAMPLE TEXT",
            'total_pago': "SAMPLE TEXT"
        }
        options = {
            'page-size': 'Letter',
            'encoding': "UTF-8"
        }
        template = get_template("ficha-inscripcion.html")
        #context = Context({"data": data})
        html = template.render(data)
        config = pdfkit.configuration(wkhtmltopdf='C:/Program Files/wkhtmltopdf/bin/wkhtmltopdf.exe')
        pdf = pdfkit.from_string(html, options=options, configuration=config)
        #pdf = pdfkit.from_file('ficha-inscripcion.html', data)
        response = HttpResponse(pdf, content_type='application/pdf')
        response['Content-Disposition'] = "attachment; filename=F_INSCRIPCION.pdf"

        return response


class accederExamenEstudiante(APIView):
    def get(self, request, id):
        try:
            estudiante_ = estudiante.objects.get(id=id)
            ciclo_ = estudiante_.id_inscripcion.id_compromiso_pago.id_preinscripcion.id_ciclo
            examenes_ = examenCiclo.objects.filter(id_ciclo=ciclo_.id, id_examen__tipo_examen="SIMULACRO")
            lista = []
            for i in examenes_:
                dict = {}
                examen_detalle = examen.objects.get(id=i.id_examen.id)
                #HORA ACTUAL
                fecha_act = datetime.datetime.now()

                if fecha_act.hour == 0 and fecha_act.minute == 0:
                    new_hour = 23
                    new_minute = 58

                if fecha_act.hour > 0:
                    new_hour = fecha_act.hour -1
                else:
                    new_hour = 23
                if fecha_act.minute > 0:
                    new_minute = fecha_act.minute - 2
                else:
                    new_minute= 58

                hora_perm = fecha_act.replace(hour=new_hour, minute=new_minute, second=fecha_act.second)
                #Verificar estado de los examenes
                #Solo se procesa si el examen aun no se rindio y que sea del tipo simulacro
                #Verificar fecha
                if examen_detalle.fecha_examen < fecha_act.date():
                    dict["denominacion"] = examen_detalle.denominacion_examen
                    dict["fecha"] = examen_detalle.fecha_examen
                    dict["habilitado"] = examen_detalle.lanzar_examen
                    dict["examen_rendido"] = True
                    dict["id_examen"] = examen_detalle.id
                elif examen_detalle.fecha_examen > fecha_act.date():
                    dict["denominacion"] = examen_detalle.denominacion_examen
                    dict["fecha"] = examen_detalle.fecha_examen
                    dict["habilitado"] = examen_detalle.lanzar_examen
                    dict["examen_rendido"] = False
                    dict["id_examen"] = examen_detalle.id
                
                else:# examen_detalle.fecha_examen == fecha_act.date():
                    #verificar Hora
                    if (fecha_act.time() == examen_detalle.hora_inicio) or (fecha_act.time() > hora_perm.time() and fecha_act.time() < examen_detalle.hora_fin):
                        dict["denominacion"] = examen_detalle.denominacion_examen
                        dict["fecha"] = examen_detalle.fecha_examen
                        dict["habilitado"] = examen_detalle.lanzar_examen
                        dict["examen_rendido"] = False
                        dict["id_examen"] = examen_detalle.id
                    elif (fecha_act.time() < hora_perm.time()):
                        dict["denominacion"] = examen_detalle.denominacion_examen
                        dict["fecha"] = examen_detalle.fecha_examen
                        dict["habilitado"] = examen_detalle.lanzar_examen
                        dict["examen_rendido"] = True
                        dict["id_examen"] = examen_detalle.id
                    else:
                        dict["denominacion"] = examen_detalle.denominacion_examen
                        dict["fecha"] = examen_detalle.fecha_examen
                        dict["habilitado"] = examen_detalle.lanzar_examen
                        dict["examen_rendido"] = True
                        dict["id_examen"] = examen_detalle.id
                lista.append(dict)
            return Response(lista)                
        except estudiante.DoesNotExist:
            return Response({"message":"Estudiante no encontrado"}, status=status.HTTP_404_NOT_FOUND)

class obtenerExamenGrupoActual(APIView):
    def get(self, request, id_estudiante, id_examen):
        examenes_ = examen.objects.get(id=id_examen)
        print(examenes_)
        estudiante_ = estudiante.objects.get(id=id_estudiante)
        print(estudiante_)
        grupo_academico = estudiante_.id_inscripcion.id_compromiso_pago.id_preinscripcion.id_escuela_profesional.id_grupo_academico
        print(grupo_academico)
        examen_gru = examen_grupo.objects.get(id_grupo_academico=grupo_academico, id_examen=id_examen)
        total_preguntas = preguntas_examen_grupo.objects.filter(id_examen_grupo=examen_gru)
        preg_ok = examen_gru.puntaje_correcto
        preg_no_ok = examen_gru.puntaje_errado
        preg_blanco = examen_gru.puntaje_blanco
        #VERIFICAR SI EL ESTUDIANTE INICIO O NO SU EXAMEN
        examen_est = examen_estudiante.objects.get(id_examen=id_examen, id_estudiante=estudiante_) 
        if examen_est.esta_iniciado == True:
            if examen_gru.permitir_blancos == False:
                return Response({
                    "denominacion": examen_gru.id_examen.denominacion_examen,
                    "total_preguntas": total_preguntas.count(),
                    "puntaje_ok": preg_ok,
                    "puntaje_no_ok": preg_no_ok,
                    "id_examen_grupo": examen_gru.id,
                    "permitir_blancos": False,
                    "esta_iniciado": True,
                    "mensaje": "Este examen NO considera la posibilidad de enviar preguntas sin marcar una alternativa, se recomienda leer cuidadosamente"
                })
            else:
                return Response({
                    "denominacion": examen_gru.id_examen.denominacion_examen,
                    "total_preguntas": total_preguntas.count(),
                    "puntaje_ok": preg_ok,
                    "puntaje_no_ok": preg_no_ok,
                    "id_examen_grupo": examen_gru.id,
                    "esta_iniciado": True,
                    "permitir_blancos": True,
                    "puntaje_blanco": preg_blanco,
                    "mensaje": "Este examen SI considera la posibilidad de enviar preguntas sin marcar una alternativa, se recomienda leer cuidadosamente"
                })
        else:
            if examen_gru.permitir_blancos == False:
                return Response({
                    "denominacion": examen_gru.id_examen.denominacion_examen,
                    "total_preguntas": total_preguntas.count(),
                    "puntaje_ok": preg_ok,
                    "puntaje_no_ok": preg_no_ok,
                    "puntaje_blanco": preg_blanco,
                    "id_examen_grupo": examen_gru.id,
                    "esta_iniciado": False,
                    "mensaje": "Este examen considera la posibilidad de enviar preguntas sin marcar una alternativa, se recomienda leer cuidadosamente"
                })
            else:
                return Response({
                    "denominacion": examen_gru.id_examen.denominacion_examen,
                    "total_preguntas": total_preguntas.count(),
                    "puntaje_ok": preg_ok,
                    "puntaje_no_ok": preg_no_ok,
                    "id_examen_grupo": examen_gru.id,
                    "esta_iniciado": False,
                    "puntaje_blanco": preg_blanco,
                    "mensaje": "Este examen NO considera la posibilidad de enviar preguntas sin marcar una alternativa, se recomienda leer cuidadosamente"
                })
class estudianteIniciarExamen(APIView):
    def post(self, request, id_est, id_examen_grupo):
        #estudiante_ = estudiante.objects.get(id=id_est)
        #RECUPERACION DEL ESTUDIANTE Y SU EXAMEN
        examen_ = examen_grupo.objects.get(id=id_examen_grupo).id_examen

        #Recuperar examen del estudiante y actualizar el estado de iniciado
        examen_est = examen_estudiante.objects.get(id_examen=examen_, id_estudiante=id_est)
        examen_est.esta_iniciado = True
        examen_est.save()

        #examen_gru = examen_grupo.objects.get(id_grupo_academico=estudiante_, id_examen=id_examen)
        #DETALLES DEL EXAMEN
        total_preguntas = preguntas_examen_grupo.objects.filter(id_examen_grupo=id_examen_grupo)
        #GENERAR REGISTROS CON DATOS EN NULL
        for i in range(0, len(total_preguntas)):
            dict = {}
            dict['id_examen_estudiante'] = examen_est.id
            dict['id_preguntas_examen_grupo'] = total_preguntas[i].id
            dict['nro_pregunta'] = i+1

            serializer_resultados_examen_ = serializer_resultados_examen_estudiante(data=dict)
            if serializer_resultados_examen_.is_valid(raise_exception=True):
                serializer_resultados_examen_.save()
        
        return Response({
            "message": "Registros generados exitosamente"
        })


class verExamenesPerCiclo(APIView):
    def get(self, request, id_ciclo):
        examenes_ = examenCiclo.objects.filter(id_ciclo=id_ciclo)
        return Response(serializer_examenCiclo_mostrar(examenes_, many=True).data)
class prasc(APIView):
    def get(self, request):
        edas = examen.objects.all()
        # lista = []
        # for i in edas:
        #     lista.append(type(i.hora_inicio))
        #     lista.append(type(i.fecha_examen))
        # hora_act = datetime.datetime.now()
        # fecha_act= datetime.datetime.now().strftime('%H:%M:%S') 
        return Response({"lista": str(type(edas[0].hora_inicio)), "lista2": str(type(edas[0].fecha_examen)), "mas": edas[0].hora_inicio.hour})
class verExamenesPorCiclo(APIView):
    def get(self, request, id):
        examenes_per_cicle = examenCiclo.objects.filter(id_ciclo=id)
        serializer = serializer_examenCiclo_mostrar(examenes_per_cicle, many=True)
        return Response(serializer.data)
class examenesCicloDetalle(APIView):
    def get(self, request):
        dat = examenCiclo.objects.all()
        return Response(serializer_examenCiclo_mostrar(dat, many=True).data)
class lanzarExamenAdminitrador(APIView):
    def post(self, request, id):
        try:
            examen_ = examen.objects.get(id=id)
            examen_.lanzar_examen = True
            examen_.save()
            #Crear registros de examen con campos en null
            #recuperar ciclos que estan vinculados al examen
            ciclos_ex = examenCiclo.objects.filter(id_examen=id)
            print(ciclos_ex)
            lista_estudiantes = estudiante.objects.none()
            for i in ciclos_ex:
                estudiantes_ = estudiante.objects.filter(id_inscripcion__id_compromiso_pago__id_preinscripcion__id_ciclo=i.id_ciclo)
                lista_estudiantes = lista_estudiantes | estudiantes_
            print(lista_estudiantes)
            for j in lista_estudiantes:
                new_data = {
                    "id_examen": examen_.id,
                    "id_estudiante": j.id,
                    "nota_promedio": "NSP"
                }
                serializer_ = serializer_examen_estudiante(data=new_data)
                print(new_data)
                print(type(new_data))
                print(serializer_)
                print(str(serializer_))
                if serializer_.is_valid(raise_exception=True):
                    new_datos_ser = serializer_.save()
            return Response({
                "message":"Examen lanzado correctamente"
            })
        except examen.DoesNotExist:
            return Response({"message":"No existe el objeto"}, status= status.HTTP_404_NOT_FOUND)


class ingresarAlExamen(APIView):
    def get(self, request, id_estudiante, id_examen_grupo):
        estudiante_ = estudiante.objects.get(id=id_estudiante)
        print(estudiante_)
        #RECUPERAR EL ID DEL EXAMEN QUE SE ESTA RINDIENDO
        examen_ = examen_grupo.objects.get(id=id_examen_grupo)
        id_examen_gen = examen_.id_examen
        hora_fin_examen = id_examen_gen.hora_fin
        print(examen_)
        print(id_examen_gen)
        #RECUPERAMOS EL EXAMEN DEL ESTUDIANTE CON SU NOTA AUN EN NSP
        examen_estudiante_rec = examen_estudiante.objects.get(id_estudiante=id_estudiante, id_examen=id_examen_gen)
        print(examen_estudiante_rec)
        fecha_act = datetime.datetime.now()
        if fecha_act.time() <= hora_fin_examen:
            if examen_estudiante_rec.esta_finalizado == False:
                #RECUPERAR LOS REGISTROS DE RESULTADOS_NOTAS_ESTUDIANTE QUE ESTAN CON NULL
                registros_nulos = resultados_examen_estudiante.objects.filter(id_examen_estudiante=examen_estudiante_rec, letra_respuesta__isnull=True, estado_respuesta__isnull=True, nota_respuesta__isnull=True)
                print(registros_nulos)
                print(len(registros_nulos))
                top = registros_nulos[0]    #Primera pregunta
                pregunta_exam = top.id_preguntas_examen_grupo.id_balota_curso
                preg = balota_preguntas_curso.objects.get(id=pregunta_exam.id)
                print(preg)
                alternativas_ = alternativas_balotario.objects.filter(id_balota=pregunta_exam)
                alternativas_y_preg = serializer_alternativas_balota_mostrar(alternativas_, many=True)
                print(alternativas_y_preg.data)
                pregunta = {
                    "on_time": True,
                    "exist_questions": True,
                    "nro_pregunta": top.nro_pregunta,
                    "id_examen_resultado": top.id,
                    "pregunta": serializer_balota_preguntas_curso(preg).data,
                    "nombre_curso": preg.id_padron_curso_grupo.id_padron_curso.nombre_curso,
                    "alternativas": alternativas_y_preg.data
                }
                print(pregunta)
                return Response(pregunta)
            else:
                pregunta = {
                    "on_time": True,
                    "exist_questions": False,
                    #"nro_pregunta": top.nro_pregunta,
                    #"id_examen_resultado": top.id,
                    "pregunta": None,
                    "mensaje": "Examen Finalizado"
                    #"nombre_curso": preg.id_padron_curso_grupo.id_padron_curso.nombre_curso,
                    #"alternativas": alternativas_y_preg.data
                }
                return Response(pregunta)
        else:
            # final_score = 0
            # for i in registros_nulos:
            #     if i.nota_respuesta == None:
            #         final_score += 0
            #     else:
            #         final_score += i.nota_respuesta

            return Response({
                "on_time": False,
                "exist_questions": False,
                # "nro_pregunta": top.nro_pregunta,
                # "id_examen_resultado": top.id,
                # "pregunta": serializer_balota_preguntas_curso(preg).data,
                # "nombre_curso": preg.id_padron_curso_grupo.id_padron_curso.nombre_curso,
                # "alternativas": alternativas_y_preg.data,
                "mensaje": "La hora del examen finalizo",
                # "final_score": final_score
            })

class calificacionCiclicaPreguntas(APIView):
    def put(self, request, id_examen_grupo):

        """CALIFICAR EXAMEN CON EL REQUEST RECIBIDO"""
        #RECUPERAR EL REGISTRO PREPARADO ANTERIORMENTE
        examen_estudiante_pregunta = resultados_examen_estudiante.objects.get(id=request.data['id_examen_resultado'])
        examen_estudiante_pregunta.letra_respuesta = request.data['letra_respuesta']
        

        #RECUPERAR EL EXAMEN GRUPO QUE SE ESTA RINDIENDO
        examen_grup = examen_grupo.objects.get(id=examen_estudiante_pregunta.id_preguntas_examen_grupo.id_examen_grupo.id)
        #VERIFICAR SI LA RESPUESTA QUE ENVIO CORRESPONDE A UNA ALTERNATIVA CORRECTA
        alternativa_est = alternativas_balotario.objects.get(id=request.data['id_alternativa_marcada'])
        if request.data['letra_respuesta'] == "":
            examen_estudiante_pregunta.nota_respuesta = examen_grup.puntaje_blanco
            examen_estudiante_pregunta.estado_respuesta = False
        if alternativa_est.es_respuesta == True: #SI ES CORRECTA
            examen_estudiante_pregunta.nota_respuesta = examen_grup.puntaje_correcto
            examen_estudiante_pregunta.estado_respuesta = True
        else:
            examen_estudiante_pregunta.nota_respuesta = examen_grup.puntaje_errado
            examen_estudiante_pregunta.estado_respuesta = False
        
        examen_estudiante_pregunta.save()

        """END CALIFICAR EXAMEN"""


        #RECUPERAR EL ID y LA HORA DE FINALIZACION DEL EXAMEN QUE SE ESTA RINDIENDO
        examen_ = examen_grupo.objects.get(id=id_examen_grupo)
        id_examen_gen = examen_.id_examen
        hora_fin_examen = id_examen_gen.hora_fin
        #Obtenemos el total de preguntas para ese examen
        preguntas_examen_ = preguntas_examen_grupo.objects.filter(id_examen_grupo=id_examen_grupo)
        total_preg = preguntas_examen_.count()
        #RECUPERAMOS EL EXAMEN DEL ESTUDIANTE CON SU NOTA AUN EN NSP
        examen_estudiante_rec = examen_estudiante.objects.get(id_estudiante=request.data['id_estudiante'], id_examen=id_examen_gen)

        #RECUPERAR LOS REGISTROS DE RESULTADOS_NOTAS_ESTUDIANTE QUE ESTAN CON NULL
        registros_nulos = resultados_examen_estudiante.objects.filter(id_examen_estudiante=examen_estudiante_rec, letra_respuesta__isnull=True, estado_respuesta__isnull=True, nota_respuesta__isnull=True)

        #HORA ACTUAL
        fecha_act = datetime.datetime.now()
        # if fecha_act.time() <= hora_fin_examen:
        #REVISAMOS SI ESTA AUN EN HORA DE RENDIR EXAMEN
        #RECUPERAR LOS REGISTROS DE RESULTADOS_NOTAS_ESTUDIANTE QUE ESTAN CON NULL
        registros_nulos = resultados_examen_estudiante.objects.filter(id_examen_estudiante=examen_estudiante_rec, letra_respuesta__isnull=True, estado_respuesta__isnull=True, nota_respuesta__isnull=True)
        if registros_nulos.count() > 0:
            #SIGNIFICA QUE HAY PREGUNTAS PARA RESPONDER Y EN ESTE CASO DEVOLVEMOS LA PRIMERA DE LOS RESULTADOS DEVUELTOS
            top = registros_nulos[0]
            pregunta_exam = top.id_preguntas_examen_grupo.id_balota_curso
            preg = balota_preguntas_curso.objects.get(id=pregunta_exam.id)
            alternativas_ = alternativas_balotario.objects.filter(id_balota=pregunta_exam)
            alternativas_y_preg = serializer_alternativas_balota_mostrar(alternativas_, many=True)
            dato_respuesta = {
                "on_time": True,
                "exist_questions": True,
                "nro_pregunta": top.nro_pregunta,
                "id_examen_resultado": top.id,
                "nombre_curso": preg.id_padron_curso_grupo.id_padron_curso.nombre_curso,
                "pregunta": serializer_balota_preguntas_curso(preg).data,
                "alternativas": alternativas_y_preg.data
            }
            print(dato_respuesta)
            return Response(dato_respuesta)
        else:
            #EN ESTE CASO, NO HAY MAS PREGUNTAS PARA DEVOLVER, ENTONCES CALIICAMOS
            registros_totales = resultados_examen_estudiante.objects.filter(id_examen_estudiante=examen_estudiante_rec)
            final_score = 0
            for i in registros_totales:
                final_score += i.nota_respuesta
            if final_score >= 20:
                final_score = 20
            dato_respuesta = {
                "on_time": True,
                "exist_questions": False,
                "final_score": final_score
            }
            examen_estudiante_rec.nota_promedio = str(final_score)
            examen_estudiante_rec.esta_finalizado = True
            examen_estudiante_rec.save()
            return Response(dato_respuesta)
        # else:
        #     #EL ESTUDIANTE SE QUEDO SIN TIEMPO PARA SUS PREGUNTAS
        #     registros_totales = resultados_examen_estudiante.objects.filter(id_examen_estudiante=examen_estudiante_rec)
        #     final_score = 0
        #     for i in registros_totales:
        #         if i.nota_respuesta == None:
        #             final_score += 0
        #         else:
        #             final_score += i.nota_respuesta
        #     dato_respuesta = {
        #         "on_time": False,
        #         "exist_questions": True,
        #         "final_score": final_score
        #     }
        #     examen_estudiante_rec.nota_promedio = str(final_score)
        #     examen_estudiante_rec.esta_finalizado = True
        #     examen_estudiante_rec.save()
        #     return Response(dato_respuesta)

class verExamenesCalificadosEstudiantes(APIView):
    def get(self, request, anio_ciclo, nro_ciclo, id_examen, flag=None):

        # recuperamos los ciclos en cuestion
        ciclos_act = ciclo.objects.filter(anio=anio_ciclo, nro_ciclo_de_anio=nro_ciclo)            # agrupar todos los estudiantes
        lista_estudiantes = estudiante.objects.none()
        for i in ciclos_act:
            estudiantes_ = estudiante.objects.filter(id_inscripcion__id_compromiso_pago__id_preinscripcion__id_ciclo=i.id)
            lista_estudiantes = lista_estudiantes | estudiantes_
        #print(lista_estudiantes)

        lista_return = []
        if flag == "aprobados":
            # DEVUELVE SOLO LOS APROBADOS
            for j in lista_estudiantes:
                examen_est_notas = examen_estudiante.objects.get(id_estudiante=j.id, id_examen=id_examen)
                if examen_est_notas.nota_promedio != "NSP" and (float(examen_est_notas.nota_promedio) >= 14):
                    lista_return.append(serializer_estudiante_examen_det(examen_est_notas).data)

        if flag == "desaprobados":
            # DEVUELVE SOLO LOS DESAPROBADOS
            for j in lista_estudiantes:
                examen_est_notas = examen_estudiante.objects.get(id_estudiante=j.id, id_examen=id_examen)
                if examen_est_notas.nota_promedio != "NSP" and (float(examen_est_notas.nota_promedio) < 14):
                    lista_return.append(serializer_estudiante_examen_det(examen_est_notas).data)

        if flag == "NSP":
            # DEVUELVE SOLO LOS DESAPROBADOS
            for j in lista_estudiantes:
                examen_est_notas = examen_estudiante.objects.get(id_estudiante=j.id, id_examen=id_examen)
                if examen_est_notas.nota_promedio == "NSP":
                    lista_return.append(serializer_estudiante_examen_det(examen_est_notas).data)

        elif flag is None:
            # DEVUELVE TODOS
            for j in lista_estudiantes:
                examen_est_notas = examen_estudiante.objects.get(id_estudiante=j.id, id_examen=id_examen)
                lista_return.append(serializer_estudiante_examen_det(examen_est_notas).data)
        
        return Response(lista_return)

class verExamenesActivosPorCiclo(APIView):
    def get(self, request, id):
        examenes_per_cicle = examenCiclo.objects.filter(id_ciclo=id, id_examen__examen_rendido=True)
        serializer = serializer_examenCiclo_mostrar(examenes_per_cicle, many=True)
        return Response(serializer.data)

class actualizacionEstadoExamenGeneral(APIView):
    def patch(self, request, pk):
        examen_ = examen.objects.get(id=pk)
        examen_.examen_rendido = True
        examen_.save()
        return Response({"message":"Examen cerrado correctamente"})

class consultaEstudiantesAul(APIView):
    def get(self, request, id_ciclo, id_aula):
        estudiantes_ = estudiante.objects.filter(id_aula=id_aula, id_inscripcion__id_compromiso_pago__id_preinscripcion__id_ciclo = id_ciclo)

        serializer_est = serializer_estudiante(estudiantes_, many=True)
        return Response(serializer_est.data)

class consultaHorariosAula(APIView):
    def get(self, request, id_ciclo, id_aula):
        horarios_ = horario.objects.filter(id_ciclo=id_ciclo, id_aula=id_aula)
        lista_ = []
        for i in horarios_:
            dict = {}
            det_horario = horario_curso.objects.filter(id_horario=i.id)
            serializer_ = serializer_horario_curso(det_horario, many=True)
            dict['nombre_curso'] = i.id_padron_cursos_grupo.id_padron_curso.nombre_curso
            dict['datos'] = serializer_.data
            lista_.append(dict)
        
        return Response(lista_)



class crearDeudas(APIView):
    def post(self, request, format=None):
        # token, fecha_token = review_token_from_file()
        token = generar_token()
        now = datetime.datetime.now().date()
        asca = ciclo.objects.get(id=1)
        print("DETALLES CICLO", asca)
        print("FECHA", asca.fecha_fin_ciclo)
        # print("FECHA FECHA", asca.fecha_fin_ciclo)
        print("FECHA FECHA STR", str(asca.fecha_fin_ciclo))
        print("NOW", now)
        body_ = {
            "fch_deu": str(now),
            "ide_cnt": 1,
            "gls_deu": "SIN GLOSA",
            "flg_cer": 1,
            "flg_sun": 1,
            "deudas_det": [
                {
                "ide_itm": 1,
                "cnt_itm": 1,
                "des_itm": "string",
                "val_unt": int(pago_det.monto_total),
                "val_tot": int(pago_det.monto_total),
                "ide_esp": 1,
                "ide_afe": 1,
                "deudas_det_par": [
                    {
                    "imp_par": 1,
                    "fch_vto": str(now)
                    }
                ]
                }
            ]
        }
        return Response({
            "data": body_,
            "fecha_token": fecha_token,
            "token": token
        })


class proveTesoreriaEndPoint(APIView):
    def post(self, request, format=None, pago_det=1):
        pago_det_ = pago.objects.get(id=pago_det)
        now = datetime.datetime.now().date()
        if pago_det_.nro_cuotas == 1:
            detalles_pago = detalle_pago.objects.get(id_pago = pago_det)
            body = {
                "fch_deu": str(now),
                "ide_cnt": 147196,
                "gls_deu": "---",
                "flg_cer": 1,
                "flg_sun": 0,
                "deudas_det": [
                    {
                        "ide_itm": 3272,
                        "cnt_itm": 1,
                        "des_itm": "MATRICULA COLEGIOS PARTICULARES",
                        "val_unt": int(pago_det_.monto_total),
                        "val_tot": 1,
                        "ide_esp": 29938,
                        "ide_afe": 9,
                        "deudas_det_par": [
                            {
                                "imp_par": int(detalles_pago.monto_parcial),
                                "fch_vto": str(detalles_pago.fecha_fin)
                            }
                        ]
                    }
                ]
            }
            print("JSON JSON JSON --->" , body)
            # real_body = json.dumps(body)
            # real_body = json.loads(body)
            # Realizar el grabado de deudas
            # print("JSON DUMPEADO XD", real_body)
            # token, fecha = review_token_from_file()
            token = generar_token()
            # print("TOKEN Y FECHA", token, fecha)
            uri = config("AUTHORITY_TESORERIA")
            response = requests.post(
                url=uri, 
                json=body,
                headers={
                    'Authorization': "Bearer "+token
                })
            print("CODIGO DE RESPUESTA", response.status_code)
            print("JSON", response.json())
            if response.status_code != 200: # TODO OK
                return Response({
                    "message": "Error al generar deudas, intentelo nuevamente"
                })
            else:
                return Response({
                    "message": "TODO OK!!!"
                })

        else:
            detalles_pago = detalle_pago.objects.filter(id_pago = pago_det)
            body = {
                "fch_deu": str(now),
                "ide_cnt": 147196, # ID DE CONTRIBUYENTE
                "gls_deu": "---",
                "flg_cer": 1,
                "flg_sun": 1,
                "deudas_det": [
                    {
                        "ide_itm": 3272, # ID DEL CONCEPTO A PAGAR
                        "cnt_itm": 1,
                        "des_itm": "MATRICULA COLEGIOS PARTICULARES",
                        "val_unt": int(pago_det_.monto_total),
                        "val_tot": 1,
                        "ide_esp": 29938, #ID DE SUBPATIDAS PRESUPUESTALES
                        "ide_afe": 9
                    }
                ]
            }

            lista_parciales = []
            for i in detalles_pago:
                parciales = {}
                parciales["imp_par"] = int(i.monto_parcial)
                parciales["fch_vto"] = str(i.fecha_fin)
                lista_parciales.append(parciales)                    

            body['deudas_det'][0]['deudas_det_par'] = lista_parciales
            
            # Realizar el grabado de deudas
            token, fecha = review_token_from_file()
            uri = config("AUTHORITY_TESORERIA")
            response = requests.post(
                url=uri, 
                json=body,
                headers={
                    'Authorization': "Bearer "+token
                })
            print("CODIGO DE RESPUESTA", response.status_code)
            print("JSON", response.json())
            if response.status_code != 200: # TODO OK
                return Response({
                    "message": "Error al generar deudas, intentelo nuevamente"
                })
            else:
                return Response({
                    "message": "TODO OK!!!"
                })

class consulta_horarios_docente(APIView):
    def get(self, request, id_docente, id_ciclo):
        horario_ = horario.objects.filter(id_docente=id_docente, id_ciclo=id_ciclo)
        lista = []
        for i in horario_:
            dict = {}
            dict['id_horario'] = i.id
            dict['docente'] = i.id_docente.user_type.get_full_name()
            dict['curso'] = i.id_padron_cursos_grupo.id_padron_curso.nombre_curso +" "+ i.id_padron_cursos_grupo.id_grupo_academico.abreviacion
            dict['grupo'] = i.id_padron_cursos_grupo.id_grupo_academico.denominacion
            # dict['data'] = serializer_asistencia_docente(asistencias, many=True).data
            lista.append(dict)     

        return Response(lista)

class verAsistenciaDocentesPorHorario(APIView): #! HELP
    def get(self, request, id_horario):
        asistencias_ = asistencia_docente.objects.filter(id_horario=id_horario)        
        serializer_ = serializer_asistencia_docente(asistencias_, many=True)
        return Response(serializer_.data)
        

class agregarColegio(APIView):
    def post(self, request):
        """
        data = {
            "ubigeo": "124124",
            "nombre_colegio": "NOMBRE",
            "codigo_modular": "COD_MODULAR",
            direccion_colegio
            "id_ubigeo": "142214",
            "ubigeo_nombre": "NOMBRE_LUGAR",
            "tipo_colegio": "PU"/"PR",
        }
        """
        serializer = serializer_colegio(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
        
        return Response(serializer.data)


class editarPreinscrito(APIView):
    def put(self, request, id_preinscripcion):
        preinscrito = preinscripcion.objects.get(id=id_preinscripcion)
        pass
        

class resumenCicloPreinscritos(APIView):
    def get(self, request, id_ciclo):
        ciclo_q = ciclo.objects.get(id=id_ciclo)
        total_preinsc = preinscripcion.objects.filter(id_ciclo=ciclo_q.id).count()
        total_preinsc_no_concl = preinscripcion.objects.filter(id_ciclo=ciclo_q.id, esta_enviado=False).count()
        esc_prof = escuela_profesional.objects.all()
        lista = []
        for i in esc_prof:
            data = {}
            cantidad_preinsc_esc = preinscripcion.objects.filter(id_ciclo=ciclo_q.id, id_escuela_profesional=i.id, esta_enviado=True).count()
            data['escuela_prof'] = i.nombre_escuela_profesional   
            data['cantidad'] = cantidad_preinsc_esc
            data['total'] = total_preinsc 
            data['no_concluido'] = total_preinsc_no_concl
            lista.append(data)
        
        return Response(lista)
        


