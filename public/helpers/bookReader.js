const readerModal = new bootstrap.Modal(document.getElementById('readerModal'), {});

const storybookContentBody = document.querySelector("#storybook-content-body");
const storybookContentHeader = document.querySelector(".storybook-content-header");
const pageNumber = document.querySelector(".story-page-number-container");
const nextPageBtn = document.querySelector(".next-page-btn");
const prevPageBtn = document.querySelector(".prev-page-btn");

export async function bookReader(event,storybookId) {
    event.preventDefault()
    const storybookData = await getStorybookData(storybookId)
    const coverData = storybookData.cover[0]
    const pagesData = storybookData.pages

    storybookContentHeader.innerHTML = `Book Name: ${coverData.bookname}`;

    readerModal.show();

    let currentPage = 0;

    runBookReader(currentPage, coverData, pagesData)

    nextPageBtn.addEventListener("click", () => {
        currentPage++
        runBookReader(currentPage, coverData, pagesData);
    })

    prevPageBtn.addEventListener("click", () => {
        currentPage--
        runBookReader(currentPage, coverData, pagesData);
    })
}

async function getStorybookData(id) {
    let res = await fetch(`/storybook?id=${id}`, {
        method: 'GET',
    })

    if (res.ok) {
        let response = await res.json()
        return response.data
    }
}

function printCover(coverData) {
    
    storybookContentBody.insertAdjacentHTML(
        "beforeend",
        `
        <div class="cover overlay">
            <h3>Category: ${coverData.category}</h3>

            <h3>Main Character: ${coverData.character_name}</h3>
        
            <h3>Target Age: ${coverData.target_age}</h3>

            <h3>Book Description: </h3>
            <h3>${coverData.description}</h3>
        </div>
        `
    )
}

function printPage(pagesData, page) {
    let currentPageData = pagesData[page - 1]

    storybookContentBody.innerHTML =
        `
        <div class="story-page-image-container">
            <img src="../../uploads/pageImg/${currentPageData.image}" class="story-page-image">
        </div>

        <div class="story-page-caption-container">
            <p>${currentPageData.caption}</p>
        </div>
        `
    
    pageNumber.innerHTML = `Page ${page} / ${pagesData.length}`
}


function printEndPage() {

    storybookContentBody.insertAdjacentHTML(
        "beforeend",
        `
        <div class="page-end overlay">
            <h1>End of Story</h1>
        </div>
        `
    )
}

function runBookReader(page, coverData, pagesData) {
    const totalPage = parseInt(coverData.total_page);

    if (page === 0) {
        printPage(pagesData, 1)
        printCover(coverData)
        prevPageBtn.setAttribute("disabled", "")
        return;
    }

    if (page <= totalPage && page > 0) {
        printPage(pagesData, page)
        prevPageBtn.removeAttribute("disabled")
        nextPageBtn.removeAttribute("disabled")
        return;
    }

    if (page === totalPage + 1) {
        printPage(pagesData, totalPage)
        printEndPage(pagesData)
        nextPageBtn.setAttribute("disabled", "")
        return;
    }
}