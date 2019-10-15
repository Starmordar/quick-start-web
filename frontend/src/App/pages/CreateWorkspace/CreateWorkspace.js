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
            workspacesData: [],
            totalWorkspaces: 0,
            filterWorkspaces: [],
            uniqueCategories: [],

            statusRules: _workspaceHelper.DEFAULT_FILTER_RULES,
            categoryRules: _workspaceHelper.DEFAULT_FILTER_RULES,
        }

        this.clickHandler = this.clickHandler.bind(this);

        this.briefInfoWorkspaceCard = {
            name: _workspaceHelper.WORKSPACE_PROP_NAME,
            category: _workspaceHelper.WORKSPACE_PROP_CATEGORY,
            isActive: _workspaceHelper.WORKSPACE_PROP_STATUS,
            technologies: _workspaceHelper.WORKSPACE_PROP_TECHNOLOGIES,
            dateString: _workspaceHelper.WORKSPACE_PROP_DATE,
            count: _workspaceHelper.WORKSPACE_PROP_COUNT
        }

        this.filterProps = {
            statusFilters: [
                _workspaceHelper.DEFAULT_FILTER_RULES,
                _workspaceHelper.STATUS_FILTER_OPTION_1,
                _workspaceHelper.STATUS_FILTER_OPTION_2
            ],
            statusFilterName: _workspaceHelper.STATUS_FILTER_NAME,
            categoryFilters: [

            ],
            categoryFilterName: _workspaceHelper.CATEGORY_FILTER_NAME
        }
    }

    clickHandler() {
        this.setState({ isVisibleWorkspaceForm: !this.state.isVisibleWorkspaceForm })
    }

    childCallback = (dataFromChild) => {
        const _self = this;

        if (dataFromChild === _workspaceHelper.USER_WANT_CLOSE_FORM) {
            this.setState({
                isVisibleWorkspaceForm: !this.state.isVisibleWorkspaceForm
            })
        }
        if (dataFromChild === _workspaceHelper.USER_ADDED_NEW_WORKSPACE) {
            _serverHelper.getWorkspaces()
                .then(function (response) {
                    _self.setState({
                        workspacesData: response,
                        totalWorkspaces: response.length
                    });
                })
                .catch(function (err) {
                    console.log(err)
                })
        }
    }

    filterCallback = (filterName, filterParam) => {
        let filteredWorkspaces = [...this.state.workspacesData]

        if (filterName === _workspaceHelper.STATUS_FILTER_NAME) {
            this.setState({ statusRules: filterParam })
        } else if (filterName === _workspaceHelper.CATEGORY_FILTER_NAME) {
            this.setState({ categoryRules: filterParam })
        }

        if (filterName === _workspaceHelper.STATUS_FILTER_NAME) {
            switch (filterParam) {
                case _workspaceHelper.DEFAULT_FILTER_RULES:
                    break;

                case _workspaceHelper.STATUS_FILTER_OPTION_1:
                    filteredWorkspaces = this.state.workspacesData.filter((workspace) => {
                        return workspace.isActive
                    })
                    break;

                case _workspaceHelper.STATUS_FILTER_OPTION_2:
                    filteredWorkspaces = this.state.workspacesData.filter((workspace) => {
                        return !workspace.isActive
                    })
                    break;

                default:
                    break;
            }

            if (this.state.categoryRules !== _workspaceHelper.DEFAULT_FILTER_RULES) {

                filteredWorkspaces = filteredWorkspaces.filter((workspace) => {
                    console.log(this.state.categoryRules);
                    return workspace.category === this.state.categoryRules
                })
            }
        }

        if (filterName === _workspaceHelper.CATEGORY_FILTER_NAME) {

            if (filterParam === _workspaceHelper.DEFAULT_FILTER_RULES) {
                this.filterProps.categoryFilters = [...this.state.workspacesData]

            } else {
                filteredWorkspaces = this.state.workspacesData.filter((workspace) => {
                    return workspace.category === filterParam
                })
            }

            if (this.state.statusRules !== _workspaceHelper.DEFAULT_FILTER_RULES) {

                switch (this.state.statusRules) {

                    case _workspaceHelper.STATUS_FILTER_OPTION_1:
                        filteredWorkspaces = filteredWorkspaces.filter((workspace) => {
                            return workspace.isActive
                        })
                        break;

                    case _workspaceHelper.STATUS_FILTER_OPTION_2:
                        filteredWorkspaces = filteredWorkspaces.filter((workspace) => {
                            return !workspace.isActive
                        })
                        break;

                    default:
                        break;
                }
            }
        }

        this.setState({
            filterWorkspaces: filteredWorkspaces,
            totalWorkspaces: filteredWorkspaces.length
        })
    }

    componentDidMount() {
        const _self = this;

        _serverHelper.getWorkspaces()
            .then(function (response) {
                _self.setState({
                    workspacesData: response,
                    filterWorkspaces: response,
                    totalWorkspaces: response.length,
                    uniqueCategories: [...response
                        .map((workspace) => workspace.category)
                        .filter((category, index, self) => {
                            return self.indexOf(category) === index
                        }), _workspaceHelper.DEFAULT_FILTER_RULES]
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

                    <FilterArea
                        param={this.filterProps.statusFilters}
                        filterName={this.filterProps.statusFilterName}
                        callback={this.filterCallback} />
                    <FilterArea
                        param={this.state.uniqueCategories}
                        filterName={this.filterProps.categoryFilterName}
                        callback={this.filterCallback} />
                    <FilterArea
                        param={this.filterProps.statusFilters}
                        filterName={this.filterProps.statusFilterName}
                        callback={this.filterCallback} />
                    <FilterArea
                        param={this.filterProps.statusFilters}
                        filterName={this.filterProps.statusFilterName}
                        callback={this.filterCallback} />

                </div>
                <div className="workset-container">
                    <div className="workspace-card worksets-total-info">
                        <h3 className="workset-count">Total {this.state.totalWorkspaces}</h3>
                        <a className="btn btn-outline-light"
                            onClick={this.clickHandler}
                        >Create workspace</a>
                    </div>
                    <WorkspaceCard data={this.briefInfoWorkspaceCard} />
                    {
                        this.state.filterWorkspaces.map((workspace, index) => {
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
