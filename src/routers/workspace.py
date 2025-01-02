from fastapi import APIRouter
from .apiclient import get_api_client
from lscsde_workspace_mgmt.models import AnalyticsWorkspace
from os import getenv
from .managers import get_workspace_manager

namespace = getenv("NAMESPACE", "jupyterhub")
router = APIRouter()


@router.get("/api/workspace")
async def list_workspace() -> list[AnalyticsWorkspace]:
    api_client = await get_api_client()
    workspace_manager = await get_workspace_manager(api_client = api_client)
    try:
        workspaces = await workspace_manager.workspace_client.list(namespace = namespace)
        dicts : list[AnalyticsWorkspace] = []
        for workspace in workspaces:
            dicts.append(workspace)

        return dicts
    finally:
        await api_client.close()

@router.get("/api/workspace/{workspace_name}")
async def get_workspace(workspace_name : str) -> AnalyticsWorkspace:
    api_client = await get_api_client()
    workspace_manager = await get_workspace_manager(api_client = api_client)
    try:
        workspace = await workspace_manager.workspace_client.get(namespace = namespace, name = workspace_name)
        return workspace

    finally:
        await api_client.close()

@router.put("/api/workspace")
async def update_workspace(workspace: AnalyticsWorkspace) -> AnalyticsWorkspace:
    api_client = await get_api_client()
    workspace_manager = await get_workspace_manager(api_client = api_client)
    try:
        updated_workspace = await workspace_manager.workspace_client.replace(body = workspace)
        return updated_workspace
    finally:
        await api_client.close()


@router.post("/api/workspace")
async def create_workspace(workspace: AnalyticsWorkspace) -> AnalyticsWorkspace:
    api_client = await get_api_client()
    workspace_manager = await get_workspace_manager(api_client = api_client)
    try:
        created_workspace = await workspace_manager.workspace_client.create(body = workspace)
        return created_workspace
    finally:
        await api_client.close()