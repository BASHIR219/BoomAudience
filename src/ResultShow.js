import React, { Component } from 'react'

export default class ResultShow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 1,
    };
  }
 

  render() {
    let { name, topic, audience_size, handleColumnClick } = this.props;

    return (
      <div className="resultShow" style={{border:'1px solid white'}}>
        <table className="table my-0" >

          <tbody style={{ color: this.props.mode === 'dark' ?'white':'black', }} >
            <tr>
              {/* <th scope="row">{this.state.count}</th> */}
              <td className='col-4 border clickable-column' style={{cursor: 'pointer'}} onClick={() => handleColumnClick(name)}>{name}</td>

              <td className='col-4 border'>&lt; {audience_size}</td>
              <td className='col-4 border'>{topic}</td>
            </tr>
          </tbody>

        </table>

      </div>
    )
  }
}
