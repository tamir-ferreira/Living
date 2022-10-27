import { getPostId } from "../../scripts/requests.js"


/* ---------------- MAPEAR BOTÕES DE CATEGORIAS ------------------- */
const mapBtnsCategory = () => {
    const btnsNavigation = document.querySelectorAll('[data-btns]')
    const btnHome = document.querySelector('#btn-home')

    btnHome.onclick = () => {
        localStorage.setItem('@living-category', 'Todos')
    }

    btnsNavigation.forEach(btn => {
        btn.onclick = async () => {
            const category = btn.getAttribute('data-btns')
            localStorage.setItem('@living-category', category)
            window.location.replace('../home/index.html')
        }
    });
}


/* ---------------- RENDERIZAR BOTÕES DE CATEGORIAS ------------------- */
const renderBtnsCategory = () => {
    const categories = JSON.parse(localStorage.getItem('@living-categories'))
    const navigation = document.querySelector('.navigation')

    categories.forEach(category => {
        const li = document.createElement('li')
        const button = document.createElement('button')

        button.className = 'btn-grey'
        button.textContent = category
        button.dataset.btns = category

        li.appendChild(button)
        navigation.appendChild(li)

    })

    insertTestBtns(navigation)

    const btnScrollR = document.querySelector(`#btn-scroll-right`)
    const btnScrollL = document.querySelector(`#btn-scroll-left`)
    btnScrollR.onclick = () => navigation.scrollLeft += 100
    btnScrollL.onclick = () => navigation.scrollLeft -= 100

    mapBtnsCategory()
}


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


/* ---------------- RENDERIZAR POST SELECIONADO ------------------ */
const renderPost = async () => {
    const postID = localStorage.getItem('@living-postID')
    const postHeader = document.querySelector('.post-header')
    const postContent = document.querySelector('.post-content')

    const divHeader = document.createElement('div')
    const h2Header = document.createElement('h2')
    const pHeader = document.createElement('p')
    const imgContent = document.createElement('img')
    const pContent = document.createElement('p')

    const post = await getPostId(postID)
    const { title, description, image, content } = post

    divHeader.className = 'container'
    h2Header.className = 'font1'
    pHeader.className = 'font4-rg'
    h2Header.innerText = `${title}`
    pHeader.innerText = `${description}`
    imgContent.src = `${image}`
    pContent.innerText = `${content}`

    postHeader.appendChild(divHeader)
    divHeader.append(h2Header, pHeader)
    postContent.append(imgContent, pContent)

    renderBtnsCategory()
}
renderPost()