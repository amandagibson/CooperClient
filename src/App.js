import React, { Component } from 'react';
import DisplayCooperResult from './Components/DisplayCooperResult';
import DisplayPerformanceData from './Components/DisplayPerformanceData';
import InputFields from './Components/InputFields';
import LoginForm from './Components/LoginForm';
import { authenticate } from './Modules/Auth';
import DisplayResult from './Components/displayResult';
import DisplayBmiData from './Components/DisplayBmiData';
import CalculationMethod from './Components/CalculationMethod';
import { Container, Grid, Header, Segment, Form, Button } from 'semantic-ui-react';
import SidebarMenu from './Components/SidebarMenu';
import DisplayCooperGraph from './Components/DisplayCooperGraph';

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
			bmiEntrySaved: false,
			renderIndex: false,
			updateIndex: false,
			renderBmiIndex: false,
			updateBmiIndex: false,
			weight: '',
			height: '',
			method: 'metric',
			weightType: 'kg',
			heightType: 'cm',
			renderCooperGraph: false,
			updateCooperGraph: false
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

	entryHandler(e) {
    this.setState({ entrySaved: true, bmiEntrySaved: true, updateIndex: true, updateBmiIndex: true, updateCooperGraph: true});
	}

	handleLoginState() {
		this.setState({renderLoginForm: true})
	}

	handleCooperGraph() {
		this.setState({renderCooperGraph: true })
	}

	graphUpdated() {
		this.setState({updateCooperGraph:false})
	}

	indexUpdated() {
		this.setState({ updateIndex: false });
	}

	bmiUpdated() {
		this.setState({ updateBmiIndex: false})
	}

	handleGenderChange(value) {
		this.setState({ gender: value})
	}

  onChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
			entrySaved: false,
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
		let renderGraph;
		let bmiDataIndex;

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
						<Button onClick={() => this.setState({ renderIndex: false })}>Hide past entries</Button>
					</>
				)
			} else {
				performanceDataIndex = (
					<Button color="grey" id="show-index" onClick={() => this.setState({ renderIndex: true })}>Show past entries</Button>
				)
			}
			if(this.state.renderCooperGraph === true) {
				renderGraph = (
				<>
					<DisplayCooperGraph
						updateCooperGraph={this.state.updateCooperGraph}
						graphUpdated={this.graphUpdated.bind(this)}
					/>
				</>
				)
			}
			if(this.state.renderBmiIndex === true) {
				bmiDataIndex = (
					<>
						<DisplayBmiData
							updateBmiIndex={this.state.updateBmiIndex}
							bmiUpdated={this.bmiUpdated.bind(this)}
						/>
						<Button onClick={() => this.setState({ renderBmiIndex: false })}>Hide past entries</Button>
					</>
				)
			} else {
				bmiDataIndex = (
					<Button color="grey" id="show-index" onClick={() => this.setState({ renderBmiIndex: true })}>Show past entries</Button>
				)
			}

		} else {
      if (this.state.renderLoginForm === true) {
        renderLogin = (
            <LoginForm
              loginHandler={this.onLogin.bind(this)}
              inputChangeHandler={this.onChange.bind(this)}
            />

        )
			}
    }

    return (
			<>
				<Container>
					<SidebarMenu
						handleLoginState={this.handleLoginState.bind(this)}
						handleCooperGraph={this.handleCooperGraph.bind(this)}
					/>
					<Grid centered columns={3}>
						<Grid.Column>
							<Header as="h1"textAlign="center">
									Cooper Test
							</Header>
							<Segment>
								<InputFields
									inputChangeHandler={this.onChange.bind(this)}
									handleGenderChange={this.handleGenderChange.bind(this)}
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
					{renderGraph}
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
										onChange={(e) => this.setState({ weight: e.target.value, bmiEntrySaved: false })}

									/>
									<Form.Input
										fluid
										name="height"
										placeholder={`Height(${this.state.heightType})`}
										value={this.state.height}
										onChange={(e) => this.setState({ height: e.target.value, bmiEntrySaved: false })}
									/>
								</Form>
								<DisplayResult
									method = {this.state.method}
									weight={this.state.weight}
									height={this.state.height}
									authenticated={this.state.authenticated}
									bmiEntrySaved={this.state.bmiEntrySaved}
									entryHandler={this.entryHandler.bind(this)}

								/>
								{bmiDataIndex}
							</Segment>
							{renderLogin}
						</Grid.Column>
					</Grid>
				</Container>
			</>
    );
  }
}

export default App;