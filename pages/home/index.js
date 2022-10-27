/* ------------------ SCRIPT HOME ------------------- */
import { getNews } from "../../scripts/requests.js"

const storagedCategory = localStorage.getItem('@living-category')
const categories = []
let page = 0


/* ---------------- OBSERVADOR FINAL DA LISTA DE CARDS ------------------ */
const observer = new IntersectionObserver(async (entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
        const category = localStorage.getItem('@living-category')
        if (page < 3 && category == 'Todos') renderPosts(await getNews(page++), false);
    }
});


/* ---------------- MAPEAR BOTÕES DE LEITURA DOS POSTS ------------------ */
const mapBtnsRead = () => {
    const divObserver = document.querySelector('.observer')
    const btnsRead = document.querySelectorAll('[data-id]')
    btnsRead.forEach(btn => {
        btn.onclick = () => {
            const id = btn.getAttribute('data-id')
            localStorage.setItem('@living-postID', id)
            window.location.replace("../post/index.html");
        }
    })

    observer.observe(divObserver);
}


/* ---------------- RECARREGAR RENDERIZAÇÃO DOS POSTS ------------------ */
const reloadRender = (posts) => {
    const btnsNavigation = document.querySelectorAll('[data-btns]')

    if (storagedCategory == null) {
        localStorage.setItem('@living-category', 'Todos')

    } else {
        btnsNavigation.forEach(btn => {
            const category = btn.getAttribute('data-btns')
            btn.classList.remove('btn-primary')
            btn.classList.add('btn-grey')

            if (category == storagedCategory) {
                const filteredPosts = posts.filter(post => post.category == category)
                btn.classList.remove('btn-grey')
                btn.classList.add('btn-primary')

                renderPosts(filteredPosts, true)
            }
        })
    }
}


/* ---------------- MAPEAR BOTÕES DAS CATEGORIAS ------------------ */
const mapBtnsCategory = (posts) => {
    const btnsNavigation = document.querySelectorAll('[data-btns]')

    btnsNavigation.forEach(btn => {
        btn.onclick = async () => {
            const category = btn.getAttribute('data-btns')
            btnsNavigation.forEach(clear => {
                clear.classList.remove('btn-primary')
                clear.classList.add('btn-grey')
            })

            localStorage.setItem('@living-category', category)
            btn.classList.remove('btn-grey')
            btn.classList.add('btn-primary')

            if (category == 'Todos') {
                page = 0
                renderPosts(await getNews(page++))

            } else {
                const filteredPosts = posts.filter(post => post.category == category)
                renderPosts(filteredPosts, true)
            }
        }
    })
    reloadRender(posts)
}


/* ---------------- RENDERIZAR BOTÕES DAS CATEGORIAS ------------------ */
const renderBtnsCategory = (posts) => {
    const navigation = document.querySelector('.navigation')

    posts.forEach(post => {
        const { category } = post
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

        localStorage.setItem('@living-categories', JSON.stringify(categories))
    })

    insertTestBtns(navigation)

    const btnScrollR = document.querySelector(`#btn-scroll-right`)
    const btnScrollL = document.querySelector(`#btn-scroll-left`)

    btnScrollR.onclick = () => navigation.scrollLeft += 100
    btnScrollL.onclick = () => navigation.scrollLeft -= 100

    mapBtnsCategory(posts)
}


/* ---------------- RENDERIZAR POSTS NA LISTA PRINCIPAL ------------------ */
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


/* ---------------- VERIFICAR CATEGORIA SELECIONADA  ------------------ */
const initialPosts = async () => {
    if (storagedCategory == null) {
        localStorage.setItem('@living-category', 'Todos')
        if (storagedCategory == "Todos") {
            renderPosts(await getNews(page++));
        }
    }
}


/* ---------------- VERIFICAR CATEGORIAS EXISTENTES NA API ------------------ */
const eventgetAll = async () => {
    const posts = []
    let currentPage = 0

    while (currentPage < 3) {
        const list = await getNews(currentPage)
        list.forEach(post => {
            posts.push(post)
        })
        currentPage++
    }

    renderBtnsCategory(posts)
    initialPosts(posts)
}
eventgetAll()


/* ---------------- INSERIR BOTÕES EXTRAS PARA DEMONSTRAR O SCROLL NAS CATEGORIAS ------------------ */
const insertTestBtns = (navigation) => {
    for (let i = 1; i <= 4; i++) {
        const li = document.createElement('li')
        const button = document.createElement('button')

        button.classList.add('btn-grey', 'btn-empty')
        button.textContent = ``

        li.appendChild(button)
        navigation.appendChild(li)
    }
}
