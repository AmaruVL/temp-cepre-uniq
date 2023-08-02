from app.models import *

class CuotaPagadaException(Exception):
    def __init__(self, cuota, mensaje=''):
        self.cuota = cuota
        if mensaje == '':
            mensaje = 'La cuota del registro '+str(cuota) + \
                ' figura como pagada'
        super().__init__(mensaje)
        

class YaInscritoException(Exception):
    def __init__(self, message='El postulante se encuentra ya preinscrito'):
        super().__init__(self, message)

class DocumentoPresentadoxception(Exception):
    def __init__(self, di, message=''):
        if message == '':
            message = 'El documento '+str(di.nombre_documento) + ' ya fue presentado'
        super().__init__(self, message)
