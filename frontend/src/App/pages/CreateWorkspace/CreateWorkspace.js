import React from 'react';
import './CreateWorkspace.css';
import WorkspaceCard from '../../components/WorkspaceCard/WorkspaceCard';
import TopNavbar from '../../components/TopNavbar/TopNavbar';
import FilterArea from '../../components/FilterArea/FilterArea';
import CreateWorkspaceForm from '../../components/CreateWorkspaceForm/CreateWorkspaceForm';
import { _workspaceHelper } from '../../_helper/workspaceHelper';

class CreateWorkspace extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isVisibleWorkspaceForm: false
        }
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler() {
        this.setState({ isVisibleWorkspaceForm: !this.state.isVisibleWorkspaceForm })
    }

    render() {
        let darkOverplay = this.state.isVisibleWorkspaceForm
            ? _workspaceHelper.VISIBLE_CLASSNAME
            : _workspaceHelper.HIDDEN_CLASSNAME;
        
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
                    <div className="workspace-card worksets-total-info">
                        <h3 className="workset-count">Total (12)</h3>
                        <a className="btn btn-outline-light"
                            onClick={this.clickHandler}
                        >Create workspace</a>
                    </div>
                    <WorkspaceCard />
                    <WorkspaceCard />
                    <WorkspaceCard />
                    <WorkspaceCard />
                    <WorkspaceCard />
                    <WorkspaceCard />
                    <WorkspaceCard />
                </div>
                <div className={"dark-shadow-overplay " + darkOverplay}>

                </div>
                <CreateWorkspaceForm visible={this.state.isVisibleWorkspaceForm} />
            </div>
        )
    }
}

export default CreateWorkspace;
