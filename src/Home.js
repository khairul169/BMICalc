import React from 'react';
import {View, Image} from 'react-native';
import {
	Container, Header, Body, Title, Content, Text,
	Form, Item, Input, Icon, Label, Button
} from 'native-base';

class AppHeader extends React.Component {
	render() {
		return (
			<Header>
				<Body>
					<Title>{this.props.title}</Title>
				</Body>
			</Header>
		);
	}
}

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			beratBadan: null,
			tinggiBadan: null
		};
	}
	
	render() {
		return (
			<Container>
				<AppHeader title="Kalkulator IMT/BMI" />
				
				<Content padder>
					<View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
						<Image source={require('../assets/weight-loss-illustration.png')} style={{width: 100, height: 100}} />
					</View>
					
					<Form style={{marginTop: 32}}>
						<Item>
							<Icon active type="FontAwesome5" name='weight' />
							<Input placeholder="Berat badan (kg)" value={this.state.beratBadan} onChangeText={(text) => this.setState({beratBadan: text})} />
						</Item>
						
						<Item>
							<Icon active type="MaterialCommunityIcons" name='human' />
							<Input placeholder="Tinggi badan (cm)" value={this.state.tinggiBadan} onChangeText={(text) => this.setState({tinggiBadan: text})} />
						</Item>
					</Form>
					
					<Button style={{marginTop: 32}} full success><Text>Hitung IMT</Text></Button>
				</Content>
			</Container>
		);
	}
}
