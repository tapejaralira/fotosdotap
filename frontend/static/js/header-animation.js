/* ========================================================================== 
   HEADER ANIMATION - ADAPTADO PARA TRABALHAR COM CSS INLINE
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".header");
  
  if (!header) {
    console.warn('⚠️ Header não encontrado para animações');
    return;
  }

  console.log('🎬 Inicializando animações do header...');

  // Garantir que header comece invisível (CSS inline já define isso)
  // Mas garantimos aqui também para compatibilidade
  header.style.opacity = '0';
  
  // Adicionar classe de entrada após breve delay
  setTimeout(() => {
    header.classList.add("header--entrando");
    console.log('🎭 Header: Classe "entrando" adicionada');
  }, 100);

  // Mostrar header com animação após CSS carregar
  setTimeout(() => {
    header.classList.remove("header--entrando");
    header.classList.add("header--show");
    header.style.opacity = '1';
    console.log('✨ Header: Animação de entrada executada');
  }, 300);

});