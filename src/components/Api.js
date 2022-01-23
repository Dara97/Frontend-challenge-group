import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./Api.css"
import { useEffect, useState } from "react";

export default function Api() {
    const [datos, setDatos] = useState([]);
    const [randomItem, setRandomItem] = useState({})

    useEffect(() => {
        fetchRandom()

    }, [])

    const fetchRandom = async () => {

        await fetch("https://women-in-tech.apievangelist.com/apis/people/")
            .then((response) => response.json())
            .then((women) => {
                setDatos(women);
            });

    };

    const state = {
        randomFav: null,
        favorites: datos
    }

    // Como Math.random genera un número decimal pues le aplico Math.floor para redondear al menor entero más cercano
    const random = () => Math.floor(Math.random() * state.favorites.length)

    function getRandomItem() {
        const index = random();

        if (state.randomFav === index) {
            return getRandomItem();
        }
        state.randomFav = index;
        console.log(state.favorites[index]);
        setRandomItem(state.favorites[index])

    }

    return (

        <div className="App">
             <div className="featured">
                <div className="featuredItem">
                  <div key={randomItem.id}> </div>
                  <div>
                    <h1>{randomItem.name}</h1>
                  </div>
                  <br />
                  <div>{randomItem.details}</div>
                  <br />
                  <div>
                    {randomItem.website}
                  </div>
                  <br />

                  <img 
                    className="productListImg"
                    src={randomItem.image_path}
                    width={randomItem.image_width}
                    alt=""
                  />
                  
                </div>
              </div>
           
            <button onClick={getRandomItem}> {/* ⬅️ llamarla cuando hagamos clic */}
                ¡Otro!{" "}
                <span role="img" aria-label="corazón">
                    ❤️
                </span>
            </button>

        </div>
    );

}