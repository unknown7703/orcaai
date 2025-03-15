import subprocess
from store.terminal_data import insert_data
async def use_terminal(command: str) -> str:
    try:
        result = subprocess.run(
            ["bash", "-c", command],
            capture_output=True,
            text=True
        )       
        output = result.stdout.strip() 
        if output == "":
            output = "success"
        
        print("Command Output:", output)
        insert_data(command)
        insert_data(output)
        return output
    except Exception as e:
        return f"Error: {str(e)}"

