import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([]);
  
  useEffect(() => {
    fetch("http://localhost:3001/toys")
    .then((r) => r.json())
    .then(setToys)
  },[])

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function handleAddToy(newToy) {
    setToys(...toys, newToy)
  }
  function handleDeleteToy(toyDelete) {
    const updatedToys = toys.filter((toy) => toy.id !== toyDelete.id)
      setToys(updatedToys)
  }

  function handleUpdateToy(updateToy) {
    const updatedToys = toys.map((toy)=>
      toy.id === updateToy.id ? updateToy : toy 
    )
    setToys(updatedToys)
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={handleAddToy} /> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys}
       onDeleteToy={handleDeleteToy}
      onUpdateToy={handleUpdateToy}/>
    </>
  );
}

export default App;
