document.addEventListener('DOMContentLoaded', function() {
    const book = JSON.parse(sessionStorage.getItem('clickedBook'));
    if (book) {
        const bookModal = document.getElementById('bookModal');
        const modalContent = bookModal.querySelector('.modal-content');

        modalContent.innerHTML = `
        <div class="book-info">
            <img src="${book.imagePath}" alt="${book.title}" class="book-image">
            <div class="book-details">
                <h2>${book.title}</h2>
                <p class="book-author">${book.author}</p>
                <p class="publication-year">${book.publicationYear}</p>
                <p class="book-description">${book.description}</p>
            </div>
        </div>
    `;
    
        bookModal.style.display = 'block';
        
        const closeButton = bookModal.querySelector('.close-btn');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                bookModal.style.display = 'none';
            });
        } else {
            console.error(".close-btn element not found within bookModal!");
        }
    }
});
