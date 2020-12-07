import React from "react";
import { quizData } from "../../data/questions";
import './Quizz.css';

class MainQuiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentQuestion: 0,
      myAnswer: null,
      options: [],
      score: 0,
      disabled: true,
      isEnd: false
    };
  }

  componentDidMount () {
    this.loadQuizData();
  }

  loadQuizData = () => {
    this.setState({
      questions: quizData[this.state.currentQuestion].question,
      answer: quizData[this.state.currentQuestion].answer,
      options: quizData[this.state.currentQuestion].options
    });
  };

  componentDidUpdate (prevProps, prevState) {
    if (this.state.currentQuestion !== prevState.currentQuestion) {
      this.setState(() => {
        return {
          disabled: true,
          questions: quizData[this.state.currentQuestion].question,
          options: quizData[this.state.currentQuestion].options,
          answer: quizData[this.state.currentQuestion].answer
        };
      });
    }
  }

  checkAnswer = answer => {
    this.setState({ myAnswer: answer, disabled: false });
  };

  nextQuestionHandler = () => {
    const { myAnswer, answer, score } = this.state;

    if (myAnswer === answer) {
      this.setState({
        score: score + 1
      });
    }

    this.setState({
      currentQuestion: this.state.currentQuestion + 1
    });
  };

  finishHandler = () => {
    const { myAnswer, answer, score } = this.state;
      this.setState({
        isEnd: true
      });
      if (myAnswer === answer) {
        this.setState({
          score: score + 1
        });
      }
  };

  refreshPage = () => {
    this.loadQuizData();
    this.setState({
        isEnd: false,
        score: 0,
        disable: false,
        currentQuestion: 0
      });
  }

  render () {
    const { options, myAnswer, currentQuestion, isEnd } = this.state;

    if (isEnd) {
      return (
        <main className="result">
          <aside className='quizz d-none col-4 d-lg-block' />
          <article className='my-auto col-12 col-lg-8'>
            <h3 className='text-center'>Your Final score is {this.state.score} points. </h3>
            <p className='text-center'>
              The correct answers for the questions were :
            </p>
            <ul className='ml-0 pl-0'>
              {quizData.map((item, index) => (
                <li className="options w-75 mx-auto m-2 text-center" key={index}>
                  {item.question} {item.answer}
                </li>
              ))}
            </ul>
            <button className="ui button" onClick={this.refreshPage}>
                Go back to Quizz
              </button>
          </article>
        </main>
      );
    } else {
      return (
        <main className="quizz-container">
          <aside className='quizz d-none col-4 d-lg-block' />
          <article className='my-auto col-12 col-lg-8'>
            <h3 className='text-center'>{this.state.questions} </h3>
            <span className='text-center'><p>{`Question ${currentQuestion + 1}  out of ${quizData.length} remaining `}</p></span>
            {options.map(option => (
              <p
                key={option}
                className={`button-question
         ${myAnswer === option ? "selected" : null}
         `}
                onClick={() => this.checkAnswer(option)}
              >
                {option}
              </p>
            ))}
            {currentQuestion < quizData.length - 1 && (
              <button
                className="ui button"
                disabled={this.state.disabled}
                onClick={this.nextQuestionHandler}
              >
                Next
              </button>
            )}
            {/* //adding a finish button */}
            {currentQuestion === quizData.length - 1 && (
              <button className="ui button" onClick={this.finishHandler}>
                Finish
              </button>
            )}
          </article>
        </main>
      );
    }
  }
}

export default MainQuiz;
