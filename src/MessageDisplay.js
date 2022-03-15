function MessageDisplay(props) {
    
    //select a random message to display from the array of messages passed in the props
    //the randomize function is also passed as a prop
    const index = props.randomize(props.messages.length);
    const commitMessage = props.messages[index];

    return (
        <h2>{commitMessage}</h2>
    )
}

export default MessageDisplay;