
const handler = async () => {
  try {

    const ENDPOINT_RECIPE = "https://api.spoonacular.com/recipes/random"
    const SETTINGS_RECIPE = "number=1&tags=lunch"

    const response = await fetch(`${ENDPOINT_RECIPE}?apiKey=${process.env.API_KEY_RECIPE}&${SETTINGS_RECIPE}`)    
    if(!response.ok) {
      throw {
        message: "Spooncaular API didn't cooperate.", 
        statusText: response.statusText,
        status: response.status
      }
    }
    
    const data = await response.json()
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }

  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

module.exports = { handler }