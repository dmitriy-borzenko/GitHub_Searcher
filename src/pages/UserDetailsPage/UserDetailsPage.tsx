import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import { RepoInfo } from '../../components/RepoInfo/RepoInfo';
import { Search } from '../../components/Search/Search';


import { useFetch } from '../../hooks/useFetch';
import './UserDetailsPage.css';

type LoginType = {
  login: string;
}

export const UserDatailsPage: React.FC = () => {
  const [searchStr, setSearchStr] = React.useState<string>('');
  const { login }: LoginType = useParams();
  const { data: user }: any = useFetch(`https://api.github.com/users/${login}`, null, []);
  const { data: repos }: any = useFetch(`https://api.github.com/users/${login}/repos`, [], []);
  const [filteredRepo, setFilteredRepo] = useState<any[] | undefined>([])

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => { setSearchStr(e.currentTarget.value) }
  const joinDate = new Date(user?.created_at).getFullYear().toString();

  useEffect(() => {

    const savedLogin = localStorage.getItem('login') || '';
    const savedRepo = localStorage.getItem('searchRepo') || '';
    setSearchStr(savedRepo)
    if (login !== savedLogin) setSearchStr('')
    localStorage.setItem('login', login);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    localStorage.setItem('searchRepo', searchStr);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchStr])

  useEffect(() => {
    setFilteredRepo(
      repos?.filter((repo: any) => {
        return repo.name.toLowerCase().includes(searchStr.toLocaleLowerCase());
      })
    );
  }, [searchStr, repos])

  return (
    <div className="container">
      <div className="container_user">
        <img className="img" src={user?.avatar_url} alt="" />
        <div className="user_details ">
          <p><span className="bold">Username:</span> &nbsp;{user?.login} </p>
          <p><span className="bold">Email:</span> &nbsp;{user?.email ? user.email : "Unknown"} </p>
          <p><span className="bold">Location:</span>&nbsp; {user?.location ? user.location : "Unknown"} </p>
          <p><span className="bold">Join Date:</span> &nbsp;{joinDate} </p>
          <p><span className="bold">Followers:</span> &nbsp; {user?.followers}</p>
          <p><span className="bold">Following: </span> &nbsp;{user?.following}</p>
        </div>
      </div>
      <p className="bio"><span className="bold">Bio:</span> {user?.bio ? user.bio : "Unknown"}</p>
      <Search value={searchStr} placeholder="Search user's repositories ..." changeHandler={changeHandler} />
      {!filteredRepo?.length && <p>No items</p>}
      {filteredRepo?.map(repo => <RepoInfo key={repo?.id} {...repo} />
      )}
    </div>
  )
}

