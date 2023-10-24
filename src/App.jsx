import { useState, useRef, useEffect } from "react"
import { Radio } from  'react-loader-spinner'
import WebRecipe from "./components/WebRecipe/WebRecipe"
import MomRecipe from "./components/MomRecipe/MomRecipe"

// Google Firebase DB
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, get } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

export default function App() {

  // UI-related state
  const [webView, setWebView] = useState(true)
  const [isLoading, setLoading] = useState(true)
  // data of the recipe from the web
  const [webRecipe, setWebRecipe] = useState({})
  // reference to mom's recipes in Google Firebase and data of mom recipes
  const databaseRef = useRef(getDatabase(initializeApp({ databaseURL: "https://rezepte-385209-default-rtdb.europe-west1.firebasedatabase.app/" })))
  const momRecipesRef = useRef(ref(databaseRef.current, "recipes"))
  const [momRecipes, setMomRecipes] = useState(null)
  const [momRecipe, setMomRecipe] = useState("")

  useEffect(() => {    
    // initial fetch of a web recipe to display on page load
    async function fetchInitialWebRecipe() {
      await fetchWebRecipe()
    }
    fetchInitialWebRecipe()

    // initial fetch of mom recipes on page load
    async function fetchMomRecipes() {
      const snapshot = await get(ref(databaseRef.current, "recipes"))
      if(snapshot.exists()) {
        const data = Object.values(snapshot.val())
        setMomRecipes(data)
      } else {
        console.log("Fehler in der Datenbankabfrage :(")
      }
    }
    fetchMomRecipes()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  // fetch a random web recipe from spoonacular API and translate it with Google Cloud Translate API
  async function fetchWebRecipe() {
    try {            
        setLoading(true)
        
        const response = await fetch("https://muttikocht.netlify.app/.netlify/functions/fetchWebRecipe")  
        console.log(response)
        // const response = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${API_KEY_RECIPE}&number=1&tags=lunch`)
        const recipeData = await response.json()
        console.log(recipeData)

        // store recipe object in state after translating it
        setWebRecipe(
          { 
            image: recipeData.recipes[0].image,
            title: await fetchTranslation(recipeData.recipes[0].title),
            ingredients: await fetchTranslation(recipeData.recipes[0].extendedIngredients.map(ingr => ingr.nameClean).join(",")),
            instructions: await Promise.all(recipeData.recipes[0].analyzedInstructions[0].steps.map(async step => await fetchTranslation(step.step))),
            url: recipeData.recipes[0].sourceUrl
          }
        )
      } catch (error) {
        console.log(error)
      } finally {
        if(!webView) {
          setWebView(true)
        }        
        setLoading(false)
      }  
  }

  // returns a translated string using an asynchronous Google Cloud Translate API request
  async function fetchTranslation(string) {

    const response = await fetch("https://muttikocht.netlify.app/.netlify/functions/translateRecipe", {
                      method: 'POST',
                      body: string
                    })
    console.log(response)
    // const response = await fetch(`https://translation.googleapis.com/language/translate/v2?key=${API_KEY_TRANSLATION}&source=en&target=de&format=text&q=${string}`)
    const data = await response.json()
    console.log(data)
    return data.data.translations[0].translatedText
  }
  
  // display a random mom recipe (different from the previously displayed recipe) from the previously fetched mom recipes from Google Firebase DB
  function getMomRecipe() {
    // copy the mom recipe array and filter out the currently displayed recipe
    let filteredMomRecipes = [...momRecipes].filter(element => element !== momRecipe)
    // remove the already displayed recipe from the stored list of recipes
    setMomRecipes[filteredMomRecipes]
    // display a new random recipe
    setMomRecipe(filteredMomRecipes[Math.floor(Math.random()*filteredMomRecipes.length)])
    
    // switch the view to the mom recipe view if it isn't showing already
    if(webView) {
      setWebView(false)
    }    
  }

  function postMomRecipe(newRecipe) {
    // if the user entered a recipe and has the super secret PW in their local storage, he may write into the DB
    // eslint-disable-next-line no-undef
    if(newRecipe && localStorage.getItem(process.env.SECRET_PASSWORD)) {
      // push new recipe into Firebase DB
      push(momRecipesRef.current, newRecipe)

      // display pushed recipe
      setMomRecipe(newRecipe)
    }
  }

  return (
    <div className="container">
      {/* Hero image */}
      <header />

      <main>
        {/* Select buttons */}
        <section className="section--buttons">
          <button className="button--web" onClick={fetchWebRecipe}>Web</button>
          <button className="button--mom" onClick={getMomRecipe}>Mama</button>          
        </section>

        {/* Recipes */}
        <section className="section--recipes">
          {isLoading ? <Radio height="150" width="150" colors={['#078013', '#d6570d', '#078013']} wrapperClass="loader" /> 
            : webView ? <WebRecipe recipe={webRecipe}/> : <MomRecipe recipe={momRecipe} recipes={momRecipes} onSubmit={postMomRecipe}/>
           }
        </section>
      </main>
    </div>    
  )
}