import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ViewPagerAndroid,
} from 'react-native';
import TextButton from './buttons/TextButton';
import TouchButton from './buttons/TouchButton';
import { connect } from 'react-redux';

export class QuizTest extends Component {

    state = {
        show: question,
        correct: 0,
        incorrect: 0,
        page: 0,
        questions: Object.values(this.props.decks)[2].questions.length,
        answered: Array(
            Object.values(this.props.decks)[2].questions.length,
        ).fill(0),
    };
    handlePageChange = (evt) => {
        this.setState({
            show: question,
            page: evt.nativeEvent.position,
        });
    };
    handleAnswer = (response) => {
        const { decks } = this.props;
        if (response === correct) {
            this.setState((prevState) => ({ correct: prevState.correct + 1 }));
        } else {
            this.setState((prevState) => ({
                incorrect: prevState.incorrect + 1,
            }));
        }
        this.setState((prevState) => ({
            answered: prevState.answered.map((val, idx) =>
                prevState.page === idx ? 1 : val,
            ),
        }));

        const { correct, incorrect } = this.state;
        const questions = Object.values(decks)[2].questions;
        const numQuestions = questions.length - 1;

        if (numQuestions === correct + incorrect) {
            this.setState({ show: result });
        }
    };
    handleReset = () => {
        this.setState((prevState) => ({
            show: question,
            correct: 0,
            incorrect: 0,
            answered: Array(prevState.questions).fill(0),
        }));
    };
    render() {
        const { decks } = this.props;
        const { show } = this.state;
        const questions = Object.values(decks)[2].questions;

        if (this.state.show === result) {
            const { correct, incorrect } = this.state;
            const total = correct + incorrect;
            const percent = ((correct / total) * 100).toFixed(0);
            const resultStyle =
                percent >= 70 ? styles.resultTextPass : styles.resultTextFailed;

            return (
                <View style={styles.container}>
                    <View style={styles.block}>
                        <Text style={styles.count}>Done</Text>
                    </View>
                    <View style={styles.block}>
                        <Text style={[styles.count, { textAlign: 'center' }]}>
                            Quiz Complete!
                        </Text>
                        <Text style={resultStyle}>
                            {correct} / {total} correct
                        </Text>
                    </View>
                    <View style={styles.block}>
                        <Text style={[styles.count, { textAlign: 'center' }]}>
                            Percentage correct
                        </Text>
                        <Text style={resultStyle}>{percent}%</Text>
                    </View>
                    <View>
                        <TouchButton
                            btnStyle={{
                                backgroundColor: 'green',
                                borderColor: '#BBC8CA',
                            }}
                            onPress={this.handleReset}>
                            Restart Quiz
                        </TouchButton>
                        <TouchButton
                            btnStyle={{
                                backgroundColor: 'gray',
                                borderColor: '#C7FFED',
                            }}
                            txtStyle={{ color: '#C7FFED' }}

                            Back to Deck
                        </TouchButton>
                    </View>
                </View>
            );
        }

        return (
            <ViewPagerAndroid
                style={styles.container}
                scrollEnabled={true}
                onPageSelected={this.handlePageChange}>
                {questions.map((question, idx) => (
                    <View style={styles.mainStyle} key={idx}>
                        <View style={styles.block}>
                            <Text style={styles.count}>
                                {idx + 1} / {questions.length}
                            </Text>
                        </View>
                        <View style={[styles.block, styles.questionContainer]}>
                            <Text style={styles.questionText}>
                                {show === question
                                    ? 'Question'
                                    : 'Answer'}
                            </Text>
                            <View style={styles.questionWrapper}>
                                <Text style={styles.title}>
                                    {show === question
                                        ? question.question
                                        : question.answer}
                                </Text>
                            </View>
                        </View>
                        {show === question ? (
                            <TextButton
                                txtStyle={{ color: 'red' }}
                                onPress={() =>
                                    this.setState({ show: answer })
                                }>
                                Answer
                            </TextButton>
                        ) : (
                            <TextButton
                                txtStyle={{ color: 'red' }}
                                onPress={() =>
                                    this.setState({ show: question })
                                }>
                                Question
                            </TextButton>
                        )}
                        <View>
                            <TouchButton
                                btnStyle={{
                                    backgroundColor: 'green',
                                    borderColor: '#BBC8CA',
                                }}
                                onPress={() =>
                                    this.handleAnswer(correct)
                                }
                                disabled={this.state.answered[idx] === 1}>
                                Correct
                            </TouchButton>
                            <TouchButton
                                btnStyle={{
                                    backgroundColor: 'red',
                                    borderColor: '#BBC8CA',
                                }}
                                onPress={() =>
                                    this.handleAnswer(incorrect)
                                }
                                disabled={this.state.answered[idx] === 1}>
                                Incorrect
                            </TouchButton>
                        </View>
                    </View>
                ))}
            </ViewPagerAndroid>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainStyle: {
        flex: 1,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
        backgroundColor: 'gray',
    },
    block: {
        marginBottom: 20,
    },
    count: {
        fontSize: 24,
    },
    title: {
        fontSize: 32,
        textAlign: 'center',
    },
    questionContainer: {
        borderWidth: 1,
        borderColor: '#666',
        backgroundColor: '#BBC8CA',
        borderRadius: 4,
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
        flexGrow: 1,
    },
    questionText: {
      fontSize: 20,
        textDecorationLine: 'underline',
        textAlign: 'center',
    },
    questionWrapper: {
        flex: 1,
        justifyContent: 'center',
    },
    resultTextPass: {
        fontSize: 48,
        color: 'green',
        textAlign: 'center',
    },
    resultTextFailed: {
        fontSize: 48,
        color: 'red',
        textAlign: 'center',
    },
});

const mapStateToProps = (state) => ({ decks: state });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(QuizTest);
