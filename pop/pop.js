document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.view-btn');
    const overlay = document.querySelector('.overlay');
    const popups = document.querySelectorAll('.popup');
    const closeBtns = document.querySelectorAll('.close-btn');
    let isPopupOpen = false;
    let currentPopup;
    let startY;
    let startTop;
    let pressTimer;
    let isLongPress = false; // Flag to indicate long press
    const longPressDuration = 1000; // 1 second

    function copyToClipboard(text) {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
        alert("Link copied to clipboard!");
    }

    function handleLongPress(event) {
        isLongPress = true; // Set long press flag
        const popupId = event.target.closest('.view-btn').getAttribute("data-popup");
        if (popupId) {
            const linkToCopy = `${window.location.origin}/?view=${popupId}`;
            copyToClipboard(linkToCopy);
        }
    }

    function checkUrlParams() {
        const urlParams = new URLSearchParams(window.location.search);
        const popupId = urlParams.get('view');
        if (popupId) {
            const popup = document.getElementById(popupId);
            if (popup) {
                openPopup(popup);
            }
        }
    }

    checkUrlParams();

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            if (isLongPress) {
                isLongPress = false; // Reset long press flag
                return; // Prevent normal click action after long press
            }
            const popupId = this.getAttribute('data-popup');
            const popup = document.getElementById(popupId);
            if (popup) {
                openPopup(popup);
            }
        });

        button.addEventListener('keydown', function (event) {
            if (event.code === 'Enter' || event.code === 'Space') {
                const popupId = this.getAttribute('data-popup');
                const popup = document.getElementById(popupId);
                if (popup) {
                    openPopup(popup);
                }
            }
        });

        button.addEventListener('mousedown', function (event) {
            isLongPress = false; // Reset long press flag
            pressTimer = setTimeout(handleLongPress, longPressDuration, event);
        });

        button.addEventListener('mouseup', function () {
            clearTimeout(pressTimer);
        });

        button.addEventListener('mouseleave', function () {
            clearTimeout(pressTimer);
        });

        button.addEventListener('touchstart', function (event) {
            isLongPress = false; // Reset long press flag
            pressTimer = setTimeout(handleLongPress, longPressDuration, event);
        });

        button.addEventListener('touchend', function () {
            clearTimeout(pressTimer);
        });

        button.addEventListener('touchmove', function () {
            clearTimeout(pressTimer);
        });
    });

    closeBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            closePopup();
            removeUrlParam();
        });
    });

    overlay.addEventListener('click', function (event) {
        event.stopPropagation();
    });

    window.addEventListener('resize', positionPopup);

    window.addEventListener('click', function (event) {
        if (isPopupOpen && event.target === overlay) {
            closePopup();
        }
    });

    function handleTouchEvents(event) {
        if (!isPopupOpen) return;
        if (event.touches.length === 1) {
            startY = event.touches[0].clientY;
            startTop = parseInt(currentPopup.style.top) || currentPopup.getBoundingClientRect().top;
        }
    }

    function handleTouchMove(event) {
        if (!isPopupOpen || event.touches.length !== 1) return;
        const deltaY = event.touches[0].clientY - startY;
        const newTop = Math.max(startTop + deltaY, startTop);
        currentPopup.style.top = newTop + 'px';
    }

    function handleTouchEnd(event) {
        if (!isPopupOpen) return;
        const deltaY = event.changedTouches[0].clientY - startY;
        const popupHeight = currentPopup.offsetHeight;
        const swipePercentage = 0.5;
        const transitionDuration = 300;

        if (deltaY > popupHeight * swipePercentage) {
            closePopup();
            removeUrlParam();
        } else {
            currentPopup.style.top = startTop + 'px';
            currentPopup.style.transition = 'top 0.3s ease';
            setTimeout(() => {
                currentPopup.style.transition = '';
            }, transitionDuration);
        }
    }

    document.addEventListener('touchstart', handleTouchEvents);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    function openPopup(popup) {
        if (window.innerWidth < 768) {
            popup.style.top = 'auto';
            popup.style.bottom = '0';
            popup.style.transform = 'translate(-50%, 0)';
            popup.classList.add('slide-in-animation');
            overlay.classList.add('fade-in-animation');
        } else {
            overlay.style.display = 'block';
            overlay.classList.add('fade-in-animation');
            popups.forEach(popup => {
                popup.style.top = '50%';
                popup.style.bottom = 'auto';
                popup.style.transform = 'translate(-50%, -50%)';
                popup.classList.add('fade-in-animation');
            });
        }

        overlay.style.display = 'block';
        popup.style.display = 'block';
        overlay.classList.add('show');
        popup.classList.add('show');
        isPopupOpen = true;
        disableBackgroundScroll();
        currentPopup = popup;
    }

    function closePopup() {
        if (window.innerWidth < 768) {
            currentPopup.style.top = currentPopup.getBoundingClientRect().top + 'px';
            currentPopup.classList.add('slide-out-animation');
            overlay.classList.add('fade-out-animation');
            setTimeout(function () {
                overlay.style.display = 'none';
                currentPopup.style.display = 'none';
                currentPopup.classList.remove('slide-out-animation');
                overlay.classList.remove('fade-out-animation');
            }, 300);
        } else {
            overlay.classList.add('fade-out-animation');
            popups.forEach(popup => {
                popup.classList.add('fade-out-animation');
            });
            setTimeout(function () {
                overlay.style.display = 'none';
                popups.forEach(popup => {
                    popup.style.display = 'none';
                });
                overlay.classList.remove('fade-out-animation');
                popups.forEach(popup => {
                    popup.classList.remove('fade-out-animation');
                });
            }, 300);
        }
        isPopupOpen = false;
        enableBackgroundScroll();
    }

    function positionPopup() {
        if (window.innerWidth < 768) {
            popups.forEach(popup => {
                popup.style.top = 'auto';
                popup.style.bottom = '0';
                popup.style.transform = 'translate(-50%, 0)';
            });
        } else {
            popups.forEach(popup => {
                popup.style.top = '50%';
                popup.style.bottom = 'auto';
                popup.style.transform = 'translate(-50%, -50%)';
            });
        }
    }

    function disableBackgroundScroll() {
        document.body.style.overflow = 'hidden';
    }

    function enableBackgroundScroll() {
        document.body.style.overflow = '';
    }

    function removeUrlParam() {
        const urlWithoutParams = window.location.pathname;
        history.replaceState({}, document.title, urlWithoutParams);
    }

    positionPopup();
});
