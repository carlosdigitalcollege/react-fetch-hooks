import { useEffect, useState } from 'react';
import './App.css';

const apiURL = 'http://universities.hipolabs.com/search?country='

const useUniversities = (selectedCountry) => {
  const [universities, setUniversities] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (selectedCountry) {
      setLoading(true)
      fetch(apiURL + selectedCountry)
        .then((response) => {
          response.json().then((list) => {
            setLoading(false)
            setUniversities(list)
          })
        })
    }
  }, [selectedCountry])


  return [universities, loading]
}


const App = () => {
  const [selectedCountry, setSelectedCountry] = useState('')
  const [universities, loading] = useUniversities(selectedCountry)
  
  return loading ? 'Loading...' : (
    <>
      <h1>
        {selectedCountry 
          ? `Universidades em ${selectedCountry}`
          : 'Escolha um país'
        }
      </h1>
      <select onChange={(event) => {
        setSelectedCountry(event.target.value)
      }}>
        <option selected disabled>Selecione um país</option>
        <option value='Brazil'>Brasil</option>
        <option value='Japan'>Japão</option>
      </select>
      <ul>
        {universities.map(({ name, country, web_pages }) => (
          <li>
            <div>
              <h2>{name}</h2>
              <p>{country}</p>
              {web_pages.map((page) => (
                <a href={page} target="_blank">Página web</a>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default App;
