import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet } from 'react-native';
import TouchButton from './buttons/TouchButton';
import { connect } from 'react-redux';
import { addCardToDeck } from '../actions/index';
import { addCardToDeck as addCardToDeckAPI } from '../utils/api';

export class AddCard extends Component {
    state = {
        question: '',
        answer: '',
    };
    handleQuestionChange = (question) => {
        this.setState({ question });
    };
    handleAnswerChange = (answer) => {
        this.setState({ answer });
    };
    handleSubmit = () => {
        const { addCardToDeck, title, navigation } = this.props;
        const card = {
            question: this.state.question,
            answer: this.state.answer,
        };

        addCardToDeck(title, card);
        addCardToDeckAPI(title, card);

        this.setState({ question: '', answer: '' });
        navigation.goBack();
    };
    render() {
        return (
            <View style={styles.container}>
                <View>
                    <View style={styles.block}>
                        <Text style={styles.title}>Add a question</Text>
                    </View>
                    <View style={[styles.block]}>
                        <TextInput
                            style={styles.input}
                            value={this.state.question}
                            onChangeText={this.handleQuestionChange}
                            placeholder="Question"
                            autoFocus={true}
                            returnKeyType="next"
                            onSubmitEditing={() => this.answerTextInput.focus()}
                            blurOnSubmit={false}
                        />
                    </View>
                    <View style={[styles.block]}>
                        <TextInput
                            style={styles.input}
                            value={this.state.answer}
                            onChangeText={this.handleAnswerChange}
                            placeholder="Answer"
                            ref={(input) => {
                                this.answerTextInput = input;
                            }}
                            returnKeyType="done"
                            onSubmitEditing={this.handleSubmit}
                        />
                    </View>
                    <TouchButton
                        btnStyle={{
                            backgroundColor: '#C7FFED',
                        }}
                        onPress={this.handleSubmit}
                        disabled={
                            this.state.question === '' ||
                            this.state.answer === ''
                        }>
                        Submit
                    </TouchButton>
                </View>
                <View style={{ height: '30%' }} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
        backgroundColor: '#9C7178',
    },
    block: {
        marginBottom: 30,
    },
    title: {
        textAlign: 'center',
        fontSize: 32,
        color: '#BBC8CA',
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        backgroundColor: '#BBC8CA',
        paddingLeft: 12,
        paddingRight: 12,
        borderRadius: 4,
        fontSize: 24,
        height: 60,
    },
});

const mapStateToProps = (state, { navigation }) => {
    const title = navigation.getParam('title', 'undefined');

    return {
        title,
    };
};

export default connect(mapStateToProps, { addCardToDeck })(AddCard);
