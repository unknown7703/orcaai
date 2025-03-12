import json
from actions.create import generate_create_command 
from actions.prepare import prepare_data
from actions.utils.terminal_user import use_terminal
from actions.insert import insert_data
from actions.run_work import run_files

class Progress:
    def __init__(self, 
                 fetched_data: list =[], 
                 file_use: bool = False, 
                 file_path: list = [], 
                 status: str = "running",
                 total_task: int = 0,
                 current_task: int = 0,
                 tasks: list = None):
        self.fetched_data = []
        self.file_use = file_use
        self.file_path = []
        self.status = status  
        self.total_task = total_task if tasks is None else len(tasks)
        self.current_task = current_task
        self.tasks = tasks if tasks is not None else []  

    def update_status(self, new_status: str):
        if new_status in ["running", "terminated"]:
            self.status = new_status
        else:
            raise ValueError("Invalid status. Must be 'running' or 'terminated'.")

    def set_file(self, file_path: str):
        self.file_use = True
        self.file_path.append(f"~/orcafiles/{file_path}")

    def set_data(self, data: str):
        self.fetched_data.append(data)
    
    def task_done(self):
        self.current_task += 1

    def __repr__(self):
        return (f"Progress(fetched_data='{self.fetched_data}', file_use={self.file_use}, "
                f"file_path='{self.file_path}', status='{self.status}', "
                f"total_task={self.total_task}, current_task={self.current_task}, tasks={self.tasks})")


async def main_conductor(unparsed_workflow):
    workflow = json.loads(unparsed_workflow.content )
    if workflow["response_type"] == "text":
        return

    if "responses" not in workflow:
        return "INVALID JSON"

    ordered_tasks = [
        {"step": step, "action_type": details["action_type"], "message": details["message"]}
        for step, details in sorted(workflow["responses"].items(), key=lambda x: int(x[0]))
    ]

    progress = Progress(tasks=ordered_tasks)
    await worker(progress)
    return 


async def worker(progress:Progress):
    if(progress.total_task<=0):
        return
    while(progress.current_task!=progress.total_task):
        task=progress.tasks[progress.current_task]
        task_type=task["action_type"]
        if(task_type=="CREATE"):
            file_name,command = await generate_create_command(task["message"])
            terminal_data= await use_terminal(command)
            progress.set_file(file_name)
            print("$:",terminal_data)
        if(task_type=="PREPARE"):
            response=await prepare_data(task["message"])
            progress.set_data(response)
        if(task_type=="INSERT"):
            response= await insert_data(progress.fetched_data,progress.file_path,task)
            terminal_data=await use_terminal(response)
            print("$:",terminal_data)
        if(task_type=="RUN"):
            response=await run_files(progress.file_path,task)
            terminal_data=await use_terminal(response)
            print("$:",terminal_data)
        progress.task_done()
