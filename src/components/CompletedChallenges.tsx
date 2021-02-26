import { useContext } from "react";
import { ChallengeContext } from "../contexts/ChallengesContext";

import styles from "../styles/components/CompletedChallenges.module.css";

export function CompletedChallenges() {
  const { challengesCompleted, challengesFailed } = useContext(
    ChallengeContext
  );

  return (
    <>
      <div className={styles.completedChalengesContainer}>
        <span>Desafios Completos</span>
        <span>{challengesCompleted}</span>
        <span>Desafios Falhados</span>
        <span>{challengesFailed}</span>
      </div>
    </>
  );
}
