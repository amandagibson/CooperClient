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
		/>
		{/* <select id="gender" onChange={props.inputChangeHandler}>
			<option value="female">Female</option>
			<option value="male">Male</option>
		</select> */}
		<Form type="large">
			<Form.Input
				fluid
				id="distance"
				placeholder="Distance"
				onChange={props.inputChangeHandler}
			/>

			{/* <input id="distance" onChange={props.inputChangeHandler}></input> */}
			<Form.Input
				fluid
				id="age"
				placeholder="Age"
				onChange={props.inputChangeHandler}
			/>
			{/* <label>Age</label>
		<input id="age" onChange={props.inputChangeHandler}></input> */}
		</Form>
		</>
		)
	}

	export default InputFields;