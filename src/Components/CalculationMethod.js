import React, { Component } from 'react'

class CalculationMethod extends Component {
	render () {

		return(
			<div>
			<select id="method" name="method" onChange= { this.props.onChangeValue}>
			<option value="metric">metric</option>
			<option value="imperial">imperial</option>
			</select>
			</div>
			)
		}
	}

	export default CalculationMethod