from fastapi import APIRouter, Depends , BackgroundTasks
from controllers.query_controller import process_query
from conductor.conductor import main_conductor
router = APIRouter()

@router.post("/query")
async def query_endpoint(payload: dict, worker_task:BackgroundTasks):
    user_message = payload.get("message", "").strip()
    response=await process_query(user_message)
    worker_task.add_task(main_conductor,response)
    return response
