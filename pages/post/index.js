import { getPostId } from "../../scripts/requests.js"


const mapBtnsCategory = () => {
    const btnsNavigation = document.querySelectorAll('[data-btns]')
    // localStorage.setItem('@living-category', 'Todos')

    btnsNavigation.forEach(btn => {
        btn.onclick = async () => {
            const category = btn.getAttribute('data-btns')
            console.log(category)

            localStorage.setItem('@living-category', category)

            window.location.replace('../home/index.html')
        }
    });
}


const renderBtnsCategory = () => {
    const categories = JSON.parse(localStorage.getItem('@living-categories'))
    const navigation = document.querySelector('.navigation')
    // console.log(categories)
    categories.forEach(category => {

            const li = document.createElement('li')
            const button = document.createElement('button')

            button.className = 'btn-grey'
            button.textContent = category
            button.dataset.btns = category

            li.appendChild(button)
            navigation.appendChild(li)

    })
    // console.log(categories)
    mapBtnsCategory()
}


const renderPost = async () => {
    const postHeader = document.querySelector('.post-header')
    const postContent = document.querySelector('.post-content')

    const divHeader = document.createElement('div')
    const h2Header = document.createElement('h2')
    const pHeader = document.createElement('p')
    const imgContent = document.createElement('img')
    const pContent = document.createElement('p')

    const postID = localStorage.getItem('@living-postID')
    // const postID = '387de537-655e-4dd8-b9a0-6b50bd4d0178'
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

