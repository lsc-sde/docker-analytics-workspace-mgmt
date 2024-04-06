export class ApiService {
    constructor() {
        if(process.env.NODE_ENV === "development"){
            this.apiBase = "http://localhost:8000/api";
        }
        else {
            this.apiBase = "/api";
        }
        this.workspaceApi = this.apiBase + "/workspace"
    }

    async FetchWorkspaces(){
        const response = await fetch(this.workspaceApi);
        return await response.json();
    }

    async FetchWorkspace(workspaceId){
        const response = await fetch(`${this.workspaceApi}/${workspaceId}`);
        return await response.json();
    }

    async FetchWorkspaceBindings(workspaceId){
        const url = `${this.workspaceApi}/${workspaceId}/bindings`;
        console.info(`Fetching ${url}`)
        const response = await fetch(url);
        return await response.json();
    }

    async UpdateWorkspace(newItem){
        
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newItem)
        };

        const response = await fetch(this.workspaceApi, requestOptions);
        return await response.json();
    }

    async UpdateWorkspaceBinding(newBinding){
        
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newBinding)
        };

        const response = await fetch(`${this.apiBase}/workspace-bindings`, requestOptions);
        return await response.json();
    }
    
    async CreateWorkspaceBinding(newBinding){
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newBinding)
        };

        const response = await fetch(`${this.apiBase}/workspace-bindings`, requestOptions);
        return await response.json();
    }

    async CreateWorkspace(newItem){
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newItem)
        };

        const response = await fetch(this.workspaceApi, requestOptions);
        return await response.json();
    }
}