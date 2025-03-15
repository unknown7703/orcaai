import json
from groq import Groq

async def insert_data(data,files,query):
    user_req=f"1) query - {query}\n2) data - {data}\n3) files - {', '.join(map(str, files))}"
    client = Groq()
    completion = client.chat.completions.create(
        model="llama3-70b-8192",
        messages=[
            {
                "role": "system",
                "content": "you should only reply in json format\n" 
                "you are a helpful assistant that write bash command to complete the query , you can only write the command or multiple command in one go.\n"
                "you are given file or files , and data to insert with instruction what data to insert. write bash command to insert data into relevant file \n"
                "example insert the code into file-\ndata-\nfor i in range(1, 11):\n    print(f\"Number: {i}\")\n\nprint(\"Loop finished!\")\nfile - ~/orcafiles/hello.py\nresponse\n{\n \"command\"=\"\"\"\" cat <<EOF > ~/orcafiles/hello.py\nfor i in range(1, 11):\n    print(f\"Number: {i}\")\n\nprint(\"Loop finished!\")\nEOF\n\"\"\"\n\"\nthe single command should handle all insertion\n}"
                "make sure when you use echo you handle escape sequence and special charecter correctly"
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
   # print(command)
    return command
