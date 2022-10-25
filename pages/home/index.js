/* ------------------ SCRIPT HOME ------------------- */
import { getNews } from "../../scripts/requests.js"

const categories = []

let page = 0


const observer = new IntersectionObserver(async (entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
        // getNews(page++);

        if (page < 3) renderPosts(await getNews(page++), false);

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



const mapBtnsCategory = () => {
    const btnsNavigation = document.querySelectorAll('[data-btns]')
    localStorage.setItem('@living-category', 'Todos')

    btnsNavigation.forEach(btn => {
        btn.onclick = () => {
            const category = btn.getAttribute('data-btns')
            console.log(category)
            btnsNavigation.forEach(clear => clear.classList.remove('btn-grey-focus'))
            btn.classList.add('btn-grey-focus')
            localStorage.setItem('@living-category', category)
        }
    });
}




const renderBtnsCategory = (posts) => {
    const navigation = document.querySelector('.navigation')

    // console.log(btnsNavigation)

    /*  btnsNavigation.forEach(btn => {
         if (btn.getAttribute('data-btns') =) {
             
         }
     }) */

    posts.forEach(post => {
        const { category } = post
        /* const find = btnsNavigation.findIndex(btn => btn.getAttribute('data-btns').trim() == category.trim())
        console.log(category, find) */

        const findCategory = categories.findIndex(elem => elem == category)

        if (findCategory === -1) {
            const li = document.createElement('li')
            const button = document.createElement('button')

            button.className = 'btn-grey'
            button.textContent = category
            button.dataset.btns = category

            li.appendChild(button)
            navigation.appendChild(li)

            categories.push(category)
        }
    })
    mapBtnsCategory()
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

    renderBtnsCategory(posts)
    mapBtnsRead()
}
renderPosts(await getNews(page++));

