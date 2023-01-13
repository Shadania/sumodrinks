import React from "react";

export default class Watch extends React.Component {
    constructor(props) {
        super(props)
        console.log('watching')
    }

    render() {
        return (
            <div>
                watch the match :)
            </div>
        )
    }
}