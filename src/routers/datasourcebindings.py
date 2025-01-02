from fastapi import APIRouter, Response
from .apiclient import get_api_client
from lscsde_workspace_mgmt.models import AnalyticsDataSourceBinding 
from os import getenv
from .managers import get_datasource_manager
from uuid import uuid4
from datetime import date

namespace = getenv("NAMESPACE", "jupyterhub")
router = APIRouter()

@router.get("/api/datasource/{datasource_name}/bindings")
async def list_datasource_bindings(datasource_name : str) -> list[AnalyticsDataSourceBinding]:
    api_client = await get_api_client()
    datasource_manager = await get_datasource_manager(api_client = api_client)
    try:
        bindings = await datasource_manager.binding_client.list(namespace = namespace)
        dicts : list[AnalyticsDataSourceBinding] = []
        for binding in bindings:
            if binding.spec.datasource.casefold() == datasource_name.casefold():
                dicts.append(binding)

        return dicts
    finally:
        await api_client.close();

@router.get("/api/datasource/{datasource_name}/bindings/{workspace}")
async def get_datasource_binding(datasource_name : str, workspace : str) -> AnalyticsDataSourceBinding:
    
    api_client = await get_api_client()
    datasource_manager = await get_datasource_manager(api_client = api_client)
    try:
        bindings = await datasource_manager.binding_client.list_by_workspace(namespace = namespace, workspace = workspace)
        for binding in bindings:
            if binding.spec.datasource.casefold() == datasource_name.casefold():
                return binding

        return Response(status_code = 404)
    finally:
        await api_client.close()    
    
@router.post("/api/datasource/{datasource_name}/bindings/{workspace}")
async def create_datasource_binding(datasource_name : str, workspace : str) -> AnalyticsDataSourceBinding:
    api_client = await get_api_client()
    datasource_manager = await get_datasource_manager(api_client = api_client)
    try:
        binding_dict = {
            "metadata" : {
                "name" : f"binding-{str(uuid4().hex)}",
                "namespace": namespace,
                "labels" : {}
            },
            "spec" : {
                "workspace": workspace,
                "datasource": datasource_name,
                "expires" : date.today().isoformat()
            }
        }
        binding = datasource_manager.binding_client.adaptor.validate_python(binding_dict)
        created_binding = await datasource_manager.binding_client.create(binding)
        return created_binding
    finally:
        await api_client.close()
    
@router.put("/api/datasource-bindings")
async def update_datasource_binding(binding : AnalyticsDataSourceBinding) -> AnalyticsDataSourceBinding:
    api_client = await get_api_client()
    datasource_manager = await get_datasource_manager(api_client = api_client)
    try:
        created_binding = await datasource_manager.binding_client.replace(body = binding)
        return created_binding
    finally:
        await api_client.close()

@router.post("/api/datasource-bindings")
async def create_datasource_binding(binding : AnalyticsDataSourceBinding) -> AnalyticsDataSourceBinding:
    api_client = await get_api_client()
    datasource_manager = await get_datasource_manager(api_client = api_client)
    try:
        created_binding = await datasource_manager.binding_client.create(body = binding)
        return created_binding
    finally:
        await api_client.close()