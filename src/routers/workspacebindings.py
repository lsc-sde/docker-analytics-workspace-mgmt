from fastapi import APIRouter, Response
from .apiclient import get_api_client
from lscsde_workspace_mgmt.models import AnalyticsWorkspaceBinding 
from os import getenv
from .managers import get_workspace_manager
from uuid import uuid4
from datetime import date

namespace = getenv("NAMESPACE", "jupyterhub")
router = APIRouter()

@router.get("/api/workspace/{workspace_name}/bindings")
async def list_workspace_bindings(workspace_name : str) -> list[AnalyticsWorkspaceBinding]:
    api_client = await get_api_client()
    workspace_manager = await get_workspace_manager(api_client = api_client)
    try:
        bindings = await workspace_manager.binding_client.list(namespace = namespace)
        dicts : list[AnalyticsWorkspaceBinding] = []
        for binding in bindings:
            if binding.spec.workspace.casefold() == workspace_name.casefold():
                dicts.append(binding)

        return dicts
    finally:
        await api_client.close();

@router.get("/api/workspace/{workspace_name}/bindings/{username}")
async def get_workspace_binding(workspace_name : str, username : str) -> AnalyticsWorkspaceBinding:
    
    api_client = await get_api_client()
    workspace_manager = await get_workspace_manager(api_client = api_client)
    try:
        bindings = await workspace_manager.binding_client.list_by_username(namespace = namespace, username = username)
        for binding in bindings:
            if binding.spec.workspace.casefold() == workspace_name.casefold():
                return binding

        return Response(status_code = 404)
    finally:
        await api_client.close()    
    
@router.post("/api/workspace/{workspace_name}/bindings/{username}")
async def create_workspace_binding(workspace_name : str, username : str) -> AnalyticsWorkspaceBinding:
    api_client = await get_api_client()
    workspace_manager = await get_workspace_manager(api_client = api_client)
    try:
        binding_dict = {
            "metadata" : {
                "name" : f"binding-{str(uuid4().hex)}",
                "namespace": namespace,
                "labels" : {}
            },
            "spec" : {
                "username": username,
                "workspace": workspace_name,
                "expires" : date.today().isoformat()
            }
        }
        binding = workspace_manager.binding_client.adaptor.validate_python(binding_dict)
        created_binding = await workspace_manager.binding_client.create(binding)
        return created_binding
    finally:
        await api_client.close()
    
@router.put("/api/workspace-bindings")
async def update_workspace_binding(binding : AnalyticsWorkspaceBinding) -> AnalyticsWorkspaceBinding:
    api_client = await get_api_client()
    workspace_manager = await get_workspace_manager(api_client = api_client)
    try:
        created_binding = await workspace_manager.binding_client.replace(body = binding)
        return created_binding
    finally:
        await api_client.close()

@router.post("/api/workspace-bindings")
async def create_workspace_binding(binding : AnalyticsWorkspaceBinding) -> AnalyticsWorkspaceBinding:
    api_client = await get_api_client()
    workspace_manager = await get_workspace_manager(api_client = api_client)
    try:
        created_binding = await workspace_manager.binding_client.create(body = binding)
        return created_binding
    finally:
        await api_client.close()