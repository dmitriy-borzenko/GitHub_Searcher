import React from 'react'
import { NavLink } from 'react-router-dom';
import { useFetch } from '../../hooks/useFetch';
import './UserInfo.css';

type LoginType = {
  login: string;
}

export const UserInfo: React.FC<LoginType> = ({ login }) => {
  const { data: userInfo }: any = useFetch(`https://api.github.com/users/${login}`, {}, []);
  return (
    <div className="container_main">
      <img className="img_avatar" src={userInfo?.avatar_url} alt="" />
      <NavLink to={login}>{login}</NavLink>
      <div className="divider"></div>
      <p className="repo_count">Repositories: <span>{userInfo?.public_repos}</span></p>
    </div>
  )
}
