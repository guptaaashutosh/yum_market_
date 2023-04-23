import React from 'react';
// import logo from '../../components/assets/images/logo.svg';
import './Header.css';
import { Link } from 'react-router-dom';
import LocalMallIcon from '@mui/icons-material/LocalMall';
// import SearchIcon from '@mui/icons-material/Search';


const Search = ({ CartItem }) => {
  // fixed Header
  window.addEventListener('scroll', function () {
    const search = document.querySelector('.search');
    search.classList.toggle('active', window.scrollY > 100);
  });

   window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" })

  return (
    <>
      <section className='search'>
        <div className='container c_flex'>
          <div className='logo width '>
            <img
              src='https://raw.githubusercontent.com/sunil9813/Bonik-Ecommerice-Website-in-React/151196d5147480a78b74f53f74da45527015358a/src/components/assets/images/logo.svg'
              alt=''
            />
          </div>

          <div className='search-box f_flex'>
            <i className='fa fa-search'></i>
            <input type='text' placeholder='Search and hit enter...' />
            <span>All Category</span>
          </div>

          <div className='icon f_flex width'>
            <i className='fa fa-user icon-circle'></i>
            <div className='cart'>
              <Link to='/cart'>
                <LocalMallIcon/>
                {/* <span>{CartItem.length === 0 ? '' : CartItem.length}</span> */}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Search;



