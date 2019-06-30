import React, {Component} from 'react';
import {Container, Header, Body, Title, Content, Text} from 'native-base';

export default class App extends Component {
	constructor(props) {
		super(props);
		
		console.log("jaja");
	}
	
	componentDidMount() {
		console.log("mounted");
	}
	
	render() {
		return (
			<Container>
				<Header>
					<Body>
						<Title>Test Hehe</Title>
					</Body>
				</Header>
				
				<Content padder>
					<Text>test</Text>
				</Content>
			</Container>
		);
	}
}
