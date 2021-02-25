import { useContext } from "react";
import { ChallengeContext } from "../contexts/ChallengesContext";

import styles from "../styles/components/ChallengeBox.module.css";

export function ChallengeBox() {
  const {activeChallenge, resetChallenge} = useContext(ChallengeContext);

  return (
    <div className={styles.challengeBoxContainer}>
      {activeChallenge ? (
        <div className={styles.challengeActive}>
          <header>Ganhe {activeChallenge.amount} xp</header>

          <main>
            <img src={`icons/${activeChallenge.type}.svg`}/>
            <strong>Novo desafio</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button 
            type="button"
            className={styles.challengeFailedBtn}
            onClick={resetChallenge}
            >
              Falhei
            </button>

            <button 
            type="button"
            className={styles.challengeSucceededBtn}
            >
              Completei
            </button>
          </footer>
        </div>
      ) : (
         <div className={styles.challengeNotActive}>
         <strong>Finalize um ciclo para receber um desafio</strong>
         
         <p>
           <img src="icons/level-up.svg" alt="Level up" />
           Avance de level completando desafios
         </p>
 
       </div>
      )}
     

    </div>
  )
}