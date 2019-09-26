import React from 'react';
import './InputForm.css';

class InputForm extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="input-form">
                <header className="setup-form-info">
                    <h2 className='step-description'>Select path your workspace</h2>
                    <h3 className="step-helper">Input path your workspaces</h3>
                </header>

                <div className="input-section">
                    <TechnologiesCard />
                    <TechnologiesCard />
                    <TechnologiesCard />
                    <TechnologiesCard />
                    <TechnologiesCard />
                    <TechnologiesCard />
                    <TechnologiesCard />
                </div>
            </div>
        )
    }
}

class TechnologiesCard extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="card mb-3 border-left-0 border-right-0 border-top-0">
                <div className="row">
                    <div className="col-md-2">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Visual_Studio_Code_1.35_icon.svg" className="card-img" alt="..." width="80px" height="80px"/>
                    </div>

                    <div className="col-md-8 align-items-center justify-content-center">
                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                            </div>
                            <input type="text" className="form-control" placeholder="Input local path..." aria-label="" aria-describedby="basic-addon1" />
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default InputForm;