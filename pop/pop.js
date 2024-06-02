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
            const longPressDuration = 600; // 1000 ms = 1 second

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
                    const popupId = this.getAttribute('data-popup');
                    const popup = document.getElementById(popupId);
                    if (popup) {
                        openPopup(popup);
                    }
                });

                button.addEventListener("mousedown", function (event) {
                    pressTimer = setTimeout(handleLongPress, longPressDuration, event);
                });

                button.addEventListener("mouseup", function () {
                    clearTimeout(pressTimer);
                });

                // For touch devices
                button.addEventListener("touchstart", function (event) {
                    pressTimer = setTimeout(handleLongPress, longPressDuration, event);
                });

                button.addEventListener("touchend", function () {
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

            window.addEventListener('resize', function () {
                positionPopup();
            });

            document.addEventListener('touchstart', function (event) {
                if (!isPopupOpen) return;

                startY = event.touches[0].clientY;
                startTop = parseInt(currentPopup.style.top) || currentPopup.getBoundingClientRect().top;
            });

            document.addEventListener('touchmove', function (event) {
                if (!isPopupOpen) return;

                const deltaY = event.touches[0].clientY - startY;
                const newTop = Math.max(startTop + deltaY, startTop);

                currentPopup.style.top = newTop + 'px';
            });

            document.addEventListener('touchend', function (event) {
                if (!isPopupOpen) return;

                const deltaY = event.changedTouches[0].clientY - startY;
                const screenHeight = window.innerHeight;
                const swipePercentage = 0.2;

                if (deltaY > screenHeight * swipePercentage) {
                    closePopup();
                    removeUrlParam();
                } else {
                    currentPopup.style.top = startTop + 'px';
                }
            });

            function openPopup(popup) {
                if (window.innerWidth < 768) {
                    popup.style.top = 'auto';
                    popup.style.bottom = '0';
                    popup.style.transform = 'translate(-50%, 0)';
                } else {
                    popups.forEach(popup => {
                        popup.style.top = '50%';
                        popup.style.bottom = 'auto';
                        popup.style.transform = 'translate(-50%, -50%)';
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
                overlay.classList.remove('show');
                currentPopup.classList.remove('show');
                if (window.innerWidth < 768) {
                    currentPopup.style.top = currentPopup.getBoundingClientRect().top + 'px';
                    currentPopup.classList.add('slide-out-animation');
                    setTimeout(function () {
                        overlay.style.display = 'none';
                        currentPopup.style.display = 'none';
                        currentPopup.classList.remove('slide-out-animation');
                    }, 300);
                } else {
                    setTimeout(function () {
                        overlay.style.display = 'none';
                        currentPopup.style.display = 'none';
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
