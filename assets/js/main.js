/*=============== HOME SPLIT TEXT ===============*/
const { animate, splitText, stagger } = anime;

const { chars: chars1 } = splitText('.home__profession-1', { chars: true });
const { chars: chars2 } = splitText('.home__profession-2', { chars: true });

animate(chars1, {
    y: [
        { to: ['100%', '0%'] },
        { to: '-100%', delay: 4000, ease: 'in(3)' }
    ],
    duration: 900,
    ease: 'out(3)',
    delay: stagger(80),
    loop: true,
});

animate(chars2, {
    y: [
        { to: ['100%', '0%'] },
        { to: '-100%', delay: 4000, ease: 'in(3)' }
    ],
    duration: 900,
    ease: 'out(3)',
    delay: stagger(80),
    loop: true,
});

/*=============== SWIPER PROJECTS ===============*/
const swiperProjects = new Swiper('.projects__swiper', {
    loop: true,
    spaceBetween: 16,
    slidesPerView: 'auto',
    grabCursor: true,
    speed: 600,

    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },

    autoplay: {
        delay: 3500,
        disableOnInteraction: false,
    },

    breakpoints: {
        540: {
            spaceBetween: 24,
        },
        1150: {
            spaceBetween: 32,
        }
    }
});

/*=============== PROJECTS DETAIL OVERVIEW TOGGLE ===============*/
const detailButtons = document.querySelectorAll('.projects__detail-btn'),
    closeButtons = document.querySelectorAll('.projects__panel-close')

detailButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation()
        const card = btn.closest('.projects__card')
        
        // Pause Swiper autoplay while user is viewing overview
        if (typeof swiperProjects !== 'undefined' && swiperProjects.autoplay) {
            swiperProjects.autoplay.stop()
        }

        // Close any other open project panels first
        document.querySelectorAll('.projects__card.detail-active').forEach(c => {
            if (c !== card) c.classList.remove('detail-active')
        })

        const isActive = card.classList.toggle('detail-active')
        if (isActive) {
            const panelBody = card.querySelector('.projects__panel-body')
            if (panelBody) panelBody.scrollTop = 0
        }
    })
})

closeButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.stopPropagation()
        const card = btn.closest('.projects__card')
        card.classList.remove('detail-active')

        // Resume autoplay if no cards are open
        if (typeof swiperProjects !== 'undefined' && swiperProjects.autoplay) {
            swiperProjects.autoplay.start()
        }
    })
})

// Close panel when clicking outside of panel
document.addEventListener('click', (e) => {
    if (!e.target.closest('.projects__panel') && !e.target.closest('.projects__detail-btn')) {
        const activeCards = document.querySelectorAll('.projects__card.detail-active')
        if (activeCards.length > 0) {
            activeCards.forEach(card => card.classList.remove('detail-active'))
            if (typeof swiperProjects !== 'undefined' && swiperProjects.autoplay) {
                swiperProjects.autoplay.start()
            }
        }
    }
})

// Close panel on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const activeCards = document.querySelectorAll('.projects__card.detail-active')
        if (activeCards.length > 0) {
            activeCards.forEach(card => card.classList.remove('detail-active'))
            if (typeof swiperProjects !== 'undefined' && swiperProjects.autoplay) {
                swiperProjects.autoplay.start()
            }
        }
    }
})

/*=============== WORK TABS ===============*/
const tabs = document.querySelectorAll('[data-target]'),
    tabContents = document.querySelectorAll('[data-content]')

tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        const targetSelector = tab.dataset.target,
            targetContent = document.querySelector(targetSelector)

        // Disable all content and active tabs
        tabContents.forEach((content) => content.classList.remove('work-active'))
        tabs.forEach((t) => t.classList.remove('work-active'))

        // Active the tab and corresponding content
        tab.classList.add('work-active')
        targetContent.classList.add('work-active')

    })
})

/*=============== SERVICES ACCORDION ===============*/
const servicesButtons = document.querySelectorAll('.services__button'),
    servicesCards = document.querySelectorAll('.services__card')

// Initialize heights according to initial open/close state
servicesCards.forEach(card => {
    const info = card.querySelector('.services__info')
    if (info) {
        if (card.classList.contains('services-open')) {
            info.style.height = info.scrollHeight + 'px'
        } else {
            info.style.height = '0'
        }
    }
})

servicesButtons.forEach(button => {
    button.addEventListener('click', () => {
        const currentCard = button.closest('.services__card'),
            currentInfo = currentCard.querySelector('.services__info'),
            isCardOpen = currentCard.classList.contains('services-open')

        // Close all other services info
        servicesCards.forEach(card => {
            card.classList.replace('services-open', 'services-close')
            const info = card.querySelector('.services__info')
            if (info) info.style.height = '0'
        })

        // Open only if not already open
        if (!isCardOpen) {
            currentCard.classList.replace('services-close', 'services-open')
            currentInfo.style.height = currentInfo.scrollHeight + 'px'
        }
    })
})

/*=============== TESTIMONIALS OF DUPLICATE CARDS ===============*/


/*=============== COPY EMAIL IN CONTACT ===============*/
const copyBtn = document.getElementById('contact-btn'),
    copyEmail = document.getElementById('contact-email').textContent

copyBtn.addEventListener('click', () => {
    // Use the Clipboard API to copy text
    navigator.clipboard.writeText(copyEmail).then(() => {
        copyBtn.innerHTML = 'Email Copied <i class="ri-check-line"></i>'

        //Restore the original text
        setTimeout(() => {
            copyBtn.innerHTML = 'Copy email <i class="ri-file-copy-line"></i>'
        }, 2000)
    })
})

/*=============== CURRENT YEAR OF THE FOOTER ===============*/


/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    //We get the position by scrolling down
    const scrollY = window.scrollY

    sections.forEach(section => {
        const id = section.id, //id of each section
            top = section.offsetTop - 50, //Distance from the top edge
            height = section.offsetHeight, //Element Height
            link = document.querySelector('.nav__menu a[href*=' + id + ']') //id nav link

        if (!link) return

        link.classList.toggle('active-link', scrollY > top && scrollY <= top + height)
    })
}

window.addEventListener('scroll', scrollActive)


/*=============== CUSTOM CURSOR ===============*/
const cursor = document.querySelector('.cursor')
let mouseX = 0, mouseY = 0 //store mouse position

const cursorMove = () => {
    //position the cursor
    cursor.style.left = `${mouseX}px`
    cursor.style.top = `${mouseY}px`
    cursor.style.transform = `translate(-50%, -50%)`

    //update the cursor animation
    requestAnimationFrame(cursorMove)
}

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX
    mouseY = e.clientY
})

cursorMove()
/* Hide custom cursor on links and buttons */
const interactiveElements = document.querySelectorAll('a, button, .projects__detail-btn, .projects__panel-close')

interactiveElements.forEach(item => {
    item.addEventListener('mouseover', () => {
        cursor.classList.add('hide-cursor')
    })
    item.addEventListener('mouseleave', () => {
        cursor.classList.remove('hide-cursor')
    })
})

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 300,
    // reset: true, // Animation repeat
})

sr.reveal(`.home__image, .projects__container, .work__container, .contact__container`)
sr.reveal(`.home__data`, { delay: 900, origin: 'bottom' })
sr.reveal(`.home__info`, { delay: 1200, origin: 'bottom' })
sr.reveal(`.home__social, .home__cv`, { delay: 1500 })
sr.reveal(`.about__data`, { origin: 'left' })
sr.reveal(`.about__image`, { origin: 'right' })
sr.reveal(`.services__card`, { interval: 100 })
