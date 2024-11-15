import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { HiPlusCircle } from "react-icons/hi2";
import { HiMinusCircle } from "react-icons/hi2";
import Candidate from '../interfaces/Candidate.interface';

const CandidateSearch = () => {
  const [candList, setCandList] = useState<Candidate[]>([]);
  const [cand, setCand] = useState<Candidate>({
    img: '',
    login: '',
    email: '',
    location: '',
    company: '',
    bio: '',
  });

  const getCandList = async () => {
    const data = await searchGithub();
    setCandList(data)
  };

  const getCand = async () => {
    const user = candList.pop();
    if (user?.login) {
      const data = await searchGithubUser(user.login);
      if (data.login) {
        setCand({
          img: data.avatar_url,
          login: data.login,
          email: data.email || 'No email provided',
          location: data.location || 'No location provided',
          company: data.company || 'No company provided',
          bio: data.bio || 'No bio provided',
        });
      }
    }
  };

  useEffect(() => {
    getCandList();
     // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  const saveCand = async () => {
    const savedCand = JSON.parse(localStorage.getItem('savedCand') || '[]');
    savedCand.push(cand);
    localStorage.setItem('savedCand', JSON.stringify(savedCand));
    getCand();
  };

  if (!cand.login) {
    return (
      <button onClick={getCand}>Start Search</button>
    )
  } else if (candList.length === 0) {
    return (
      <>
        <h1>No more candidates</h1>
        <h2>Refresh the page for more</h2>
      </>
    )
  } else {
    return (
      <div id='cand-display'>
        <h1>CandidateSearch</h1>
        <section id='cand'>
          <img src={`${cand.img}`} alt={cand.login} style={{height: 'auto', width: '100%', borderRadius: '30px 30px 0 0'}} />
          <article id='info'>
            <h2>{cand.login}</h2>
            <p>Email: <a href={`mailto:${cand.email}`}>{cand.email}</a></p>
            <p>Location: {cand.location}</p>
            <p>Company: {cand.company}</p>
            <p>Bio: {cand.bio}</p>
          </article>
          </section>
          <div id="buttons">
            <HiMinusCircle
            fill='red'
            size={100}
            onClick={getCand} />
            <HiPlusCircle
            fill='green'
            size={100}
            onClick={saveCand} />
          </div>
      </div>
    );
  }
  
};

export default CandidateSearch;
