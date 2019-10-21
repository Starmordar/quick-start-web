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
            inputLinksVisibility: false,
            visibilityInputLinksClassname: _technoHelper.CLASSNAME_VISIBLE_FORM,

            browser: "",
            technologies: []
        }
    }

    submitTechnologiesCallback = (browser, technologies) => {
        this.setState({
            browser: browser,
            technologies: technologies,
            chooseTechnoFormAnimation: _technoHelper.ANIMATION_FADE_OUT
        })

        setTimeout(() => {
            this.setState({
                chooseTechnoVisibility: !this.state.chooseTechnoVisibility,
                inputLinksVisibility: !this.state.inputLinksVisibility,
                inputLinksFormAnimation: _technoHelper.ANIMATION_FADE_IN
            })
        }, _technoHelper.ANIMATION_TIME_START_TO_END_MS)
    }

    returnToPreviousFormCallback = () => {
        this.setState({
            inputLinksFormAnimation: _technoHelper.ANIMATION_FADE_OUT
        })

        setTimeout(() => {
            this.setState({
                chooseTechnoVisibility: !this.state.chooseTechnoVisibility,
                inputLinksVisibility: !this.state.inputLinksVisibility,
                chooseTechnoFormAnimation: _technoHelper.ANIMATION_FADE_IN
            })
        }, _technoHelper.ANIMATION_TIME_START_TO_END_MS)
    }

    render() {
        return (
            <div className="gradiend-overplay" style={{ background: "black" }}>
                <FormStep />

                {
                    this.state.chooseTechnoVisibility
                        ?
                        <ChooseTechnologies
                            defaultBrowser={this.state.browser}
                            defaultTechnologies={this.state.technologies}
                            callback={this.submitTechnologiesCallback}
                            visibilityState={this.state.chooseTechnoFormAnimation} />
                        : null
                }
                {
                    this.state.inputLinksVisibility
                        ? <InputForm
                            callback={this.returnToPreviousFormCallback}
                            visibilityState={this.state.inputLinksFormAnimation} />
                        : null
                }

            </div>
        )
    }
}

export default CreateNewWorkspace;
