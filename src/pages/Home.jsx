import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home_wrapper">
      <h1>Tic Tac Toe Game</h1>
      <h3>How do you want to play?</h3>
      <div className="play_options">
        <Link to={`chooseplaytilescount`}>
          <button>Play Alone</button>
        </Link>
        <Link to={`chooseplaytilescount`}>
          <button>Play With Computer</button>
        </Link>
        <Link to={`chooseplaytilescount`}>
          <button>Play With A Friend</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
