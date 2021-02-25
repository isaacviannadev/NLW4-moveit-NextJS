import { useContext } from "react";
import { ChallengeContext } from "../contexts/ChallengesContext";

import styles from "../styles/components/CompletedChalenges.module.css";


export function CompletedChalenges(){
  const {challengesCompleted} = useContext(ChallengeContext)

  return(
    <div className={styles.completedChalengesContainer}>
      <span>Desafios Completos</span>
      <span>{challengesCompleted}</span>
    </div>
  )
}