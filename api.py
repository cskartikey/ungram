from typing import Union
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from app.insta_api import InstaAPI
import httpx

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class LoginRequest(BaseModel):
    email: str
    password: str

def get_client(username: str, password: str) -> InstaAPI:
    return InstaAPI(username, password)

@app.get("/")
async def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
async def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

@app.post("/login/")
async def login(request: LoginRequest):
    email = request.email
    password = request.password
    client = get_client(email, password)
    info = client.get_account_info()
    return info

# @app.get("/image")
# async def proxy_image():
#     try:
#         image_url = "https://instagram.fbbi1-1.fna.fbcdn.net/v/t51.2885-19/44884218_345707102882519_2446069589734326272_n.jpg?_nc_ht=instagram.fbbi1-1.fna.fbcdn.net&_nc_cat=1&_nc_ohc=553dUL66nGMAX8SuN0x&edm=AL4D0a4BAAAA&ccb=7-5&ig_cache_key=YW5vbnltb3VzX3Byb2ZpbGVfcGlj.2-ccb7-5&oh=00_AfB387XT1AbPSEVYTf-JdAGaUz0qs6dRvz6rZodaNJeDRg&oe=6470160F&_nc_sid=0bf887"
#         async with httpx.AsyncClient() as client:
#             response = await client.get(image_url)
#             if response.status_code == 200:
#                 return response.content
#             else:
#                 raise HTTPException(status_code=response.status_code)
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    pass