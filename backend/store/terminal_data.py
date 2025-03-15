terminal_store=[]

def insert_data(new_data: list[str]):
    global terminal_store
    terminal_store.append(new_data)

def get_data():
    return terminal_store

