import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";

import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { ChallengeBox } from "../components/ChallengeBox";
import { CountdownProvider } from "../contexts/CountdownContext";

import styles from "../styles/pages/Home.module.css";
import { ChallengesProvider } from "../contexts/ChallengesContext";

interface HomeProps{
  level: number;
  currentXp: number;
  challengesFailed: number;
  challengesCompleted: number;
}

export default function Home(props: HomeProps) {
  return (
    <ChallengesProvider 
    level={props.level}
    currentXp={props.currentXp}
    challengesFailed={props.challengesFailed}
    challengesCompleted={props.challengesCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Início | MoveIt</title>
        </Head>
        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div className="">
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>

            <div className="">
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const {
    level,
    currentXp,
    challengesFailed,
    challengesCompleted,
  } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentXp: Number(currentXp),
      challengesFailed: Number(challengesFailed),
      challengesCompleted: Number(challengesCompleted),
    },
  };
};
