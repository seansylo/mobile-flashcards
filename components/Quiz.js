import React, { Component } from 'react';
import Constants from 'expo-constants';
import Quiz_Android from './Quiz_Android';
import Quiz_iOS from './Quiz_iOS';
import { setNotification, clearLocalNotification } from '../utils/notify';

export class Quiz extends Component {
    static navigationOptions = ({ navigation }) => {
        const title = navigation.getParam('title', '');
        return {
            title: `${title} Quiz`,
        };
    };
    componentDidMount() {
        clearLocalNotification().then(setNotification);
    }
    render() {
        const { navigation } = this.props;
        const title = navigation.getParam('title', '');

        if (Constants.platform.ios) {
            return <Quiz_iOS title={title} />;
        }
        return <Quiz_Android title={title} />;
    }
}

export default Quiz;
