import React, { Component } from 'react'
import ResultShow from './ResultShow';

export default class Body extends Component {
    constructor(props) {
        super(props);
        console.log("I am constructor from facebook ");
        this.state = {
            names: [],
            loading: false,
            searchTopic: "Golf",
            resultCount: 154,
            selectedInterest: '',

        };
    }



    async componentDidMount() {
        let url = `https://graph.facebook.com/search?type=adinterest&q=${this.state.searchTopic}&limit=10000&1ocale=en_US&access_token=EAADN9Orrq4QBOzuZBfercu6tqKgLLoJHn05BfMzI5M2SLo5Qv5Kcl0gpLgMKzgoj1u63ZA72gK7YMgPgXWicdApSTIDtRlfVMKZBRj2Pxn670n2eZBZAuRf3kXG2ZCRr6KKRT7GC4ZBEXbbbifYBsxRfscvyQxuNlZAZBOoczNZBb8jGiSmg5BUQcATrLO`;
        let data = await fetch(url);
        let parsedData = await data.json();

        console.log(parsedData);
        this.setState({
            names: parsedData.data,
        });

    }

    handleInput = async (e) => {
        e.preventDefault();

        try {
            const url = `https://graph.facebook.com/search?type=adinterest&q=${this.state.searchInput}&limit=10000&locale=en_US&access_token=EAADN9Orrq4QBOzuZBfercu6tqKgLLoJHn05BfMzI5M2SLo5Qv5Kcl0gpLgMKzgoj1u63ZA72gK7YMgPgXWicdApSTIDtRlfVMKZBRj2Pxn670n2eZBZAuRf3kXG2ZCRr6KKRT7GC4ZBEXbbbifYBsxRfscvyQxuNlZAZBOoczNZBb8jGiSmg5BUQcATrLO`;
            const data = await fetch(url);
            const parsedData = await data.json();
            console.log(parsedData);
            if (parsedData.data && Array.isArray(parsedData.data)) {
                this.setState({
                    names: parsedData.data,
                    resultCount: parsedData.data.length, // Set resultCount
                });
            }

        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    handleColumnClick = (text) => {
        console.log("i am click");
        
        this.setState(
            (prevState) => ({
                selectedInterest: prevState.selectedInterest + text + ', ',
            }),
            () => {
                console.log("Updated selectedInterest:", this.state.selectedInterest);
            }
        );
    };

    clearSelectedInterest = () => {
        console.log("i am from clear btn");
        this.setState({ selectedInterest: '' });
    };

    copySelectedInterest = () => {
        const textarea = document.getElementById('selectedInterest');
        textarea.select();

        // Use the Clipboard API to copy the selected text
        navigator.clipboard.writeText(this.state.selectedInterest)
            .then(() => {
                console.log('Text copied to clipboard');
            })
            .catch((error) => {
                console.error('Unable to copy text:', error);
            });
    };


    render() {

        return (

            <div className='container'>
                <div>
                    <form className="d-flex justify-content-center mt-3" role="search" onSubmit={this.handleInput}>
                       
                        <input
                            className="form-control me-2 mx-3 my-3"
                            onChange={(e) => this.setState({ searchInput: e.target.value })}
                            type="search"
                            placeholder="Search Hidden Audience"
                            aria-label="Search"
                            defaultValue={this.state.searchInput}
                            style={{
                                backgroundColor: this.props.mode === 'dark' ? '#0a192f' : 'white',
                                color: this.props.mode === 'dark' ? 'white' : 'black',
                                border: this.props.mode === 'dark' ? '1px solid white' : '1px solid black',
                            }}
                        />

                        <button className="btn btn-outline-primary my-3"   type="submit">Explore</button>
                    </form>
                </div>
                <div>
                    <h3 className='mx-3 my-3'>Selection</h3>
                    <div className="form-floating mx-3 my-3">

                        <textarea
                            className="form-control"
                            placeholder="Leave a comment here"
                            id='selectedInterest'
                            defaultValue={this.state.selectedInterest}
                            style={{
                                backgroundColor: this.props.mode === 'dark' ? '#0a192f' : 'white',
                                color: this.props.mode === 'dark' ? 'white' : 'black',
                                border: this.props.mode === 'dark' ? '1px solid white' : '1px solid black',
                                height:'100px'
                            }}
                            rows={4}>
                        </textarea>

                        <label htmlFor="floatingTextarea2">Your selected interest !</label>

                        <button type="button" className="btn btn-primary mt-1 " onClick={this.copySelectedInterest}>Copy All</button>

                        <button type="button" className="btn btn-danger mt-1 ms-3" onClick={this.clearSelectedInterest}>Clear All</button>

                        <div className='resultShown'>
                            <h3 > Total results:{this.state.resultCount}</h3>
                        </div>
                    </div>
                </div>
                <div >
                    <table className="table m-0 p-0">
                        <thead style={{
                            backgroundColor: this.props.mode === 'dark' ? '#0a192f' : 'rgb(249, 248, 245)',
                            color: this.props.mode === 'dark' ? 'white' : 'black',
                            border: this.props.mode === 'dark' ? '1px solid white' : '1px solid black',
                        }} >
                            <tr className='rounded-top'>

                                <th className="col-4" style={{ border: this.props.mode === 'dark' ? '1px solid white' : '1px solid black' }}>NAME</th>
                                <th className="col-4" style={{ border: this.props.mode === 'dark' ? '1px solid white' : '1px solid black' }}>AUDIENCE SIZE</th>
                                <th className="col-4" style={{ border: this.props.mode === 'dark' ? '1px solid white' : '1px solid black' }}>TOPIC</th>

                            </tr>
                        </thead>
                    </table>
                </div>

                <div className="row overflow-auto" 
                style={{ 
                    height: '498px',  
                    backgroundColor: this.props.mode === 'dark' ? '#0a192f' : 'rgb(255, 255, 255)', borderBottom:'1px solid white',
                   
                    }}>
                    
                    {this.state.names && this.state.names.map((element) => {
                        return <div className="row-md" key={element.id}>

                            <ResultShow name={element.name} topic={element.topic} audience_size={element.audience_size_upper_bound}
                                handleColumnClick={this.handleColumnClick}
                                mode={this.props.mode}
                            />
                        </div>

                    })}
                </div>
            </div>
        )
    }
}

