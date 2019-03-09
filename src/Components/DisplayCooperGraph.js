import React, { Component } from 'react';
import { getData } from '../Modules/PerformanceData';
import { Line } from 'react-chartjs-2';
import { Grid } from 'semantic-ui-react';

class DisplayCooperGraph extends Component {
	constructor(props) {
		super(props)
		this.state = {
			performanceData: null
		}
	}
	componentDidMount() {
		this.getPerformanceData()
	}

	async getPerformanceData() {
		let result = await getData();
		this.setState({performanceData: result.data.entries}, () => {
			this.props.handleCooperGraph();
		})
	}

	render () {
		let dataIndex;

		if (this.props.renderCooperGraph === true) {
			this.getPerformanceData();
		}
		if (this.state.performanceData != null) {
			const distances = []
			const labels = []
			this.state.performanceData.forEach(entry => {
      distances.push(entry.data.distance)
			})
			const data = {
				datasets: [{
					data: distances,
					label: 'Stored runs',
				}],
			}
			dataIndex = (
				<>
				<Grid columns={2} doubling stackable>
					<Grid.Column>
						<Line ref='chart' data={data} />
					</Grid.Column>
				</Grid>
				</>
				)
			}

				return (
					<div>
					{dataIndex}
					</div>
					)
				}
			}
			export default DisplayCooperGraph