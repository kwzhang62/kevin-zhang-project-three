import './App.css';
import firebase from './firebase';
//import react hooks
import { useEffect, useState } from 'react';
//import firebase modules
import { getDatabase, ref, get } from 'firebase/database';
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

    //get the value from the database once
    //use get() instead of onValue() to avoid updating the page when the user submits something to the db
    get(dbRef).then((response) => {
      //parse the response from the db
      const data = response.val();
      //get the values from the commitMessages JSON object and parse it into an array
      const newArray = Object.values(data.commitMessages);
      //set the value of commitMessagesArray to the new array
      setCommitMessagesArray(newArray);
    });

    // onValue(dbRef, (response) => {
    //   //parse the response from the db
    //   const data = response.val();
    //   //get the values from the commitMessages JSON object and parse it into an array
    //   const newArray = Object.values(data.commitMessages);
    //   //set the value of commitMessagesArray to the new array
    //   setCommitMessagesArray(newArray);
    // });
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
        <MessageDisplay messages={commitMessagesArray} randomize={randomIndex} />
        <SubmitMessage />
      </main>
    </>
  );
}

export default App;
