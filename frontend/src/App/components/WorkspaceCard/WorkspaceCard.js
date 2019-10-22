import React from 'react';
import { Redirect } from 'react-router-dom';
import './WorkspaceCard.css';

import { _workspaceHelper } from '../../_helper/workspaceHelper';
import { _serverHelper } from '../../_helper/serverReponce';

class WorkspaceCard extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            redirect: false
        }
    }

    configChangeHandler = (event) => {
        if (this.props.default === undefined) {
            let name = event.currentTarget.children[0].children[0].textContent
            _serverHelper.setWorkspaceToAdd(name)
                .then((response) => {
                    if (response === _serverHelper.SERVER_SUCCESS_ASSIGN_GLOBAL) {
                        this.setState({
                            redirect: !this.state.redirect
                        })
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    render() {
        let techno = "";
        if (typeof this.props.data.technologies === "string") {
            techno = _workspaceHelper.WORKSPACE_PROP_TECHNOLOGIES
        }

        let isActiveString = _workspaceHelper.DISABLED_WORKSPACE
        if (this.props.data.isActive) isActiveString = _workspaceHelper.ACTIVE_WORKSPACE
        if (this.props.data.isActive === _workspaceHelper.WORKSPACE_PROP_STATUS)
            isActiveString = _workspaceHelper.WORKSPACE_PROP_STATUS

        return (
            <div className="workspace-card" onClick={this.configChangeHandler}>
                {this.state.redirect ? <Redirect to='/prackRoom' /> : null}
                <div className='card-property col-lg-2'>
                    <span className="checkbox-label">{this.props.data.name}</span>
                </div>
                <div className='card-property col-lg-2'>
                    <span>{this.props.data.category}</span>
                </div>
                <div className='card-property col-lg-1'>
                    <span>{isActiveString}</span>
                </div>
                <div className='card-property col-lg-3 text-truncate'>
                    <span>{techno}</span>
                </div>
                <div className='card-property col-lg-2'>
                    <span>{this.props.data.dateString}</span>
                </div>
                <div className='card-property col-lg-2 text-truncate'>
                    <span>{this.props.data.count}</span>
                </div>
            </div>
        )
    }
}

export default WorkspaceCard;
