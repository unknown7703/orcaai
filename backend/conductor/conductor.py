import json

class Progress:
    def __init__(self, fetched_data: str = "", 
                 file_use: bool = False, 
                 file_path: str = "", 
                 status: str = "running",
                 total_task: int = 0,
                 current_task: int = 0,
                 tasks: list = None):
        self.fetched_data = fetched_data
        self.file_use = file_use
        self.file_path = file_path
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
        self.file_path = file_path

    def set_data(self, data: str):
        self.fetched_data = data
    
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
    print(progress)
    return 