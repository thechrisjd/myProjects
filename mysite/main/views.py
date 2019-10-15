from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.contrib.auth import login, logout, authenticate
from django.contrib import messages
# Create your views here.
#These view will implement some logic and render the required template
def homepage(request):
    #This will render the home page template
    #django will look for a templates file therefor you just add the path after it
    return render(
        request = request,
        template_name = "main/home.html"
    )

def signup(request):
    #request handles a get req by defualt
    # check if req is a post (for forms)
    if request.method == "POST":
        #UserCreationForm is a django module
        form = UserCreationForm(request.POST)
        if form.is_valid():
            #Saves the data into the sqlite db
            user = form.save()
            #Gets the users username
            username = form.cleaned_data.get('username')
            #this creates by does not send/show the message to the user
            messages.success(request, f"New account created: {username}")
            #this logs in the user
            login(request, user)
            return redirect("main:homepage")
        else:
            for msg in form.error_messages:
                #this loops over the error msg to tell the user
                messages.error(request, f"{msg} : {form.error_messages[msg]}")

    form = UserCreationForm
    return render(
        request,
        "main/signup.html",
        context={"form":form}
    )


def logout_request(request):
    logout(request)
    messages.success(request, "Logged out.")
    return redirect("main:homepage")


def login_request(request):
    if request.method == "POST":
        #AuthenticationForm is a django module for user login
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            #authenticate checks the db to see if the username and password match
            user = authenticate(username=username, password=password)
            if user is not None:
                #if user exists login them in.
                login(request, user)
                messages.success(request, f"New account created: {username}")
                return redirect("main:homepage")
            else:
                messages.error(request, "Invalid username or password")
        else:
            messages.error(request, "Invalid username or password")


    form = AuthenticationForm()
    return render(
        request,
        "main/login.html",
        context={"form":form}
    )
