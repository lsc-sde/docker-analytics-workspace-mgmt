from kubernetes_asyncio.config import load_incluster_config, load_kube_config
from kubernetes_asyncio.client import ApiClient
from os import getenv

async def get_api_client():
        
    kubernetes_service_host = getenv("KUBERNETES_SERVICE_HOST")

    if kubernetes_service_host:
        load_incluster_config()
        return ApiClient()

    else:
        await load_kube_config()
        return ApiClient()