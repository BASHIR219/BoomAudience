import React, { Component } from 'react'

export default class Footer extends Component {
    render() {
        return (
            <div className='container-fluid d-flex justify-content-center position-relative bottom-0' 
            style={{ backgroundColor: this.props.mode === 'dark' ? '#0a192f' : '#0a192f', height:'100px'}}>

                <footer>
                   <h5>&copy; 2023 DigiDevops. All Rights Reserved</h5> 
                </footer>

            </div>
        )
    }
}
