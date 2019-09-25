import React from 'react';
import './SetupForm.css';

class SetupForm extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="setup-form">

                <header className="setup-form-info">
                    <h2 className='step-description'>Setup Workspace</h2>
                    <h3 className="step-helper">Choose name and category for workspace</h3>
                </header>

                <form>

                    <div class="form-group col-md-12">
                        <label for="inputName">Workspace name</label>
                        <input type="text" class="form-control" id="inputName" placeholder="Enter name" />
                    </div>
                    <div class="form-group col-md-12">
                        <label for="inputCategoy">Workspace category</label>
                        <select id="inputCategoy" class="form-control">
                            <option disabled selected>Choose category...</option>
                            <option>Study</option>
                            <option>Work</option>
                            <option>Courses</option>
                            <option>Own projects</option>
                            <option>Other</option>
                        </select>
                    </div>

                    <div className='btn-container'>
                        <button type="submit" class="btn btn-success">Create Workspaces</button>
                    </div>


                </form>
            </div>
        )
    }
}


export default SetupForm;
