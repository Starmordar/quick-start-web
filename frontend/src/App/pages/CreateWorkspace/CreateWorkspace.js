import React from 'react';
import './CreateWorkspace.css';
import WorkspaceCard from '../../components/WorkspaceCard/WorkspaceCard';
import TopNavbar from '../../components/TopNavbar/TopNavbar';
import FilterArea from '../../components/FilterArea/FilterArea';
import CreateWorkspaceForm from '../../components/CreateWorkspaceForm/CreateWorkspaceForm';

import { _workspaceHelper } from '../../_helper/workspaceHelper';
import { _serverHelper } from '../../_helper/serverReponce';
import SearchWorkspace from '../../components/SearchWorkspace/SearchWorkspace';

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
            sortRules: _workspaceHelper.DEFAULT_SORT_RULES
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
            categoryFilterName: _workspaceHelper.CATEGORY_FILTER_NAME,
            sortFilters: [
                _workspaceHelper.DEFAULT_SORT_RULES,
                _workspaceHelper.NEWEST_DATE_SORT,
                _workspaceHelper.OLDEST_DATE_SORT,
                _workspaceHelper.LOW_USAGE_SORT,
                _workspaceHelper.HIGH_USAGE_SORT,
                _workspaceHelper.BY_CATEGORY
            ],
            sortFilterName: _workspaceHelper.SORT_FILTER_NAME
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
                        filterWorkspaces: response,
                        totalWorkspaces: response.length,
                        uniqueCategories: [...response
                            .map((workspace) => workspace.category)
                            .filter((category, index, self) => {
                                return self.indexOf(category) === index
                            }), _workspaceHelper.DEFAULT_FILTER_RULES]
                    });
                })
                .then(() => {
                    _workspaceHelper.resetFiltersParameters(_self)
                })
                .catch(function (err) {
                    console.log(err)
                })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.statusRules !== this.state.statusRules ||
            prevState.categoryRules !== this.state.categoryRules ||
            prevState.sortRules !== this.state.sortRules) {

            let temp = _workspaceHelper.applyFilterParams(this, this.state.workspacesData)

            this.setState({
                filterWorkspaces: temp,
                totalWorkspaces: temp.length
            })
        }
    }

    filterCallback = (filterName, filterParam) => {
        if (filterName === _workspaceHelper.STATUS_FILTER_NAME) {
            this.setState({ statusRules: filterParam })
        } else if (filterName === _workspaceHelper.CATEGORY_FILTER_NAME) {
            this.setState({ categoryRules: filterParam })
        } else if (filterName === _workspaceHelper.SORT_FILTER_NAME) {
            this.setState({ sortRules: filterParam })
        }
    }

    searchCallback = (status, searchParams) => {
        _workspaceHelper.resetFiltersParameters(this)
        if (status === _workspaceHelper.FIND_BY_PARAMS) {
            setTimeout(() => {
                if (searchParams === "") {
                    this.setState({
                        filterWorkspaces: this.state.workspacesData,
                        totalWorkspaces: this.state.workspacesData.length
                    })
                    return;
                }

                let temp = [...this.state.workspacesData]

                for (let i = 0; i < temp.length; i++) {
                    if (searchParams === temp[i].name) {

                        this.setState({
                            filterWorkspaces: [temp[i]],
                            totalWorkspaces: 1
                        })
                        return;
                    }
                }

                this.setState({
                    filterWorkspaces: [],
                    totalWorkspaces: 0
                })
            }, 10)
        }

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
                        callback={this.filterCallback}
                        filter={this.state.statusRules} />
                    <FilterArea
                        param={this.state.uniqueCategories}
                        filterName={this.filterProps.categoryFilterName}
                        callback={this.filterCallback}
                        filter={this.state.categoryRules} />
                    <FilterArea
                        param={this.filterProps.sortFilters}
                        filterName={this.filterProps.sortFilterName}
                        callback={this.filterCallback}
                        filter={this.state.sortRules} />
                    <SearchWorkspace
                        callback={this.searchCallback} />

                </div>
                <div className="workset-container">
                    <div className="workspace-card worksets-total-info">
                        <h3 className="workset-count">Total {this.state.totalWorkspaces}</h3>
                        <a className="btn btn-outline-light"
                            onClick={this.clickHandler}
                        >Create workspace</a>
                    </div>
                    <WorkspaceCard data={this.briefInfoWorkspaceCard} default={true} />
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
                    options={this.state.uniqueCategories}
                    workSpaceData={this.state.workspacesData}
                />
            </div>
        )
    }
}

export default CreateWorkspace;
