import formCss from './Form.module.css';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
export function Form({ onSubmit }) {
  const [search, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get('query') ?? '';
  const handleChange = e => {
    setSearchQuery(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    if (search === '') {
      return setSearchParams({});
    }

    setSearchParams({ query: search });
    onSubmit(searchQuery);
  };
  return (
    <form className={formCss.search} onSubmit={handleSubmit}>
      <input
        className={formCss.input}
        placeholder="Введіть модель телефону"
        name="data"
        value={search}
        onChange={handleChange} />

      <button className={formCss.searchButton} type="submit">
        Пошук
      </button>
    </form>
  );
}
