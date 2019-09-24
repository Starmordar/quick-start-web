import React from 'react';
import './SearchArea.css';

class SearchArea extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="gradiend-overplay">
                <TopNavbar />
                <div className="workset-filters">
                    
                </div>
                <div className="workset-container">
                    <WorkspaceCard />
                    <WorkspaceCard />
                    <WorkspaceCard />
                    <WorkspaceCard />
                    <WorkspaceCard />
                    <WorkspaceCard />
                    <WorkspaceCard />
                </div>
            </div>
        )
    }
}

export default SearchArea;
