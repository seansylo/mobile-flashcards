import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, StatusBar } from 'react-native';
import store from './store';
import { Provider } from 'react-redux';
import Constants from 'expo-constants';
import Navigation from './navigation/Navigation';
import { setNotification } from './utils/notify';

function FlashcardStatusBar({ backgroundColor, ...props }) {
    return (
        <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
            <StatusBar
                translucent
                backgroundColor={backgroundColor}
                {...props}
            />
        </View>
    );
}
FlashcardStatusBar.propTypes = {
    backgroundColor: PropTypes.string.isRequired,
};

export default class App extends React.Component {
    componentDidMount() {
        setNotification();
    }
    render() {
        return (
            <Provider store={store}>
                <View style={styles.container}>
                    <FlashcardStatusBar
                        backgroundColor="#111"
                        barStyle="dark-content"
                    />
                    <Navigation />
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dde',
    },
});
