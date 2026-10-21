# Um Amor Que Continua Sendo Escrito

> *“Enquanto houver amanhã, haverá mais uma página para nós.”*

Um espaço digital romântico, atemporal e profundamente literário, projetado como um livro de memórias vivo que crescerá ao longo dos anos com poemas, cartas, reflexões, fotografias e música.

---

## 1. Visão Geral e Filosofia do Projeto

Esta aplicação foi concebida para ser uma declaração de amor contínua. Toda a arquitetura foi desenhada com foco em elegância editorial, tipografia clássica, sensibilidade e facilidade absoluta de manutenção ao longo de décadas:

- **100% Estático e Seguro**: Sem necessidade de banco de dados, servidores complexos, Firebase ou APIs de terceiros.
- **Descoberta Automática de Mídias**: Basta colocar fotos e músicas nas suas respectivas pastas para que sejam descobertas na compilação.
- **Tipografia Literária**: Fontes clássicas (*Cormorant Garamond*, *Lora* e *Plus Jakarta Sans*) e paleta floral pastel suave (*#F4DDE4*, *#FFF9F4*, *#A98473*, *#66524B*).
- **Trilha Sonora Persistente**: A música continua tocando suavemente enquanto você navega entre os capítulos do site.

---

## 2. Instalação e Execução Local

### Pré-requisitos
- Node.js (versão 18 ou superior)
- Gerenciador de pacotes `npm`

### Comandos principais

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Iniciar o ambiente de desenvolvimento:**
   ```bash
   npm run dev
   ```
   Acesse no navegador: `http://localhost:3000`

3. **Gerar a versão de produção (compilação estática):**
   ```bash
   npm run build
   ```
   Os arquivos compilados prontos para publicação estarão na pasta `dist/`.

4. **Visualizar a versão compilada localmente:**
   ```bash
   npm run preview
   ```

---

## 3. Como Adicionar e Gerenciar Conteúdo

### 3.1. Poemas — *“Nunca cansarei de te dizer”*

Os poemas ficam armazenados no arquivo:
```
src/data/Poemas.json
```

#### Estrutura de um Poema
```json
{
  "id": "poema-013",
  "titulo": "Onde o tempo não tem pressa",
  "data": "2026-11-05",
  "mensagemExibicao": "Alguns instantes merecem durar uma eternidade.",
  "corpo": "Há um lugar seguro no teu olhar,\nonde toda tempestade vira mansidão.\nE quando tua mão vem me encontrar,\né primavera em meu coração."
}
```

#### Regras e Dicas:
- **`id`**: Identificador único (ex: `"poema-013"`).
- **`titulo`**: Nome do poema.
- **`data`**: Data no formato ISO `YYYY-MM-DD` (ex: `2026-11-05`).
- **`mensagemExibicao`**: Pequena frase que aparece na capa do cartão.
- **`corpo`**: O texto completo do poema. Use `\n` para quebra de verso e `\n\n` para separar estrofes.
- **Ordenação Automática**: Os poemas são organizados automaticamente do mais recente para o mais antigo, com paginação de 9 itens por página.

---

### 3.2. Textos e Reflexões — *“Nunca deixarei de pensar”*

Os textos, cartas e pensamentos ficam armazenados no arquivo:
```
src/data/Textos.json
```

#### Estrutura de um Texto
```json
{
  "id": "texto-013",
  "titulo": "Sobre a certeza dos nossos passos",
  "subtitulo": "Reflexões sobre o caminho que construímos juntos",
  "data": "2026-11-10",
  "mensagemExibicao": "A certeza do amor se confirma nos pequenos detalhes diários.",
  "corpo": "Existem dias em que a vida nos lembra o valor da cumplicidade.\n\nEstar com você é saber que, mesmo diante de qualquer incerteza, existe um porto seguro onde posso ser inteiramente eu mesmo."
}
```

#### Regras e Dicas:
- **`subtitulo`**: Um subtítulo que acompanha o título tanto no cartão quanto na leitura expandida.
- **Parágrafos múltiplos**: Separe cada parágrafo com `\n\n` no campo `corpo`. A aplicação formatará automaticamente cada parágrafo com tipografia de livro e espaçamento adequado.
- **Paginação**: 9 textos por página, ordenados cronologicamente.

---

### 3.3. Fotografias — *“Nunca deixaremos de viver”*

As fotografias físicas ficam na pasta:
```
src/assets/Nossas fotos/
```

E os metadados (datas e legendas) ficam no arquivo:
```
src/data/Fotos.json
```

#### Como adicionar uma nova foto:
1. Coloque a foto dentro de `src/assets/Nossas fotos/` (ex: `viagem-inverno.jpg`).
2. Abra `src/data/Fotos.json` e adicione o registro correspondente:
   ```json
   {
     "arquivo": "viagem-inverno.jpg",
     "data": "2026-12-20",
     "mensagemExibicao": "A tarde fria em que nosso abraço aqueceu o mundo."
   }
   ```
3. **Formatos suportados**: `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`, `.gif`.
4. **Proporção visual uniforme**: Todas as fotos na galeria são exibidas em um formato uniforme de `4:5` (`object-fit: cover`), garantindo um visual limpo e harmônico. Ao clicar na foto, o **Lightbox** abre a imagem em sua proporção original completa, sem cortes.
5. **Fotos sem cadastro em JSON**: Se você colocar uma imagem na pasta e não cadastrá-la no JSON, ela será exibida normalmente com uma mensagem poética padrão.

---

### 3.4. Trilha Sonora — Músicas

As músicas ficam na pasta:
```
src/assets/Músicas/
```

#### Como funciona a trilha sonora:
- **Descoberta Automática**: Qualquer música colocada nessa pasta é incluída automaticamente na playlist durante a compilação do projeto.
- **Formatos suportados**: `.mp3`, `.wav`, `.ogg`, `.m4a`, `.aac`.
- **Reprodução em Loop**: As faixas tocam em sequência e voltam automaticamente à primeira faixa ao terminar a playlist.
- **Persistência**: Mudar de página não interrompe nem reinicia a música.
- **Player Flutuante e Ajustável**: O botão musical flutuante pode ser arrastado para qualquer canto da tela e sua posição é salva no navegador. Ao clicar nele, você pode pausar, avançar, retroceder e ajustar o volume suavemente.

---

## 4. Atualização e Publicação do Site

Como este site não utiliza bancos de dados nem painéis administrativos externos:
1. Sempre que você adicionar novos poemas, textos, fotos ou músicas, faça as alterações nos arquivos do projeto.
2. Execute o comando de compilação ou publique a nova versão através do Google AI Studio.
3. Seus arquivos locais são a fonte única da verdade.

### Boas práticas de preservação para os próximos anos:
- Mantenha sempre uma cópia de segurança (backup) em um pendrive ou repositório pessoal (como GitHub) de todo o projeto, principalmente dos arquivos JSON e das pastas de fotos e músicas originais.
- Desta forma, este acervo de amor permanecerá intacto e poderá ser reaberto ou atualizado em qualquer época da sua vida.
