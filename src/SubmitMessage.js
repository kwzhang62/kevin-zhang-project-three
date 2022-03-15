import firebase from "./firebase";
import { getDatabase, ref, push } from 'firebase/database';
import { useState } from 'react';

function SubmitMessage(props) {

    //track user input as a state
    const [userInput, setUserInput] = useState("");

    //updates userInput state whenever the value of the input field is changed
    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    };

    //handles form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        
        //take the user input and put it in a variable for processing
        const processedInput = userInput.trim();
        //remove any whitespace at the beginning and end of the user string
        // processedInput = processedInput.trim();

        //call the function for validating user input
        validateInput(processedInput);
    };

    //initialize a state to track whether a response message should be displayed to the uesr
    const [displayResponse, setDisplayResponse] = useState(false);
    //initialize a state for the response message to the user's submission
    const [responseMessage, setResponseMessage] = useState("");

    //validates user input and updates the response message states as appropriate
    const validateInput = (input) => {
        //check if the user entered an empty string or nothing at all
        if(input == "" || input == null) {
            setResponseMessage("Please enter a commit message to submit.");
            setDisplayResponse(true);
        } else if(props.messages.includes(input)) { //check if the message already exists
            setResponseMessage("This message already has already been submitted.");
            setDisplayResponse(true);
        } else {
            setResponseMessage("Your submission has been received!");
            setDisplayResponse(true);
            //update the database
            updateDatabase(input);
        }
    };

    //updates the database with the user input
    const updateDatabase = (newMessage) => {
        const database = getDatabase(firebase);
        const dbRef = ref(database, `/commitMessages`);

        //push the string holding the new message submitted by the user to the db
        push(dbRef, newMessage);

        //clear user input after submission
        setUserInput("");
    };

    return (
        <section>
            <form action="" onSubmit={handleSubmit}>
                <label htmlFor="newMessage">Leave a commit message</label>
                <input type="text" id="newMessage" onChange={handleInputChange} value={userInput}/>
                <button>Leave commit</button>
            </form>
            {
                displayResponse ? <p>{responseMessage}</p> : null
            }
        </section>
    )
}

export default SubmitMessage;