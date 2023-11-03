import Head from "next/head";
import Pomodoro from "../components/pomodoro";

const PomodoroPage = () => {
  return (
    <div>
      <Head>
        <title>Pomodoro</title>
      </Head>
      <Pomodoro />
    </div>
  );
};

export default PomodoroPage;