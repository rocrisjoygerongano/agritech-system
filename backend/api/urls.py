from django.urls import path, include

urlpatterns = [
    path('farms/', include('farms.urls')),
    path('readings/', include('monitoring.urls')),
    path('recommendations/', include('recommendations.urls')),
]