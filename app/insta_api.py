import instagrapi
import os

from instagrapi.exceptions import ClientError

class InstaAPI:
    def __init__(self, username: str, password: str):
        self.username = username
        self.password = password
        self.api = instagrapi.Client()
        self.api.delay_range = [1,3]
        self.session_file = "session.json"
        self.session = None
        self.load_session()

    def load_session(self):
        if os.path.exists(self.session_file) and os.path.getsize(self.session_file) > 0:
                self.session = self.api.load_settings(self.session_file) # type: ignore
        else:
            print("Session file does not exist or is empty")

        self.login()
    
    def login(self):
        if self.session:
            try:
                self.api.set_settings(self.session)
                self.api.login(self.username, self.password)
                try:
                    self.api.get_timeline_feed()
                except ClientError:
                    old_session = self.api.get_settings()
                    self.api.set_settings({})
                    self.api.set_uuids(old_session["uuids"])
                    self.api.login(self.username, self.password)
                print(f"Logged in successfully as {self.username} via session!")
            except Exception as e:
                print(f"Couldn't login user using session information: {e}")
        else:
            try:
                self.api.login(self.username, self.password)
                self.api.dump_settings(self.session_file) # type: ignore
                print(f"Logged in successfully as {self.username}!")
            except ClientError as e:
                print(f"Failed to login: {e}")
                exit(1)
        
    def get_account_info(self, info: str = ""):
        user_info =  self.api.account_info().dict()
        for key, value in user_info.items():
            print(f"{key}: {value}")
        return user_info
        
    def get_direct_threads(self):
        threads = self.api.direct_threads(thread_message_limit=2)
        # username_thread_dict = {}
        thread_id = []
        for i, thread in enumerate(threads):
            print(f"Thread {i + 1}: {thread.users[0].username}")
            # username_thread_dict[thread.users[0].username] = thread.pk
            thread_id.append(thread.id)
        return thread_id

    def get_direct_thread_messages(self, thread_id: int):
        messages = self.api.direct_messages(thread_id, amount=2147483647)
        for i, message in enumerate(messages):
            if message.clip is None:
                print(f"Message no {i}: {message.text}")
            elif message.clip is not None:
                print(f"Message no {i}: {message.clip.caption_text} {message.clip.video_url}")
            elif message.item_type == "voice_media":
                print(f"Message no {i}: Audio Type: {message.clip.audio_url}")
            elif message.clip.media_type == 1:
                print(f"Message no {i}: Image Type: {message.clip.thumbnail_url}")
    
    def delete_direct_thread_messages(self, thread_id: int):
        messages = self.api.direct_messages(thread_id, amount=200000)
        for i, message in enumerate(messages):
            print(message.user_id)
            print(type(message.user_id))
            if int(self.api.user_id_from_username(self.username)) == message.user_id:
                print(f"Message no {i}: {message.text}")
                self.api.direct_message_delete(thread_id, int(message.id))
                print(f"Message no {i} deleted!")