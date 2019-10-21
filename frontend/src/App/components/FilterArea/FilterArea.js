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

        this.dropDownHandler = this.dropDownHandler.bind(this);
        this.menuStateHandler = this.menuStateHandler.bind(this)
    }

    menuStateHandler(event) {
        const targetTagName = event.target.tagName
        let choosenText = "";

        if (targetTagName === _workspaceHelper.ACHNOR_TAG_NAME)
            choosenText = event.target.textContent;

        else if (targetTagName === _workspaceHelper.LIST_TAG_NAME)
            choosenText = event.target.firstChild.textContent;

        else return;

        this.dropDownHandler();

        this.props.callback(this.props.filterName, choosenText);
    }

    dropDownHandler() {
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
                <h4 className="filter__filter-name">{this.props.filterName}</h4>

                <div className="filter-action" onClick={this.dropDownHandler}>
                    <div className="filter-action__filter-name">
                        <span>{this.props.filter}</span>
                    </div>
                    <div className={"filter-action__arrow " + arrowState}>
                        <i className="fas fa-chevron-down"></i>
                    </div>
                </div>

                <ul className={"filter-menu " + menuState} onClick={this.menuStateHandler}>
                    {
                        this.props.param.map((filterDescription, index) => {
                            return <li key={index}>
                                <a href="#">{filterDescription}</a>
                            </li>
                        })
                    }
                </ul>
            </div>
        )
    }
}

export default FilterArea;
