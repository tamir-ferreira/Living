/* ------------------ SCRIPT HOME ------------------- */
import { getNews } from "../../scripts/requests.js"
let page = 0


const observer = new IntersectionObserver(async (entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
        // getNews(page++);
        renderPosts(await getNews(page++), false);

    }
});



const mapBtnsRead = () => {
    const divObserver = document.querySelector('.observer')
    const btnsRead = document.querySelectorAll('[data-id]')
    btnsRead.forEach(btn => {
        btn.onclick = () => {
            const id = btn.getAttribute('data-id')
            // console.log()
            localStorage.setItem('@living-postID', id)
        }
    })

    observer.observe(divObserver);
}


const renderPosts = (posts, clearList = true) => {
    const listPosts = document.querySelector('.posts')
    if (clearList) listPosts.innerHTML = ''

    posts.forEach(post => {
        const { image, title, description, id } = post
        const li = document.createElement('li')
        const article = document.createElement('article')
        const img = document.createElement('img')
        const div = document.createElement('div')
        const h3 = document.createElement('h3')
        const p = document.createElement('p')
        const span = document.createElement('span')

        // li.id = `${id}`
        article.className = 'card'
        img.src = `${image}`
        div.className = 'card-content'
        h3.className = 'font3'
        h3.innerText = `${title}`
        p.className = 'font4-rg'
        p.innerText = `${description}`
        span.className = 'font4-sb'
        span.innerText = 'Acessar conteúdo'
        span.dataset.id = `${id}`

        listPosts.appendChild(li)
        li.appendChild(article)
        article.append(img, div)
        div.append(h3, p, span)
    });

    mapBtnsRead()
}
renderPosts(await getNews(page++));

