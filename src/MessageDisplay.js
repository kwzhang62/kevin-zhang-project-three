import { useEffect, useState } from "react";

function MessageDisplay(props) {
    
    //initialize a state to track whether to not a message has been displayed
    const [messageRendered, setMessageRendered] = useState(false);
    //initialize a state to track the message to be displayed
    const [commitMessage, setCommitMessage] = useState("");

    //check to see whether to display the message whenever props.messages is updated
    useEffect(() => {
        //display a commit message if one has not already been displayed AND props.messages has been populated
        if(!messageRendered && props.messages.length > 0) {
            //select a random message to display from the array of messages passed in the props
            //the randomize function is also passed in as a prop
            const index = props.randomize(props.messages.length);
            setCommitMessage(props.messages[index]);
            //flag the message as rendered
            setMessageRendered(true);
        }
    },[props.messages])

    return (
        <h2>{commitMessage}</h2>
    )
}

export default MessageDisplay;