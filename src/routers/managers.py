from lscsde_workspace_mgmt.managers import (
    AnalyticsWorkspaceManager,
    AnalyticsDataSourceManager
)
from logger import logger

async def get_workspace_manager(api_client):
    return AnalyticsWorkspaceManager(api_client = api_client, log = logger)

async def get_datasource_manager(api_client):
    return AnalyticsDataSourceManager(api_client = api_client, log = logger)