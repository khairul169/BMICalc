import React from 'react';
import {View, Image, TouchableOpacity, Linking} from 'react-native';
import {
	Container, Header, Body, Title, Content, Text,
	Form, Item, Input, Icon, Button, Card, Left, Right
} from 'native-base';
import * as Progress from 'react-native-progress';

const appUrl = "http://khairul.my.id/bbideal/";

const clamp = (value, min, max) => {
	return Math.min(Math.max(value, min), max);
}

class AppHeader extends React.Component {
	openWebsite = () => {
		//
		Linking.openURL(appUrl);
	}

	render() {
		return (
			<Header noShadow androidStatusBarColor="#4087ad" iosBarStyle="light-content" style={{backgroundColor: '#4087ad'}}>
				<Left style={{flex: 2, alignItems: 'center'}}>
					<Image source={require('../assets/weight-icon.png')} style={{width: 28, height: 28, marginRight: 16}} />
				</Left>

				<Body style={{flex: 9}}>
					<Title style={{color: '#fff'}}>{this.props.title}</Title>
				</Body>

				<Right style={{flex: 1}}>
					<TouchableOpacity onPress={this.openWebsite}>
						<Icon name='ios-help-circle' style={{color: '#fff'}} />
					</TouchableOpacity>
				</Right>
			</Header>
		);
	}
}

export default class Home extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {
			beratBadan: null,
			tinggiBadan: null,
			showError: false,
			imt: null,
			bbIdeal: null
		};
	}

	calculateIMT = () => {
		let indeksMassa;
		let bbIdeal;

		if (this.state.beratBadan && this.state.tinggiBadan) {
			const bb = clamp(parseFloat(this.state.beratBadan), 0.0, 250.0);
			const tb = clamp(parseFloat(this.state.tinggiBadan), 10.0, 200.0);
			
			indeksMassa = (bb / ((tb / 100.0) * (tb / 100.0))).toFixed(2);
			bbIdeal = clamp((tb - 100.0) - ((tb - 100) * 0.1), 0.0, 100.0).toFixed(1);
		}

		this.setState({
			showError: true,
			imt: indeksMassa,
			bbIdeal: bbIdeal,
		});
	}

	render() {
		let imtColor = '#49ad40';
		let imtProg = 0.0;
		let idealStatus;

		if (this.state.imt) {
			const imt = this.state.imt;
			if (imt > 25.0) {
				// obesitas
				imtColor = '#d13434';
				idealStatus = "Anda mengalami OBESITAS";
			} else if (imt > 23.0) {
				// kelebihan bb
				imtColor = '#d1ac34';
				idealStatus = "Anda mengalami kelebihan berat badan";
			} else if (imt > 18.5) {
				// normal
				imtColor = '#49ad40';
				idealStatus = "Berat badan Anda IDEAL";
			} else {
				// dibawah normal
				imtColor = '#2857a8';
				idealStatus = "Berat badan Anda KURANG";
			}

			// calculate progress bar value
			imtProg = clamp((imt - 14) / (28.0 - 14.0), 0.05, 1.0);
		}

		return (
			<Container>
				<AppHeader title="Berat Badan Ideal" />
				
				<Content padder keyboardShouldPersistTaps='handled'>
					<View style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
						<Image source={require('../assets/bmi-icon-65.png')}
							style={{width: 100, height: 100, marginVertical: 24}} />
					</View>

					{ this.state.imt && (
						<Card style={{marginTop: 16, padding: 16, flex: 1}}>
							<Text>Tinggi dan Berat Badan: {this.state.tinggiBadan} cm, {this.state.beratBadan} kg</Text>
							<Text style={{marginTop: 8, color: imtColor, fontSize: 24}}>
								IMT = {this.state.imt}
							</Text>
							
							<Text style={{marginTop: 10, textAlign: 'center', fontWeight: 'bold', color: '#3480d1', fontSize: 18}}>
								{idealStatus}
							</Text>

							<Progress.Bar
								progress={imtProg} color={imtColor} borderColor={imtColor}
								borderRadius={0} width={null} height={10} style={{marginVertical: 16}} />
							
							{ this.state.bbIdeal && <Text>Berat Badan Ideal: {this.state.bbIdeal} kg</Text> }
						</Card>
					)}
					
					<Card style={{marginTop: 16}}>
						<Form>
							<Item error={this.state.showError && !this.state.tinggiBadan ? true : false}>
								<Icon active type="MaterialCommunityIcons" name='human' />
								<Input placeholder="Tinggi Badan (cm)"
									keyboardType="number-pad"
									value={this.state.tinggiBadan}
									onChangeText={(text) => this.setState({tinggiBadan: text})}
									onSubmitEditing={this.calculateIMT} />
							</Item>

							<Item style={{borderBottomWidth: 0}}
								error={this.state.showError && !this.state.beratBadan ? true : false}>
								<Icon active type="FontAwesome5" name='weight' />
								<Input placeholder="Berat Badan (kg)"
									keyboardType="number-pad"
									value={this.state.beratBadan}
									onChangeText={(text) => this.setState({beratBadan: text})}
									onSubmitEditing={this.calculateIMT} />
							</Item>
						</Form>
					</Card>

					<Button full style={{marginTop: 16, backgroundColor: '#52ad40'}}
						onPress={this.calculateIMT}>
						<Text color='#fff'>
							Hitung BB Ideal
						</Text>
					</Button>
				</Content>
			</Container>
		);
	}
}
