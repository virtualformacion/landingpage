(() => {
  const config = window.APP_CONFIG || {};
  const steps = [...document.querySelectorAll(".step-card[data-step]")];
  const rejectCard = document.getElementById("rejectCard");
  const rejectReason = document.getElementById("rejectReason");
  const progressFill = document.getElementById("progressFill");
  const stepNumber = document.getElementById("stepNumber");
  const stepText = document.getElementById("stepText");

  const labels = {1:"Tipo de negocio",2:"Proceso actual",3:"Autorización",4:"Resultado"};

  const plans = {
    basico: {
      name: "Plan Básico",
      price: 5,
      discountEligible: false,
      description: "Diseño estándar sin personalización de marca, servicio 24/7 para entrega automática de códigos, garantía de 30 días y configuración flexible."
    },
    pro: {
      name: "Plan Pro",
      price: 18,
      discountEligible: true,
      description: "Web con diseño personalizado y marca, entrega automática de códigos 24/7, ideal para ahorrar tiempo y mejorar la atención de tus clientes."
    },
    ultra: {
      name: "Plan Ultra",
      price: 25,
      discountEligible: true,
      description: "Web personalizada con marca, entrega automática 24/7 y opción para administrar usuarios con acceso a la web."
    }
  };

  let selectedPlanKey = null;
  let qualified = false;
  const totalSteps = 4;
  const couponKey = `promoCoupon_${config.promo?.campaignId || "default"}`;

  function promoState() {
    const promo = config.promo || {};

    if (!promo.enabled || !promo.endAt) {
      return { active: false, endAt: null };
    }

    const endAtNumber = new Date(promo.endAt).getTime();

    if (Number.isNaN(endAtNumber)) {
      console.warn("Fecha endAt inválida en js/config.js");
      return { active: false, endAt: null };
    }

    return {
      active: Date.now() < endAtNumber,
      endAt: endAtNumber
    };
  }

  function getRandomDiscountCode() {
    const codes = Array.isArray(config.promo?.discountCodes)
      ? config.promo.discountCodes.filter(code => typeof code === "string" && code.trim() !== "")
      : [];

    if (!codes.length) return "";

    let savedCoupon = localStorage.getItem(couponKey);

    if (!savedCoupon || !codes.includes(savedCoupon)) {
      const randomIndex = Math.floor(Math.random() * codes.length);
      savedCoupon = codes[randomIndex];
      localStorage.setItem(couponKey, savedCoupon);
    }

    return savedCoupon;
  }

  function buildPromoMessage() {
    const prefix = config.texts?.promoMessagePrefix || "Vengo por el descuento";
    const suffix = config.texts?.promoMessageSuffix || "para la web de códigos";
    const code = getRandomDiscountCode();

    if (!code) {
      return `${prefix} ${suffix}`;
    }

    return `${prefix} - ${code} ${suffix}`;
  }

  function updateOfferUI() {
    const state = promoState();
    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");
    const promoStatus = document.getElementById("promoStatus");
    const countdownText = document.getElementById("countdownText");
    const offerResult = document.getElementById("offerResult");
    const finalBadge = document.getElementById("finalBadge");
    const finalTitle = document.getElementById("finalTitle");
    const finalDescription = document.getElementById("finalDescription");

    if (!state.active || !state.endAt) {
      daysEl.textContent = "00"; hoursEl.textContent = "00"; minutesEl.textContent = "00"; secondsEl.textContent = "00";
      promoStatus.textContent = "Promoción inactiva";
      countdownText.textContent = "La promoción no está activa en este momento, pero puedes solicitar el servicio normalmente.";
      offerResult.textContent = "Precio regular";
      finalBadge.textContent = "Precio regular";
      finalTitle.textContent = "Solicita información del servicio";
      finalDescription.textContent = "El mensaje de WhatsApp se abrirá sin mencionar descuento.";
      return;
    }

    const diff = Math.max(state.endAt - Date.now(), 0);
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    daysEl.textContent = String(days).padStart(2, "0");
    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");

    const coupon = getRandomDiscountCode();

    promoStatus.textContent = "Promoción activa";
    countdownText.textContent = coupon
      ? `Completa la evaluación y solicita tu promoción con código: ${coupon}`
      : "Completa la evaluación y, si encaja con tu caso, podrás solicitar la promoción por WhatsApp.";
    offerResult.textContent = coupon ? `40% activo - ${coupon}` : "40% activo";
    finalBadge.textContent = "Promoción activa";
    finalTitle.textContent = "Solicita el 40% de descuento";
    finalDescription.textContent = coupon
      ? `El mensaje de WhatsApp incluirá este código: ${coupon}`
      : "El mensaje de WhatsApp se abrirá mencionando la promoción activa.";
  }

  function showStep(step, shouldScroll = true) {
    steps.forEach(card => card.classList.remove("active"));
    rejectCard.classList.remove("active");
    const card = document.querySelector(`.step-card[data-step="${step}"]`);
    if (!card) return;
    card.classList.add("active");
    progressFill.style.width = `${(step / totalSteps) * 100}%`;
    stepNumber.textContent = String(step);
    stepText.textContent = labels[step] || "Evaluación";

    if (shouldScroll) {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  function showReject(reason) {
    steps.forEach(card => card.classList.remove("active"));
    rejectReason.textContent = reason || "No cumples con uno de los criterios necesarios.";
    rejectCard.classList.add("active");
    stepText.textContent = "Resultado";
    rejectCard.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function formatMoney(value) {
    return `$${Number(value).toFixed(2)}`;
  }

  function getPlanPaymentText(plan) {
    const state = promoState();

    if (state.active && plan.discountEligible) {
      const discountedMonthly = plan.price * 0.6;
      const twoMonthsTotal = discountedMonthly * 2;
      const regularTwoMonths = plan.price * 2;

      return `Precio regular: $${plan.price}/mes. Con 40% de descuento por 2 meses: ${formatMoney(discountedMonthly)}/mes. Total a pagar por los 2 primeros meses: ${formatMoney(twoMonthsTotal)} en vez de ${formatMoney(regularTwoMonths)}.`;
    }

    if (!plan.discountEligible) {
      return `Precio: $${plan.price}/mes. Este plan no aplica para el descuento promocional.`;
    }

    return `Precio: $${plan.price}/mes. La promoción no está activa en este momento.`;
  }

  function whatsappMessage() {
    const plan = plans[selectedPlanKey];
    if (!plan) return config.texts?.normalMessage || "Deseo adquirir el servicio";

    const state = promoState();
    const planText = `Deseo adquirir el ${plan.name}. ${getPlanPaymentText(plan)}`;

    if (state.active && plan.discountEligible) {
      return `${buildPromoMessage()}. ${planText}`;
    }

    return planText;
  }

  function openWhatsApp() {
    if (!qualified) return;
    const number = String(config.whatsappNumber || "").replace(/\D/g, "");
    const text = encodeURIComponent(whatsappMessage());
    window.open(`https://wa.me/${number}?text=${text}`, "_blank", "noopener");
  }

  function updateSelectedPlanUI() {
    const whatsappBtn = document.getElementById("whatsappBtn");
    const selectedPlanName = document.getElementById("selectedPlanName");
    const selectedPlanPrice = document.getElementById("selectedPlanPrice");

    document.querySelectorAll(".plan-option").forEach(option => {
      option.classList.toggle("selected", option.dataset.plan === selectedPlanKey);
    });

    const plan = plans[selectedPlanKey];

    if (!plan) {
      whatsappBtn.disabled = true;
      selectedPlanName.textContent = "Aún no has seleccionado un plan";
      selectedPlanPrice.textContent = "Selecciona una opción para continuar por WhatsApp.";
      return;
    }

    whatsappBtn.disabled = false;
    selectedPlanName.textContent = plan.name;
    selectedPlanPrice.textContent = getPlanPaymentText(plan);
  }

  document.querySelectorAll(".plan-option").forEach(option => {
    option.addEventListener("click", () => {
      selectedPlanKey = option.dataset.plan;
      updateSelectedPlanUI();
    });
  });

  document.querySelectorAll(".next-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      qualified = true;
      showStep(Number(btn.dataset.next));
    });
  });

  document.querySelectorAll(".reject-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      qualified = false;
      showReject(btn.dataset.reason);
    });
  });

  document.getElementById("whatsappBtn").addEventListener("click", openWhatsApp);
  document.getElementById("restartBtn").addEventListener("click", () => {
    qualified = false;
    selectedPlanKey = null;
    updateSelectedPlanUI();
    showStep(1);
  });
  document.getElementById("retryBtn").addEventListener("click", () => {
    qualified = false;
    selectedPlanKey = null;
    updateSelectedPlanUI();
    showStep(1);
  });

  updateOfferUI();
  updateSelectedPlanUI();
  showStep(1, false);
  window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  setInterval(updateOfferUI, 1000);
})();
