import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { words } from './finalWords.js';

const App = () => {
    const [allWords, setAllWords] = React.useState(words);
    const [word, setWord] = React.useState('');
    const [arr, setArr] = React.useState(["", "", "", "", "", ""]);
    const [idx, setIdx] = React.useState(0);
    const [guess, setGuess] = React.useState('');

    const getRandomInt = (maxValue) => {
        return Math.floor(Math.random() * maxValue);
    }

    // On startup select a random word as the target word
    React.useEffect(() => {
        const randomIdx = getRandomInt(allWords.length);
        const randomWord = allWords[randomIdx];
        console.log(randomWord);
        setWord(randomWord);
    }, [])


    const getColor = (word, guess, idx) => {
        let c = guess.charAt(idx);
        /* Correct letter at correct index */
        if(word.charAt(idx) === c) {
            return 'green';
        }
        /* Correct letter but wrong index */
        else if(word.indexOf(c) !== -1) {
            if(word.indexOf(c) === idx || word.lastIndexOf(c) === idx) {
                return 'yellow';
            } else {
                return 'white';
            }
        }
        else {
            return 'white';
        }
    }

    const tableStyle = {
        fontSize: "24px",
        margin: "5px",
        padding: "5px",
    }

    const handleChange = (event) => {
        setGuess(event.target.value.toUpperCase());
    }

    const isValidGuess = (guess) => {
        guess = guess.trim();
        return guess.length && allWords.indexOf(guess) !== -1;
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if(idx < 6) {
            if(isValidGuess(guess)) {
                if(guess === word) {
                    window.alert('Congratulations!');
                }

                setArr(prev => {
                    let newState = [...prev];
                    newState[idx] = guess;
                    setIdx(idx => idx + 1);
                    setGuess('');
                    return newState;
                });

                if(idx === 5) {
                    window.alert("The word was " + word);
                }
            } else {
                window.alert("Please enter something valid!");
            }
        }
    }

    return (
        <div>
        <h1>Rishi's Wordle</h1>
        <table style={tableStyle}>
            <tbody style={tableStyle}>
            {arr.map((row, rowIdx) => {
                // Current guess
                if(rowIdx === idx) {
                    return (
                        <tr style={tableStyle} key={rowIdx*10}>
                            {Array(5).fill('').map((col, colIdx) => {
                                return (
                                    <td style={tableStyle} key={rowIdx*10+colIdx}>
                                        {guess.charAt(colIdx) === ''? '_' : guess.charAt(colIdx)}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                }
                else if(rowIdx > idx) {
                    // Already entered guesses
                    return (
                        <tr style={tableStyle} key={rowIdx*10}>
                            {Array(5).fill('').map((col, colIdx) => {
                                return (
                                    <td style={tableStyle} key={rowIdx*10+colIdx}>
                                        {arr[rowIdx].charAt(colIdx) === ''? '_' : arr[rowIdx].charAt(colIdx)}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                }
                else {
                    // Already entered guesses
                    return (
                        <tr style={tableStyle} key={rowIdx*10}>
                            {Array(5).fill('').map((col, colIdx) => {
                                return (
                                    <td style={{...tableStyle, backgroundColor: getColor(word, arr[rowIdx], colIdx)}} key={rowIdx*10+colIdx}>
                                        {arr[rowIdx].charAt(colIdx) === ''? '_' : arr[rowIdx].charAt(colIdx)}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                }
            })}
        </tbody>
        </table>

        <form onSubmit={handleSubmit}>
            <input type="text" maxLength={5} value={guess} placeholder="Enter guess" onChange={handleChange} autoFocus={true} />
            <input type="submit" value="Submit" />
        </form>

        <p>List of words from: 
            <a target="_blank" href="https://www-cs-faculty.stanford.edu/~knuth/sgb-words.txt">here</a>
        </p>
        </div>
    );
}

ReactDOM.render(<App />, document.querySelector('#root'));