import React from 'react';
import {Container, Header, Body, Title, Content, Text} from 'native-base';

export default class Home extends React.Component {
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
