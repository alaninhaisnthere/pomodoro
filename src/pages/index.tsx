import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <h1>Pomodoro</h1>
      <p>teste pomodoro</p>
      <Link href="/pomodoro">
        Iniciar
      </Link>
    </div>
  );
};

export default Home;
