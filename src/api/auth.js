import api from './axios'

export const loginUser = async (eamil, password) => {
    const response = await api.post('/auth/login', { eamil, password })

    return response.data
}

export const registerUser = async (username, email, password) => {
    const response = await api.post('/auth/register', { username, email, password })
    return response.data
}