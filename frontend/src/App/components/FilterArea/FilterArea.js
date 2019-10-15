import React from 'react';
import './FilterArea.css';

import { _workspaceHelper } from '../../_helper/workspaceHelper';

class FilterArea extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            isVisibleMenu: false,
            arrowDown: true,
        }

        this.dropDownHandler = this.dropDownHandler.bind(this)
    }

    dropDownHandler(event) {
        this.setState(prevState => ({
            isVisibleMenu: !prevState.isVisibleMenu,
            arrowDown: !prevState.arrowDown
        }))
    }

    render() {
        let arrowState = this.state.arrowDown
            ? _workspaceHelper.ARROW_DOWN
            : _workspaceHelper.ARROW_UP

        let menuState = this.state.isVisibleMenu
            ? _workspaceHelper.VISIBLE_CLASSNAME
            : _workspaceHelper.HIDDEN_CLASSNAME

        return (
            <div className="filter">
                <h4 className="filter__filter-name">Category</h4>

                <div className="filter-action" onClick={this.dropDownHandler}>
                    <div className="filter-action__filter-name">
                        <span>All</span>
                    </div>
                    <div className={"filter-action__arrow " + arrowState}>
                        <i className="fas fa-chevron-down"></i>
                    </div>
                </div>

                <ul class={"filter-menu " + menuState}>
                    <li><a href="#">HTML</a></li>
                    <li><a href="#">CSS</a></li>
                    <li><a href="#">JavaScript</a></li>
                </ul>
            </div>
        )
    }
}

export default FilterArea;
