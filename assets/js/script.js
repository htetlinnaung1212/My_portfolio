'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });





// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}
// =========================
// PROJECT MODAL
// =========================

const projectItems = document.querySelectorAll("[data-filter-item]");

const projectModal = document.querySelector("[data-project-modal]");
const projectModalImage = document.querySelector("[data-project-modal-image]");
const projectModalTitle = document.querySelector("[data-project-modal-title]");
const projectModalCategory = document.querySelector("[data-project-modal-category]");
const projectModalDescription = document.querySelector("[data-project-modal-description]");
const projectModalTags = document.querySelector("[data-project-modal-tags]");

const projectModalCloseBtns = document.querySelectorAll("[data-project-modal-close]");


// OPEN MODAL
projectItems.forEach(function (project) {

  project.addEventListener("click", function (event) {

    event.preventDefault();

    const title = project.dataset.projectTitle;
    const category = project.dataset.projectCategory;
    const description = project.dataset.projectDescription;
    const image = project.querySelector(".project-img img").src;
    projectModalImage.src = image;
    const technologies = project.dataset.projectTechnologies;

    projectModalTitle.textContent = title || "";
    projectModalCategory.textContent = category || "";
    projectModalDescription.textContent = description || "";
    projectModalImage.src = image || "";

    // Clear old technology tags
    projectModalTags.innerHTML = "";

    if (technologies) {

      const techList = technologies.split(",");

      techList.forEach(function (tech) {

        const tag = document.createElement("span");
        tag.textContent = tech.trim();

        projectModalTags.appendChild(tag);

      });

    }

    projectModal.classList.add("active");

    document.body.style.overflow = "hidden";

  });

});


// CLOSE MODAL
projectModalCloseBtns.forEach(function (btn) {

  btn.addEventListener("click", function () {

    projectModal.classList.remove("active");

    document.body.style.overflow = "auto";

  });

});


// CLOSE WITH ESC KEY
document.addEventListener("keydown", function (event) {

  if (event.key === "Escape") {

    projectModal.classList.remove("active");

    document.body.style.overflow = "auto";

  }

});
// =========================
// CONTACT FORM SUBMISSION
// =========================

const contactForm = document.querySelector("[data-form]");
const contactFormBtn = document.querySelector("[data-form-btn]");
const formStatus = document.querySelector("[data-form-status]");

if (contactForm && contactFormBtn && formStatus) {

  const formBtnText = contactFormBtn.querySelector("span");

  contactForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    contactFormBtn.setAttribute("disabled", "");

    if (formBtnText) {
      formBtnText.textContent = "Sending...";
    }

    formStatus.textContent = "";
    formStatus.className = "form-status";

    try {

      const formData = new FormData(contactForm);

      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
        headers: {
          "Accept": "application/json"
        }
      });

      if (response.ok) {

        // Show success message
        formStatus.textContent = "✓ Message sent successfully!";
        formStatus.classList.add("success");

        // Clear all form fields
        contactForm.reset();

        // Form is empty, so disable button
        contactFormBtn.setAttribute("disabled", "");

        // Hide success message after 3 seconds
        setTimeout(function () {
          formStatus.textContent = "";
          formStatus.classList.remove("success");
        }, 3000);

      } else {

        formStatus.textContent =
          "Something went wrong. Please try again.";

        formStatus.classList.add("error");

        contactFormBtn.removeAttribute("disabled");

      }

    } catch (error) {

      console.error(error);

      formStatus.textContent =
        "Unable to send your message. Please check your connection and try again.";

      formStatus.classList.add("error");

      contactFormBtn.removeAttribute("disabled");

    }

    if (formBtnText) {
      formBtnText.textContent = "Send Message";
    }

  });

}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}