import React, { Component } from 'react';
import { getData } from '../Modules/BmiData';

class DisplayBmiData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bmiData: null
    }
  }
  componentDidMount() {
    this.getBmiData()
  }

  async getBmiData() {
    let result = await getData();
    this.setState({bmiData: result.data.entries}, () => {
      this.props.bmiUpdated();
    })
  }

  render () {
    let dataIndex;

    if (this.props.updateBmiIndex === true) {
      this.getBmiData();
    }
    if (this.state.bmiData != null) {
      dataIndex = (
        <div>
          {this.state.bmiData.map(item => {
            return <div key={item.id}>{item.data.message}</div>
          })}
        </div>
      )
    }

    return (
      <div>
        {dataIndex}
      </div>
    )
  }
}
export default DisplayBmiData