import classes from "./loading.module.css"

const Spinner = () => {


    return(
        <div>
            <img alt="spinner" src="/flameIcon.png" className={classes.spinner}></img>
        </div>
    )
}

export default Spinner;