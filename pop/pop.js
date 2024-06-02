document.addEventListener('DOMContentLoaded', function () {
            const buttons = document.querySelectorAll('.view-btn');
            const overlay = document.querySelector('.overlay');
            const popups = document.querySelectorAll('.popup');
            const closeBtns = document.querySelectorAll('.close-btn');
            let isPopupOpen = false;
            let currentPopup;
            let startY;
            let startTop;
            let longPressTimeout;

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

                // Adding keyboard event listener for accessibility
                button.addEventListener('keydown', function (event) {
                    if (event.code === 'Enter' || event.code === 'Space') {
                        const popupId = this.getAttribute('data-popup');
                        const popup = document.getElementById(popupId);
                        if (popup) {
                            openPopup(popup);
                        }
                    }
                });

                // Adding long press event listener to copy URL to clipboard
                button.addEventListener('contextmenu', function (event) {
                    event.preventDefault(); // Prevent the default context menu
                    const popupId = this.getAttribute('data-popup');
                    const url = `${window.location.origin}${window.location.pathname}?view=${popupId}`;
                    copyToClipboard(url);
                    alert('Link copied to clipboard:\n\n' + url);
                });

                // Adding long press functionality for both touch and mouse
                function handleLongPress(event) {
                    event.preventDefault();
                    const popupId = button.getAttribute('data-popup');
                    const url = `${window.location.origin}${window.location.pathname}?view=${popupId}`;
                    copyToClipboard(url);
                    alert('Link copied to clipboard:\n\n' + url);
                }

                button.addEventListener('touchstart', function (event) {
                    longPressTimeout = setTimeout(() => handleLongPress(event), 600);
                });

                button.addEventListener('touchend', function () {
                    clearTimeout(longPressTimeout);
                });

                button.addEventListener('mousedown', function (event) {
                    longPressTimeout = setTimeout(() => handleLongPress(event), 600);
                });

                button.addEventListener('mouseup', function () {
                    clearTimeout(longPressTimeout);
                });

                button.addEventListener('mouseleave', function () {
                    clearTimeout(longPressTimeout);
                });
            });

            closeBtns.forEach(btn => {
                btn.addEventListener('click', function () {
                    closePopup();
                    removeUrlParam(); // Call function to remove URL parameter
                });
            });

            overlay.addEventListener('click', function (event) {
                event.stopPropagation();
            });

            window.addEventListener('resize', function () {
                positionPopup();
            });

            window.addEventListener('click', function (event) {
                if (isPopupOpen && event.target === overlay) {
                    closePopup();
                }
            });

            // Function to handle touch events for both popup and overlay
            function handleTouchEvents(event) {
                if (!isPopupOpen) return;

                if (event.touches.length === 1) { // Check if only one finger is touched
                    startY = event.touches[0].clientY;
                    startTop = parseInt(currentPopup.style.top) || currentPopup.getBoundingClientRect().top;
                }
            }

            // Add touch event listeners for both popup and overlay
            document.addEventListener('touchstart', handleTouchEvents);
            overlay.addEventListener('touchstart', handleTouchEvents);

            // Function to handle touch move events for both popup and overlay
            function handleTouchMove(event) {
                if (!isPopupOpen || event.touches.length !== 1) return; // Only proceed if one finger is touched

                const deltaY = event.touches[0].clientY - startY;
                const newTop = Math.max(startTop + deltaY, startTop);

                currentPopup.style.top = newTop + 'px';
            }

            // Add touch move event listeners for both popup and overlay
            document.addEventListener('touchmove', handleTouchMove);
            overlay.addEventListener('touchmove', handleTouchMove);

            // Function to handle touch end events for both popup and overlay
            function handleTouchEnd(event) {
                if (!isPopupOpen) {
                    return;
                }

                const deltaY = event.changedTouches[0].clientY - startY;
                const popupHeight = currentPopup.offsetHeight;
                const swipePercentage = 0.5; // Set the swipe percentage based on the popup height
                const transitionDuration = 300; // Duration of the transition in milliseconds

                if (deltaY > popupHeight * swipePercentage) {
                    closePopup();
                    removeUrlParam(); // Call function to remove URL parameter
                } else {
                    currentPopup.style.top = startTop + 'px';
                    if (deltaY < 0 && Math.abs(deltaY) > popupHeight * swipePercentage * 0.5) {
                        // If the popup or overlay bounces back up and surpasses half the swipe threshold, reset position without transition
                        currentPopup.style.transition = '';
                        currentPopup.style.top = startTop + 'px';
                    } else {
                        // Apply transition only if the popup or overlay is not bouncing back up
                        currentPopup.style.transition = 'top 0.3s ease'; // Add transition
                        setTimeout(function () {
                            currentPopup.style.transition = ''; // Remove transition after a certain duration
                        }, transitionDuration);
                    }
                }
            }

            // Add touch end event listeners for both popup and overlay
            document.addEventListener('touchend', handleTouchEnd);
            overlay.addEventListener('touchend', handleTouchEnd);

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
                    }, 300); // Duration of CSS transition
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

            function copyToClipboard(text) {
                navigator.clipboard.writeText(text).then(function () {
                    console.log('Link copied to clipboard!');
                }).catch(function (err) {
                    console.error('Could not copy link: ', err);
                });
            }

            positionPopup();
        });
