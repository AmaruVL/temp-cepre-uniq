"""cepru URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from unicodedata import name
from django.contrib import admin
from django.urls import path, include
#from .router import router
from app.views import *
#from app.preinscripcion2 import *
from django.conf.urls.static import static
from cepru import settings
from rest_framework import routers
from app import views
from app.modal_views import *
# swagger items
from django.urls import re_path
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
   openapi.Info(
      title="Open API CEPRE - UNIQ",
      default_version='v1',
      description="Documentation Cepre - Uniq - 2022",
    #   terms_of_service="https://www.google.com/policies/terms/",
    #   contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

router = routers.DefaultRouter()
router.register("inscripcion_doc", views.DocumentosInscripcionViewset, basename="doc_inscripcion")
router.register("ver-docsxd", views.MaterialCursoViewset, basename="xd")
router.register("ver-docsxdaA", views.ComentariosClaseViewset, basename="xds")

import os
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/',include(router.urls)),
# ············ REGION EXTERNO ··············· {{{
    path('swagger/schema/', schema_view.with_ui('swagger', cache_timeout=0), name="swagger-schema"),
    path('api/administracion/login', login, name= 'administracion_login'),

    path('colegios', colegio_list.as_view(), name= 'colegio_list'),
    path('colegios/<int:pk>', colegio_rud.as_view(), name= 'colegio_rud'),

    path('personas', persona_list.as_view(), name= 'docente_list'),
    path('personas/<int:pk>', persona_rud.as_view(), name= 'docente_rud'),
# ············ ENDREGION EXTERNO ··············· }}}
# ············ REGION PIDE ··············· {{{
    path('consulta_persona', consulta_persona, name='consulta_persona'),
# ············ ENDREGION PIDE ··············· }}}
# ············ REGION INFRAESTRUCTURA ··············· {{{
    path('grupos-academicos', grupo_academico_list.as_view(), name= 'grupo_academico_list'),
    path('grupos-academicos/<int:pk>', grupo_academico_rud.as_view(), name= 'grupo_academico_rud'),

    path('escuelas-profesionales', escuela_profesional_list.as_view(), name= 'escuela_profesional_list'),
    path('escuelas-profesionales/<int:pk>', escuela_profesional_rud.as_view(), name= 'escuela_profesional_rud'),

    path('sedes', sede_list.as_view(), name= 'sede_list'),
    path('sedes/<int:pk>', sede_rud.as_view(), name= 'sede_rud'),

    path('pabellones', pabellon_list.as_view(), name= 'pabellon_list'),
    path('pabellones/<int:pk>', pabellon_rud.as_view(), name= 'pabellon_rud'),

    path('aulas', verAulas.as_view(), name= 'aula_list'),
    path('aulas/<int:pk>', aula_rud.as_view(), name= 'aula_rud'),
# ············ END REGION INFRAESTRUCTURA ··············· }}}
# ············ REGION CICLO ··············· {{{
    path('ciclos', ciclo_list.as_view(), name= 'ciclo_list'),
    path('ciclos/<int:pk>', ciclo_rud.as_view(), name= 'ciclo_rud'),

    path('documentos-publicacion', documento_publicacion_list.as_view(), name= 'documento_publicacion_list'),
    path('documentos-publicacion/<int:pk>', documento_publicacion_rud.as_view(), name= 'documento_publicacion_rud'),

# ············ END REGION CICLO ··············· }}}
# ············ REGION INSCRIPCION ··············· {{{
    path('pagos', pago_list.as_view(), name= 'pago_list'),
    path('pagos/<int:pk>', pago_rud.as_view(), name= 'pago_rud'),

    path('detalles-pago', detalle_pago_list.as_view(), name= 'detalle_pago_list'),
    path('detalles-pago/<int:pk>', detalle_pago_rud.as_view(), name= 'detalle_pago_rud'),

    path('preinscripciones', preinscripcion_list.as_view(), name= 'preinscripcion_list'),
    path('preinscripciones/<int:pk>', preinscripcion_rud.as_view(), name= 'preinscripcion_rud'),

    path('compromisos-pago', compromiso_pago_list.as_view(), name= 'compromiso_pago_list'),
    path('compromisos-pago/<int:pk>', compromiso_pago_rud.as_view(), name= 'compromiso_pago_rud'),

    path('detalles-compromiso-de-pago', detalle_compromiso_de_pago_list.as_view(), name= 'detalle_compromiso_de_pago_list'),
    path('detalles-compromiso-de-pago/<int:pk>', detalle_compromiso_de_pago_rud.as_view(), name= 'detalle_compromiso_de_pago_rud'),

    path('inscripciones', inscripcion_list.as_view(), name= 'inscripcion_list'),
    path('inscripciones/<int:pk>', inscripcion_rud.as_view(), name= 'inscripcion_rud'),

    path('docentes', docente_list.as_view(), name= 'docente_list'),
    path('docentes/<int:pk>', docente_rud.as_view(), name= 'docente_rud'),

    path('administradores', admin_list.as_view(), name= 'admin_list'),
    path('administradores/<int:pk>', admin_rud.as_view(), name= 'admin_rud'),
    
    path('usuarios', user_list.as_view(), name= 'user_list'),
    path('usuarios/<int:pk>', user_rud.as_view(), name= 'user_rud'),


# ············ END REGION INSCRIPCION ··············· }}}
# ············· REGION CURSOS ······················ {{{
    path('padron-cursos', padron_curso_list.as_view(), name= 'padron_curso_list'),
    path('padron-cursos/<int:pk>', padron_curso_rud.as_view(), name= 'padron_curso_rud'),
    # ············· REGION CONFIG ······················ {{{
    path('config-list', tabla_configuraciones_list.as_view(), name= 'config-list_list'),
    path('config-list/<int:pk>', tabla_configuraciones_rud.as_view(), name= 'config-list_rud'),

    path('padron-cursos-grupo', padron_cursos_grupo_list.as_view(), name= 'padron_cursos_grupo_list'),
    path('padron-cursos-grupo/<int:pk>', padron_cursos_grupo_rud.as_view(), name= 'padron_cursos_grupo_rud'),

    path('horarios', horario_list.as_view(), name= 'horario_list'),
    path('horarios/<int:pk>', horario_rud.as_view(), name= 'horario_rud'),

    path('horario-cursos', horario_curso_list.as_view(), name= 'horario_curso_list'),
    path('horario-cursos/<int:pk>', horario_curso_rud.as_view(), name= 'horario_curso_rud'),
# ············· ENDREGION CURSOS ······················ }}}
# ············· REGION ESTUDIANTE ······················ {{{
    path('estudiantes', estudiante_list.as_view(), name= 'estudiante_list'),
    path('estudiantes/<int:pk>', estudiante_rud.as_view(), name= 'estudiante_rud'),

    path('estudiantes-horario', estudiante_horario_list.as_view(), name= 'estudiante_horario_list'),
    path('estudiantes-horario/<int:pk>', estudiante_horario_rud.as_view(), name= 'estudiante_horario_rud'),

    path('asistencias-estudiante', asistencia_estudiante_list.as_view(), name= 'asistencia_estudiante_list'),
    path('asistencias-estudiante/<int:pk>', asistencia_estudiante_rud.as_view(), name= 'asistencia_estudiante_rud'),
# ············· ENDREGION ESTUDIANTE ······················ }}}
# ············· REGION ASISTENCIA DOCENTE ······················ {{{
    path('asistencias-docente', asistencia_docente_list.as_view(), name= 'asistencia_docente_list'),
    path('asistencias-docente/<int:pk>', asistencia_docente_rud.as_view(), name= 'asistencia_docente_rud'),
# ············· ENDREGION ASISTENCIA DOCENTE ······················ }}}
# ············· REGION EXAMENES ······················ {{{
    path('examenes', examen_list.as_view(), name= 'examen_list'),
    path('examenes/<int:pk>', examen_rud.as_view(), name= 'examen_rud'),

    path('examenes-estudiante', examen_estudiante_list.as_view(), name= 'examen_estudiante_list'),
    path('examenes-estudiante/<int:pk>', examen_estudiante_rud.as_view(), name= 'examen_estudiante_rud'),

    path('estudiante-notas-por-curso', estudiante_notas_por_curso_list.as_view(), name= 'estudiante_notas_por_curso_list'),
    path('estudiante-notas-por-curso/<int:pk>', estudiante_notas_por_curso_rud.as_view(), name= 'estudiante_notas_por_curso_rud'),
# ············· ENDREGION EXAMENES ······················ }}}

# ············· REGION TESORERIA ······················ {{{
    path('tesoreria', registro_tesoreria_list.as_view(), name= 'tesoreria_list'),
    path('tesoreria/<int:pk>', registro_tesoreria_rud.as_view(), name= 'tesoreria_rud'),
# ············· ENDREGION TESORERIA ······················ }}}

# ············· REGION CONFIGS ······················ {{{
    path('config', configuracion_list.as_view(), name= 'config_list'),
    path('config/<int:pk>', configuracion_rud.as_view(), name= 'config_rud'),
# ············· ENDREGION CONFIGS ······················ }}}

# ············· REGION PROCESOS ······················ }}}
    # ········· PREINSCRIPCION ···········
    path('inicio-preinscripcion', preinscripcionListCreateAPIView.as_view()),
    path('inicio-preinscripcion/<int:pk>', preinscripcionListCreateAPIView.as_view()),
    path('update-preinscripcion', preinscripcion_update),
    path('update-preinscripcion/<int:pk>', preinscripcion_update),

    path('preinscripciones/<int:pk>', eliminar_preinscripcion_incompleta.as_view()),

    ##########################################################################
    path('eliminar-reg-incompleto/<int:pk>', eliminar_preinscripcion_incompleta.as_view()),
    ##########################################################################
    # ········· VALIDACION DNI ···········
    path('procesovalidaciondni', validacionConsultaDNI.as_view()),
    path('procesovalidaciondni2', validacionConsultaDNI2.as_view()),
    # ········· COMPROMISOS DE PAGO  ···········
    path('compromisospago', compromisoPagoView.as_view()),
    # ········· DETALLE COMPROMISOS DE PAGO ···········
    path('detallecompromisopago', detalleCompromisoPagoView.as_view()),
    path('detallecompromisopago/<int:pk>', detalleCompromisoPagoView.as_view()),
    path('ver-pagos-ciclo/<int:id_ciclo>', verPagosCiclo.as_view()),
    path('modal', verModal.as_view()),

    # ········· INSCRIPCION ···········
    #validacion de dni y fecha_nacimiento
    path('verificar_preinscripcion', validacion_preinscripcion.as_view()),
    
    #SUBIR DOCUMENTOS
    path('inscripcion/subir-docs/<int:pk>', subirDocumentosInsc),
    
# ············· ENDREGION PROCESOS ······················ }}}
    path('ubigeoDep', ubigeoDepartamento.as_view()),
    path('ubigeoProv/<ubigeo_>', ubigeoProv.as_view()),
    path('ubigeoDist/<prov>', ubigeoDist.as_view()),
    path('ubigeColegio/<distr>/<tipo>', UbigeoColegio.as_view()),
    path('recuperarUbigeos/<distrito>', recuperarUbicacion.as_view()),

    
    path('actualizar-pagos', actualizarPagos.as_view()),
    path('ver-compromisos/<int:ciclo>', verCompromisosPago.as_view()),
    path('ver-compromisos-detalle/<int:ciclo>', verCompromisosDetalle.as_view()),
    path('detalle-compromiso/<int:pk>', verDetalleCompromisosPago.as_view()),
    path('aprobar-documentos', aprobarDocumentosInscripcion.as_view()),
    path('aprobar-documentos/<int:pk>', aprobarDocumentosInscripcion.as_view()),
    path('requisitos/<int:ciclo>', documentosRequisito.as_view()),


    #ADMIN FIELD
    path('proceso-ciclo', procesoCiclo.as_view()),
    path('proceso-ciclo/eliminar/<int:pk>', eliminarCiclo.as_view()),
    path('proceso-ciclo/<int:pk>', procesoCiclo.as_view()),
    #PADRON DE CURSOS (LISTAR-DETALLE-CREAR-ACTUALIZAR-ELIMINAR)
    path('padron-curso', padronCursosGeneral.as_view()),
    path('padron-curso/<int:pk>', padronCursosGeneral.as_view()),
    path('padron-curso/<activo>', padronCursosGeneral.as_view()),
    #PADRON DE CURSOS POR GRUPO
    path('padron-curso-grupo', padronCursoGrupo.as_view()),
    path('padron-curso-grupo/<int:pk>', padronCursoGrupo.as_view()),
    path('padron-curso-grupo/grupo/<grupo>', padronCursoGrupo.as_view()),
    path('curso-grupo/activos', verPadronCursosActivos.as_view()),
    path('curso-grupo/actualizar-nro-preguntas', actualizarNroPreguntasExamen.as_view()),
    #EXAMENES
    path('examen/<int:ciclo>', programarExamen.as_view()),
    path('examen/crear-nuevo/<int:anio_ciclo>/<int:nro_ciclo>/<tipo_examen>', crearExamenNuevo.as_view()),
    path('examen/<int:ciclo>/<int:pk>', programarExamen.as_view()),
    path('examen/ver-ciclos/<int:anio>', verCiclosAnio.as_view()),
    path('examen-grupo-lista/<int:ciclo>', listarDetalleExamenGrupo.as_view()),
    path('examen-grupo-lista/preguntas/<int:pk_examen>/<int:pk_curso_grupo>', verPreguntasExamenCrear.as_view()),
    path('examen-grupo-lista/<int:ciclo>/<int:pk>', listarDetalleExamenGrupo.as_view()),
    path('examen-grupo/ver-examenes-grupo/<int:examen_pk>', verExamenesGrupo.as_view()),
    path('crear-examen-grupo/<int:pk>', crearExamenGrupoPreguntas.as_view()),
    path('examen/actualizar-estado/<int:pk>', actualizacionEstadoExamen.as_view()),
    path('examen-grupo/limpiar-preguntas/<int:pk>', limpiarPreguntasExamen.as_view()),
    path('examen/eliminar-registro/<int:pk>', eliminarExamenPadre.as_view()),
    #EXAMEN MANUAL
    path('crear-examen-grupo/manual/<int:examen_pk>', crearExamenGrupoManual.as_view()),
    path('crear-examen-grupo/manual/<int:examen_pk>/<int:curso_pk>', crearExamenGrupoManual.as_view()),
    path('crear-examen-grupo/manual/<int:pk>', crearExamenGrupoManual.as_view()),
    path('crear-examen-grupo/manual', crearExamenGrupoManual.as_view()),
    
    #HORARIO (LISTAR-DETALLE-CREAR-ACTUALIZAR-ELIMINAR)
    #CREAR UN HORARIO
    path('horario/ciclo', horarioCurso.as_view()),
    #LISTA DE HORARIOS POR CICLO
    path('horario/ciclo/<int:ciclo>', horarioCurso.as_view()),
    # DETALLES - ACTUALIZAR Y ELIMINAR
    path('horario/ciclo/<int:ciclo>/<int:pk>', horarioCurso.as_view()),
    #LISTAR DOCENTES SEGUN CURSO
    path('horario/ciclo/docentes-curso/<int:id_curso_grupo>', consultaDocenteSegunCurso.as_view()),
    #LISTAR AULAS SEGUN GRUPO ACADEMICO
    path('horario/ciclo/consulta-aula/<int:id_curso_grupo>/<int:id_ciclo>', verAulasSegunCurso.as_view()),
    #FILTRAR HORARIOS POR CICLO Y GRUPO
    path('horario/ciclo/grupo-academico/<int:id_ciclo>/<int:id_ga>', verHorariosCiclo.as_view()),
    #FILTRAR CURSOS GRUPO POR GRUPO
    path('horario/grupo-academico/ver-cursos/<int:id_ga>', verCursosGrupoxGrupo.as_view()),
    #HORARIO-CURSO (DETALLES DE SESION) (LISTAR-DETALLE-CREAR-ACTUALIZAR-ELIMINAR)
    #path('horario-curso', HorarioCursoConDetalle.as_view()),    
    path('horario-curso', horarioCursoConDias.as_view()),
    path('horario-curso/<int:pk>', horarioCursoConDias.as_view()),
    path('horario-curso-reset/<int:pk>', eliminar_asistencia_docente.as_view()),
    #CONSULTAS
    #PREINSCRIPCIONES
    path('consultas/preinscripciones', preinscripciones.as_view()),
    path('consultas/preinscripciones/<int:id_ciclo>', preinscripciones.as_view()),
    #INSCRPCIONES
    path('consultas/inscripciones', inscripciones.as_view()),
    path('consultas/inscripciones/<int:id_ciclo>', inscripciones.as_view()),
    #Estudiantes
    path('consultas/estudiantes', estudiantes.as_view()),
    path('consultas/estudiantes/<int:id_ciclo>', estudiantes.as_view()),

    
    path('consultas/inscripciones/documentos-insc/<int:pk>', verDocumentosPorEstudiante.as_view()),
    path('consultas/asistencia/estudiante', reporteAsistenciaEstudiante.as_view()),
    # path('consultas/preinscripciones', preinscripciones.as_view()),
    # path('consultas/preinscripciones', preinscripciones.as_view()),
    # path('consultas/preinscripciones', preinscripciones.as_view()),
    # path('consultas/preinscripciones', preinscripciones.as_view()),
    # path('consultas/preinscripciones', preinscripciones.as_view()),
    # path('consultas/preinscripciones', preinscripciones.as_view()),

    #DISTRIBUIR ESTUDIANTES
    path('asignar-estudiantes/ver-grupos', verGruposAcademicos.as_view()),
    path('asignar-estudiantes/ver-aulas', verAulas.as_view()),
    path('asignar-estudiantes/<int:id_aula>', asignarEstudiantesAula.as_view()),
    path('asignar-estudiantes/consulta-estudiantes-aula/<int:ciclo>/<int:grupo_academico>/<int:aula>', consultaEstudiantesAula.as_view()),
    #············· PAGOS ···························
    path('ciclos-activo', cicloActivo.as_view()),
    path('horario/ciclos-activos', cicloParaHorario.as_view()),
    path('pagos-ciclo/<int:pk>', listadoPagosCiclo.as_view()),
    path('pago-test', definirPago.as_view()),
    #············· DETALLE PAGOS ···························
    path('detalle-pago-lista/<int:pk>', listaDetallePago_porPago.as_view()),
    path('detalle-pago-test', detalle_pago_algo.as_view()),
    path('detalle-pago-test/<int:pk>', detalle_pago_algo.as_view()),

    path('add-rows/<int:pk>', addPagos.as_view()),
    path('delete-rows/<int:pk>', deletePagos.as_view()),
    path('eliminar-pago-con-detalles/<int:pk>', eliminarPagoConDetalles.as_view()),
    #APROBAR DOCUMENTOS
    path('aprobar-documentos-insc/<int:pk>', revisarDocumentosAdmin),
    path('ver-documentos-por-inscrito/<int:pk>', documentos_inscripcion_por_id.as_view()),
    #ENVIAR INFORMACION AL POSTULANTE
    path('enviar-info-correo/<int:pk>', postRevision.as_view()),
    #---------------------- DOCENTES -------------------
    #PANEL DOCENTE
    path('docente/inicio/<int:pk>', inicioDocente.as_view()),
    path('docente/detalle-curso/<int:pk>',seleccionarCurso.as_view()),
    path('docente/sesion-clase',sesionClase.as_view()),
    #ASISTENCIA
    path('docente/asistencia/generar-asistencia/<int:pk>', generarAsistencias.as_view()),
    path('docente/asistencia-curso/<int:ciclo>/<int:pk>',verAsistenciaCurso.as_view()),
    path('docente/asistencia-curso/<int:ciclo>',verAsistenciaCurso.as_view()),
    path('docente/asistencia/tomar-asistencia/<int:pk>', registrarAsistencia.as_view()),
    path('docente/asistencia/registrar-asistencia/<int:id_horario>', actualizarAsistenciaDocente.as_view()),
    #MATERIAL CURSOS
    path('docente/material-curso/<int:horario>/<int:pk>', materialCurso.as_view()),
    path('docente/material-curso/<int:horario>', materialCurso.as_view()),
    path('docente/material-curso', materialCurso.as_view()),
    #COMENTARIOS CLASE
    path('docente/comentarios/<int:horario>/<int:pk>', comentariosClase.as_view()),
    path('docente/comentarios/<int:horario>', comentariosClase.as_view()),
    path('docente/comentarios', comentariosClase.as_view()),
    #BALOTA DE PREGUNTAS
    path('docente/balotario/preguntas/<int:curso_grupo>', balotaCurso.as_view()),
    path('docente/balotario/preguntas/<int:curso_grupo>/<int:pk>', balotaCurso.as_view()),
    #ALTERNATVAS A BALOTARIO
    path('docente/alternativas/<int:balota>', alternativasBalotario.as_view()),
    path('docente/alternativas/<int:balota>/<int:pk>', alternativasBalotario.as_view()),
    #CONSULTA ASISTENCIA 
    path('docente/asistencia/consulta-estudiantes-curso/<int:id_horario>', consultaEstudiantesCurso.as_view()),
    path('docente/asistencia/consulta-asistencia-fechas/<int:id_estudiante>', consultarAsistenciaDeEstudiante.as_view()),
    path('docente/asistencia/lista-estudiantes/<int:id_horario>',verListaEstudiantesAsistencia.as_view()),
    path('docente/asistencia/lista-asistencia/modificar-asistencia/<int:pk>', actualizarAsitenciaFueraFecha.as_view()),

    #HORARIO
    path('docente/actualizar-horario/<int:pk>', horarioActualizar.as_view()),
    #----------------------- ESTUDIANTES -------------------
    #PANEL ESTUDIANTE
    path('estudiante/inicio/<int:pk>', inicioEstudiante.as_view()),
    path('estudiante/curso/<int:pk>', seleccionarCursoEstudiante.as_view()),
    #COMENTARIOS
    path('estudiante/comentarios/<int:horario>', comentariosClaseEstudiante.as_view()),
    path('estudiante/comentarios/<int:horario>/<int:pk>', comentariosClaseEstudiante.as_view()),
    #MATERIAL CURSOS
    path('estudiante/material-curso/<int:horario>', materialCursoEstudiante.as_view()),
    path('estudiante/material-curso/<int:horario>/<int:pk>', materialCursoEstudiante.as_view()),    
    #CONSULTAS PAGOS-NOTAS-ASISTENCIAS
    path('estudiante/notas/<int:pk>',verNotasEstudiante.as_view()),
    path('estudiante/pagos/<int:pk>', verPagosEstudiante.as_view()),
    path('estudiante/asistencia/<int:pk>', verAsistenciaEstudiante.as_view()),
    #CONSULTA ASISTENCIA
    path('estudiante/asistencia/consulta-asistencia-fechas/<int:id_estudiante>/<int:id_horario>',consultarAsistenciaEstudiante.as_view()),

    #SINCRONIZADORES
    path('sincronizar/escuelas-profesionales', sincronizarEEPP),
    path('sincronizar/pabellones', sincronizarPabellones),
    path('sincronizar/aulas' ,sincronizarAulas),
    
    #REGISTRAR DOCENTE
    path('registro/docentes', registrarDocente.as_view()),
    path('registro/docentes/<int:pk>', registrarDocente.as_view()),

    #REGISTRAR ADMINISTRADOR 
    path('registro/administradores', registrarAdmin.as_view()),
    path('registro/administradores/<int:pk>', registrarAdmin.as_view()),

    #CONSULTA DNI
    path('consulta/personas/<dni>', consultaPersonaDNI.as_view()),

    path('prueba', algo.as_view()),
    path('crearUser', crearUser.as_view()),
    #SEND EMAIL
    path('preinscripcion/enviar-resumen/<int:pk>', enviarEmailPreinscripcion.as_view()),
    #RETURN CREDENTIALS DOCENTE Y ESTUDIANTE
    path('credenciales-docente', credencialesUserDocente.as_view()),
    path('credenciales-estudiante', credencialesUserEstudiante.as_view()),
    #VER CREDENCIALES ADMIN
    path('credenciales-admin', verificar_token_uniq.as_view()),
    path('administrador/exportar-datos/<int:ciclo>/<fechaini>/<fechafin>', exportarEstudiantes.as_view()),
    path('ver-docsxd', MaterialCursoViewset),
    #DOCUMENTOS REQUISITO
    path('documentos-requisito', documentosRequisito.as_view()),
    path('documentos-requisito/<int:pk>', documentosRequisito.as_view()),
    path('nrociclo-anio/<int:anio>', calcularNroCicloAnio.as_view()),
    path('crear-ciclos-turno', creacionCiclo.as_view()),
    path('crear-ciclos-turno/<int:pk>', creacionCiclo.as_view()),
    path('consulta-requisitos/<int:id_ciclo>', verRequisitosCiclo.as_view()),

    #EXAMENES - VER PREGUNTAS - VER ALTERNATIVAS
    path('examen/ver-preguntas/<int:id_examen>', verPreguntasExamen.as_view()),
    path('examen/ver-preguntas/<int:id_examen>/<int:id_pregunta>', verPreguntasExamen.as_view()),
    
    path('examen/preguntas/ver-alternativas/<int:id_balota>', verAlternativasPregunta.as_view()),
    #SUBIR NOTAS ADMISION
    path('examen/parcial/subir-notas/ver-ciclos', verCiclosActivosPublicadosExamen.as_view()),
    path('examen/parcial/subir-notas/ver-ciclos/unit', verCiclosActivosPublicadosExamenNro.as_view()),
    
    path('examen/parcial/subir-notas/<anio_ciclo>/<nro_ciclo>/<nro_examen>', notasExamenCSV.as_view()),
    path('examen/parcial/consulta-examen-ciclo/<int:id_ciclo>', verExamenesCiclo.as_view()),
    path('examen/consulta/examenes-registrado/<int:id_ciclo>/<tipo_exam>',verExamenesCicloParcialSimulacro.as_view()),
    path('estudiante/ver-notas/<int:id_estudiante>',verNotasExamenEstudiante.as_view()),

    #DESCARGAR Y VER PDF
    path('inscripcion/ver-resumen/<int:pk>', viewPDF.as_view(), name='ver-pdf'),
    path('inscripcion/descargar-resumen/<int:pk>', descargarPDF.as_view(), name='descargar-pdf'),
    path('inscripcion/prueba-resumen/<int:pk>', prueb.as_view(), name='descargar-pdf-prueb'),

    #ASISTENCIA DOCENTE DESDE ADMIN
    path('asistencia-docente/ver/ciclo/<int:id_ciclo>', verHorariosCicloAdmin.as_view()),
    path('asistencia-docente/ver/horario/<int:id_horario>', asistenciaDocenteAdministrador.as_view()),
    path('asistencia-docente/modificar/registro/<int:pk>', asistenciaDocenteAdministrador.as_view()),
    
    #CONSULTAS DE ADMINISTRADOR
    path('consultas/ver-preinscripciones/<int:id_ciclo>',consultaPreinscripcion.as_view()),
    path('consultas/ver-preinscripciones/<int:id_ciclo>/<int:id_escuela_prof>',consultaPreinscripcion.as_view()),
    path('consultas/ver-preinscripciones-pdf/<int:id_ciclo>',consultaPreinscripcionPDF.as_view()),
    path('consultas/ver-preinscripciones-pdf/<int:id_ciclo>/<int:id_escuela_prof>',consultaPreinscripcionPDF.as_view()),
    path('consultas/ver-inscripciones/<int:id_ciclo>', consultaInscripcionConFiltros.as_view()),
    path('consultas/ver-estudiantes/<int:id_ciclo>', consultaEstudiantes.as_view()),
    path('consultas/ver-estudiantes/<int:id_ciclo>/<int:id_escuela_prof>', consultaEstudiantes.as_view()),
    path('consultas/ver-estudiantes/cantidad-escuelas/<int:id_ciclo>', consultaVerCantidadEstudiantesEscuelaProf.as_view()),

    path('generar-asistencia-docente/<int:pk>', generarAsistenciaDocente.as_view()),
    path('probando-fecha', fechaxd.as_view()),
    path('probar-pdfkit/<int:pk>', viewPDFNuevo.as_view()),

    #EXAMENES DE ESTUDIANTES EN PANEL ETUDIANTE
    path('estudiante/examenes/<int:id>', accederExamenEstudiante.as_view()),
    path('administrador/ver-examenes/ciclo/<int:id>', verExamenesPorCiclo.as_view()),
    path('administrador/ver-examen-ciclo', examenesCicloDetalle.as_view()),
    path('tiempo', prasc.as_view()),

    #ULTIMOS CAMBIOS
    path('administrador/examen/lanzar-examen/<int:id>', lanzarExamenAdminitrador.as_view()),
    path('estudiante/examen/ver-examenes/<int:id>', accederExamenEstudiante.as_view()),
    path('estudiante/examen/detalle-examen/<int:id_estudiante>/<int:id_examen>', obtenerExamenGrupoActual.as_view()),
    path('estudiante/examen/iniciar-examen/<int:id_est>/<int:id_examen_grupo>', estudianteIniciarExamen.as_view()),


    #PATH ULTIMOS CAMBIOS DE ADMIN
    path('administrador/examen/ver-examenes-ciclo/<int:id>', verExamenesPorCiclo.as_view()),
    path('administrador/examen/ver-examen/ciclo/<int:id_ciclo>', verExamenesPerCiclo.as_view()),


    #ULTIMOS CAMBIOS DE ESTUDIANTE
    path('estudiante/examen/resolver-examen/<int:id_estudiante>/<int:id_examen_grupo>', ingresarAlExamen.as_view()),
    path('estudiante/examen/proceso-examen-curso/<int:id_examen_grupo>', calificacionCiclicaPreguntas.as_view()),


    # NUEVOS PATHS
    path("consulta/ciclos/unit/test", verCiclosActivosPublicadosExamenNroTest.as_view()),
    path("consulta/resultados-examen/<int:anio_ciclo>/<int:nro_ciclo>/<int:id_examen>/<flag>", verExamenesCalificadosEstudiantes.as_view()),
    path("consulta/resultados-examen/<int:anio_ciclo>/<int:nro_ciclo>/<int:id_examen>", verExamenesCalificadosEstudiantes.as_view()),
    path("consulta/examenes-rendidos/ver-examenes/<int:id>", verExamenesActivosPorCiclo.as_view()),
    path("administrador/examenes/cerrar-examen/<int:pk>", actualizacionEstadoExamenGeneral.as_view()),
    path("administrador/consultas/ver-estudiantes-aula/<int:id_ciclo>/<int:id_aula>", consultaEstudiantesAul.as_view()),
    path("administrador/consultas/ver-horarios-aula/<int:id_ciclo>/<int:id_aula>", consultaHorariosAula.as_view()),
    path("administrador/consultas/ver-asistencia-docente-por-ciclo/<int:id_ciclo>", verAsistenciaDocentes.as_view()),

    path("administrador/consultas/ver-horarios-ciclo/<int:id_docente>/<int:id_ciclo>",consulta_horarios_docente.as_view()),
    path("administrador/consultas/ver-asistencia-docente/<int:id_horario>", verAsistenciaDocentesPorHorario.as_view()),

    #! TESORERIA
    path("prueba-tesoreria", crearDeudas.as_view()),
    path("send-data/<int:pago_det>", proveTesoreriaEndPoint.as_view()),

    # ULTIMOS CAMBIOS
    path("preinscripcion/agregar-colegio", agregarColegio.as_view()),
    

    path("agregar-cursos-docente", docenteCursoAPI.as_view()),
    path("agregar-cursos-docente/<int:pk>", docenteCursoAPI.as_view()),

    path("resumen-preinscripcion/<int:id_ciclo>", resumenCicloPreinscritos.as_view()),
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
