import React from 'react';

const InputFields = (props) => {
	return(
		<>
		<select id="gender" onChange={props.inputChangeHandler}>
			<option value="female">Female</option>
			<option value="male">Male</option>
		</select>

		<label>Distance</label>
			<input id="distance" onChange={props.inputChangeHandler}></input>
			<label>Age</label>
		<input id="age" onChange={props.inputChangeHandler}></input>
		</>
		)
	}

	export default InputFields;