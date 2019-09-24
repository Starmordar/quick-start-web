import React from 'react';
import './WorkspaceCard.css';

class WorkspaceCard extends React.Component {
    constructor(props) {
        super(props)
    }

    render(){ 
        return (
            <div className="workspace-card">
               <div className='card-property col-lg-2'>
                   <span>Name</span>
               </div>
               <div className='card-property col-lg-2'>
                   <span>Category</span>
               </div>
               <div className='card-property col-lg-1'>
                   <span>isActive</span>
               </div>
               <div className='card-property col-lg-3 text-truncate'>
                   <span>Technologies</span>
               </div>
               <div className='card-property col-lg-2'>
                   <span>Added 26-01-2018</span>
               </div>
               <div className='card-property col-lg-2 text-truncate'>
                   <span>Frequency of use</span>
               </div>
            </div>
        )
    }
}

export default WorkspaceCard;
