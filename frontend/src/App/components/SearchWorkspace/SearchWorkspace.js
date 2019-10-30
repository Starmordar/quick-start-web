import React from 'react';
import './SearchWorkspace.css';

import { _workspaceHelper } from '../../_helper/workspaceHelper';

class SearchWorkspace extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            inputValue: ""
        };

        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleKeyUp(event) {
        if (Number(event.keyCode) === Number(_workspaceHelper.ENTER_CODE)) {
            this.props.callback(_workspaceHelper.FIND_BY_PARAMS, this.state.inputValue)
        }
    }

    handleInputChange(event) {
        this.setState({ inputValue: event.target.value })
    }

    render() {
        return (
            <div className="filter">

                <h4 className="filter__filter-name">Search</h4>

                <div className="filter-action__arrow ">
                    <div className="md-form">
                        <input type="text"
                            id="inputDisabledEx"
                            className="form-control custom-input"
                            value={this.state.inputValue}
                            onChange={this.handleInputChange}
                            onKeyUp={this.handleKeyUp}
                        />
                    </div>
                </div>

            </div>
        )
    }
}

export default SearchWorkspace;
