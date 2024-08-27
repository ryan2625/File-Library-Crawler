from bs4 import BeautifulSoup
import requests
from ignore.creds import creds
from urllib.parse import urlparse

'''
Author: Ryan Freas
Date: 4/27/2024
Log into IREM's website to crawl pages behind a login screen
'''
loginPage = "https://www.irem.org/sso/login.aspx"

# Logging in has three main steps due to redirects. 
# 1. Grab all relevant fields and make post request on email page
# 2. Grab all relevant fields on password page
# 3. Extract parameters from password page and build
# a link to make the final post request to


def getSession(login):
    emailPage = requests.get(login)
    parsedEmailPage = BeautifulSoup(emailPage.content, "html.parser")

    payload = setASPHiddenFields(parsedEmailPage)
    payload["email"] = creds[0] #Creds is an array with your username/email and password
    payload["usr_btn"] = "Next"
    with requests.Session() as sesh:
        sesh.get(login)
        postVal = sesh.post(login, data=payload)
    
    passwordPage = requests.get(postVal.url)
    parsedPasswordPage = BeautifulSoup(passwordPage.content, "html.parser")

    payloadFinal = setASPHiddenFields(parsedPasswordPage)
    payloadFinal["ctl00$main$LoginTextBox"] = creds[0]
    payloadFinal["ctl00$main$PasswordTextBox"] = creds[1]
    payloadFinal["ctl00$main$SubmitButton"] = "Login"
    
    parseUrl = urlparse(postVal.url)
    toFetch = "https://my2.irem.org/SSO/LoginTemplates/DefaultLogin.aspx?" + parseUrl[4]
    sesh.get(postVal.url)
    finalURL = sesh.post(toFetch, data=payloadFinal)
    # print(sesh.cookies)
    # print(sesh.headers)
    # If login was a complete success, expect
    # to see https://www.irem.org/home
    print(finalURL.url)
    return sesh

# Post request requires a payload including hidden dynamic ASP.NET fields
def setASPHiddenFields(page):
    viewState = page.find("input", {"name" : "__VIEWSTATE"})["value"]
    viewStateGen = page.find("input", {"name" : "__VIEWSTATEGENERATOR"})["value"]
    eventValid = page.find("input", {"name" : "__EVENTVALIDATION"})["value"]
    payload = {"__EVENTTARGET": "", 
            "__EVENTARGUMENT": "", 
            "__VIEWSTATE":viewState, 
            "__VIEWSTATEGENERATOR":viewStateGen, 
            "__EVENTVALIDATION": eventValid,
    }
    return payload

