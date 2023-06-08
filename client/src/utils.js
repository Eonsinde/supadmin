
export const fetchApiUrl = () => {
    if (process.env.NODE_ENV === 'production') {
        return process.env.REACT_APP_API_PROD_URL
    } else {
        return process.env.REACT_APP_API_DEV_URL
    }
}