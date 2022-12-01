const baseURL = 'http://localhost:3001/api'

export const getProducts = async () => {
    try {
        const response = await fetch(`${baseURL}/products`)

        const results = await response.json();

        return (results)
    } catch (error) {
        throw error
    }
}

export const getOrders = async () => {
    try {
        const response = await fetch(`${baseURL}/orders`)

        const results = await response.json();
  
        return (results)
    } catch (error) {
        throw error
    }
}

export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${baseURL}/users/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    email,
                    password
            })
        })

        const results = await response.json();

        return results;
    } catch (err) {
        console.log('Error logging in user');
        throw err;
    }
}

<<<<<<< HEAD
export const registerUser = async (email, password) => {
    try {
        const response = await fetch(`${baseURL}/users/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                    email,
                    password
            })
        })

        const results = await response.json();

        return results;
    } catch (err) {
        console.log('Error logging in user');
        throw err;
    }
}


export const getSingleProduct = async (productId) => {
    try {
        const response = await fetch(`${baseURL}/products/${productId}`);

        // console.log(response)
        
        const results = await response.json();

        return (results);

    } catch (err) {
        console.log('Error logging in user');
        throw err;
    }
=======
export const getProductById = async (id) => {
    try {
        const response = await fetch(`${baseURL}/products/${id}`)
        
        const results = await response.json()

        return results;
    }
    catch(ex) {
        console.log('error getting product by id', ex)
    }

>>>>>>> ejSimpleCart
}