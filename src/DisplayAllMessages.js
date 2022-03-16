function DisplayAllMessages(props) {

    //hide all the messages when the user clicks on the Put them back! button
    const handleHideMessages = () => {
        props.handleShowMessages(false)
    }

    return (
        <div className="allMessagesContainer">
            <ul className="messagesList">
                {
                    props.messages.map((message) => {
                        return (
                            <li>{message}</li>
                        )
                    })
                }
            </ul>
            <button className="baseButton" onClick={handleHideMessages}>Put them back!</button>
        </div>
    )
}

export default DisplayAllMessages;