import React from 'react';
import './CreateWorkspace.css';
import WorkspaceCard from '../../components/WorkspaceCard/WorkspaceCard';
import TopNavbar from '../../components/TopNavbar/TopNavbar';
import FilterArea from '../../components/FilterArea/FilterArea';
import CreateWorkspaceForm from '../../components/CreateWorkspaceForm/CreateWorkspaceForm';

import { _workspaceHelper } from '../../_helper/workspaceHelper';
import { _serverHelper } from '../../_helper/serverReponce';
import SearchWorkspace from '../../components/SearchWorkspace/SearchWorkspace';

import { DEFAULT_LOADER, HIDE_CLASSNAME, Loader } from '../../_helper/loader';
import { _technoHelper } from '../../_helper/technoHelper';
import { _helper } from '../../_helper/authValidation';
const loader = new Loader(DEFAULT_LOADER, HIDE_CLASSNAME);

class CreateWorkspace extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isVisibleWorkspaceForm: false,
            formAnimation: false,
            workspacesData: [],
            totalWorkspaces: 0,
            filterWorkspaces: [],
            uniqueCategories: [],

            username: "",

            statusRules: _workspaceHelper.DEFAULT_FILTER_RULES,
            categoryRules: _workspaceHelper.DEFAULT_FILTER_RULES,
            sortRules: _workspaceHelper.DEFAULT_SORT_RULES
        }

        this.handleShowForm = this.handleShowForm.bind(this);

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

    handleShowForm() {
        this.setState({
            isVisibleWorkspaceForm: !this.state.isVisibleWorkspaceForm
        })

        setTimeout(() => {
            this.setState({
                formAnimation: !this.state.formAnimation
            })
        }, _technoHelper.ANIMATION_FORM_MS)
    }

    childCallback = (dataFromChild) => {
        const _self = this;

        if (dataFromChild === _workspaceHelper.USER_WANT_CLOSE_FORM) {
            this.setState({
                formAnimation: !this.state.formAnimation
            })

            setTimeout(() => {
                this.setState({
                    isVisibleWorkspaceForm: !this.state.isVisibleWorkspaceForm
                })
            }, _technoHelper.ANIMATION_FORM_MS)
        }

        if (dataFromChild === _workspaceHelper.USER_ADDED_NEW_WORKSPACE) {
            _serverHelper.getWorkspaces()
                .then(function (response) {

                    let uniqueCategories = response
                        .map((workspace) => workspace.category)
                        .filter((category, index, self) => {
                            return self.indexOf(category) === index
                        });

                    _self.setState({
                        workspacesData: response,
                        filterWorkspaces: response,
                        totalWorkspaces: response.length,
                        uniqueCategories: uniqueCategories
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
            }, _workspaceHelper.MIN_SETTIMEOUT_TIME)
        }
    }

    componentDidMount() {
        const _self = this;

        _serverHelper.getUsername()
            .then((responce) => {
                this.setState({
                    username: responce.data.username
                })
            })
            .catch((err) => {
                console.log(err)
            });

        _serverHelper.getWorkspaces()
            .then(function (response) {
                let uniqueCategories = response
                    .map((workspace) => workspace.category)
                    .filter((category, index, self) => {
                        return self.indexOf(category) === index
                    });

                _self.setState({
                    workspacesData: response,
                    filterWorkspaces: response,
                    totalWorkspaces: response.length,
                    uniqueCategories: uniqueCategories
                }, () => {
                    setTimeout(() => {
                        loader.hideLoader()
                    }, _helper.LOADER_TIME_FADE_OUT_MS)
                });
            })
            .catch(function (err) {
                console.log(err)
            })
    }

    componentWillUnmount() {
        loader.showLoader()
    }

    render() {
        let darkOverplay = this.state.isVisibleWorkspaceForm
            ? _workspaceHelper.OVERPLAY_FADEIN_ANIMATION
            : _workspaceHelper.OVERPLAY_FADEOUT_ANIMATION;

        let darkOverplayZIndex = this.state.isVisibleWorkspaceForm
            ? _workspaceHelper.Z_INDEX_IN
            : _workspaceHelper.Z_INDEX_OUT;

        let filterParameters = [...this.state.uniqueCategories, _workspaceHelper.DEFAULT_FILTER_RULES]

        let defaultSelection = [...this.state.uniqueCategories, ..._workspaceHelper.DEFAULT_CATEGORIES]
            .map((workspace) => workspace)
            .filter((category, index, self) => {
                return self.indexOf(category) === index
            })

        return (
            <div className="gradiend-overplay">

                <TopNavbar history={this.props.history} username={this.state.username} />

                <div className="workset-filters">

                    <FilterArea
                        param={this.filterProps.statusFilters}
                        filterName={this.filterProps.statusFilterName}
                        callback={this.filterCallback}
                        filter={this.state.statusRules} />

                    <FilterArea
                        param={filterParameters}
                        filterName={this.filterProps.categoryFilterName}
                        callback={this.filterCallback}
                        filter={this.state.categoryRules} />

                    <FilterArea
                        param={this.filterProps.sortFilters}
                        filterName={this.filterProps.sortFilterName}
                        callback={this.filterCallback}
                        filter={this.state.sortRules} />

                    <SearchWorkspace callback={this.searchCallback} />

                </div>

                <div className="workset-container">

                    <div className="workspace-card worksets-total-info">
                        <h3 className="workset-count">Total {this.state.totalWorkspaces}</h3>
                        <a className="btn btn-outline-light"
                            onClick={this.handleShowForm}
                        >Create workspace</a>
                    </div>

                    <WorkspaceCard data={this.briefInfoWorkspaceCard} default={true} />

                    {
                        this.state.filterWorkspaces.map((workspace, index) => {
                            return <WorkspaceCard key={index} data={workspace} history={this.props.history} />
                        })
                    }

                </div>

                <div
                    className={"dark-shadow-overplay " + darkOverplay + " " + darkOverplayZIndex}>
                </div>

                {
                    this.state.isVisibleWorkspaceForm
                        ? <CreateWorkspaceForm
                            visible={this.state.formAnimation}
                            callback={this.childCallback}
                            options={defaultSelection}
                            workSpaceData={this.state.workspacesData}
                        />
                        : null
                }
            </div>
        )
    }
}

export default CreateWorkspace;
