



const menuOpenBtn= document.querySelector('.menu-open')
const menuCloseBtn= document.querySelector('.menu-close')
const navLinks= document.querySelector('.nav-links-mobile')


function openMenu(){
    menuOpenBtn.style.display = 'none'
    menuCloseBtn.style.display = 'block'
    navLinks.classList.remove('hide')
    console.log('hello')
}
function closeMenu(){
    menuCloseBtn.style.display = 'none'

    menuOpenBtn.style.display = 'block'
    navLinks.classList.add('hide')

}














document.addEventListener('DOMContentLoaded', () => {
    let isSyncing = false; // Prevents infinite loop

    // Initialize the logo slider first
    const logoSlider = new Swiper('.logo-slider', {
        loop: false,
        speed: 1000,
        effect: 'cards',
        allowTouchMove: false, // Disable manual dragging
        cardsEffect: {
            perSlideOffset: 8,
            perSlideRotate: 3,
            rotate: true,
            slideShadows: true,
        },
    });

    // Initialize the text slider after the logo slider
    const textSlider = new Swiper('.text-slider', {
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true,
        },
        navigation: {
            nextEl: '.next-btn',
            prevEl: '.prev-btn',
        },
        on: {
            slideChange: function () {
                if (!isSyncing) {
                    isSyncing = true;
                    logoSlider.slideToLoop(this.realIndex); // Sync logo slider
                    isSyncing = false;
                }
                updateProgressBars();
            },
            slideChangeTransitionEnd: function (){
                updateProgressBars()
            }
        },
    });

    // Add slideChange event to logoSlider after both sliders are initialized
 

    // 🔹 Force both sliders to start from index 0
    setTimeout(() => {
        textSlider.slideTo(0, 0); // Instantly set text slider to first slide
        logoSlider.slideTo(0, 0); // Instantly set logo slider to first slide
    }, 100); // Small delay to ensure proper initialization

    // Update progress bars
    function updateProgressBars() {
        document.querySelectorAll('.progress-bar').forEach((bar) => {
            bar.style.width = '0%'; // Reset all bars
        });

        const activeSlide = document.querySelector('.swiper-slide-active .progress-bar');
        if (activeSlide) {
            const progressValue = activeSlide.getAttribute('progress') || '0';
            activeSlide.style.transition = 'width 0.5s ease-in-out'; // Smooth animation
            activeSlide.style.width = `${progressValue}%`; // Fill active progress bar
        }
    }

    updateProgressBars();
});












document.getElementById("form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Prevent default form submission

    let valid = true;

    const name = document.getElementById("name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const message = document.getElementById("message");

    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const phoneError = document.getElementById("phone-error");
    const messageError = document.getElementById("message-error");
    const resultMessage = document.getElementById("result");
    const submitBtn = document.getElementById("submit-btn");
    const submitText = document.getElementById("submit-text");
    const spinner = document.getElementById("spinner");

    // Clear previous errors
    nameError.textContent = "";
    emailError.textContent = "";
    phoneError.textContent = "";
    messageError.textContent = "";
    resultMessage.textContent = "";

    if (name.value.trim() === "") {
        nameError.textContent = "Full Name is required.";
        valid = false;
    }

    if (email.value.trim() === "") {
        emailError.textContent = "Email Address is required.";
        valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        emailError.textContent = "Enter a valid email address.";
        valid = false;
    }

    if (phone.value.trim() === "") {
        phoneError.textContent = "Phone Number is required.";
        valid = false;
    } else if (!/^\+?[0-9\s()-]+$/.test(phone.value)) {
        phoneError.textContent = "Enter a valid phone number.";
        valid = false;
    }

    if (message.value.trim() === "") {
        messageError.textContent = "Message is required.";
        valid = false;
    }

    if (!valid) return; // Stop further execution if validation fails

    // Hide the submit text and show the spinner
    submitText.style.display = "none";
    spinner.style.display = "inline-block";

    // Prepare form data for submission
    const formData = new FormData(event.target);

    try {
        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        // Hide the spinner and show the submit text again
        submitText.style.display = "inline-block";
        spinner.style.display = "none";

        if (response.status === 200) {
            resultMessage.textContent = "Thanks for Contacting, we will reply soon!";
            event.target.reset(); // Clear the form
        } else {
            throw new Error(data.message || "Something went wrong. Please try again.");
        }
    } catch (error) {
        // Hide the spinner and show the submit text again on error
        submitText.style.display = "inline-block";
        spinner.style.display = "none";

        resultMessage.style.color = "red";
        resultMessage.textContent = error.message;
    }
});

