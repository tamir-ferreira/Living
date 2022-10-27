const baseUrl = 'https://m2-api-living.herokuapp.com/news'


/* ---------------- REQUISIÇÃO DOS POSTS ------------------ */
export const getNews = async(currentPage) =>{
    try {
        const request = await fetch(`${baseUrl}?page=${currentPage}`)
        if (request.ok) {
            const response = await request.json()
            return response.news

        } else console.error(request)
        
    } catch (error) {
        console.error(error)
    }
}


/* ---------------- REQUISIÇÃO DO POST SOLICITADO ------------------ */
export const getPostId = async(id) =>{
    try {
        const request = await fetch(`${baseUrl}/${id}`)
        if (request.ok) {
            const response = await request.json()
            return response

        } else console.error(request)

    } catch (error) {
        console.error(error)
    }
}

