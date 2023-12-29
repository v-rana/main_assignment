from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from nltk import ngrams
import json
# Create your views here.
@csrf_exempt
def ngram_comparison(request):
    if request.method !='POST':
        return JsonResponse({'error':'type error in the request method'})
    
    
    raw_data = request.body.decode('utf-8')
    
    # Deserialize the JSON data
    json_data = json.loads(raw_data)
    
   
    text1 = json_data.get('text1', '')
    text2 = json_data.get('text2', '')
    n=2
    ngrams_1 = set(ngrams(text1.lower().split(),n))
    ngrams_2 = set(ngrams(text2.lower().split(),n))

    intersection = len(ngrams_1.intersection(ngrams_2))
    union = len(ngrams_1) + len(ngrams_2) - intersection
    similarity = intersection/union if union!=0 else 0
    
    context = {}
    context['text1'] = text1
    context['text2'] = text2
    context['similarity'] = similarity
    return JsonResponse(context)


