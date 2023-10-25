const handler = async () => {
  try {

    const ENDPOINT_RECIPE = "https://api.spoonacular.com/recipes/random"
    const SETTINGS_RECIPE = "number=1&tags=lunch"

    // eslint-disable-next-line no-undef
    const response = await fetch(`${ENDPOINT_RECIPE}?apiKey=${process.env.API_KEY_RECIPE}&${SETTINGS_RECIPE}`)
    if(!response.ok) {
      throw {
        message: "Spooncaular API didn't cooperate.", 
        statusText: response.statusText,
        status: response.status
      }
    }
    
    const data = await response.json()
    console.log("Web recipe data: " + JSON.stringify(data))
    return {
      statusCode: 200,
      body: JSON.stringify(data)
    }

  } catch (error) {
    console.error("Error occurred:", error)
    return { statusCode: 500, body: JSON.stringify(error, Object.getOwnPropertyNames(error)) }
  }
}

// eslint-disable-next-line no-undef
module.exports = { handler }