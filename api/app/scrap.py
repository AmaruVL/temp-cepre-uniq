import requests
import json
import datetime
import hashlib
from io import BytesIO
from django.template.loader import get_template
from xhtml2pdf import pisa
from django.http import HttpResponse 
from decouple import config
#......................CAMPO DE CONSULTAS PIDE..........................
def consultaDNI(dni):
    url = 'https://sysapis.uniq.edu.pe/pide/reniec?dni='+str(dni)
    response = requests.get(url)
    if response.status_code == 200:
        status = 200
        text = response.json()
        textjson = json.dumps(text)
        textjson = json.loads(textjson)
        dict = {
            "dni" : str(dni),
            "nombres" : textjson['nombres'],
            "apellido_paterno" : textjson['apellidoPaterno'],
            "apellido_materno" : textjson['apellidoMaterno'],            
            "direccion" : textjson['direccion']
        }
        return status, json.dumps(dict,indent=4)
    else:
        status = 404
        dictio = {
            "message": "no se obtuvo datos"
        }
        return status, json.dumps(dictio,indent=4)

#print(consultaDNI('74565490'))
def extraerDepartamentos():
    url = "https://sysapis.uniq.edu.pe/api/dev/external/ubigeos?tipo=D"
    response = requests.get(url)    
    return response.json()
def extraerProvincia(departamento):
    url = "https://sysapis.uniq.edu.pe/api/dev/external/ubigeos?tipo=P&padre="+str(departamento)
    response = requests.get(url)
    return response.json()
def extraerDistrito(provincia):
    url = "https://sysapis.uniq.edu.pe/api/dev/external/ubigeos?tipo=I&padre="+str(provincia)
    response = requests.get(url)
    return response.json()
def consultaColegios(distrito):
    url = "https://sysapis.uniq.edu.pe/api/dev/external/escuelas?ubigeo="+str(distrito)
    response = requests.get(url)
    return response.json()
def validarFechas(fecha1, fecha2):
    #Considerar la fecha2 como la que cierra el periodo entre dos fechas
    return (fecha2 - fecha1).days
def validarEtapasPreinsInsc(fecha_ini_ciclo, fecha_fin_ciclo, fecha_ini_preins, fecha_fin_preins, fecha_ini_insc, fecha_fin_insc):
    
    pass


# ·············· GENERACION DE CODIGOS PARA PROCESOS ··············
def generarCod(dni, nro_ciclo, nro_cuota,tipo_colegio):
    if tipo_colegio=='PR':
        cod = 'UCEPR'+dni+'C'+str(nro_ciclo)+'-C'+str(nro_ciclo)+'CU'+str(nro_cuota)+tipo_colegio
    else:
        cod = 'UCEPR'+dni+'C'+str(nro_ciclo)+'-'+tipo_colegio+'C'+str(nro_ciclo)+'CU'+str(nro_cuota)
    return cod

def generarPass(nombre_completo, dni):
    full_text = nombre_completo+dni
    hash_object = hashlib.sha256(bytes(full_text, encoding='utf-8'))
    hex_dig = hash_object.hexdigest()
    password = hex_dig[7]+hex_dig[17]+dni+hex_dig[37]+hex_dig[47]
    return password


def generarEmail(dni, nro_ciclo, anio):
    return dni+'C'+str(nro_ciclo)+''+str(anio)[2:4]+'@uniq.edu.pe'

#··············· INFRAESTRUCTURA ACADEMICA ····················
def escuelasProfesionales():
    url = "https://sysapis.uniq.edu.pe/api/dev/academico/escuelas-profesionales"
    response = requests.get(url)
    return response.json()
def pabellones():
    url = "https://sysapis.uniq.edu.pe/api/dev/infraestructura/pabellones"
    response = requests.get(url)
    return response.json()
def aulas():
    url = "https://sysapis.uniq.edu.pe/api/dev/infraestructura/aulas"
    response = requests.get(url)
    return response.json()




def user_directory_path(instance, filename):
    # file will be uploaded to MEDIA_ROOT/user_<id>/<filename>
    return 'user_{0}/{1}'.format(instance.user.id, filename)

def path_inscripcion(instance, filename):
    return 'docs_inscripcion/{0}_{1}{2}/{3}'.format(instance.id_inscripcion.id_compromiso_pago.id_preinscripcion.dni_persona.dni, instance.id_inscripcion.id_compromiso_pago.id_preinscripcion.dni_persona.apellido_paterno, instance.id_inscripcion.id_compromiso_pago.id_preinscripcion.dni_persona.nombres.split(' ')[0], filename)

def path_material_curso(instance, filename):
    return 'materiales-curso/{0}_{1}/{2}'.format(instance.id_horario.id_padron_cursos_grupo.id_padron_curso.nombre_curso, instance.id_horario.id_padron_cursos_grupo.id_grupo_academico.abreviacion, filename)

def path_preguntas_balota_curso(instance, filename):
    return 'balota-curso/{0}_{1}/{2}'.format(instance.id_padron_curso_grupo.id_padron_curso.nombre_curso, instance.id_padron_curso_grupo.id_grupo_academico.abreviacion, filename)

def path_comentarios_curso(instance, filename):
    return 'comentarios/{0}_{1}/{2}'.format(instance.id_horario.id_padron_cursos_grupo.id_padron_curso.nombre_curso, instance.id_horario.id_padron_cursos_grupo.id_grupo_academico.abreviacion, filename)


def path_estudiante_perfil(instance, filename):
    pass
    #return 'estudiantes-perfil/{0}{}'.format(instance.user_type.first_name, )

def render_to_pdf(template_src, context_dict={}):
    template = get_template(template_src)
    html = template.render(context_dict)
    result = BytesIO()
    pdf = pisa.pisaDocument(BytesIO(html.encode("ISO-8859-1")), result)
    if not pdf.err:
        return HttpResponse(result.getvalue(), content_type='application/pdf')
    return None

def generar_token():
    url = config('LOGIN_TESORERIA')
    # url = "https://apidemocaja.uniq.edu.pe/usuarios/auth/login"
    response = requests.post(
                    url= url, 
                    data={
                            "username": config('TESORERIA_USER'),
                            "password": config('TESORERIA_PASSWORD'),
                            "ide_eje": config('TESORERIA_EJECUTORA'),
                            "ano_eje": config('TESORERIA_ANIO'),
                            "ide_apl": 46
                        }
                )
    token = response.json()["access_token"]
    return token


def autenticate_to_and_save_token_old():
    url = config('LOGIN_TESORERIA')
    # url = "https://apidemocaja.uniq.edu.pe/usuarios/auth/login"
    response = requests.post(
                    url= url, 
                    data={
                            "username": "MAMANI5393",
                            "password": "&CEPR32024",
                            "ide_eje": 5804,
                            "ano_eje": "2023",
                            "ide_apl": 46
                        }
                )
    token = response.json()["access_token"]
    fecha_act = datetime.datetime.now().__repr__()

    with open("file_secure.txt", mode="w") as file_:
        file_.write(token+"*"+ fecha_act)
    return token, fecha_act

def review_token_from_file_old():
    # Hora actual
    now = datetime.datetime.now()
    # Leemos los datos del archivo
    with open("file_secure.txt", mode="r") as file_o:
        file_line = file_o.read()
        token = file_line.split("*")[0]
        fecha_token = file_line.split("*")[1]
    # comparamos fechas, si es menor a 24 horas (vigencia de token) se devuelve
    diff_time = now - eval(fecha_token)
    print("TOTAL DE SEGUNDOS DE DIFF", diff_time.total_seconds())
    if (diff_time).total_seconds() < 86400:
        return token, fecha_token
    else: # el token ha expirado y es necesario generar uno nuevo
        token, fecha_token = autenticate_to_and_save_token()
        return token, fecha_token


def create_cont_or_retrieve(dni, ap_paterno, ap_materno, nombres, fecha_nac):
#    # Leer la informacion del archivo para la validez del token
#    now = datetime.datetime.now()
#    with open("file_secure.txt", mode="r") as file_o:
#        file_line = file_o.read()
#        token = file_line.split("*")[0]
#        fecha_token = file_line.split("*")[1]
#        
#    # comparamos fechas, si es menor a 24 horas (vigencia de token) se devuelve
#    diff_time = now - eval(fecha_token)
#    print("TOTAL DE SEGUNDOS DE DIFF", diff_time.total_seconds())
#    if (diff_time).total_seconds() < 86400:
#        pass
#    else: # el token ha expirado y es necesario generar uno nuevo
#        token, fecha_token = autenticate_to_and_save_token()
    token = generar_token()
    print('TOKEN', token)
    
    url = config('CONSULTA_REGISTRAR_CONT')+str(dni)
    # url = "https://apidemocaja.uniq.edu.pe/contribuyente/buscar?doc_cnt="+str(dni)
    get_response = requests.get(url=url, headers={"Authorization": "Bearer "+token})
    if get_response.content == b'': # Significa que no encuentra el objeto
        # Registramos el contribuyente
        body = {
            "nro_doc": str(dni),
            "pat_per": ap_paterno,
            "mat_per": ap_materno,
            "nom_per": nombres,
            "fch_nac": fecha_nac,
            "ide_doc": int(4)
            }
        # body = json.dumps(body)
        # body = json.loads(body)
        post_url = config('REGISTRAR_CONT')
        # post_url = "https://apidemocaja.uniq.edu.pe/contribuyente/buscar"
        headers={
            "Authorization": "Bearer "+ token
        }
        post_response = requests.post(url=post_url, json=body, headers=headers)
        main_data = post_response.json()["ide_cnt"]
        return main_data
    else:
        main_data = get_response.json()["ide_cnt"]
        return main_data
    
def obtener_deudas_cepre(dni: str, fecha_inicio_busqueda, pagadas_parcialmente=False):
    url = config('BUSCAR_CONT_DNI')+dni
    token = generar_token()
    get_response = requests.get(url=url, headers={"Authorization": "Bearer "+token})
    lista_deudas = get_response.json()['det_deu']
    retval = []
    for deuda in lista_deudas:
        fecha_deuda = deuda['fch_deu']
        if fecha_deuda == None: continue
        try:
            print('Fi', fecha_inicio_busqueda)
            fecha_deuda = datetime.datetime.strptime(fecha_deuda, '%d/%m/%Y').date()
            #print('FD', fecha_deuda)
            #print('FI vs FD', fecha_inicio_busqueda, fecha_deuda, \
            #    fecha_deuda < fecha_inicio_busqueda)
            if fecha_deuda < fecha_inicio_busqueda: continue
        except Exception as ex:
            print('EX', str(ex))
            continue

        #print('DEUDA', deuda)
        detalle_deuda = deuda['det_all_deu']
        #print('CAJA_DET_DEUDA', detalle_deuda)
        agregar_deuda = False
        for d in detalle_deuda:
            print('X', d['ide_esp'], config('TESORERIA_PARTIDA_CEPRE'))
            if str(d['ide_esp']) != str(config('TESORERIA_PARTIDA_CEPRE')):
                continue

            print('TOT_PAG', d['imp_tot_pag'])

            if pagadas_parcialmente and float(d['imp_tot_pag'])==0:
                continue

            agregar_deuda = True
            break

        if agregar_deuda: retval.append(deuda)
    return retval        


def extract_data_debt(dni: str):
#    now = datetime.datetime.now()
#    with open("file_secure.txt", mode="r") as file_o:
#        file_line = file_o.read()
#        token = file_line.split("*")[0]
#        fecha_token = file_line.split("*")[1]
#        
#    # comparamos fechas, si es menor a 24 horas (vigencia de token) se devuelve
#    diff_time = now - eval(fecha_token)
#    print("TIEEPO",diff_time)
#    # print("TOTAL DE SEGUNDOS DE DIFF", diff_time.total_seconds())
#    if (diff_time).total_seconds() < 86400:
#        pass
#    else: # el token ha expirado y es necesario generar uno nuevo
#        token, fecha_token = autenticate_to_and_save_token()
    url = config('BUSCAR_CONT_DNI')+dni
    token = generar_token()
    #print('TOKEN', token)
    # url = "https://apidemocaja.uniq.edu.pe/contribuyente/cta-cte?doc_cnt="+dni
    get_response = requests.get(url=url, headers={"Authorization": "Bearer "+token})
    # print("TEXT", get_response.text)
    #print("JSON", get_response.json())
    list_of_debts = get_response.json()['det_deu'][0]['det_all_deu']
    list_of_debts = sorted(list_of_debts, key=lambda p: p['ide_ddd'])
    return list_of_debts

    # for i in list_of_debts:
    #     k = json.dumps(i)
    #     m = json.loads(k)
    #     print("BEGIN HERE", m, m['imp_tot_sld'], m['imp_tot_pag']=="0.00" )


# print(create_cont_or_retrieve("32138720", "CHANG", "RONDÁN", "SANDRA FLORENCIA", "2000-01-01"))
