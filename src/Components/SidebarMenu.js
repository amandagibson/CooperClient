import React, { Component } from "react";
import { Icon, Menu, Sidebar} from 'semantic-ui-react'

export class SidebarMenu extends Component {
	render() {

		return (
			<>
				<Sidebar as={Menu} animation='overlay' icon='labeled' inverted vertical visible width='thin'>
				<Menu.Item as='a'
					id="login" onClick={this.props.handleLoginState}
				>
				<Icon name='sign in alternate' />
				Sign-in
				</Menu.Item>
				<Menu.Item as='a'
					id="data" onClick={this.props.handleData}
				>
				<Icon name='chart line' />
				Performance-data
				</Menu.Item>
				</Sidebar>
			</>
		)
	}
}

export default SidebarMenu;