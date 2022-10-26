/* ------------------ SCRIPT HOME ------------------- */
import { getNews } from "../../scripts/requests.js"

const categories = []
let page = 0


// const activeObserver = () =>{
const observer = new IntersectionObserver(async (entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
        // getNews(page++);
        const category = localStorage.getItem('@living-category')
        if (page < 3 && category == 'Todos') renderPosts(await getNews(page++), false);
    }
});
// }
// activeObserver()


const mapBtnsRead = () => {
    const divObserver = document.querySelector('.observer')
    const btnsRead = document.querySelectorAll('[data-id]')
    btnsRead.forEach(btn => {
        btn.onclick = () => {
            const id = btn.getAttribute('data-id')
            // console.log()
            localStorage.setItem('@living-postID', id)
            window.location.replace("../post/index.html");
        }
    })

    observer.observe(divObserver);
}

const reloadRender = (posts) => {
    const storagedCategory = localStorage.getItem('@living-category')
    const btnsNavigation = document.querySelectorAll('[data-btns]')

    if (storagedCategory == null) {
        localStorage.setItem('@living-category', 'Todos')
    } else {
        btnsNavigation.forEach(btn => {
            const category = btn.getAttribute('data-btns')
            // console.log(category)

            btn.classList.remove('btn-primary')
            btn.classList.add('btn-grey')

            if (category == storagedCategory) {
                console.log('encontrada', category)
                btn.classList.remove('btn-grey')
                btn.classList.add('btn-primary')

                const filteredPosts = posts.filter(post => post.category == category)
                // console.log(filteredPosts)
                renderPosts(filteredPosts, true)
            }
        })
    }
}



const mapBtnsCategory = (posts) => {
    const btnsNavigation = document.querySelectorAll('[data-btns]')
    // localStorage.setItem('@living-category', 'Todos')

    // console.log(localStorage.getItem('@living-category'))

    btnsNavigation.forEach(btn => {
        btn.onclick = async () => {
            const category = btn.getAttribute('data-btns')
            // console.log(category)
            btnsNavigation.forEach(clear => {
                clear.classList.remove('btn-primary')
                clear.classList.add('btn-grey')
            })
            btn.classList.remove('btn-grey')
            btn.classList.add('btn-primary')
            localStorage.setItem('@living-category', category)

            if (category == 'Todos') {
                page = 0
                renderPosts(await getNews(page++))

            } else {
                const filteredPosts = posts.filter(post => post.category == category)
                console.log(filteredPosts)
                renderPosts(filteredPosts, true)
            }
        }
    });
    reloadRender(posts)
}




const renderBtnsCategory = (posts) => {
    const navigation = document.querySelector('.navigation')

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
        // console.log(categories)
        localStorage.setItem('@living-categories', JSON.stringify(categories))
    })
    mapBtnsCategory(posts)
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

    // renderBtnsCategory(posts)
    mapBtnsRead()
}
console.log('reload')

renderPosts(await getNews(page++));

const eventgetAll = async () => {
    const posts = []
    let currentPage = 0

    while (currentPage < 3) {
        const list = await getNews(currentPage)
        // console.log(list)
        list.forEach(post => {
            posts.push(post)
        })
        currentPage++
    }
    // console.log(posts)

    renderBtnsCategory(posts)
}
eventgetAll()