import React, { useState } from 'react';
import Player from './components/Player';
import './App.css';

const INITIAL_SCORE = 25000;
const BASE_SCORE = 30000;
const POINTS_FOR_RANK = [50000, 10000, -10000, -30000];

function App() {
  const [players, setPlayers] = useState([
    {seatNum: 0, rank: 1, score: INITIAL_SCORE, point: null},
    {seatNum: 1, rank: 1, score: INITIAL_SCORE, point: null},
    {seatNum: 2, rank: 1, score: INITIAL_SCORE, point: null},
    {seatNum: 3, rank: 1, score: INITIAL_SCORE, point: null},
  ]);

  const calculatePoints = (seatNum, newScore) => {
    const newPlayers = players.map(player => player.seatNum === seatNum ? {...player, score: newScore} : player) // スコアを更新
    .sort((a, b) => b.score - a.score) // スコアで降順ソート
    .reduce((playersWithNewRank, currentPlayer, idx, arr) => { // 順位を更新
      if(idx === 0) {
        return [...playersWithNewRank, {...currentPlayer, rank: 1}];
      }
      const prevPlayer = playersWithNewRank[idx - 1];
      if (currentPlayer.score === prevPlayer.score) {
        return [...playersWithNewRank, {...currentPlayer, rank: prevPlayer.rank}];
      }
      return [...playersWithNewRank, {...currentPlayer, rank: playersWithNewRank.length + 1}];
    }, []).map((player, idx, arr) => { // ポイントを更新
      const numberOfPlayersWithSameRank = arr.filter(playerInArr => playerInArr.rank === player.rank).length;
      return {...player, point: parseFloat((player.score - BASE_SCORE + (POINTS_FOR_RANK[player.rank - 1]) / numberOfPlayersWithSameRank) / 1000).toFixed(1)};
      }
    );
    setPlayers(newPlayers);
  }

  const resetValues = () => {
    setPlayers([
      {seatNum: 0, rank: 1, score: INITIAL_SCORE, point: null},
      {seatNum: 1, rank: 1, score: INITIAL_SCORE, point: null},
      {seatNum: 2, rank: 1, score: INITIAL_SCORE, point: null},
      {seatNum: 3, rank: 1, score: INITIAL_SCORE, point: null},
    ]);
  };

  const totalScore = () => players.reduce((total, player) => total + player.score, 0);
  const checkScore = () => totalScore() === INITIAL_SCORE * 4 ? 'ok' : 'ng';
  const scoreError = () => totalScore() - INITIAL_SCORE * 4;

  return (
    <div>
      <div className={`mahjong-table score-check-${checkScore()}`}>
        <button onClick={resetValues}>リセット</button>
        <div>誤差: {scoreError()}</div>
        {players.map((player) => 
          <Player key={player.seatNum} seatNum={player.seatNum} rank={player.rank} point={player.point} score={player.score} handleScoreChange={calculatePoints}/>
        )}
      </div>
    </div>
  );
}

export default App;