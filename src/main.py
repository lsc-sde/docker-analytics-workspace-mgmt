from uuid import uuid4
from typing import Union, Annotated
from fastapi import Body, FastAPI, Request, Response
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from os import getenv
from lscsde_workspace_mgmt import AnalyticsWorkspaceManager
from lscsde_workspace_mgmt.models import AnalyticsWorkspace, AnalyticsWorkspaceBinding, AnalyticsDataSource, AnalyticsDataSourceBinding
from kubernetes_asyncio.client import ApiClient
from kubernetes_asyncio.config import load_incluster_config, load_kube_config
from logger import logger
from datetime import date
from fastapi.middleware.cors import CORSMiddleware
from routers import (
    workspace, 
    workspacebindings,
    datasources,
    datasourcebindings
)

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

app.include_router(workspace.router)
app.include_router(workspacebindings.router)
app.include_router(datasources.router)
app.include_router(datasourcebindings.router)
templates = Jinja2Templates(directory="templates")

@app.get("/workspaces/{full_path:path}")
async def catch_all(request: Request, full_path: str):
    print("full_path: "+full_path)
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/")
async def serve_spa(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


app.mount("/static", StaticFiles(directory="static"), name="static")
app.mount("/", StaticFiles(directory="templates"), name="templates")
