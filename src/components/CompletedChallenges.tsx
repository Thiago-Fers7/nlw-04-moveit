import styles from '../styles/components/CompletedChallenges.module.css'

export function CompletedChallends() {
    return (
        <div className={styles.completedChallendsContainer}>
            <span>Desafios Completos</span>
            <span>5</span>
        </div>
    );
}