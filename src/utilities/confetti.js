import confetti from "canvas-confetti";

export const launchConfetti = () => {
  const end = Date.now() + 7 * 1000;
  //   7 rakamı animasyonun süreceği saniye

  // go Buckeyes!
  //   const colors = ["#bb0000", "#ffffff"];
  const colors = ["#E32636", "#ffffff"];

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors: colors,
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors: colors,
    });

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();
};
