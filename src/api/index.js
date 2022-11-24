const baseURL = 'http://localhost:3001/api'

export const getProducts = async () => {
    try {
        const response = await fetch(`${baseURL}/products`)

        const results = await response.json();

        console.log(results)

        return (results)
    } catch (error) {
        console.log("couldn't get activities")
        throw error
    }
}

export const getOrders = async () => {
    try {
        const response = await fetch(`${baseURL}/orders`)

        const results = await response.json();
  
        return (results)
    } catch (error) {
        console.log("couldn't get activities")
        throw error
    }
}