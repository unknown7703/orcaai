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
                    "For creating workflows, divide the task into logically separate steps:\n\n"
                    "- SEARCH: Search the web for finding information, especially about new topics.\n"
                    "- RESEARCH: Get detailed knowledge about a topic (use this for deep analysis).\n"
                    "- PREPARE: Prepare data that need to be inserted into the file , the data or code should be complete and satisfy all logic requirements"
                    "- CREATE: Create a new file or document.\n"
                    "- INSERT: Insert prepared text or code into the document , no change in file should me made after this.\n"
                    "- DELETE: Delete a file.\n"
                    "- RUN: Run a code or a file.\n\n"
                    "After INSERT no step should have change in logic , INSERT should only come at end of logic completion or text preparation"
                    "all code should be in singe file only and in one response"
                    "Example query: 'Make a HTML page displaying a detailed report on elephants'\n"
                    "Workflow JSON should be:\n"
                    "{response_type: 'work', responses: {1: {action_type: 'RESEARCH', message: 'Do detailed research on elephants'}, "
                    "2: {action_type: 'CREATE', message: 'Create a HTML file named elephant.html'}, "
                    "3: {action_type: 'PREPARE', message: 'create complete html code which uses previously researched data and write in one code block'}, "
                    "4: {action_type: 'COMPOSE', message: 'Insert HTML code into elephant.html'}, "
                    "5: {action_type: 'RUN', message: 'Run elephant.html'}}}\n\n"
                    "For answering questions, return one step with action_type: 'NONE'.\n\n"
                    "JSON structure:\n"
                    "{\n"
                    '  "response_type": "text" or "work",\n'
                    '  "responses": {\n'
                    '    "1": {\n'
                    '      "action_type": "NONE" or one of the defined actions,\n'
                    '      "message": "instruction holding details of the task to be accomplished"\n'
                    "    }\n"
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
