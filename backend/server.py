#imports
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.query import router as query_router

################################### CODE ####################################

app = FastAPI()
############### CORS
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:3001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

############## Routes
app.include_router(query_router,tags=["Chat"])

@app.get("/")
def root_path():
    return {"message": "Server is Live"}

############## Main
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)