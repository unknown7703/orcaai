from groq import Groq
import json

async def prepare_data(query:str , context_info,user_info):
    context_info=f"{', '.join(map(str,context_info))}"
    client = Groq()
    completion = client.chat.completions.create(
        model="llama3-70b-8192",
        messages=[
            {
            "role": "system",
            "content": "you should only reply in json format\nyou are an assistant whose role is to use all information given by user in CONTEXT dont miss on any information to create a singular complete and coherent file , the user information can be code, text or combination you need to use all information to create a single final output based on the given task, the single output should solve the task, the response schema should be,example if you are given a css file , details about a topic and html code , make a complete html code with css given and correct details as given . do not use any text or code which is not given ,no images etc\n json format strictly follow this only member of json should be data_prepared{\n  \"data_prepared\"='print('hello world')')\n}"
            },
            {
                "role": "user",
                "content": f"TASK - {query} CONTEXT INFO - {context_info} INFO -{user_info} "
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
    print("$$$$",query,"\n")
    print("$$$$",user_info,"\n")
    print(response,"\n")
    data=response["data_prepared"]
    return data
    

