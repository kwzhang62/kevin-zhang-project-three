import './App.css';
import firebase from './firebase';
//import react hooks
import { useEffect, useState } from 'react';
//import firebase modules
import { getDatabase, ref, onValue } from 'firebase/database';
//import the MessageDisplay component
import MessageDisplay from './MessageDisplay';
//import SubmitMessage component
import SubmitMessage from './SubmitMessage';

function App() {

  //declare an array for holding all the commit messages
  const [commitMessagesArray, setCommitMessagesArray] = useState([]);

  //load the messages from the database on initial page render
  useEffect( () => {
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    onValue(dbRef, (response) => {
      //parse the response from the db
      const data = response.val();

      //the messages are stored in the db as a single string with each message separated by semi-colons
      //parse the string into an array
      const newArray = data.commitMessages.split(";");
      //set the value of commitMessagesArray to the new array
      setCommitMessagesArray(newArray);
    });
  }, []);

  //return a random index number for an array
  const randomIndex = (arrayLength) => {
    return Math.floor(Math.random() * arrayLength);
  }
  
  return (
    <>
      <header>
        <h1>Take a commit, Leave a commit</h1>
      </header>
      <main>
        {/* <h2>{commitMessage}</h2> */}
        <MessageDisplay messages={commitMessagesArray} randomize={randomIndex} />
        <SubmitMessage messages={commitMessagesArray} />
      </main>
    </>
  );
}

export default App;
