//home.js
import {Fragment, useEffect, useState} from 'react'
import ProductCard from '../components/ProductCard'
import { useSearchParams } from 'react-router-dom';

export default function Home() {
    const [products, setProducts] = useState([]);
    const [searchParams, setSearchParams] =  useSearchParams()

    // useEffect(() => {
    //     fetch(process.env.REACT_APP_API_URL+'/products?'+searchParams)
    //     .then(res => res.json())
    //     .then( res => setProducts(res.products))
    // },[searchParams])

    useEffect(() => {
      console.log('API URL:', process.env.REACT_APP_API_URL); // Check the value of the API URL
      fetch(`${process.env.REACT_APP_API_URL}/products?${searchParams}`)
      .then(res => {
          if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
      })
      .then(res => setProducts(res.products))
      .catch(err => console.error('Fetch error:', err)); // Log any fetch errors
  }, [searchParams]);
  

    return <Fragment>
  <h1 id="products_heading">Welcome to Webmaxstore!</h1>

  <section id="products" className="container mt-5">
    <div className="row">
      {products.map(product => <ProductCard product={product} />)}
       
    </div>
  </section>
    </Fragment>
}