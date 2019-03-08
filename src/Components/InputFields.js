import React from 'react';
import {Form, Dropdown} from 'semantic-ui-react'

const InputFields = (props) => {
	const optionValues = [
		{text: "Female", value: "female"},
		{text: "Male", value: "male"}
	]
	return(
		<>
		<Dropdown
			selection
			id="gender"
			defaultValue={optionValues[0].value}
			options={optionValues}
			onChange={(e,{value}) => props.handleGenderChange(value)}
		/>

		<Form type="large">
			<Form.Input
				fluid
				id="distance"
				placeholder="Distance"
				onChange={props.inputChangeHandler}
			/>

			<Form.Input
				fluid
				id="age"
				placeholder="Age"
				onChange={props.inputChangeHandler}
			/>
		</Form>
		</>
		)
	}

	export default InputFields;