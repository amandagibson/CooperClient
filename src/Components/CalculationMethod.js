import React, { Component } from 'react'
import { Dropdown } from 'semantic-ui-react';

class CalculationMethod extends Component {
	render () {
		const optionValues = [
			{text: "metric", value: "metric"},
			{text: "imperial", value: "imperial"}
		]
		return(
			<Dropdown
			selection
			id="method"
			defaultValue={optionValues[0].value}
			options={optionValues}
			onChange={(e,{value}) => this.props.onChangeValue(value)}
			/>
		)
	}
}

	export default CalculationMethod