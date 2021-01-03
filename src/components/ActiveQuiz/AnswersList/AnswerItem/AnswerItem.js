import classes from './AnswerItem.module.css';

const AnswerItem = props => {
    const cls = [classes.AnswerItem]
    if (props.state) {
        cls.push(classes[props.state])
    }
    return (
        <li
            onClick={() => {
                props.onAnswerClick(props.answer.id)
            }}
            className={cls.join(' ')}
        >
            {props.answer.text}
        </li>
    )

}
export default AnswerItem;