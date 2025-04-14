//importo useState
import { useState } from "react"
//importo axios
import axios from "axios";

//salvo in una variabile l'url dell'API fornita
const urlPosts = 'https://67c5b4f3351c081993fb1ab6.mockapi.io/api/posts';

function App() {

  //creo la variabile con cui andrò a lavorare per gestire i vari input
  const [formPost, setFormPost] = useState({
    author: '',
    title: '',
    body: '',
    public: false
  })

  //creo una funzione per gestire il valore del campo di input
  function handleFormPost(event) {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;

    setFormPost(formPost => ({
      ...formPost,
      [event.target.name]: value,
    }))
  }

  //creo una funzione per mandare i dati compilati nel form ed effettuare la chiamata all'API con il metodo POST
  function sendPost(event) {
    event.preventDefault();
    console.log('ho mandato i dati per il nuovo post');

    //effettuo la chiamata in POST e inserisco l'url dell'API seguito dalla variabile che conterrà i dati inseriti nei campi di input
    axios.post(urlPosts, formPost)
      //mostro come risposta i dati che ho mandato tramite il form
      .then(response => {
        console.log("Risposta dall'API", response.data);

        //aggiungo un alert con un messaggio per l'utente per il successo dell'azione
        alert('Complimenti, hai inviato i dati correttamente!');

        //dopo aver mandato i dati, vado a svuotare i campi
        setFormPost({
          author: '',
          title: '',
          body: '',
          public: false
        })
      })
      .catch(error => {
        //se invece qualcosa va storto, entreremo nel catch dove verrà visualizzato l'errore in console
        console.error(error);

        //inserisco un alert che in questo caso mostrerà un messaggio all'utente per informarlo del mancato successo dell'azione
        alert('Mi dispiace, qualcosa è andato storto...')
      })

  }

  return (
    <>
      <form onSubmit={sendPost}>
        <label htmlFor="author-name">Nome autore</label>
        <input type="text"
          id="author-name"
          name='author'
          value={formPost.author}
          onChange={handleFormPost}
          placeholder="Autore del post" />

        <label htmlFor="title-post">Titolo del post</label>
        <input type="text"
          id="title-post"
          name='title'
          value={formPost.title}
          onChange={handleFormPost}
          placeholder="Titolo del post" />

        <label htmlFor="text-content">Contenuto del post</label>
        <input type="text"
          id="text-content"
          name='body'
          value={formPost.body}
          onChange={handleFormPost}
          placeholder="Testo del post" />

        <label htmlFor="public-post">Pubblico:</label>
        <input type="checkbox"
          id="public-post"
          name='public'
          checked={formPost.public}
          onChange={handleFormPost} />

        <button>Crea il post</button>
      </form>
    </>
  )
}

export default App
