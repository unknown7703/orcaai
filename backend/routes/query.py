from fastapi import APIRouter, Depends
from controllers.query_controller import process_query

router = APIRouter()

@router.post("/query")
async def query_endpoint(payload: dict):
    """
    API endpoint that receives a user query and returns a structured response.
    """
    user_message = payload.get("message", "").strip()
    return await process_query(user_message)
