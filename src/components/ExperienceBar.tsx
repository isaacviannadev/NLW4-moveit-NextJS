import styles from '../styles/components/ExperienceBar.module.css';


export function ExperienceBar() {
  return (
    <header className={styles.experienceBar}>
      <span>0 xp</span>
      <div>
        <div className={styles.progressBar} style={{width: "50%"}} />
        <span className={styles.currentXp} style={{left: "50%"}} >300 xp</span>

      </div>
      <span>600 xp</span>
    </header>
  );
}
