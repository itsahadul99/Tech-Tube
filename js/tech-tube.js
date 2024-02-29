const allBtnContainer = document.getElementById('all-btn-container');
const cardContainer = document.getElementById('card-container');
const emptyContainer = document.getElementById('empty-btn-container');
const verifiedBadge = false;
const loadAllCategoryData = async () => {
    const res = await fetch(` https://openapi.programming-hero.com/api/videos/categories`);
    const data = await res.json();
    // console.log(data);
    const categories = data.data;
    console.log(categories);
    categories.forEach(categoriesName => {
        const allBtn = document.createElement('button');
        allBtn.className = `btn`
        allBtn.innerText = `
            ${categoriesName.category}
        `
        allBtn.addEventListener("click", () => loadAllId(categoriesName.category_id
        )

        );
        allBtnContainer.appendChild(allBtn);
    });

}
const loadAllId = async (id = "1000", verifiedBadge) => {
    cardContainer.innerHTML = '';
    const res = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await res.json();
    const allItem = data.data;
    if (allItem.length === 0) {
        emptyContainer.classList.remove('hidden');
    }
    else {
        emptyContainer.classList.add('hidden')
    }
    // console.log(allItem);
    for (const item of allItem) {
        console.log(item);
        verifiedBadge = item.authors[0].verified;
        if (verifiedBadge) {
            verifiedBadge = `<img src="./logos/fi_10629607.png" alt=""></img>`;
        } else {
            verifiedBadge = '';
        }
        // console.log(item);
        const card = document.createElement('div');
        card.className = `space-y-5`
        card.innerHTML = `
        <div class="w-full"><img class = "w-full" class="" src="${item.thumbnail}" alt=""></div>
        <div class="flex gap-5">
            <div>
                <img class = "rounded-full w-20 h-16" src="${item.authors[0].profile_picture}" alt="">
            </div>
            <div>
                <h1 class = "font-bold text-xl">${item.title}</h1>
                <div class="flex gap-5 opacity-80">
                    <p class = "opacity-80 text-[#252525B3]">${item.authors[0].profile_name}</p>
                    ${verifiedBadge}
                </div>
                <p class = "opacity-80 text-[#252525B3]">${item.others.views}</p>
            </div>

        </div>
        `
        cardContainer.appendChild(card);
    }
}
loadAllId()
loadAllCategoryData()