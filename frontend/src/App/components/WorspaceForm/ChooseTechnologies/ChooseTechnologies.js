import React from 'react';
import './ChooseTechnologies.css';

import { _technoHelper } from '../../../_helper/technoHelper';

import chromeIcon from "./../../../assets/browserIcons/google.png";
import firefoxIcon from "./../../../assets/browserIcons/firefox.png";
import safariIcon from "./../../../assets/browserIcons/safari.png";
import IEIcon from "./../../../assets/browserIcons/IE.png";

import atom from "./../../../assets/technoIcons/atom.jpg";
import sublime from "./../../../assets/technoIcons/sublime.png";
import VScode from "./../../../assets/technoIcons/VScode.svg";

import { _helper } from '../../../_helper/authValidation';

class ChooseTechnologies extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedBrowser: "",
            selectedTechnologies: []
        }

        this.technoNameTemplate = [
            _technoHelper.CODE_ATOM,
            _technoHelper.CODE_SUBLIME_TEXT,
            _technoHelper.CODE_VISUAL_STUDIO_CODE
        ]

        this.technoTemplate = [
            {
                name: _technoHelper.CODE_ATOM,
                img: atom
            },
            {
                name: _technoHelper.CODE_SUBLIME_TEXT,
                img: sublime
            },
            {
                name: _technoHelper.CODE_VISUAL_STUDIO_CODE,
                img: VScode
            },
        ]

        this.handleReturnToHomePage = this.handleReturnToHomePage.bind(this)
    }

    handleReturnToHomePage() {
        this.props.history.push(_helper.PATH_HOME_PAGE)
    }

    selectBrowserCallback = (browserName) => {
        let selectedBrowser
        if (browserName === this.state.selectedBrowser) selectedBrowser = ""
        else selectedBrowser = browserName

        this.setState({
            selectedBrowser: selectedBrowser
        })
    }

    selectTechnologiesCallback = (technoName) => {
        let technologies = this.state.selectedTechnologies;

        for (let i = 0; i < technologies.length; i++) {
            if (technologies[i][technoName] !== undefined) {

                this.setState(prevState => {
                    let temp = Array.from(prevState.selectedTechnologies);
                    temp[i][technoName] = !technologies[i][technoName];

                    return temp
                })
                return;
            }
        }
    }

    submitTechnologies = (browser, technologies) => {
        let flag = true;
        for (let i = 0; i < this.state.selectedTechnologies.length; i++) {
            for (const key in this.state.selectedTechnologies[i]) {
                if (this.state.selectedTechnologies[i][key] === true) flag = false;
            }
        }

        if (this.state.selectedBrowser === ""
            && (this.state.selectedTechnologies.length === 0 || flag === true)) {
            alert(_technoHelper.WARN_CHOOSE_SOMETHING)
        } else {
            this.props.callback(this.state.selectedBrowser, this.state.selectedTechnologies, this.technoTemplate)
        }
    }

    componentDidMount() {
        if (this.props.defaultBrowser !== ""
            || this.props.defaultTechnologies.length !== 0) {

            this.setState({
                selectedBrowser: this.props.defaultBrowser,
                selectedTechnologies: this.props.defaultTechnologies
            })
        } else {
            let temp = [];

            for (let i = 0; i < this.technoNameTemplate.length; i++) {
                temp.push({
                    [this.technoNameTemplate[i]]: false
                })
            }

            this.setState({
                selectedTechnologies: temp
            })
        }
    }

    render() {
        let technoMap = {}
        if (this.props.defaultTechnologies.length !== 0) {

            for (let i = 0; i < this.props.defaultTechnologies.length; i++) {
                let key = Object.keys(this.props.defaultTechnologies[i])[0]
                technoMap[key] = this.props.defaultTechnologies[i][key]
            }
        }
        return (
            <div className={"choose-technologies-form " + this.props.visibilityState}
                onAnimationEnd={this.animationHandler}>

                <div className="go-back" onClick={this.handleReturnToHomePage}>
                    <i className="fas fa-chevron-circle-left"></i>
                </div>

                <header className="setup-form-info">
                    <h2 className='step-description'>Setup your workspace</h2>
                </header>

                <h3 className="step-helper">Choose one browser</h3>
                <div className="browser-selection">

                    <BrowserCard
                        browserName={_technoHelper.BROWSER_CHROME}
                        imgAlt={_technoHelper.BROWSER_CHROME}
                        browserIconLink={chromeIcon}
                        callback={this.selectBrowserCallback}
                        selectedBrowser={this.state.selectedBrowser} />
                    <BrowserCard
                        browserName={_technoHelper.BROWSER_FIREFOX}
                        imgAlt={_technoHelper.BROWSER_FIREFOX}
                        browserIconLink={firefoxIcon}
                        callback={this.selectBrowserCallback}
                        selectedBrowser={this.state.selectedBrowser} />
                    <BrowserCard
                        browserName={_technoHelper.BROWSER_SAFARI}
                        imgAlt={_technoHelper.BROWSER_SAFARI}
                        browserIconLink={safariIcon}
                        callback={this.selectBrowserCallback}
                        selectedBrowser={this.state.selectedBrowser} />
                    <BrowserCard
                        browserName={_technoHelper.BROWSER_IE}
                        imgAlt={_technoHelper.BROWSER_IE}
                        browserIconLink={IEIcon}
                        callback={this.selectBrowserCallback}
                        selectedBrowser={this.state.selectedBrowser} />
                </div>

                <h3 className="step-helper-techno">Select technologies</h3>
                <div className="techno-selection">
                    {

                        this.technoTemplate.map((value, index) => {

                            return <TechnoCard
                                key={index}
                                technoName={value.name}
                                altAttribute={value.name}
                                image={value.img}
                                callback={this.selectTechnologiesCallback}
                                defaultSelection={technoMap[value.name]} />
                        })
                    }
                </div>

                <div className='btn-container'>
                    <button
                        onClick={this.submitTechnologies}
                        type="submit"
                        className="btn btn-success">Create Workspaces</button>
                </div>
            </div>
        )
    }
}

class BrowserCard extends React.Component {
    constructor(props) {
        super(props)
    }

    selectBrowser = (event) => {
        this.props.callback(event.currentTarget.dataset.name)
    }

    render() {
        const selectedBrowserClassname =
            this.props.selectedBrowser === this.props.browserName
                ? _technoHelper.CLASSNAME_SELECTED_BROWSER
                : "";

        return (
            <div className="browser-card col-3">

                <div className={"card-border " + selectedBrowserClassname}
                    data-name={this.props.browserName} onClick={this.selectBrowser}>

                    <div className="browser-card-wrapper">
                        <img src={this.props.browserIconLink}
                            alt={this.props.imgAlt}
                            width="100px"
                            height="100px"></img>
                    </div>
                    <h5 className="browser-description">{this.props.browserName}</h5>
                </div>

            </div>
        )
    }
}

class TechnoCard extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selected: false
        }
    }

    selectTechology = (event) => {
        this.setState({
            selected: !this.state.selected
        })
        this.props.callback(event.currentTarget.dataset.name)
    }

    componentDidMount() {
        if (this.props.defaultSelection) {
            this.setState({
                selected: !this.state.selected
            })
        }
    }

    render() {
        const selectedClassname =
            this.state.selected
                ? _technoHelper.CLASSNAME_SELECTED_TECNOLOGY
                : "";

        return (
            <div className="techno-card col-3">
                <div className={"card-border techno-card-border " + selectedClassname}
                    data-name={this.props.technoName}
                    onClick={this.selectTechology}>
                    <div className="techno-card-wrapper">

                        <img
                            src={this.props.image}
                            width="80px"
                            height="80px"
                            alt={this.props.altAttribute + " " + _technoHelper.ICON_NAME}></img>
                    </div>
                    <h5 className="techno-description">{this.props.technoName}</h5>
                </div>
            </div>
        )
    }
}

export default ChooseTechnologies;
