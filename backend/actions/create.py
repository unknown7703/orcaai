import json
from groq import Groq

async def generate_create_command(task: str):
    client = Groq()
    completion = client.chat.completions.create(
        model="llama3-70b-8192",
        messages=[
            {
                "role": "system",
                "content": (
                    "You need to answer in JSON format only.\n"
                    "You are a terminal automation agent. You will be given a task, and you must generate all necessary Bash commands to complete it.\n\n"
                    "Rules:\n"
                    "- The script must be a single line.\n"
                    "- Do not use interactive tools like text editors (e.g., nano, vim).\n"
                    "- If multiple commands can be executed concurrently, combine them.\n"
                    "- If the filename is not provided, use a relevant name.\n"
                    "- Return the exact filename used under the 'filename' key in the JSON.\n\n"
                    "- All the files should me made in ~/orcafile/ folder only"
                    "Example:\n"
                    "Task: Create two Python files\n"
                    "Response:\n"
                    "{\n"
                    "   \"filename\": \"file1.py file2.py\",\n"
                    "   \"command\": \"touch ~/orcafiles/file1.py ~/orcafiles/file2.py\"\n"
                    "}"
                )
            },
            {
                "role": "user",
                "content": task
            },
        ],
        temperature=1,
        max_completion_tokens=1024,
        top_p=1,
        stream=False,
        response_format={"type": "json_object"},
        stop=None,
    )
    response=json.loads(completion.choices[0].message.content)
    print(response)
    file_name=response["filename"]
    command=response["command"]
    return (file_name,command)

