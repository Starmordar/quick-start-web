import React from 'react';
import './FilterArea.css';

class FilterArea extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="filter">
                <h4 className="filter__filter-name">Category</h4>

                <div className="filter-action">
                    <div className="filter-action__filter-name">
                        <span>All</span>
                    </div>
                    <div className="filter-action__arrow">
                        <i className="fas fa-sort-down"></i>
                    </div>
                </div>

            </div>
        )
    }
}

export default FilterArea;
