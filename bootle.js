// Register plugin
gsap.registerPlugin(ScrollTrigger);

// 🔹 Helper: Detect device
function getDeviceType() {
  if (window.innerWidth < 768) return "mobile";
  if (window.innerWidth < 1024) return "tablet";
  return "desktop";
}

// 🔹 Responsive positions for each scroll section
const responsiveSettings = {
  two: {
    desktop: { top: "120%", left: "0%", width: "40%" },
    tablet: { top: "115%", left: "5%", width: "15%" },
    mobile: { top: "50%", left: "25%", width: "200px" },
  },
  three: {
    desktop: { width: "11%", top: "230%", left: "44.5%" },
    tablet: { width: "16%", top: "230%", left: "40%" },
    mobile: { width: "22%", top: "220%", left: "35%" },
  },
};

// 🔹 Function to create responsive timelines
function createResponsiveTimelines() {
  const device = getDeviceType();

  // Kill old triggers
  ScrollTrigger.getAll().forEach((st) => st.kill());

  // ✅ Section 2 Animation (Works on All Devices)
  const posTwo = responsiveSettings.two[device];

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".two",
      start: "0% 95%",
      end: "70% 50%",
      scrub: true,
      // markers: true,
    },
  });

  tl.to("#fanta", {
    top: posTwo.top,
    left: posTwo.left,
    width: posTwo.width || "auto", // ✅ width applied safely
    ease: "none",
  });

  // ✅ Section 3 Animation (Only Desktop)
  if (device === "desktop") {
    const posThree = responsiveSettings.three.desktop;

    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: "#three",
        start: "0% 95%",
        end: "20% 50%",
        scrub: true,
        // markers: true,
      },
    });

    tl2.to("#fanta", {
      width: posThree.width,
      top: posThree.top,
      left: posThree.left,
      ease: "none",
    });
  }
}

// 🔹 Initialize on load
createResponsiveTimelines();

// 🔹 Rebuild timelines on resize (for live responsiveness)
window.addEventListener("resize", () => {
  createResponsiveTimelines();
});
