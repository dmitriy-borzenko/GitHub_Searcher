
import React from 'react'
import './RepoInfo.css';

type Repo = {
  name: string;
  forks: number;
  watchers: number;
  html_url: string
}

export const RepoInfo: React.FC<Repo> = ({ name, forks, watchers, html_url }) => {
  return (
    <div className="container_main">
      <a href={html_url}>{name}</a>
      <div className="divider"></div>
      <div className="repo_item"><p>Forks {forks}</p><p>Stars {watchers}</p></div>
    </div>
  )
}
