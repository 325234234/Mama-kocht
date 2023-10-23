/* eslint-disable react/prop-types */
import "./momRecipe.css"
import placeholder from "../../assets/mom-placeholder.png"
import { useState } from "react"
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'

export default function MomRecipe({ recipe, recipes, onSubmit }) {
  const [newRecipe, setNewRecipe] = useState("")

  function handleSubmit() {
    // a poor man's user validation
    // eslint-disable-next-line no-undef
    if(newRecipe === process.env.SECRET_PASSWORD) {
      localStorage.setItem("muttiRecipePW", newRecipe)
    } else {
      // push new recipe to database and display it
      onSubmit(newRecipe)
    }
    setNewRecipe("")
  }
  
  return (
    <>
      {/* display the recipe, its name and a place holder image */}
      <section className="momRecipe">
        <img src={placeholder} className="mom--image" />
        <p className="mom--heading">{recipe}</p>    
      </section>
      {/* display an inbut box to type in new recipes and a submit button to send them to the Firebase DB */}
      <section className="momAddRecipe">
        <Autocomplete
          freeSolo
          disableClearable
          sx={{
            width: 0.5,
            "& .MuiFormLabel-colorPrimary": {
              color: "#ebebeb"
            },
            "& .MuiInputBase-input": {
              color: "#ebebeb"
            }
          }}
          options={recipes}
          inputValue={newRecipe}
          onInputChange={(event, inputValue) => {
            setNewRecipe(inputValue);
          }}
          renderInput={(params) => 
            <TextField 
              {...params}
              label="Gerichte"
              InputProps={{
                ...params.InputProps,
                type: 'search'
              }} 
            />}
        />
        <button className="momAddRecipe--button button--mom" onClick={handleSubmit}>Hinzufügen</button>
      </section>
    </>
  )
}