function DisplayAllMessages(props) {
    return (
        <div className="messagesList">
            <ul>
                {
                    props.messages.map((message) => {
                        return (
                            <li>{message}</li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default DisplayAllMessages;