import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContexts';
import styles from '../styles/components/CompletedChallenges.module.css'

export function CompletedChallends() {
    const { challengesCompleted } = useContext(ChallengesContext)

    return (
        <div className={styles.completedChallendsContainer}>
            <span>Desafios Completos</span>
            <span>{challengesCompleted}</span>
        </div>
    );
}