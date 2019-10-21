import React from 'react';
import './CreateNewWorkspace.css';
import FormStep from '../../components/FormStep/FormStep';
import ChooseTechnologies from '../../components/WorspaceForm/ChooseTechnologies/ChooseTechnologies';
import { _technoHelper } from '../../_helper/technoHelper';
import InputForm from '../../components/WorspaceForm/InputFrom/InputForm';


class CreateNewWorkspace extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            chooseTechnoFormAnimation: "",
            chooseTechnoVisibility: true,
            inputLinksFormAnimation: "",
            visibilityInputLinksClassname: _technoHelper.CLASSNAME_VISIBLE_FORM
        }
    }

    submitTechnologiesCallback = (browser, technologies) => {
        this.setState({
            chooseTechnoFormAnimation: _technoHelper.ANIMATION_FADE_OUT
        })

        setTimeout(() => {
            this.setState({
                chooseTechnoVisibility: !this.state.chooseTechnoVisibility,
                inputLinksFormAnimation: _technoHelper.ANIMATION_FADE_IN
            })
        }, 500)
    }

    render() {
        return (
            <div className="gradiend-overplay" style={{background: "black"}}>
                <FormStep />

                {
                    this.state.chooseTechnoVisibility
                        ?
                        <ChooseTechnologies
                            callback={this.submitTechnologiesCallback}
                            visibilityState={this.state.chooseTechnoFormAnimation} />
                        : null
                }
                {
                    this.state.chooseTechnoFormAnimation === _technoHelper.ANIMATION_FADE_OUT
                        ? <InputForm
                            visibilityState={this.state.inputLinksFormAnimation} />
                        : null
                }

            </div>
        )
    }
}

export default CreateNewWorkspace;
