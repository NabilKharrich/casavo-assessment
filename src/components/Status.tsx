import styles from "./../styles/Autocomplete.module.scss";

function Status({ label }: { label: string }) {
    return <span className={styles.status}>{label}</span>;
}

export default Status;
