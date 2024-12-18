import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';

class NavBar extends Component {
    render() {
        const { loginWithRedirect, isAuthenticated, logout } = this.props.auth0; // Access the loginWithRedirect method from props

        return (
            <div>
                <nav className="navbar navbar-expand-lg " style={{ backgroundColor: this.props.mode === 'dark' ? '#0a192f' : '#0a192f', height: '80px' }}>
                    <div className="container-fluid">
                        <a className="navbar-brand" href="/" style={{ color: 'white' }}><b>BOOM Audience</b></a>

                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto ">
                                <li className="nav-item">
                                    <a className="nav-link active" aria-current="page" href="/" style={{ color: 'white' }}><b>Home</b></a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/" style={{ color: 'white' }}><b>About</b></a>
                                </li>
                            </ul>
                        </div>
                        <div className="form-check form-switch" style={{ display: 'flex', alignItems: 'center' }}>
                            <input className="form-check-input" onClick={this.props.toggleMode} type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault" style={{ color: 'white', marginRight: '8px' }}><b>Dark</b></label>

                            {isAuthenticated ? (
                                <button className='btn btn-outline-danger' style={{height:'34px'}} onClick={() => logout({ returnTo: window.location.origin })}>
                                    Log Out
                                </button>
                            ) : (
                                <button className="btn btn-outline-primary" style={{height:'35px'}} onClick={() => loginWithRedirect()}>Log In</button>
                            )}
                        </div>

                    </div>
                </nav>
            </div>
        );
    }
}

export default withAuth0(NavBar);
