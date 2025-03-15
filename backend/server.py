from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from routes.router import router  # Ensure this file contains both HTTP & WebSocket routes

app = FastAPI()

# --------------- CORS Middleware ----------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost", "http://localhost:3000", "http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers
)

# --------------- Include Routes ----------------
app.include_router(router, tags=["API"])

@app.get("/")
async def root():
    return {"message": "Server is Live!"}

# --------------- Run Server ----------------
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
