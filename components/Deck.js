import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';

const Deck = (props) => {
    const { deck } = props;

    if (deck === undefined) {
        return <View style={styles.deckContainer} />;
    }
    return (
        <View style={styles.deckContainer}>
            <View>
                <Text style={styles.deckText}>{deck.title}</Text>
            </View>
            <View>
                <Text style={styles.cardText}>
                    {deck.questions.length} cards
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    deckContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexBasis: 140,
        minHeight: 160,
        borderWidth: 1,
        borderColor: '#C7FFED',
        backgroundColor: '#B592A0',
        borderRadius: 4,
        marginBottom: 20,
    },
    deckText: {
        color: '#BBC8CA',
        fontSize: 30,
    },
    cardText: {
        fontSize: 24,
        color: '#BBC8CA',
    },
});

const mapStateToProps = (state, { id }) => {
    const deck = state[id];

    return {
        deck,
    };
};

export default connect(mapStateToProps)(Deck);
