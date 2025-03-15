import json
from groq import Groq

async def run_files(files,task):
    user_req=f"1) query - {task}\n2) files - {', '.join(map(str, files))}"
    client = Groq()
    completion = client.chat.completions.create(
        model="llama3-70b-8192",
        messages=[
            {
                "role": "system",
                "content": "respond in json only \nyou are an assistant that write bash script to run files\nyou need to select appropriate script to run file , example to run a python file - python3 hello.py\nto run html gio open hello.html etc , use browser to open pdfs as well ,\nyour command need to be in one line , if multiple file exist , run in sequence- python3 a.py && python3 b.py\nexample . run the file\nfile - ~/orcafiles/hello.py\nresponse json format-\n{\n \"command\"=\"python3 ~/orcafiles/hello.py\"\n}\n"
            },
            {
                "role": "user",
                "content": user_req
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
    command=response["command"]
    #print(command)
    return command
