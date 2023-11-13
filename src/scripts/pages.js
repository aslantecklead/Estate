const pagesElement = document.querySelector('.pages');
const cardContainer = document.getElementById('cardContainer');

window.addEventListener('scroll', () => {
    if (isScrolledToBottom()) {
        pagesElement.style.display = 'block';
    } else {
        pagesElement.style.display = 'none';
    }
});

function isScrolledToBottom() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const contentHeight = cardContainer.offsetHeight;
    
    return scrollY + windowHeight >= contentHeight;
}
