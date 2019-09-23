import React from 'react';
import './RegistrationForm.css';

class RegistrationForm extends React.Component {
    constructor(props) {
        super(props)

        this.onSubmitHandler = this.onSubmitHandler.bind(this);
    }


    onSubmitHandler(e){
        e.preventDefault();
        console.log(12);
    }

    render() {
        return (
            <form onSubmit={this.onSubmitHandler}>
                <div className="form-group">
                    <label htmlFor="usernameInput">Username</label>
                    <input type="text" className="form-control" id="usernameInput" placeholder="Enter username" />
                </div>
                <div className="form-group">
                    <label htmlFor="passwordInput">Password</label>
                    <input type="password" className="form-control" id="passwordInput" placeholder="Password" autoComplete="on"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        )
    }
}

export default RegistrationForm;
