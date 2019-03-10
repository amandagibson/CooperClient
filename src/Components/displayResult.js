import React, { Component } from 'react';
import { bmiCalculation } from '../Modules/BMICalculator';
import { saveData } from '../Modules/BmiData';
import { Button } from 'semantic-ui-react'


class DisplayResult extends Component {
	calculate() {
		let method = this.props.method;
		let weight= this.props.weight;
		let height= this.props.height;

		return bmiCalculation(weight, height, method);
	}

	async saveCooperData() {
		const result = this.calculate();
		const values = {
			weight: this.props.weight,
			height: this.props.height,
		}

    try {
      await saveData(result, values);
      this.props.entryHandler();
    } catch(error) {
      console.log(error);
    }
	}

	render() {
		let results;
		let saveButton;

		if (this.props.authenticated === true && this.props.entrySaved === false) {
			saveButton = (
				<>
					<Button color="green" id="save-result" onClick={this.saveCooperData.bind(this)}>Save entry</Button>
				</>
			)
		} else if (this.props.authenticated === true && this.props.entrySaved === true) {
			saveButton = (
				<>
					<p>Your entry was saved</p>
				</>
			)
		}
		if (this.props.weight !== '' && this.props.height !== '') {
			results = (
				<>
					<p>{this.props.weight} weight {this.props.height} height</p>
					<p>Result: {this.calculate()}</p>
					{saveButton}
				</>
			)
			}
		return (
			<div>
				{results}
			</div>
		)
	}
}


export default DisplayResult