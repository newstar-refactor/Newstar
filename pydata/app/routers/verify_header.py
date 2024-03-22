from fastapi import APIRouter, Security
from fastapi.security import APIKeyHeader

def verify_header(access_token = Security(APIKeyHeader(name='X-User-ID'))):
    return access_token