from groq import Groq

client = Groq()

async def process_query(user_message: str):
    """
    Sends the user message to Groq API and returns the structured response.
    """
    if not user_message:
        return {"error": "Message parameter is required"}

    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": (
                    "answer the query with json object only\n"
                    "your job is to either answer the query if it is a question, or create a workflow if a task is given. "
                    "If you are answering the question, the response_type should be 'text'. If the answer is workflow, response_type is 'work'. "
                    "you cant use images or any media anywhere in workflow , only text ,commands and code"
                    "For creating workflows, divide the task into logically separate steps:\n\n"
                    "- COMPOSE: use this to make part of the overall task which can be part of text or part of code\n"
                    "- RESEARCH: Get detailed knowledge and reasoning about a topic (use this for deep analysis).\n"
                    "- PREPARE: Prepare data that need to be inserted into the file this data should be in context of all previously created data provided, the data or code should be complete and satisfy all logic requirements you can only use prepare once just before inserting"
                    "- CREATE: Create a new file or document.\n"
                    "- INSERT: Insert prepared data,command for inserting 'prepared_data' into the relevant file, do not add any code or data with this message ,all data is already available , no change in file should me made after this.\n"
                    "- DELETE: Delete a file.\n"
                    "- RUN: Run a code or a file.\n\n"
                    "After INSERT no step should have change in logic , INSERT should only come at end of logic completion or text preparation"
                    "all code should be in singe file"
                    "Example query: 'Make a HTML page displaying a detailed report on elephants'\n"
                    "Workflow JSON should be:\n"
                    "{response_type: 'work', responses: {1: {action_type: 'COMPOSE', message: 'make html file about elephants'}, "
                    "2: {action_type: 'COMPOSE', message: 'make css for the html file'}, "
                    "2: {action_type: 'CREATE', message: 'Create a HTML file named elephant.html with good css'}, "
                    "3: {action_type: 'PREPARE', message: 'combine the html , css into one complete logical code'}, "
                    "4: {action_type: 'INSERT', message: 'Insert prepared HTML code into elephant.html'}, "
                    "5: {action_type: 'RUN', message: 'Run elephant.html'}}"
                    ' "support_info"="the file should be about elephants}\n\n'
                    "For answering questions, return one step with action_type: 'NONE'.\n\n"
                    "JSON structure:\n"
                    "{\n"
                    '  "response_type": "text" or "work",\n'
                    '  "responses": {\n'
                    '    "1": {\n'
                    '      "action_type": "NONE" or one of the defined actions,\n'
                    '      "message": "instruction holding details of the task to be accomplished"\n'
                    "    }\n"
                    '   "support_info":"extra usefull information and relevant details given in query all constant value , digits that are important should be given here with context"'
                    "  }\n"
                    "}"
                ),
            },
            {"role": "user", "content": user_message},
        ],
        temperature=1,
        max_completion_tokens=1024,
        top_p=1,
        stream=False,
        response_format={"type": "json_object"},
        stop=None,
    )
    print(completion.choices[0].message)
    return completion.choices[0].message
