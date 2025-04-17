let currentSlide = 0;
const projetos = document.querySelectorAll(".projeto");

function showSlide(index) {
  projetos.forEach((projeto, i) => {
    projeto.classList.remove("active");
    if (i === index) projeto.classList.add("active");
  });
}

function moveSlide(direction) {
  currentSlide += direction;
  if (currentSlide < 0) currentSlide = projetos.length - 1;
  if (currentSlide >= projetos.length) currentSlide = 0;
  showSlide(currentSlide);
}

showSlide(currentSlide); // exibe o primeiro ao carregar

const form = document.getElementById('formContato');
const status = document.getElementById('mensagemStatus');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(form);
  const dados = Object.fromEntries(formData);

  status.textContent = 'Enviando mensagem...';

  try {
    const resposta = await fetch('https://hopeful-enjoyment-backend.up.railway.app/api/contato', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados),
    });

    const resultado = await resposta.json();

    if (resposta.ok) {
      status.textContent = resultado.mensagem || 'Mensagem enviada.';
      form.reset();
    } else {
      status.textContent = resultado.mensagem || 'Erro ao enviar mensagem.';
    }
  } catch (erro) {
    status.textContent = 'erro ao conectar com o servidor';
    console.error(erro);
  }
});
