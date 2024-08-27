import time
from bs4 import BeautifulSoup
from openpyxl import Workbook
from handleLogin import getSession
from ignore.allPages import all_pages
'''
Author: Ryan Freas
Date: 4/30/2024
A python script to catalog the status codes of all the links 
on IREM's website
TODO Make misc link errors such as 450 etc appear in all misc links
'''
all_links = []
n = 0
LOGIN_PAGE = "https://www.irem.org/sso/login.aspx"

all_links = []
links_website = []
manually_check = []
# Retain cookies, headers, and TCP connection between requests with a session
session = getSession(LOGIN_PAGE)

def handleSubLinks(page):
    for subLink in page:
        all_links.append(subLink)
        #linkHref = subLink['href'].strip()
        print(subLink)

def saveToTxt():
    global all_links
    errors = []
    with open("allFilesConfirmed", "w") as file:
        for link in all_links:
            href = link['href'].strip()
            if 'file' in href.lower() and 'library' in href.lower():
                try:
                    file.write("'" + str(href) + "',\n")
                except Exception as e:
                    print(e)
                    errors.append((e, link))

    with open("toCheck", "w") as file2:
        for page in manually_check:
                try:
                    file2.write("'" + str(page) + "',\n")
                except Exception as e:
                    print(e)
                    errors.append((e, page))
    print(errors)



def main():
    global n
    for page in all_pages:
        n+=1 
        print("Page number ", n)
        url = page
        tries = 0
        active = ""
        while active == "":
            if (tries >= 2) :
                break
            try: 
                active = session.get(url, timeout=5) 
            except Exception as e:
                err=e
                print(f"Main page timed out...{e}")
                time.sleep(5)
                tries+=1
                manually_check.append(url)
        if (tries >= 2) :
            continue
        doc = BeautifulSoup(active.content, "html.parser")
        page = doc.find_all('a', href=True)
        handleSubLinks(page)
    saveToTxt()

main()