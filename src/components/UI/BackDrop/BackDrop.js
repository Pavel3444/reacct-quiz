import classes from './BackDrop.module.css';

const BackDrop = props => {
    return (
        <div
            className={classes.Backdrop}
            onClick={props.onClick}
        >
        </div>
    )
}
export default BackDrop