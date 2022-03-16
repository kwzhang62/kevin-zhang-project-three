import { useState } from "react";
import DisplayAllMessages from "./DisplayAllMessages";

function GetMessages(props) {
    //state tracking whether to show every commit message in the database
    const [showAllMessages, setShowAllMessages] = useState(false);
    //show a new message when the Take another commit button is clicked
    const handleNewMessageClick = () => {
        props.updateCommitMessage(true);
    }
    //show all the messages when the Take ALL the commits button is clicked
    const handleAllMessagesClick = (bool) => {
        setShowAllMessages(bool);
    }

    return (
        <section className="messageButtonsContainer">
            <div className="messageButtons">
                <button id='newMessageButton' onClick={handleNewMessageClick}>Take another commit</button>
                <button id='allMessagesButton' onClick={()=>{handleAllMessagesClick(true)}}>Take ALL the commits!</button>
            </div>
            {
                showAllMessages ? <DisplayAllMessages messages={props.messages} handleShowMessages={handleAllMessagesClick} /> : null
            }
        </section>
    )
}

export default GetMessages;