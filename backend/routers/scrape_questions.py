import requests
from bs4 import BeautifulSoup
from fastapi import APIRouter

router = APIRouter(prefix="/scrape_questions")


@router.get("/get_question/{question_id}")
async def get_question(question_id: int):
    try:
        url = "https://cses.fi/problemset/task/" + str(question_id)
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
            "problem_statement": str(problem_statement),
            "problem_input": str(problem_input),
            "problem_output": str(problem_output),
            "problem_constraints": str(problem_constraints),
            "problem_examples": str(problem_examples),
        }
    except Exception as e:
        return {"error": str(e)}
