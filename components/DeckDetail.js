import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Deck from './Deck';
import TouchButton from './buttons/TouchButton';
import TextButton from './buttons/TextButton';
import { connect } from 'react-redux';
import { removeDeck } from '../actions/index';
import { removeDeck as removeDeckAPI } from '../utils/api';

export class DeckDetail extends Component {
    shouldComponentUpdate(nextProps) {
        return nextProps.deck !== undefined;
    }
    handleRemove = (id) => {
        const { removeDeck, navigation } = this.props;

        removeDeck(id);
        removeDeckAPI(id);

        navigation.goBack();
    };
    render() {
        const { deck } = this.props;

        return (
            <View style={styles.container}>
                <Deck id={deck.title} />
                <View>
                    <TouchButton
                        btnStyle={{
                            backgroundColor: '#BBC8CA',
                            borderColor: '#C7FFED',
                        }}
                        txtStyle={{ color: '#C7FFED' }}
                        onPress={() =>
                            this.props.navigation.navigate('AddCard', {
                                title: deck.title,
                            })
                        }>
                        Add Card
                    </TouchButton>
                    <TouchButton
                        btnStyle={{
                            backgroundColor: '#C7FFED',
                            borderColor: '#BBC8CA',
                        }}
                        txtStyle={{ color: '#BBC8CA' }}
                        onPress={() =>
                            this.props.navigation.navigate('Quiz', {
                                title: deck.title,
                            })
                        }>
                        Start Quiz
                    </TouchButton>
                </View>
                <TextButton
                    txtStyle={{ color: 'red' }}
                    onPress={() => this.handleRemove(deck.title)}>
                    Delete Deck
                </TextButton>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 24,
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom: 24,
        backgroundColor: '#9C7178',
    },
});

const mapStateToProps = (state, { navigation }) => {
    const title = navigation.getParam('title', 'undefined');
    const deck = state[title];

    return {
        deck,
    };
};

export default connect(mapStateToProps, { removeDeck })(DeckDetail);
