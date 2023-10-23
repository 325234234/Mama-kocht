/* eslint-disable react/prop-types */
import "./webRecipe.css"
import placeholder from "../../assets/mom-placeholder.png"

export default function WebRecipe({ recipe }) {
 
  // open the original web page of the recipe in a new tab
  function openSource(url) {
    if(url) window.open(url, "_blank", "noreferrer")
  }

  return (
    <section className="webRecipe" onClick={() => openSource(recipe?.url || "")}>
      <img src={recipe?.image || placeholder} className="web--image" />
      <p className="web--heading">{recipe?.title || "Gericht"}</p>
      <p className="web--ingredients"><b>Zutaten: </b>{recipe?.ingredients}</p>      
      <ol className="web--instructions">{recipe.instructions?.map((instruction, index) => <li key={index}>{instruction}</li>)}</ol>      
    </section>  
  )
}