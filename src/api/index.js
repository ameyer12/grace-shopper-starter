const baseURL = 'http://localhost:3005/api'

// export const getUser = async (email, password) => {
//     try {
//         const response = await fetch(`${baseURL}/users`)

//         const results = await response.json();

//         console.log(results)

//         return (results)
//     } catch (error) {
//         throw error
//     }
// }

export const getAllUsers = async () => {
    try {
        const response = await fetch(`${baseURL}/users`)
        console.log(response)

        const results = await response.json();

        return (results)
    } catch (error) {
        throw error
    }
}


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
        
        const results = await response.json();

        return (results);

    } catch (err) {
        console.log('Error logging in user');
        throw err;
    }
}

export const getUserCart = async (token) => {
    try {
        const response = await fetch(`${baseURL}/cart`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })

        const results = await response.json();

        return results.data;
    } catch (err) {
        console.log('error getting user cart', err)
    }
}

export const addToUserCart = async (token, {itemId, qty}) => {
    try {
        const response = await fetch(`${baseURL}/cart`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                itemId,
                qty
        })
        })

        const results = await response.json();

        return results;
    } catch (err) {
        console.log('error adding to user cart', err)
    }
}

export const editUserCart = async (token, {itemId, qty}) => {
    try {
        const response = await fetch(`${baseURL}/cart`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                itemId,
                qty
        })
        })

        const results = await response.json();

        return results;
    } catch (err) {
        console.log('error editing user cart', err)
    }
}

export const removeFromUserCart = async (token, {itemId}) => {
    try {
        const response = await fetch(`${baseURL}/cart/${itemId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        const results = await response.json();

        return results;
    } catch (err) {
        console.log('error removing from user cart', err)
    }
}




