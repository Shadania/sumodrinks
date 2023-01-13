import React from "react";

export default class Wait extends React.Component {
    constructor(props) {
        super(props)
        console.log('waiting for host')
    }

    render() {
        return (
            <div>
                wait for the host to do something
            </div>
        )
    }
}