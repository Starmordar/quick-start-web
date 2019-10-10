import React from 'react';
import './CreateWorkspace.css';
import WorkspaceCard from '../../components/WorkspaceCard/WorkspaceCard';
import TopNavbar from '../../components/TopNavbar/TopNavbar';
import FilterArea from '../../components/FilterArea/FilterArea';
import CreateWorkspaceForm from '../../components/CreateWorkspaceForm/CreateWorkspaceForm';

class CreateWorkspace extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="gradiend-overplay">
                {/* <TopNavbar />
                <div className="workset-filters">
                    <FilterArea />
                    <FilterArea />
                    <FilterArea />
                    <FilterArea />
                </div>
                <div className="workset-container">
                    <div className="workspace-card worksets-total-info">
                        <h3 className="workset-count">Total (12)</h3>
                        <a className="btn btn-outline-light">Create workspace</a>
                    </div>
                    <WorkspaceCard />
                    <WorkspaceCard />
                    <WorkspaceCard />
                    <WorkspaceCard />
                    <WorkspaceCard />
                    <WorkspaceCard />
                    <WorkspaceCard />
                </div> */}
                <CreateWorkspaceForm />
            </div>
        )
    }
}

export default CreateWorkspace;
