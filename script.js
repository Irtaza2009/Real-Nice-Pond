// Done: Add sound effects for firefly clicks.
// Done: Make firefly info text lead to the fireflies.
// Done: Firefly counter.
// Done: 10 fireflies rickroll.
// TODO: Click on the pond → ripple animation.


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

// Scroll to hero when firefly-arrow is clicked
document
    .getElementById("firefly-arrow")
    .addEventListener("click", function () {
    document
        .getElementById("hero")
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
    if (audio.volume < 0.5) {
      audio.volume = Math.min(0.5, audio.volume + step);
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

let fireflyClicks = 0; // counter


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

      // play sparkle sound
      const sparkle = new Audio("https://hc-cdn.hel1.your-objectstorage.com/s/v3/01a8c2f72077d10dbd075ae7c010b07dd2ce5984_sparkle_audio.mp4");
      sparkle.volume = 0.5; // softer so it feels magical
      sparkle.play().catch(err => console.log("Sound blocked:", err));


        // update counter
        fireflyClicks++;
        document.getElementById("firefly-counter").textContent = `Fireflies: ${fireflyClicks}`;

        // Rickroll easter egg 🎶
        if (fireflyClicks === 10) {
            window.location.href = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
        }

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


// Ripple effect on mouse move
let lastRippleTime = 0;

document.addEventListener("mousemove", (e) => {
  const now = Date.now();
  if (now - lastRippleTime < 180) return; // limit to ~6 ripples/sec
  lastRippleTime = now;

  // Sample color beneath cursor (fallback)
  const element = document.elementFromPoint(e.clientX, e.clientY);
  let color = "rgba(200,200,200,0.8)";

  if (element) {
    const style = window.getComputedStyle(element);
    if (style.backgroundColor !== "rgba(0, 0, 0, 0)") {
      color = style.backgroundColor;
    }
  }

  // Create ripple
  const ripple = document.createElement("div");
  ripple.classList.add("ripple");
  ripple.style.left = `${e.pageX}px`;
  ripple.style.top = `${e.pageY}px`;
  ripple.style.borderColor = color;

  document.body.appendChild(ripple);

  setTimeout(() => ripple.remove(), 800);
});
