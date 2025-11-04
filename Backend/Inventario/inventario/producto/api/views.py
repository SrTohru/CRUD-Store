from rest_framework import viewsets
from producto.models import Producto
from .serializers import ProductSerializer

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductSerializer