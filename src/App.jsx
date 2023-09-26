import { useState } from "react"
import WebRecipe from "./components/WebRecipe/WebRecipe"
import MomRecipe from "./components/MomRecipe/MomRecipe"

export default function App() {

  const [showWeb, setShowWeb] = useState(true)

  async function fetchWebRecipe() {
    try {      
      setShowWeb(true)

      const serverFunction = "https://muttikocht.netlify.app/.netlify/functions/fetchWebRecipe"
      const response = await fetch(serverFunction)        
      const data = await response.json()

      console.log(data)
    } catch (error) {
      console.log(error)
    } finally {
      console.log("done")
    }
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