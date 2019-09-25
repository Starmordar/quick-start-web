import React from 'react';
import './CreateNewWorkspace.css';
import FormStep from '../../components/FormStep/FormStep';
import SetupForm from '../../components/WorspaceForm/SetupForm/SetupForm';

class CreateNewWorkspace extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="gradiend-overplay">
                <FormStep />

                <SetupForm />
            </div>
        )
    }
}

export default CreateNewWorkspace;
