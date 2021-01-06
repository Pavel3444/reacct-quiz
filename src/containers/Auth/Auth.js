import React from 'react';
import classes from './Auth.module.css'
import Button from '../../components/UI/Button/Button'
import Input from "../../components/UI/Input/Input";

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export default class Auth extends React.Component {
    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                errorMessage: 'Введите корректный email',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                errorMessage: 'Введите корректный пароль',
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 6
                }
            }
        }
    }

    loginHandler = () => {

    }
    registerHandler = () => {

    }
    validateControl = (value, validation) => {
        if (!validation) return true;
        let isValid = true;
        if (validation.required){
            isValid = (value.trim() !== '') && isValid;
        }
        if (validation.email){
        isValid = validateEmail(value) && isValid
        }
        if (validation.minLength){
            isValid =value.length >= validation.minLength && isValid
        }
        return isValid
    }

    onChangeHandler = (e, controlName) => {
        const formControls = {...this.state.formControls};
        const control ={...formControls[controlName]};
        control.value = e.target.value;
        control.touched = true;
        control.valid = this.validateControl(control.value, control.validation);

        formControls[controlName] = control;
        let isFormValid = true;
        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })

        this.setState({
            formControls: formControls,
            isFormValid: isFormValid
        })


    }

    renderInputs = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    shouldValidate={!!control.validation}
                    errorMessage={control.errorMessage}
                    onChange={e => this.onChangeHandler(e, controlName)}
                />
            )
        })
    }

    render() {

        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Авторизация</h1>
                    <form className={classes.AuthForm} action="" onSubmit={event => event.preventDefault()}>

                        {this.renderInputs()}

                        <Button
                            disabled={!this.state.isFormValid}
                            onClick={this.loginHandler}
                            type='success'
                        >Войти</Button>
                        <Button
                            disabled={!this.state.isFormValid}
                            onClick={this.registerHandler}
                            type='primary'
                        >Регистрация</Button>
                    </form>
                </div>
            </div>
        )
    }
}
