import React from 'react';
import './CreateNewWorkspace.css';
import FormStep from '../../components/FormStep/FormStep';

class CreateNewWorkspace extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="gradiend-overplay">
                <FormStep />
            </div>
        )
    }
}

export default CreateNewWorkspace;
