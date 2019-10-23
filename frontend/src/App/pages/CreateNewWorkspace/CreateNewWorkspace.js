import React from 'react';
import './CreateNewWorkspace.css';
import { Redirect } from 'react-router-dom';

import FormStep from '../../components/FormStep/FormStep';
import ChooseTechnologies from '../../components/WorspaceForm/ChooseTechnologies/ChooseTechnologies';
import { _technoHelper } from '../../_helper/technoHelper';
import InputForm from '../../components/WorspaceForm/InputFrom/InputForm';
import { _serverHelper } from '../../_helper/serverReponce';

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
            technologies: [],

            redirect: false
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.redirect === !this.state.redirect) {
            this.props.history.push('/');
        }
    }

    componentDidMount() {
        console.log(this.props.history);
        _serverHelper.getWorkspaceFromGlobalSetting()
            .then((responce) => {
                console.log(responce)
                if (responce === "") {
                    this.setState({
                        redirect: !this.state.redirect
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    render() {
        return (
            <div className="gradiend-overplay" style={{ background: "black" }}>
                <FormStep
                    firstStep={this.state.chooseTechnoVisibility}
                    secondStep={this.state.inputLinksVisibility} />

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
                            browser={this.state.browser}
                            technologies={this.state.technologies}
                            callback={this.returnToPreviousFormCallback}
                            visibilityState={this.state.inputLinksFormAnimation} />
                        : null
                }

            </div>
        )
    }
}

export default CreateNewWorkspace;
