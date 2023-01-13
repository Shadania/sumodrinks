import React, { useState, useEffect } from "react";

import Wait from './state/wait.js'
import Bet from './state/bet.js'
import Watch from './state/watch.js'
import Result from './state/result.js'

export default function Game (props) {
    const [status, setStatus] = useState('loading')
    
    const url = props.url
    const playerName = props.name
    
    const serverStateChange = (data) => {
        console.log("data received from server! data:")
        console.log(data)
    }

    const fetchState = () => {
        fetch(`${url}/gameState`, {method:"GET"})
            .then(res => (res.status === 200 ? res.json() : setStatus('fail')))
            .then(result => serverStateChange(result.data))
            .catch(err => setStatus('error'))
    }

    useEffect(() => {
        fetchState()
        const eventSource = new EventSource(`${url}/gameState-realtime`)
        eventSource.onmessage = (e) => {
            serverStateChange(e.data)
        }
        return () => {
            eventSource.close()
        }
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
            case 'wait':
                return (
                    <Wait />
                )
            case 'bet':
                return (
                    <Bet />
                )
            case 'watch':
                return (
                    <Watch />
                )
            case 'result':
                return (
                    <Result />
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
            <p>You are {playerName}, playing the game at {url}</p>
            { renderState() }
        </div>
    )
}