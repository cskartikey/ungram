def strip_thread_name(thread_name: str) -> str:
    return thread_name.split(":")[1].strip()
