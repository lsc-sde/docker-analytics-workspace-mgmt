import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import WorkspaceCreateWizard from './WorkspaceCreateWizard/WorkspaceCreateWizard';
import WorkspaceEditor from './WorkspaceEditor/WorkspaceEditor';
import WorkspaceBindingCreateWizard from './WorkspaceEditor/Bindings/WorkspaceBindingCreateWizard'

export default function AppRoutes(){
  return (
    <Routes>
      <Route path="/" element={<Home/>}>
      </Route>
      <Route path="/workspaces/new" element={<WorkspaceCreateWizard/>} />
      <Route path="/workspaces/:workspaceId" element={<WorkspaceEditor />} />
      <Route path="/workspaces/:workspaceId/bindings" element={<WorkspaceEditor defaultActiveKey='bindings' />} />
      <Route path="/workspaces/:workspaceId/bindings/new" element={<WorkspaceBindingCreateWizard />} />
    </Routes>
  )
}