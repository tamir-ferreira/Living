const baseUrl = 'https://m2-api-living.herokuapp.com/news'
// export let page = 1


export const getNews = async(currentPage) =>{
    try {
        console.log("pag requis",currentPage)
        const request = await fetch(`${baseUrl}?page=${currentPage}`)
        if (request.ok) {
            const response = await request.json()
            return response.news
        } else {
            console.error(request)
        }
        
    } catch (error) {
        console.error(error)
    }
}
