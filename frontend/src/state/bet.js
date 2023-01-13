import React from "react";

export default class Bet extends React.Component {
    constructor(props) {
        super(props)
        console.log('placing bet')
    }

    render() {
        return (
            <div>
                place your bets now!
            </div>
        )
    }
}