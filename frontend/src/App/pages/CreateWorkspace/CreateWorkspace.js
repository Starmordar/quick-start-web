import React from 'react';
import './CreateWorkspace.css';
import WorkspaceCard from '../../components/WorkspaceCard/WorkspaceCard';
import TopNavbar from '../../components/TopNavbar/TopNavbar';
import FilterArea from '../../components/FilterArea/FilterArea';
import CreateWorkspaceForm from '../../components/CreateWorkspaceForm/CreateWorkspaceForm';

import { _workspaceHelper } from '../../_helper/workspaceHelper';
import { _serverHelper } from '../../_helper/serverReponce';

class CreateWorkspace extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isVisibleWorkspaceForm: false,
            workspacesData: []
        }
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler() {
        this.setState({ isVisibleWorkspaceForm: !this.state.isVisibleWorkspaceForm })
    }

    childCallback = (dataFromChild) => {
        if (dataFromChild === _workspaceHelper.USER_WANT_CLOSE_FORM) {
            this.setState({
                isVisibleWorkspaceForm: !this.state.isVisibleWorkspaceForm
            })
        }
    }

    componentDidMount() {
        const _self = this;

        _serverHelper.getWorkspaces()
            .then(function (response) {
                _self.setState({
                    workspacesData: response
                });
            })
            .catch(function (err) {
                console.log(err)
            })
    }

    render() {
        let darkOverplay = this.state.isVisibleWorkspaceForm
            ? _workspaceHelper.OVERPLAY_FADEIN_ANIMATION
            : _workspaceHelper.OVERPLAY_FADEOUT_ANIMATION;

        let darkOverplayZIndex = this.state.isVisibleWorkspaceForm
            ? _workspaceHelper.Z_INDEX_IN
            : _workspaceHelper.Z_INDEX_OUT;

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
                    {
                        this.state.workspacesData.map((workspace, index) => {
                            return <WorkspaceCard key={index} data={workspace} />
                        })
                    }
                </div>
                <div className={"dark-shadow-overplay " + darkOverplay + " " + darkOverplayZIndex}>

                </div>
                <CreateWorkspaceForm
                    visible={this.state.isVisibleWorkspaceForm}
                    callback={this.childCallback}
                />
            </div>
        )
    }
}

export default CreateWorkspace;
