import { useEffect, useState } from "react";

function MessageDisplay(props) {
    
    //initialize a state to track the message to be displayed
    const [commitMessage, setCommitMessage] = useState("");

    //check to see whether to update commitMessage whenever this component is rendered
    useEffect(() => {
        //update commitMessage if one has not already been displayed AND props.messages has been populated
        if(props.showMessage && props.messages.length > 0) {
            //select a random message to display from the array of messages passed in the props
            //the randomize function is also passed in as a prop
            const index = props.randomize(props.messages.length);
            setCommitMessage(props.messages[index]);
            //do not update the commit message again after this if block has executed
            props.updateCommitMessage(false);
        }
    });

    return (
        <h2>{commitMessage}</h2>
    )
}

export default MessageDisplay;