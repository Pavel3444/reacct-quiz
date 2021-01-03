import classes from './ActiveQuiz.module.css';
import AnswersList from "./AnswersList/AnswersList";

const ActiveQuiz = props => (
    <div className={classes.ActiveQuiz}>
        <p className={classes.Question}>
            <span>  <b>{props.answerNumder}. </b> {props.question}</span>
            <small>{props.answerNumder} из {props.quizLength}</small>
        </p>

        <AnswersList
            answers={props.answers}
            onAnswerClick={props.onAnswerClick}
            state={props.state}
        />
    </div>
)

export default ActiveQuiz;