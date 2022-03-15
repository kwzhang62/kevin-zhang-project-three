import firebase from "./firebase";
//import react hooks
import { useEffect, useState } from 'react';
//import firebase modules
import { getDatabase, ref, onValue, push } from 'firebase/database';

function SubmitMessage(props) {

    //track user input as a state
    const [userInput, setUserInput] = useState("");

    //create an array that holds the commit messages initally loaded from the db
    //messages submitted by the user will be pushed to this new array, which will then be pushed to the db
    // const newMessagesArray = props.messages;
    // console.log("props.messages is: " + props.messages);

    //updates userInput state whenever the value of the input field is changed
    const handleInputChange = (event) => {
        setUserInput(event.target.value);
    }

    //handles form submission when the Leave commit button is clicked
    const handleSubmit = (event) => {
        event.preventDefault();

        //TODO: add user input validation

        //push user input to the messages array
        newMessagesArray.push(userInput);
        //concatenate the array into a string
        const newMessagesData = newMessagesArray.join(";");

        // //create a reference to the db
        // const database = getDatabase(firebase);
        // const dbRef = ref(database);

        // //push the string holding the new message submitted by the user to the db
        // push(dbRef, newMessagesData);

    }

    return (
        <form action="submit">
            <label htmlFor="newMessage">Leave a commit message</label>
            <input type="text" id="newMessage" onChange={handleInputChange} value={userInput}/>
            <button onClick={handleSubmit}>Leave commit</button>
        </form>
    )
}

export default SubmitMessage;