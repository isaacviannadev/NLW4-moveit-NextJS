import { createContext, useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";

import challenges from "../../challenges.json";
import { LevelUpModal } from "../components/LevelUpModal";

interface Challenge {
  type: "body" | "eye";
  description: string;
  amount: number;
}

interface ChallengeContextData {
  level: number;
  currentXp: number;
  challengesCompleted: number;
  challengesFailed: number;
  activeChallenge: Challenge;
  experienceToNextLevel: number;
  levelUp: () => void;
  startNewChallenge: () => void;
  resetChallenge: () => void;
  completeChallenge: () => void;
  closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentXp: number;
  challengesFailed: number;
  challengesCompleted: number;
}

export const ChallengeContext = createContext({} as ChallengeContextData);

export function ChallengesProvider({
  children,
 ...rest
}: ChallengesProviderProps) {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentXp, setCurrentXp] = useState(rest.currentXp ?? 0);
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted ??0);
  const [challengesFailed, setChallengesFailed] = useState(rest.challengesFailed ?? 0);
  const [activeChallenge, setActiveChallenge] = useState(null);
  const [isLevelUPModalOpen, setIsLevelUPModalOpen] = useState(false);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set("level", String(level));
    Cookies.set("currentXp", String(currentXp));
    Cookies.set("challengesFailed", String(challengesFailed));
    Cookies.set("challengesCompleted", String(challengesCompleted));
  }, [level, currentXp, challengesFailed, challengesCompleted]);

  function levelUp() {
    setLevel(level + 1);
    setIsLevelUPModalOpen(true);
  }

  function closeLevelUpModal(){
    setIsLevelUPModalOpen(false);
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    new Audio("/notification.mp3").play();

    if (Notification.permission === "granted") {
      new Notification("Novo desafio 🎉", {
        body: `Valendo ${challenge.amount}xp!`,
      });
    }
  }

  function resetChallenge() {
    setActiveChallenge(null);
    setChallengesFailed(challengesFailed + 1);
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;

    let finalXp = currentXp + amount;

    if (finalXp >= experienceToNextLevel) {
      finalXp = finalXp - experienceToNextLevel;
      levelUp();
    }
    setCurrentXp(finalXp);
    setActiveChallenge(null);
    setChallengesCompleted(challengesCompleted + 1);
  }

  return (
    <ChallengeContext.Provider
      value={{
        level,
        currentXp,
        challengesCompleted,
        challengesFailed,
        activeChallenge,
        experienceToNextLevel,
        levelUp,
        startNewChallenge,
        resetChallenge,
        completeChallenge,
        closeLevelUpModal,
      }}
    >
      {children}

      { isLevelUPModalOpen && <LevelUpModal />}

    </ChallengeContext.Provider>
  );
}
