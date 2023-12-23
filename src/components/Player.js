import React from "react";

function Player(props) {
    const seatNum = props.seatNum;
    const rank = props.rank;
    const point = props.point;
    const handleScoreChange = (event) => {
        props.handleScoreChange(seatNum, parseInt(event.target.value));
    };
    return (
        <div className={`player-flex player-${['bottom','right','top','left'][seatNum]}`}>
            <div className="player-label">{rank} {`${['自家','下家','対面','上家'][seatNum]}`}</div>
            <select onChange={handleScoreChange} value={props.score}>
                {
                    [...Array(3001).keys()]
                        .map(num => (num - 1500) * 100)
                        .map(num => <option key={num} value={num}>{num}</option>)
                }
            </select>
            <div>
                <span>{point}</span>
            </div>
        </div>
    );
}

export default Player;