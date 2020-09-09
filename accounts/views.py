from django.shortcuts import render, redirect
from django.contrib.auth import login, logout
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm

def loginPage(request):
    form = AuthenticationForm(request, request.POST or None)
    if form.is_valid():
        # user = form.save() 에러남 없는함수
        user = form.get_user()
        login(request, user)
        return redirect('/')
    context={'form':form}
    return render(request, 'form.html', context)


def logoutPage(request):
    logout(request)
    return redirect('/')


def registerPage(request):
    form = UserCreationForm(request.POST or None)

    if form.is_valid():
        user = form.save(commit=True)
        login(request, user)
        return redirect('/')

    context={'form':form}
    return render(request, 'form.html', context)



# from api.models import Country
# from django.http import HttpResponse
# def createNation(request,country):
#     print(country)
#     Country.objects.get_or_create(name=country)

#     return HttpResponse('fd')