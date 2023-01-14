import React, { useState, useEffect } from "react";

import GameState from './GameState.js'

export default function Game (props) {
    const [status, setStatus] = useState('loading')
    
    const url = props.url
    const playerName = props.name

    useEffect(() => {
       const fetchData = async () => {
            console.log(playerName)

            await fetch(`${url}:8000/joinGame`, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                body: JSON.stringify({name: playerName})
            }).then(() => {
                // todo start gamestate
                setStatus('game')
            })
       };
       fetchData();
    });

    const renderState = () => {
        switch(status) {
            case 'loading':
                return (
                    <div>
                        please hold while we connect
                    </div>
                )
            case 'fail':
                return (
                    <div>
                        could not connect to host. f5 and watch out for typos?
                    </div>
                )
            case 'error':
                return (
                    <div>
                        weird error encountered. f5?
                    </div>
                )
            case 'game':
                return (
                    <div>
                        <GameState playerName={playerName} url={url} />
                    </div>
                )
            default:
                return (
                    <div>invalid state</div>
                )
        }
    }

    return (
        <div>
            <h3>Game Time</h3>
            <p>You are {playerName}, participating in the game at {url}</p>
            { renderState() }
        </div>
    )
}