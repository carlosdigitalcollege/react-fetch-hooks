import { useEffect, useState } from 'react';
import './App.css';

const apiURL = 'http://universities.hipolabs.com/search?country='

const App = () => {
  const [selectedCountry, setSelectedCountry] = useState('')
  const [universities, setUniversities] = useState([])

  useEffect(() => {
    if (selectedCountry) {
      fetch(apiURL + selectedCountry)
        .then((response) => {
          response.json().then((list) => {
            setUniversities(list)
          })
        })
    }
  }, [selectedCountry])

  
  return (
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
