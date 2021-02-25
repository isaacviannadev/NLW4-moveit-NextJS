import { useContext } from "react";
import { ChallengeContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/ExperienceBar.module.css";

export function ExperienceBar() {
  const { currentXp, experienceToNextLevel } = useContext(ChallengeContext);

  const percentToNextLevel = Math.round(
    (currentXp * 100) / experienceToNextLevel
  );

  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div className={styles.progressBar} style={{ width: `${percentToNextLevel}%` }} />
        <span
          className={styles.currentXp}
          style={{ left: `${percentToNextLevel}%` }}
        >
          {currentXp} xp
        </span>
      </div>
      <span>{experienceToNextLevel} xp</span>
    </header>
  );
}
