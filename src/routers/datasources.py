from fastapi import APIRouter
from .apiclient import get_api_client
from lscsde_workspace_mgmt.models import AnalyticsDataSource
from os import getenv
from .managers import get_datasource_manager

namespace = getenv("NAMESPACE", "jupyterhub")
router = APIRouter()


@router.get("/api/datasource")
async def list_datasource() -> list[AnalyticsDataSource]:
    api_client = await get_api_client()
    datasource_manager = await get_datasource_manager(api_client = api_client)
    try:
        datasources = await datasource_manager.datasource_client.list(namespace = namespace)
        dicts : list[AnalyticsDataSource] = []
        for datasource in datasources:
            dicts.append(datasource)

        return dicts
    finally:
        await api_client.close()

@router.get("/api/datasource/{datasource_name}")
async def get_datasource(datasource_name : str) -> AnalyticsDataSource:
    api_client = await get_api_client()
    datasource_manager = await get_datasource_manager(api_client = api_client)
    try:
        datasource = await datasource_manager.datasource_client.get(namespace = namespace, name = datasource_name)
        return datasource

    finally:
        await api_client.close()

@router.put("/api/datasource")
async def update_datasource(datasource: AnalyticsDataSource) -> AnalyticsDataSource:
    api_client = await get_api_client()
    datasource_manager = await get_datasource_manager(api_client = api_client)
    try:
        updated_datasource = await datasource_manager.datasource_client.replace(body = datasource)
        return updated_datasource
    finally:
        await api_client.close()


@router.post("/api/datasource")
async def create_datasource(datasource: AnalyticsDataSource) -> AnalyticsDataSource:
    api_client = await get_api_client()
    datasource_manager = await get_datasource_manager(api_client = api_client)
    try:
        created_datasource = await datasource_manager.datasource_client.create(body = datasource)
        return created_datasource
    finally:
        await api_client.close()