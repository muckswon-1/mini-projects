import styles from './styles/Header.module.css';

export default function Header({title,details}){
    return (
        <div className={styles.container}>
            <h1>{title}</h1>
            <p>{details}</p>
        </div>
    )
}