import React, { ChangeEvent, FormEvent, useState } from 'react';
import classes from './style/SearchLine.module.css';
import { Button } from '../../UI_Component';
import { SearchIcon } from '../../UI_Component/Icons';
import { useAppDispatch } from '../../store/reduxHooks';
import { GET_GOODS_BY_KEYWORD } from '../../store/slice';
import { useNavigate } from 'react-router-dom';

const SearchLine = () => {
  const [value, setValue] = useState("");
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // const form = event.currentTarget as HTMLFormElement;
    // const formData = new FormData(form);
    // const valueInput = formData.get('searchLine');
    // form.reset();
    // formData.delete('inputName');
    // formData.set('inputName', '');
    dispatch(GET_GOODS_BY_KEYWORD(value))
    setValue("")
    navigate(`products/?keyWord=${value}`)
  }
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input className={classes.input} type="search" onChange={onChange} value={value} name="searchLine">
      </input>
      <Button
        children={<SearchIcon />}
        type="submit"
      />
    </form>
  )
}
export default SearchLine
