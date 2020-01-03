import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import ReactCardFlip from 'react-card-flip';
import CardBack from '../src/assets/card-back.png';

function App() {
	const [ deckOne, setDeckOne ] = useState([]);
	const [ deckTwo, setDeckTwo ] = useState([]);
	const [ matchedIds, setMetchedIds ] = useState([]);
	const [ openCardId, setOpenCardId ] = useState('');

	useEffect(() => {
		axios
			.get('http://localhost:3000/api/getRandomCards')
			.then((res) => {
				setDeckOne(res.data.data.deckOne);
				setDeckTwo(res.data.data.deckTwo);
			})
			.catch((error) => {
				console.log(error.response);
			});
	}, []);

	const handleCardClick = (cardId, deck) => {
		if (deck === 1) {
			setOpenCardId(cardId);

			const deckOneCopy = [ ...deckOne ];
			deckOneCopy.forEach((card) => {
				if (card.code === cardId) {
					card.show = card.show ? false : true;
				}
			});
			setDeckOne(deckOneCopy);

			let found = 0;
			deckTwo.forEach((card) => {
				if (card.code === cardId && card.show) {
					found = 1;
				}
			});

			if (found) {
				const matchedIdsCopy = [ ...matchedIds ];
				matchedIdsCopy.push(cardId);
				setMetchedIds(matchedIdsCopy);
			} else {
				if (openCardId) {
					setTimeout(() => {
						const deckTwoCopy = [ ...deckTwo ];
						deckTwoCopy.forEach((card) => {
							if (card.code === openCardId) {
								card.show = false;
							}
						});
						setDeckTwo(deckTwoCopy);

						const deckOneCopy = [ ...deckOne ];
						deckOneCopy.forEach((card) => {
							if (card.code === cardId) {
								card.show = false;
							}
            });
            setDeckOne(deckOneCopy);
						setOpenCardId('');
					}, 2000);
				}
			}
		} else if (deck === 2) {
			setOpenCardId(cardId);

			const deckTwoCopy = [ ...deckTwo ];
			deckTwoCopy.forEach((card) => {
				if (card.code === cardId) {
					card.show = card.show ? false : true;
				}
			});
			setDeckTwo(deckTwoCopy);

			let found = 0;
			deckOne.forEach((card) => {
				if (card.code === cardId && card.show) {
					found = 1;
				}
			});

			if (found) {
				const matchedIdsCopy = [ ...matchedIds ];
				matchedIdsCopy.push(cardId);
				setMetchedIds(matchedIdsCopy);
			} else {
				if (openCardId) {
					setTimeout(() => {
						const deckTwoCopy = [ ...deckTwo ];
						deckTwoCopy.forEach((card) => {
							if (card.code === cardId) {
								card.show = false;
							}
						});
						setDeckTwo(deckTwoCopy);

						const deckOneCopy = [ ...deckOne ];
						deckOneCopy.forEach((card) => {
							if (card.code === openCardId) {
								card.show = false;
							}
						});
						setDeckOne(deckOneCopy);
						setOpenCardId('');
					}, 2000);
				}
			}
		}
	};

	return (
		<div className="container-fluid">
			<div className="row mt-5">
				<div className="col-6">
					<h3 className="text-center">DECK 1</h3>
					<div className="row">
						{deckOne.map((card) => {
							return (
								<div
									className="col-4"
									onClick={() => {
										handleCardClick(card.code, 1);
									}}
								>
									<ReactCardFlip isFlipped={card.show} flipDirection="vertical">
										<div className="m-2 text-center">
											<img
												src={CardBack}
												className="rounded"
												alt="card"
												style={{ width: '150px', height: '150px' }}
											/>
										</div>
										<div className="m-2 text-center">
											<img
												src={card.image}
												className="rounded"
												alt="card"
												style={{ width: '150px', height: '150px' }}
											/>
										</div>
									</ReactCardFlip>
								</div>
							);
						})}
					</div>
				</div>
				<div className="col-6" style={{ borderLeft: '1px solid black' }}>
					<h3 className="text-center">DECK 2</h3>
					<div className="row">
						{deckTwo.map((card) => {
							return (
								<div
									className="col-4"
									onClick={() => {
										handleCardClick(card.code, 2);
									}}
								>
									<ReactCardFlip isFlipped={card.show} flipDirection="vertical">
										<div className="m-2 text-center">
											<img
												src={CardBack}
												className="rounded"
												alt="card"
												style={{ width: '150px', height: '150px' }}
											/>
										</div>
										<div className="m-2 text-center">
											<img
												src={card.image}
												className="rounded"
												alt="card"
												style={{ width: '150px', height: '150px' }}
											/>
										</div>
									</ReactCardFlip>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
