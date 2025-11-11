document.addEventListener('DOMContentLoaded', () => {
    const presentation = document.getElementById('presentation');
    const slides = Array.from(document.querySelectorAll('.slide'));
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const slideCounter = document.getElementById('slideCounter');

    let currentIndex = 0;

    function updateSlides() {
        slides.forEach((slide, index) => {
            slide.dataset.state = index < currentIndex ? 'previous' : (index > currentIndex ? 'next' : 'active');
        });
        if (slideCounter) {
            slideCounter.textContent = `${currentIndex + 1} / ${slides.length}`;
        }
    }

    function showNextSlide() {
        currentIndex = (currentIndex + 1) % slides.length;
        updateSlides();
    }

    function showPrevSlide() {
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlides();
    }

    if (nextBtn) nextBtn.addEventListener('click', showNextSlide);
    if (prevBtn) prevBtn.addEventListener('click', showPrevSlide);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'PageDown') showNextSlide();
        else if (e.key === 'ArrowLeft' || e.key === 'PageUp') showPrevSlide();
    });
    
    // === TẢI ẢNH CHUNG ===
    function setupImageUpload(inputId, imageId) {
        const inputElement = document.getElementById(inputId);
        const imageElement = document.getElementById(imageId);
        const wrapper = imageElement ? imageElement.parentElement : null;

        if (!inputElement || !imageElement || !wrapper) return;

        const savedImage = localStorage.getItem(imageId);
        if (savedImage) {
            imageElement.src = savedImage;
            imageElement.classList.add('has-image');
            wrapper.classList.add('has-image'); 
        }

        function handleFile(file) {
             if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    const imageUrl = e.target.result;
                    imageElement.src = imageUrl;
                    imageElement.classList.add('has-image');
                    wrapper.classList.add('has-image');
                    localStorage.setItem(imageId, imageUrl);
                };
                reader.readAsDataURL(file);
            }
        }
        
        inputElement.addEventListener('change', (event) => handleFile(event.target.files[0]));
        
        // Kéo và thả
        wrapper.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.stopPropagation();
            wrapper.style.borderColor = 'var(--theme-color-dark)';
        });
        wrapper.addEventListener('dragleave', (e) => {
            e.preventDefault();
            e.stopPropagation();
            wrapper.style.borderColor = 'var(--theme-color-main)';
        });
        wrapper.addEventListener('drop', (e) => {
            e.preventDefault();
            e.stopPropagation();
            wrapper.style.borderColor = 'var(--theme-color-main)';
            handleFile(e.dataTransfer.files[0]);
        });
    }

    // Khởi tạo cho ảnh đại diện
    setupImageUpload('upload-huy', 'avatar-huy');
    setupImageUpload('upload-hoang', 'avatar-hoang');
    setupImageUpload('upload-son', 'avatar-son');
    setupImageUpload('upload-vu', 'avatar-vu');

    // Khởi tạo cho lưu đồ
    setupImageUpload('upload-flowchart-general', 'flowchart-image-general');
    setupImageUpload('upload-flowchart-detail', 'flowchart-image-detail');

    updateSlides();
});
