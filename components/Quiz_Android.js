import React, { Component } from 'react';
import { View, Text, StyleSheet, ViewPagerAndroid } from 'react-native';
import TextButton from './buttons/TextButton';
import TouchButton from './buttons/TouchButton';
import { connect } from 'react-redux';
import { withNavigation } from 'react-navigation';

export class Quiz_Android extends Component {
    state = {
        show: question,
        correct: 0,
        incorrect: 0,
        questionCount: this.props.deck.questions.length,
        answered: Array(this.props.deck.questions.length).fill(0),
    };
    handleAnswer = (response, page) => {
        if (response === 'correct') {
            this.setState((prevState) => ({ correct: prevState.correct + 1 }));
        } else {
            this.setState((prevState) => ({
                incorrect: prevState.incorrect + 1,
            }));
        }
        this.setState(
            (prevState) => ({
                answered: prevState.answered.map((val, idx) =>
                    page === idx ? 1 : val,
                ),
            }),
            () => {
                const { correct, incorrect, questionCount } = this.state;

                if (questionCount === correct + incorrect) {
                    this.setState({ show: result });
                } else {
                    this.viewPager.setPage(page + 1);
                    this.setState((prevState) => ({
                        show: question,
                    }));
                }
            },
        );
    };
    handlePageChange = (evt) => {
        this.setState({
            show: question,
        });
    };
    handleReset = () => {
        this.setState((prevState) => ({
            show: question,
            correct: 0,
            incorrect: 0,
            answered: Array(prevState.questionCount).fill(0),
        }));
    };
    render() {
        const { questions } = this.props.deck;
        const { show } = this.state;

        if (questions.length === 0) {
            return (
                <View style={styles.mainStyle}>
                    <View style={styles.block}>
                        <Text style={[styles.count, { textAlign: 'center' }]}>
                            No card in deck
                        </Text>
                        <Text style={[styles.count, { textAlign: 'center' }]}>
                            Please add some cards!
                        </Text>
                    </View>
                </View>
            );
        }

        if (this.state.show === result) {
            const { correct, questionCount } = this.state;
            const percent = ((correct / questionCount) * 100).toFixed(0);
            const resultStyle =
                percent >= 70 ? styles.resultTextGood : styles.resultTextBad;

            return (
                <View style={styles.mainStyle}>
                    <View style={styles.block}>
                        <Text style={[styles.count, { textAlign: 'center' }]}>
                            Quiz Complete!
                        </Text>
                        <Text style={resultStyle}>
                            {correct} / {questionCount} correct
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
                                backgroundColor: '#C7FFED',
                                borderColor: '#BBC8CA',
                            }}
                            onPress={this.handleReset}>
                            Restart Quiz
                        </TouchButton>
                        <TouchButton
                            txtStyle={{ color: '#BBC8CA' }}
                            btnStyle={{
                                backgroundColor: '#BBC8CA',
                            }}
                            onPress={() => {
                                this.handleReset();
                                this.props.navigation.goBack();
                            }}>
                            Back To Deck
                        </TouchButton>
                        <TouchButton
                            txtStyle={{ color: '#BBC8CA' }}
                            btnStyle={{
                                backgroundColor: '#BBC8CA',
                            }}
                            onPress={() => {
                                this.handleReset();
                                this.props.navigation.navigate('Home');
                            }}>
                            Home
                        </TouchButton>
                    </View>
                </View>
            );
        }

        return (
            <ViewPagerAndroid
                style={styles.container}
                scrollEnabled={true}
                onPageSelected={this.handlePageChange}
                ref={(viewPager) => {
                    this.viewPager = viewPager;
                }}>
                {questions.map((question, idx) => (
                    <View style={styles.mainStyle} key={idx}>
                        <View style={styles.block}>
                            <Text style={styles.count}>
                                {idx + 1} / {questions.length}
                            </Text>
                        </View>
                        <View style={[styles.block, styles.questionContainer]}>
                            <Text style={styles.questionText}>
                                {show === question ? 'Question' : 'Answer'}
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
                                onPress={() => this.setState({ show: answer })}>
                                Show Answer
                            </TextButton>
                        ) : (
                            <TextButton
                                txtStyle={{ color: 'red' }}
                                onPress={() =>
                                    this.setState({ show: question })
                                }>
                                Show Question
                            </TextButton>
                        )}
                        <View>
                            <TouchButton
                                btnStyle={{
                                    backgroundColor: 'green',
                                    borderColor: '#BBC8CA',
                                }}
                                onPress={() =>
                                    this.handleAnswer('correct', idx)
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
                                    this.handleAnswer('incorrect', idx)
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
        paddingTop: 24,
        paddingLeft: 24,
        paddingRight: 24,
        paddingBottom: 24,
        backgroundColor: '#C7FFED',
    },
    block: {
        marginBottom: 24,
    },
    count: {
        fontSize: 30,
    },
    title: {
        fontSize: 36,
        textAlign: 'center',
    },
    questionContainer: {
        borderWidth: 1,
        borderColor: '#666',
        backgroundColor: '#BBC8CA',
        borderRadius: 4,
        paddingTop: 24,
        paddingBottom: 24,
        paddingLeft: 24,
        paddingRight: 24,
        flexGrow: 1,
    },
    questionWrapper: {
        flex: 1,
        justifyContent: 'center',
    },
    questionText: {
        textDecorationLine: 'underline',
        textAlign: 'center',
        fontSize: 22,
    },
    resultTextGood: {
        color: 'green',
        fontSize: 42,
        textAlign: 'center',
    },
    resultTextBad: {
        color: 'red',
        fontSize: 42,
        textAlign: 'center',
    },
});

const mapStateToProps = (state, { title }) => {
    const deck = state[title];

    return {
        deck,
    };
};

export default withNavigation(connect(mapStateToProps)(Quiz_Android));
