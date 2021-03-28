import React from 'react'
import './Search.css';

type Props = {
  placeholder: string;
  value: string
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
}
export const Search: React.FC<Props> = ({ placeholder, value, changeHandler }) => {
  return (
    <div className="center">
      <input value={value} type="text" placeholder={placeholder} onChange={changeHandler} />
    </div>
  )
}
