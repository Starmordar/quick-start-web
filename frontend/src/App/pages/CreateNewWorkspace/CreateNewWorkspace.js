import React from 'react';
import './CreateNewWorkspace.css';
import FormStep from '../../components/FormStep/FormStep';
import SetupForm from '../../components/WorspaceForm/SetupForm/SetupForm';
import ChooseTechnologies from '../../components/WorspaceForm/ChooseTechnologies/ChooseTechnologies';
import InputForm from '../../components/WorspaceForm/InputFrom/InputForm';

class CreateNewWorkspace extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="gradiend-overplay">
                <FormStep />

                {/* <SetupForm /> */}
                {/* <ChooseTechnologies /> */}
                <InputForm />
            </div>
        )
    }
}

export default CreateNewWorkspace;
