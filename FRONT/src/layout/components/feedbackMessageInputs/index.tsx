import React from 'react';

const msgType: any = {
    error: "#f44336",
    success: "#537f2d",
    warning: "#FBC02D"
}

type proptypes = {
    type: string
    message: string
}

const FeedbackMessageInput: React.FC<proptypes> = props => {

    return(
        <small style={{ color: msgType[props.type], fontWeight: "bold" }}>
            {props.message}
        </small>
    )
}

export default FeedbackMessageInput;