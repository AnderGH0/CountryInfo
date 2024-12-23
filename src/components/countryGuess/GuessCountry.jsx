import { useState, useEffect } from 'react';
import BackButton from '../countryPage/BackButton';

const GuessCountry = () => {
    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState('');
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const [countryImg, setCountryImg] = useState('');
    const [guessedLetters, setGuessedLetters] = useState([" "]);
    const [wrongGuesses, setWrongGuesses] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    
    

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const response = await fetch('https://restcountries.com/v3.1/all');
                const data = await response.json();
                setCountries(data.map((country) => country.translations.fra.common));
            } catch (e) {
                console.log('Error fetching countries', e);
            }
        }
        fetchCountries();
    }, []);

    useEffect(() => {
        if (countries.length > 0) {
            const randomCountry = countries[Math.floor(Math.random() * countries.length)].toUpperCase();
            setCountry(randomCountry);
            const fetchCountryImg = async () => {
                const response = await fetch(`https://restcountries.com/v3.1/name/${randomCountry.toLowerCase()}`);
                const data = await response.json();
                setCountryImg(data[0].flags.png);
            }
            fetchCountryImg();  
        }
    }, [countries]);

    const handleGuess = (letter) => {
        if(letter === "Å") letter = "A";
        if (guessedLetters.includes(letter) || gameOver || gameWon) return;

        setGuessedLetters([...guessedLetters, letter]);

        if (!country.includes(letter)) {
            setWrongGuesses(wrongGuesses + 1);
            if (wrongGuesses >= 4) {
                setGameOver(true);
            }
        } else {
            const allLettersGuessed = country.split('').every((char) => guessedLetters.includes(char) || char === letter);
            if (allLettersGuessed) {
                setGameWon(true);
            }
        }
    };

    return (
        <>
        <BackButton/>
        <div className='container'>
            
            <div className='country-name-container'>{
                country.split('').map((char, index) => (
                    <span key={index} className={char === " "?"space":"letter"}>
                        {char=== " "? " " : guessedLetters.includes(char) ? char : '_'}
                    </span>
                ))
            }</div>
            <div className='alphabet-container'>{
                alphabet.map((letter) => (
                <button className={`letter-btn ${guessedLetters.includes(letter)? "disabled":""}`} key={letter} onClick={() => handleGuess(letter)} >
                    {letter}
                </button>
            ))}
            </div>
            <h5 className='guesses'>Wrong Guesses: {wrongGuesses} / 5</h5>
            {gameOver &&<div className='end-game'>
                <h1 className='game-over'>You Lost !</h1>
                <h2 className='country-name'>The country was {country}</h2>
                <img  src={countryImg} alt={country} />
                <button className='button try-again' onClick={() => history.go(0)}>Try Again</button>
            </div>
            }   
            {gameWon && <div className='end-game'>
                <h1 className='game-over'>You Won !</h1>
                <h2 className='country-name'>The country was {country}</h2>
                <img className='guess-img' src={countryImg} alt={country} />
                <button className='button try-again' onClick={() => history.go(0)}>Try Again</button>
            </div>}
        </div>
        </>
    );
};

export default GuessCountry;