import { useState } from "react"
import WebRecipe from "./components/WebRecipe/WebRecipe"
import MomRecipe from "./components/MomRecipe/MomRecipe"

export default function App() {

  const [showWeb, setShowWeb] = useState(true)

  function fetchWebRecipe() {
    setShowWeb(true)
  }
  
  function fetchMomRecipe() {
    setShowWeb(false)
  }

  return (
    <div className="container">
      {/* Header image */}
      <header />

      {/* Select buttons and recipes */}
      <main>
        <section className="section--buttons">
          <button className="button--web" onClick={fetchWebRecipe}>Web</button>
          <button className="button--mom" onClick={fetchMomRecipe}>Mama</button>          
        </section>
        <section className="section--recipes">
          {showWeb ? <WebRecipe /> : <MomRecipe />}
        </section>
      </main>
    </div>    
  )
}