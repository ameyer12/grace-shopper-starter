import { useState } from "react";
import { useParams } from "react-router-dom";

const baseURL = 'https://grace-shopper-x3lx.onrender.com/api'

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

        console.log(results)
  
        return (results)
    } catch (error) {
        console.log("couldn't get activities")
        throw error
    }
}