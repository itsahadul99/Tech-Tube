const allBtnContainer = document.getElementById('all-btn-container');
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
        allBtnContainer.appendChild(allBtn);
    });

}
loadAllCategoryData()