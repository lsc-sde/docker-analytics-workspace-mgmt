from uuid import uuid4
from typing import Union, Annotated
from fastapi import Body, FastAPI, Request, Response
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from os import getenv
from lscsde_workspace_mgmt import AnalyticsWorkspaceManager
from lscsde_workspace_mgmt.objects import AnalyticsWorkspace, AnalyticsWorkspaceBinding
from kubernetes_asyncio.client import ApiClient
from kubernetes_asyncio.config import load_incluster_config, load_kube_config
from logger import logger
from datetime import date
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
origins = [
    "http://localhost:3000"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

namespace = getenv("NAMESPACE", "jupyterhub")

app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="templates")


@app.get("/")
async def serve_spa(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

async def get_api_client():
    await load_kube_config()
    return ApiClient()
    

async def get_workspace_manager(api_client):
    return AnalyticsWorkspaceManager(api_client = api_client, log = logger)

@app.get("/api/workspace")
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

@app.get("/api/workspace/{workspace_name}")
async def get_workspace(workspace_name : str) -> AnalyticsWorkspace:
    api_client = await get_api_client()
    workspace_manager = await get_workspace_manager(api_client = api_client)
    try:
        workspace = await workspace_manager.workspace_client.get(namespace = namespace, name = workspace_name)
        return workspace

    finally:
        await api_client.close()

@app.put("/api/workspace")
async def update_workspace(workspace: AnalyticsWorkspace) -> AnalyticsWorkspace:
    api_client = await get_api_client()
    workspace_manager = await get_workspace_manager(api_client = api_client)
    try:
        updated_workspace = await workspace_manager.workspace_client.replace(body = workspace)
        return updated_workspace
    finally:
        await api_client.close()


@app.post("/api/workspace")
async def create_workspace(workspace: AnalyticsWorkspace) -> AnalyticsWorkspace:
    api_client = await get_api_client()
    workspace_manager = await get_workspace_manager(api_client = api_client)
    try:
        created_workspace = await workspace_manager.workspace_client.create(body = workspace)
        return created_workspace
    finally:
        await api_client.close()

@app.get("/api/workspace/{workspace_name}/bindings")
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

@app.get("/api/workspace/{workspace_name}/bindings/{username}")
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
    
@app.post("/api/workspace/{workspace_name}/bindings/{username}")
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
    
@app.put("/api/workspace-bindings")
async def update_workspace_binding(binding : AnalyticsWorkspaceBinding) -> AnalyticsWorkspaceBinding:
    api_client = await get_api_client()
    workspace_manager = await get_workspace_manager(api_client = api_client)
    try:
        created_binding = await workspace_manager.binding_client.replace(body = binding)
        return created_binding
    finally:
        await api_client.close()