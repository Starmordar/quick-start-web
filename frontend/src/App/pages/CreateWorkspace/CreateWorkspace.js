import React from 'react';
import './CreateWorkspace.css';
import CreateWorkspaceCard from '../../components/CreateWorkspaceCard/CreateWorkspaceCard';
import WorkspaceCard from '../../components/WorkspaceCard/WorkspaceCard';
import TopNavbar from '../../components/TopNavbar/TopNavbar';
import FilterArea from '../../components/FilterArea/FilterArea';

class CreateWorkspace extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="gradiend-overplay">
                <TopNavbar />
                <div className="workset-filters">
                    <FilterArea />
                    <FilterArea />
                    <FilterArea />
                    <FilterArea />
                </div>
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
