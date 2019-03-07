import React, { Component } from 'react';
import DisplayCooperResult from './Components/DisplayCooperResult';
import DisplayPerformanceData from './Components/DisplayPerformanceData';
import InputFields from './Components/InputFields';
import LoginForm from './Components/LoginForm';
import { authenticate } from './Modules/Auth';
import DisplayResult from './Components/displayResult';
import CalculationMethod from './Components/CalculationMethod';
import { Container, Grid, Header, Segment,Form } from 'semantic-ui-react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      distance: '',
      gender: 'female',
      age: '',
      renderLoginForm: false,
      authenticated: false,
      email: '',
      password: '',
			message: '',
			entrySaved: false,
			renderIndex: false,
			updateIndex: false,
			weight: '',
			height: '',
			method: 'metric',
			weightType: 'kg',
			heightType: 'cm'

    }
	}

	setInputType(value) {
		this.setState({ method: value }, () => {
			if (this.state.method === 'imperial') {
				this.setState({ weightType: 'lbs', heightType: 'inches' });
			} else if (this.state.method === 'metric') {
				this.setState({ weightType: 'kg', heightType: 'cm' });
			}
		})
	}

	entryHandler() {
    this.setState({ entrySaved: true, updateIndex: true });
	}

	indexUpdated() {
		this.setState({ updateIndex: false });
	}

  onChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
      entrySaved: false
    })
  }

	async onLogin(e) {
		e.preventDefault();
		let resp = await authenticate(this.state.email, this.state.password)
		if (resp.authenticated === true) {
			this.setState({ authenticated: true });
		} else {
			this.setState({ message: resp.message, renderLoginForm: false })
		}
	}

	render() {
    let renderLogin;
		let user;
		let performanceDataIndex;

		if (this.state.authenticated === true) {
			user = JSON.parse(sessionStorage.getItem('credentials')).uid;
			renderLogin = (
				<p>Hi {user}</p>
			)
			if (this.state.renderIndex === true) {
				performanceDataIndex = (
					<>
						<DisplayPerformanceData
							updateIndex={this.state.updateIndex}
							indexUpdated={this.indexUpdated.bind(this)}
						/>
						<button onClick={() => this.setState({ renderIndex: false })}>Hide past entries</button>
					</>
				)
			} else {
				performanceDataIndex = (
					<button id="show-index" onClick={() => this.setState({ renderIndex: true })}>Show past entries</button>
				)
			}
		} else {
      if (this.state.renderLoginForm === true) {
        renderLogin = (
          <>
            <LoginForm
              loginHandler={this.onLogin.bind(this)}
              inputChangeHandler={this.onChange.bind(this)}
            />
          </>
        )
      } else {
        renderLogin = (
          <>
            <button id="login" onClick={() => this.setState({ renderLoginForm: true })}>Login</button>
            <p>{this.state.message}</p>
          </>
        )
      }
    }

    return (
			<>
			<Container>
				<Grid centered columns={3}>
					<Grid.Column>
						<Header as="h1"textAlign="center">
								Cooper Test
						</Header>
						<Segment>
							<InputFields
								inputChangeHandler={this.onChange.bind(this)}
							/>

							<DisplayCooperResult
								distance={this.state.distance}
								gender={this.state.gender}
								age={this.state.age}
								authenticated={this.state.authenticated}
								entrySaved={this.state.entrySaved}
								entryHandler={this.entryHandler.bind(this)}
							/>
							{performanceDataIndex}
						</Segment>
						</Grid.Column>
					</Grid>
				</Container>
				<Container>
					<Grid centered columns={3}>
						<Grid.Column>
						<Header as="h1"textAlign="center">
								BMI Test
						</Header>
						<Segment>
							<CalculationMethod
								onChangeValue={this.setInputType.bind(this)}
							/>
							<Form type="large">
								<Form.Input
									fluid
									name="weight"
									placeholder={`Weight(${this.state.weightType})`}
									value={this.state.weight}
									onChange={(e) => this.setState({ weight: e.target.value })}
								/>
								<Form.Input
									fluid
									name="height"
									placeholder={`Height(${this.state.heightType})`}
									value={this.state.height}
									onChange={(e) => this.setState({ height: e.target.value })}
								/>
							</Form>
							<DisplayResult
								method = {this.state.method}
								weight={this.state.weight}
								height={this.state.height}
							/>
							{/* <div className="input-field">
								<label>Weight({this.state.weightType})</label>
								<input name="weight" value={this.state.weight} onChange={(e) => this.setState({ weight: e.target.value })} />
							</div>

							<div className="input-field">
								<label>Height({this.state.heightType})</label>
								<input name="height" value={this.state.height} onChange={(e) => this.setState({ height: e.target.value })} />
							</div> */}
						</Segment>
					</Grid.Column>
				</Grid>
			</Container>
						{renderLogin}

        {/* <InputFields
          inputChangeHandler={this.onChange.bind(this)}
        />

				{/* <DisplayCooperResult
					distance={this.state.distance}
					gender={this.state.gender}
					age={this.state.age}
					authenticated={this.state.authenticated}
					entrySaved={this.state.entrySaved}
					entryHandler={this.entryHandler.bind(this)}
				/> */}
  			{/* {performanceDataIndex}
				{renderLogin} */}
				{/* <CalculationMethod
					onChangeValue={this.setInputType.bind(this)}
				/> */}
				{/* <div className="input-field">
					<label>Weight({this.state.weightType})</label>
					<input name="weight" value={this.state.weight} onChange={(e) => this.setState({ weight: e.target.value })} />
				</div>

				<div className="input-field">
					<label>Height({this.state.heightType})</label>
					<input name="height" value={this.state.height} onChange={(e) => this.setState({ height: e.target.value })} />
				</div> */}
				{/* <DisplayResult
					method = {this.state.method}
					weight={this.state.weight}
					height={this.state.height}
				/> */}
      </>
    );
  }
}

export default App;