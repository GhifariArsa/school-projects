import Carousel from 'react-bootstrap/Carousel';
import Figure from 'react-bootstrap/Figure';
import {comingSoonMovies, nowShowingMovies} from './../../Movies/movies.js'
import './slideshow.css';
import React, { useState } from 'react';
import SessionsModal from './SessionsModal.js';
import Modal from 'react-bootstrap/Modal';


function Slideshow() {
  //to display modal
  const [displayModal, setDisplayModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const moviesArray = nowShowingMovies.concat(comingSoonMovies);

    const handleCloseModal = () => {
      setDisplayModal(false);
      setSelectedMovie(null);
    };

    const handleOpenModal = (movie) => {
      setSelectedMovie(movie);
      setDisplayModal(true);
    };

  return (
    <>
      <Carousel className="p-0">
        {moviesArray.map((movie) => (
          //check if slideshow is true
          movie.slideshow && (
            <Carousel.Item 
            onClick={() => handleOpenModal(movie)}
            interval={2500}>
              <Figure className="d-flex justify-content-center align-items-center slideshow-cursor m-0">
                <Figure.Image
                  // width={3840}
                  height={800}
                  src={movie.banner}
                  className='m-0'
                />
              </Figure>
            </Carousel.Item> 
          )
        ))}
          
      </Carousel>
      <Modal 
        centered 
        size="xl"
        show={displayModal}
        onHide={() => setDisplayModal(false)}
        aria-labelledby="example-modal-sizes-title-md"
        >
          <SessionsModal movie={selectedMovie}/>
      </Modal>
      
    </>
  );
}

export default Slideshow;