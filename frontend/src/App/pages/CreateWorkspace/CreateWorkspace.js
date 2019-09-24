import React from 'react';
import './CreateWorkspace.css';
import CreateWorkspaceCard from '../../components/CreateWorkspaceCard/CreateWorkspaceCard';
import WorkspaceCard from '../../components/WorkspaceCard/WorkspaceCard';

class CreateWorkspace extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="gradiend-overplay">
                <div className="workset-container">
                    <WorkspaceCard />
                    <WorkspaceCard />
                    <WorkspaceCard />
                    <WorkspaceCard />
                    <WorkspaceCard />
                    <WorkspaceCard />
                    <WorkspaceCard />
                </div>
            </div>
        )
    }
}

export default CreateWorkspace;
