from pymongo import MongoClient
from app.core.config import settings

client =MongoClient(settings.MONGODB_URL)
db=client[settings.DB_NAME]

def check_connection()->bool:
    try:
        client.admin.command("ping")
        return True
    except Exception:
        return False


