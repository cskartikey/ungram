from typing import Union
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from pydantic import BaseModel
from app.insta_api import InstaAPI
from fastapi.responses import StreamingResponse
import requests


app = FastAPI()
client: Union[InstaAPI, None] = None  # Define client as a global variable

origins = ["http://localhost", "http://localhost:8080", "http://localhost:3000"]

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


@app.post("/login/")
async def login(request: LoginRequest):
    global client
    email = request.email
    password = request.password

    if client is not None and client.username == email:
        return {"message": "Already logged in"}

    client = InstaAPI(email, password)
    try:
        client.login()
        return {"message": "Logged in successfully"}
    except Exception as e:
        return {"message": str(e)}


@app.get("/image/")
async def proxy_image():
    if client is not None:
        profile_picture = str(client.get_account_info("profile_pic_url"))
        response = requests.get(profile_picture, stream=True)
        return StreamingResponse(
            response.iter_content(chunk_size=1024), media_type="image/jpeg"
        )
    else:
        return {"message": "Not logged in"}


@app.get("/username/")
async def get_username():
    if client is not None:
        username = client.get_account_info("username")
        return username
    else:
        return {"message": "Not logged in"}


if __name__ == "__main__":
    pass
