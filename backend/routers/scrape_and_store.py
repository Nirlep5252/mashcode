import json

import requests
from bs4 import BeautifulSoup


def get_questions_url():
    try:
        url = "https://cses.fi/problemset/list"
        response = requests.get(url)
        soup = BeautifulSoup(response.content, "html.parser")
        problem_list = soup.find_all("li", class_="task")
        problem_name_and_url = {
            problem.find("a").text: problem.find("a")["href"]
            for problem in problem_list
        }

        with open("routers/problem_urls.json", "w") as f:
            json.dump(problem_name_and_url, f)

        return problem_name_and_url
    except Exception as e:
        return {"error": str(e)}


# print(get_questions_url())


def get_problem_details(url):
    try:
        response = requests.get(url)
        soup = BeautifulSoup(response.content, "html.parser")
        problem_statement_elements = soup.find("div", class_="md")
        all_children = problem_statement_elements.findChildren(recursive=False)
        # [:h1_tag_index_input]  problem statement
        # [h1_tag_index_input:h1_tag_index_output]  input
        # [h1_tag_index_output:h1_tag_index_constraints]  output
        # [h1_tag_index_constraints: h1_tag_index_examples]  constraints
        # [h1_tag_index_examples:]  examples
        input_h1_tag_index = next(
            index
            for (index, element) in enumerate(all_children)
            if element.name == "h1" and element.text == "Input"
        )
        output_h1_tag_index = next(
            index
            for (index, element) in enumerate(all_children)
            if element.name == "h1" and element.text == "Output"
        )
        constraints_h1_tag_index = next(
            index
            for (index, element) in enumerate(all_children)
            if element.name == "h1" and element.text == "Constraints"
        )
        examples_h1_tag_index = next(
            index
            for (index, element) in enumerate(all_children)
            if element.name == "h1" and element.text == "Example"
        )
        problem_statement = all_children[:input_h1_tag_index]
        problem_input = all_children[input_h1_tag_index:output_h1_tag_index]
        problem_output = all_children[output_h1_tag_index:constraints_h1_tag_index]
        problem_constraints = all_children[
            constraints_h1_tag_index:examples_h1_tag_index
        ]
        problem_examples = all_children[examples_h1_tag_index:]
        return {
            "problem_statement": str(problem_statement[0]),
            "problem_input": str(problem_input[0]),
            "problem_output": str(problem_output[0]),
            "problem_constraints": str(problem_constraints[0]),
            "problem_examples": str(problem_examples[0]),
        }
    except Exception as e:
        return {"error": str(e)}


# print(get_problem_details("https://cses.fi/problemset/task/1068"))


def get_problem_details_json():
    try:
        cses_url = "https://cses.fi"
        with open("routers/problem_urls.json") as f:
            urls = json.load(f)
        problem_id = 1
        problem_dict = {}
        for url in urls:
            problem_details = get_problem_details(cses_url + urls[url])
            problem_details["problem_title"] = url
            problem_dict[problem_id] = problem_details
            problem_id = problem_id + 1
            print(cses_url + urls[url] + " scraped")

        # print(problem_dict)
        with open("routers/problem_details.json", "w") as f:
            json.dump(problem_dict, f)
        return None
    except Exception as e:
        return {"error": str(e)}


get_problem_details_json()


def test_problem_id_and_title():
    with open("routers/problem_details.json") as f:
        problem_details = json.load(f)

    problem_id_and_title = {}
    for problem_id in problem_details:
        problem_id_and_title[problem_id] = problem_details[problem_id]["problem_title"]

    print(problem_id_and_title)
    return None


# test_problem_id_and_title()
