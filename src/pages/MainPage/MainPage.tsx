import React, { useEffect, useState } from 'react'


import './MainPage.css';
import gitHubLogo from '../../assets/logo.png';
import { Search } from '../../components/Search/Search';
import { UserInfo } from '../../components/UserInfo/UserInfo';

export const MainPage: React.FC = () => {
  const [searchStr, setSearchStr] = useState<string>('');
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`https://api.github.com/search/users?per_page=5&q=${searchStr}+in:login`);
        const json = await res.json();
        setUsers(json.items);
      } catch (error) {
      }
    };
    if (searchStr) fetchData();
  }, [searchStr])

  useEffect(() => {
    const saved = localStorage.getItem('searchUser') || '';
    setSearchStr(saved);
  }, [])

  useEffect(() => {
    localStorage.setItem('searchUser', searchStr);
  }, [searchStr])

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchStr(e.target.value);
  }

  return (
    <div>
      <img className="logo" src={gitHubLogo} alt="" />
      <Search value={searchStr} placeholder="Search user ..." changeHandler={changeHandler} />
      {searchStr && users?.map((user: any) =>
        <UserInfo key={user.id}  {...user} />)}
    </div>
  )
}



