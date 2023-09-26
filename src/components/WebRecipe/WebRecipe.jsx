/* eslint-disable react/prop-types */

import "./webRecipe.css"
import placeholder from "../../assets/mom-placeholder.jpg"

export default function WebRecipe({image, title, ingredients}) {

  

  return (
    <section className="webRecipe">
      <img src={image ? image : placeholder} className="web--image" />
      <div className="web--info">
          <p className="web--heading">{title}</p>
          <p className="web--ingredients">{ingredients}</p>
      </div>
    </section>
  )
}