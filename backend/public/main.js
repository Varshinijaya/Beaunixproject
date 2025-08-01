let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.header .navbar');


let slides = document.querySelectorAll('.home .slide');
let index = 0;

function next() {
    slides[index].classList.remove('active');
    index = (index + 1) % slides.length;
    slides[index].classList.add('active');
}

function prev() {
    slides[index].classList.remove('active');
    index = (index - 1 + slides.length) % slides.length;
    slides[index].classList.add('active');
}


//modal
document.getElementById("profileLink").addEventListener("click", function(e) {

    e.preventDefault();
    document.getElementById("profileModal").style.display = "block";
  });

  // Preview image before saving
  document.getElementById("profilePic").addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const preview = document.getElementById("previewImage");
        preview.src = e.target.result;
        preview.style.display = "block";
      };
      reader.readAsDataURL(file);
    }
  });

  // Save and display beside LogIn button
function displayProfile(name, imgSrc) {
  const container = document.getElementById("profileContainer");
  container.innerHTML = `
    <img src="${imgSrc}" alt="Profile" />
    <span>${name}</span>
  `;
  container.style.display = "flex";
}



  function saveProfile() {
  const name = document.getElementById("username").value;
  const imgSrc = document.getElementById("previewImage").src;

  if (!name || !imgSrc || imgSrc === "#") {
    alert("Please enter name and upload image.");
    return;
  }
  

  // Save to localStorage
  localStorage.setItem("profileName", name);
  localStorage.setItem("profileImage", imgSrc);

  displayProfile(name, imgSrc);
  document.getElementById("profileModal").style.display = "none";
}

window.addEventListener("DOMContentLoaded", function () {
  const savedName = localStorage.getItem("profileName");
  const savedImg = localStorage.getItem("profileImage");

  if (savedName && savedImg) {
    displayProfile(savedName, savedImg);
  }
});


  // Close modal if clicked outside content
  window.onclick = function(event) {
    const modal = document.getElementById("profileModal");
    if (event.target === modal) {
      modal.style.display = "none";
    }
  }

  function openPopupc() {
      document.getElementById("callPopupc").style.display = "flex";
    }

    function closePopupc() {
      document.getElementById("callPopupc").style.display = "none";
    }

    // Optional: close if clicked outside the popup box
    window.addEventListener("click", function(event) {
      const popup = document.getElementById("callPopupc");
      if (event.target === popup) {
        closePopupc();
      }
    });

    function openPopup1() {
      document.getElementById("callPopup1").style.display = "flex";
    }

    function closePopup1() {
      document.getElementById("callPopup1").style.display = "none";
    }

    // Optional: close if clicked outside the popup box
    window.addEventListener("click", function(event) {
      const popup = document.getElementById("callPopup1");
      if (event.target === popup) {
        closePopup1();
      }
    });