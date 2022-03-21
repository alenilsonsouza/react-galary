import './App.css';
import { MainRouters } from './routes/MainRoutes';

const App = () => {
  return (
    <div>
      <header>
        <div className="container">
          <h1>Galera de Fotos</h1>
        </div>
      </header>
      <section>
        <div className="container">
          <MainRouters />
        </div>
      </section>
    </div>
  )
}
export default App;