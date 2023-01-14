import React, {useState} from "react";

export default function Bet (props) {
    const [vote, setVote] = useState('none')

    const sendVote = (voteStr) => {
        const send = async () => {
            await fetch(`${props.url}:8000/game/vote/${props.playerName}/${voteStr}`, {
                method: "POST",
                mode: "cors"
            })
        }
        send()
    }

    const betleft = () => {
        setVote('left')
        sendVote('left')
    }
    const betright = () => {
        setVote('right')
        sendVote('right')
    }

    const renderVote = () => {
        switch(vote) {
            case 'left':
                return (<p>you voted left! will you change your mind?</p>)
            case 'right':
                return (<p>you voted right! will you change your mind?</p>)
            default:
                return (<p>place your bet now!</p>)
        }
    }

    return (
        <div>
            {renderVote()}
            <button onClick={betleft}>Left!</button>
            <button onClick={betright}>Right!</button>
        </div>
    )
}