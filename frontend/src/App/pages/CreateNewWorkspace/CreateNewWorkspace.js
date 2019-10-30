import React from 'react';
import './CreateNewWorkspace.css';

import FormStep from '../../components/FormStep/FormStep';
import ChooseTechnologies from '../../components/WorspaceForm/ChooseTechnologies/ChooseTechnologies';
import { _technoHelper } from '../../_helper/technoHelper';
import InputForm from '../../components/WorspaceForm/InputFrom/InputForm';
import { _serverHelper } from '../../_helper/serverReponce';

import { DEFAULT_LOADER, HIDE_CLASSNAME, Loader } from '../../_helper/loader';
import { _helper } from '../../_helper/authValidation';
const loader = new Loader(DEFAULT_LOADER, HIDE_CLASSNAME);

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
            browserImage: "",
            technologies: [],
            images: [],

            redirect: false
        }
    }

    submitTechnologiesCallback = (browser, technologies, images, browserImage) => {
        this.setState({
            browser: browser,
            technologies: technologies,
            images: images,
            browserImage: browserImage,
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
            this.props.history.push(_helper.PATH_HOME_PAGE);
        }
    }

    componentDidMount() {
        _serverHelper.redirectToAuthentificationPage(this)
            .then((response) => {
                if (response.data === _serverHelper.SERVER_USER_NOT_SIGIN) {
                    this.setState({ redirect: true })
                }
                else {
                    _serverHelper.getWorkspaceFromGlobalSetting()
                        .then((responce) => {
                            if (responce === "") {
                                this.setState({
                                    redirect: !this.state.redirect
                                }, () => {
                                    setTimeout(() => {
                                        loader.hideLoader()
                                    }, _helper.LOADER_TIME_FADE_OUT_MS)
                                })
                            } else {
                                setTimeout(() => {
                                    loader.hideLoader()
                                }, _helper.LOADER_TIME_FADE_OUT_MS)
                            }
                        })
                        .catch((err) => {
                            console.log(err)
                        })
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }

    componentWillUnmount() {
        loader.showLoader()
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
                            history={this.props.history}
                            defaultBrowser={this.state.browser}
                            defaultTechnologies={this.state.technologies}
                            callback={this.submitTechnologiesCallback}
                            visibilityState={this.state.chooseTechnoFormAnimation} />
                        : null
                }
                {
                    this.state.inputLinksVisibility
                        ? <InputForm
                            history={this.props.history}
                            browser={this.state.browser}
                            technologies={this.state.technologies}
                            images={this.state.images}
                            browserImage={this.state.browserImage}
                            callback={this.returnToPreviousFormCallback}
                            visibilityState={this.state.inputLinksFormAnimation} />
                        : null
                }

            </div>
        )
    }
}

export default CreateNewWorkspace;
