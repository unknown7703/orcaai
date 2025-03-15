import json
from groq import Groq

async def compose_data(query:str , user_info):
    info=f"{', '.join(map(str,user_info))}"
    print(info)
    client = Groq()
    completion = client.chat.completions.create(
        model="llama3-70b-8192",
        messages=[
            {
                "role": "system",
                "content": "you can only respond in json\nyou are an assistant you give complete answer or solution for the given task , for example if the query is to make a html portfolio code , you need to generate only the relevant code and nothing else , you need to decide what is necessary based primarily on the task as well as the context info provided by user\nresponse format json\n{\n \"data_prepared\"=//your complete answer\n} "
            },
            {
                "role": "user",
                "content": f"TASK - {query} CONTEXT INFO - {info}"
            }
        ],
        temperature=1,
        max_completion_tokens=1024,
        top_p=1,
        stream=False,
        response_format={"type": "json_object"},
        stop=None,
    )

    response=json.loads(completion.choices[0].message.content)
    # print("$$$$",query,"\n")
    # print("$$$$",user_info,"\n")
    # print(response,"\n")
    data=response["data_prepared"]
    return data
