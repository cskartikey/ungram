import typer
from app.insta_api import InstaAPI

app = typer.Typer()

def get_client(username: str, password: str) -> InstaAPI:
    return InstaAPI(username, password)

@app.command()
def info(username: str, password: str):
    try:
        client = get_client(username, password)
        client.get_account_info()
    except Exception as e:
        print(f"Error: {str(e)}")

@app.command()
def threads(username: str, password: str):
    try:
        client = get_client(username, password)
        print("Getting direct threads...")
        threads = client.get_direct_threads()
        thread_number = typer.prompt("Enter thread number")
        client.delete_direct_thread_messages(threads[int(thread_number) - 1])
    except Exception as e:
        print(f"Error: {str(e)}")

if __name__ == "__main__":
    app()
