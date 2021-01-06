import React from 'react';
import classes from './QuizCreator.module.css';
import Button from "../../components/UI/Button/Button";
import Input from "../../components/UI/Input/Input";
import {createControl, validate, validateForm} from "../../form/formFramework";
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Select from "../../components/UI/Select/Select";

function createFormControls() {
    return {
        question: createControl({
            label: 'Введите вопрос',
            errorMessage: 'Вопрос не может быть пустым',
        }, {
            required: true
        }),
        option1: createControl({
            label: 'Вариант 1',
            id: 1,
            errorMessage: 'Значение не может быть пустым',
        }, {
            required: true
        }),
        option2: createControl({
            label: 'Вариант 2',
            id: 2,
            errorMessage: 'Значение не может быть пустым',
        }, {
            required: true
        }),
        option3: createControl({
            label: 'Вариант 3',
            id: 3,
            errorMessage: 'Значение не может быть пустым',
        }, {
            required: true
        }),
        option4: createControl({
            label: 'Вариант 4',
            id: 4,
            errorMessage: 'Значение не может быть пустым'
        }, {
            required: true
        }),
    }
}

export default class QuizCreator extends React.Component {
    state = {
        rightAnswerId: 1,
        isFormValid: false,
        quiz: [],
        formControls: createFormControls()
    }

    submitHandler = e => {
        e.preventDefault();
    }
    addQuestionHandler = () => {
        const quiz = this.state.quiz.concat();
        const index = quiz.length + 1;

        const {question, option1, option2, option3, option4} = this.state.formControls
        const questionItem = {
            question: question.value,
            id: index,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id},
            ]
        }
        quiz.push(questionItem);
        this.setState({
            quiz,
            rightAnswerId: 1,
            isFormValid: false,
            formControls: createFormControls()
        })
    }
    createQuizHandler = () => {
        console.log(this.state.quiz)
    }
    changeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};
        control.touched = true;
        control.value = value;
        control.valid = validate(control.value, control.validation);

        formControls[controlName] = control;
        this.setState({
            formControls,
            isFormValid: validateForm(formControls)
        })


    }

    renderControls = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <Auxiliary key={controlName + index}>
                    <Input
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={e => this.changeHandler(e.target.value, controlName)}
                    />
                    {index === 0 ? <hr/> : null}
                </Auxiliary>
            )
        })

    }

    selectChangeHandler = e => {
        this.setState({
            rightAnswerId: +e.target.value
        })
    }

    render() {
        return (
            <div className={classes.QuizCreator}>
                <h1>Создание теста</h1>
                <form onSubmit={this.submitHandler}>

                    {this.renderControls()}

                    <Select
                        label={'Выберете правильный ответ'}
                        value={this.state.rightAnswerId}
                        onChange={this.selectChangeHandler}
                        options={[
                            {text: 1, value: 1},
                            {text: 2, value: 2},
                            {text: 3, value: 3},
                            {text: 4, value: 4},
                        ]}
                    />
                    <Button
                        type={'primary'}
                        onClick={this.addQuestionHandler}
                        disabled={!this.state.isFormValid}
                    >
                        Добавить вопрос
                    </Button>
                    <Button
                        type={'success'}
                        onClick={this.createQuizHandler}
                        disabled={this.state.quiz.length === 0}
                    >
                        Создать тест
                    </Button>
                </form>
            </div>
        )
    }
}
