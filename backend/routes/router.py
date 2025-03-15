from fastapi import APIRouter, BackgroundTasks, WebSocket
from controllers.query_controller import process_query
from controllers.terminal_socket import ws_controller
from conductor.conductor import main_conductor

router = APIRouter()

@router.post("/query")
async def query_endpoint(payload: dict, worker_task:BackgroundTasks):
    user_message = payload.get("message", "").strip()
    response=await process_query(user_message)
    worker_task.add_task(main_conductor,response)
    return response

@router.websocket("/terminal_status")
async def websocket_route(websocket: WebSocket):
    await ws_controller.handle_websocket(websocket)
