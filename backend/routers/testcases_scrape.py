import os
import urllib.request

import requests
from bs4 import BeautifulSoup


def createSession(username, password):
    loginData = {
        "nick": username,
        "pass": password,
    }
    with requests.Session() as s:
        url = "https://cses.fi/login"
        soup = BeautifulSoup(s.get(url).content, "html.parser")
        loginData["csrf_token"] = soup.find("input", attrs={"name": "csrf_token"})[
            "value"
        ]
        r = s.post(url, data=loginData)
        return s


def getQuestions():
    ques = dict()
    r = session.get(r"https://cses.fi/problemset/").content
    soup = BeautifulSoup(r, "html.parser")
    for t in soup.find_all("li", class_="task"):
        quesID = t.a["href"].split("/")[-1]
        ques[quesID] = t.a.string
    return ques


def getCorrectSubmissionLink(question):
    r = session.get(r"https://cses.fi/problemset/view/" + question + "/").content
    soup = BeautifulSoup(r, "html.parser")
    if int(soup.find("p").string.split()[-1]) == 0:  # No of submissions
        return None

    for link in soup.find_all("a", attrs={"class": "details-link"}):
        sol = link["href"]
        res = soup.find("a", href=sol, class_="").span["class"][
            2
        ]  # get status of a solution
        if res == "full":
            return "https://cses.fi" + sol
    return None


def getAnySubmissionLink(question):
    r = session.get(r"https://cses.fi/problemset/view/" + question + "/").content
    soup = BeautifulSoup(r, "html.parser")
    if int(soup.find("p").string.split()[-1]) == 0:  # No of submissions
        return None

    for link in soup.find_all("a", attrs={"class": "details-link"}):
        sol = link["href"]
        return "https://cses.fi" + sol
    return None


def getSubmissionDetails(submission_link):
    r = session.get(submission_link).content
    soup = BeautifulSoup(r, "html.parser")
    return soup


def getTestCases():
    pass


r = requests.get("https://cses.fi/problemset/").content
soup = BeautifulSoup(r, "html.parser")
username = input("Enter your username: ")
password = input("Enter your password: ")
session = createSession(username, password)

questions = getQuestions()

if not os.path.exists("testcases"):
    os.mkdir("testcases")

for question in questions:
    # if question != "1068":
    #     continue

    print(question + " " + questions[question])
    if not os.path.exists(f"testcases/{question}"):
        os.mkdir(f"testcases/{question}")

    submission_link = getAnySubmissionLink(question)
    testcase_input_counter = 1
    testcase_output_counter = 1
    if submission_link is not None:
        urls = getSubmissionDetails(submission_link)
        for a in urls.select("div.samp-actions"):
            c = a.select("a.save")
            url = c[0].get("href")
            if url and url[-4] != "3":
                url = "https://cses.fi" + url
                if url[-4] == "1":
                    filename = f"testcases/{question}/testcase_input_{testcase_input_counter}.txt"
                    if os.path.exists(filename):
                        continue
                    urllib.request.urlretrieve(url, filename)
                    testcase_input_counter += 1
                else:
                    filename = f"testcases/{question}/testcase_output_{testcase_output_counter}.txt"
                    if os.path.exists(filename):
                        continue
                    urllib.request.urlretrieve(url, filename)
                    testcase_output_counter += 1
