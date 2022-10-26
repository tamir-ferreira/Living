const baseUrl = 'https://m2-api-living.herokuapp.com/news'
// export let page = 1


export const getNews = async(currentPage) =>{
    try {
        // console.log("pag requis",currentPage)
        const request = await fetch(`${baseUrl}?page=${currentPage}`)
        if (request.ok) {

            const response = await request.json()
            // console.log(response)
            return response.news
        } else {
            console.error(request)
        }
        
    } catch (error) {
        console.error(error)
    }
}


export const getPostId = async(id) =>{
    try {
        const request = await fetch(`${baseUrl}/${id}`)
        if (request.ok) {
            const response = await request.json()
            // console.log(response)
            return response
        } else {
            console.error(request)
        }

    } catch (error) {
        console.error(error)
    }
}

