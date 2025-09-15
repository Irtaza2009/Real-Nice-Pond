// TODO: Click on the pond → ripple animation.
// TODO: Add sound effects for firefly clicks.
// TODO: Add easter egg count.
// TODO: Firefly counter.
// Done: Mute/unmute button for audio.
// Done: Add a pixelated cursor.
// Done: Made the fireflies look more like fireflies.
// Done: Parallax effect for background.


// Add scroll effect for main content
window.addEventListener("scroll", () => {
    const content = document.querySelector(".content");
    if (window.scrollY > 40) {
    content.classList.add("scrolled");
    } else {
    content.classList.remove("scrolled");
    }
});

// Scroll to content when chevron is clicked
document
    .getElementById("scroll-down")
    .addEventListener("click", function () {
    document
        .getElementById("content")
        .scrollIntoView({ behavior: "smooth" });
    });

// Make arrows clickable (since <a> is hidden)
document
    .querySelectorAll(".arrow-group-arrows .arrow")
    .forEach(function (el) {
    el.addEventListener("click", function () {
        var link = el.querySelector("a");
        if (link && link.href) {
        window.location.href = link.href;
        }
    });
    });

function fadeInAudio(audio, duration = 3000) {
  audio.volume = 0;
  audio.play();
  let step = 0.05;
  let interval = setInterval(() => {
    if (audio.volume < 1) {
      audio.volume = Math.min(1, audio.volume + step);
    } else {
      clearInterval(interval);
    }
  }, duration * step);
}


// Overlay click -> reveal + play audio
const overlay = document.getElementById("overlay");
const audio = document.querySelector("audio");

overlay.addEventListener("click", () => {
    overlay.classList.add("open");
    setTimeout(() => {
    overlay.style.display = "none";
    }, 1600); // after curtain animation
    if (audio) {
    fadeInAudio(audio);
    }
});

// Firefly



// Firefly respawn system
function spawnFirefly(delay = 0) {
  const firefly = document.createElement("div");
  firefly.classList.add("firefly");

// random position anywhere in the viewport
firefly.style.top = `${Math.random() * 80}%`;
firefly.style.left = `${Math.random() * 80}%`;

  // random animation offset
  firefly.style.animationDelay = `${Math.random() * 10}s`;

  setTimeout(() => {
    document.querySelector(".hero").appendChild(firefly);

    firefly.addEventListener("click", () => {
      const rect = firefly.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      // remove firefly
      firefly.remove();

      // create sparks
      for (let i = 0; i < 8; i++) {
        const spark = document.createElement("div");
        spark.classList.add("spark");
        document.body.appendChild(spark);

        spark.style.left = `${x}px`;
        spark.style.top = `${y}px`;

        const angle = (i / 8) * (2 * Math.PI);
        const distance = 30 + Math.random() * 20;
        const dx = Math.cos(angle) * distance + "px";
        const dy = Math.sin(angle) * distance + "px";

        spark.style.setProperty("--dx", dx);
        spark.style.setProperty("--dy", dy);

        setTimeout(() => spark.remove(), 600);
      }

      // respawn another after 2s
      spawnFirefly(2000);
    });
  }, delay);
}

// Initial fireflies
spawnFirefly();
spawnFirefly();
spawnFirefly();


// Mute/Unmute button logic
const muteBtn = document.getElementById("mute-btn");
const muteIcon = muteBtn.querySelector("i");

muteBtn.addEventListener("click", () => {
  if (audio.muted) {
    audio.muted = false;
    muteIcon.classList.remove("fa-volume-xmark");
    muteIcon.classList.add("fa-volume-high");
  } else {
    audio.muted = true;
    muteIcon.classList.remove("fa-volume-high");
    muteIcon.classList.add("fa-volume-xmark");
  }
});
