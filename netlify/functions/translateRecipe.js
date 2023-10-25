const handler = async (event) => {
  try {

    const ENDPOINT_TRANSLATION = "https://translation.googleapis.com/language/translate/v2"
    const SETTINGS_TRANSLATION = "source=en&target=de&format=text"


    const request = `${ENDPOINT_TRANSLATION}?key=${process.env.API_KEY_TRANSLATION}&${SETTINGS_TRANSLATION}&q=${event.body}`

    // eslint-disable-next-line no-undef
    console.log(request)
    // const response = await fetch(`${ENDPOINT_TRANSLATION}?key=${process.env.API_KEY_TRANSLATION}&${SETTINGS_TRANSLATION}&q=${event.body}`)
    const response = await fetch(request)
    console.log(response)

    if(!response.ok) {
      throw {
        message: "Google Cloud Translate API didn't cooperate.", 
        statusText: response.statusText,
        status: response.status
      }
    }
    
    const data = await response.json()   
    console.log(data)

    return {
      statusCode: 200,
      body: JSON.stringify(data.data.translations[0].translatedText)
      // body: JSON.stringify(data)
    }

  } catch (error) {
    console.error("Error occurred:", error)
    return { statusCode: 500, body: JSON.stringify(error, Object.getOwnPropertyNames(error)) }
  }
}

// eslint-disable-next-line no-undef
module.exports = { handler }