const handler = async (event) => {
  try {

    const ENDPOINT_TRANSLATION = "https://translation.googleapis.com/language/translate/v2"
    const SETTINGS_TRANSLATION = "source=en&target=de&format=text"

    // eslint-disable-next-line no-undef
    const response = await fetch(`${ENDPOINT_TRANSLATION}?key=${process.env.API_KEY_TRANSLATION}&${SETTINGS_TRANSLATION}&q=${event.body}`)
    
    if(!response.ok) {
      throw {
        message: "Google Cloud Translate API didn't cooperate.", 
        statusText: response.statusText,
        status: response.status
      }
    }
    
    const data = await response.json()   
    
    return {
      statusCode: 200,
      body: JSON.stringify(data.data.translations[0].translatedText)
    }

  } catch (error) {
    return { statusCode: 500, body: error.toString() }
  }
}

// eslint-disable-next-line no-undef
module.exports = { handler }