import React from 'react';
import './ChooseTechnologies.css';

import { _technoHelper } from '../../../_helper/technoHelper';

import chromeIcon from "./../../../assets/browserIcons/google-chrome.png";
import firefoxIcon from "./../../../assets/browserIcons/firefox.jpg";
import safariIcon from "./../../../assets/browserIcons/safari.png";
import IEIcon from "./../../../assets/browserIcons/IE.jpg";

class ChooseTechnologies extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            selectedBrowser: "",
            selectedTechnologies: []
        }
    }

    selectBrowserCallback = (browserName) => {
        if (browserName === this.state.selectedBrowser) {
            this.setState({
                selectedBrowser: ""
            })
            return;
        }
        this.setState({
            selectedBrowser: browserName
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

        let selected = {
            [technoName]: true
        }

        this.setState(prevState => ({
            selectedTechnologies: [...prevState.selectedTechnologies, selected]
        }))
    }

    render() {
        return (
            <div className="choose-technologies-form">
                <header className="setup-form-info">
                    <h2 className='step-description'>Select technologies</h2>
                    <h3 className="step-helper">Choose browser and other programs</h3>
                </header>

                <div className="browser-selection">
                    <BrowserCard
                        browserName={_technoHelper.BROWSER_CHROME}
                        browserIconLink={chromeIcon}
                        callback={this.selectBrowserCallback}
                        selectedBrowser={this.state.selectedBrowser} />
                    <BrowserCard
                        browserName={_technoHelper.BROWSER_FIREFOX}
                        browserIconLink={firefoxIcon}
                        callback={this.selectBrowserCallback}
                        selectedBrowser={this.state.selectedBrowser} />
                    <BrowserCard
                        browserName={_technoHelper.BROWSER_SAFARI}
                        browserIconLink={safariIcon}
                        callback={this.selectBrowserCallback}
                        selectedBrowser={this.state.selectedBrowser} />
                    <BrowserCard
                        browserName={_technoHelper.BROWSER_IE}
                        browserIconLink={IEIcon}
                        callback={this.selectBrowserCallback}
                        selectedBrowser={this.state.selectedBrowser} />
                </div>

                <div className="techno-selection">

                    <TechnoCard
                        technoName={_technoHelper.CODE_ATOM}
                        callback={this.selectTechnologiesCallback} />
                    <TechnoCard
                        technoName={_technoHelper.CODE_SUBLIME_TEXT}
                        callback={this.selectTechnologiesCallback} />
                    <TechnoCard
                        technoName={_technoHelper.CODE_VISUAL_STUDIO_CODE}
                        callback={this.selectTechnologiesCallback} />

                </div>

                <div className='btn-container'>
                    <button
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

                    <img src={this.props.browserIconLink}
                        width="140px"
                        height="140px"></img>
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

                    <img src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Icon_Atom.svg" width="80px" height="80px"></img>
                    <h5 className="techno-description">{this.props.technoName}</h5>
                </div>
            </div>
        )
    }
}


export default ChooseTechnologies;
