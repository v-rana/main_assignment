from django.contrib import admin
from django.urls import path
from main_function.views import ngram_comparison


urlpatterns = [
    # path('admin/', admin.site.urls),
    path('api/ngram-comparison/', ngram_comparison, name='ngram_comparison'),
]