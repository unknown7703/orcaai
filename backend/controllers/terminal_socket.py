from fastapi import WebSocket, WebSocketDisconnect
import asyncio
import json
from store.terminal_data import get_data

class WebSocketController:
    def __init__(self):
        self.active_connections: set[WebSocket] = set()

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.add(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self):
        while True:
            try:
                data = get_data() 
                message = json.dumps({"data": data})
                for connection in list(self.active_connections):
                    try:
                        await connection.send_text(message)
                    except:
                        self.active_connections.remove(connection)

                await asyncio.sleep(0.5)  
            except Exception as e:
                print(f"Error: {e}")

    async def handle_websocket(self, websocket: WebSocket):
        await self.connect(websocket)
        try:
            while True:
                await self.broadcast()
        except WebSocketDisconnect:
            self.active_connections.remove(websocket)
            
ws_controller = WebSocketController()

async def handle_websocket(websocket: WebSocket):
    await websocket.accept()
    await ws_controller.connect(websocket)