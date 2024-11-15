import Candidate from "../interfaces/Candidate.interface";
import { useEffect, useState } from 'react';
import { HiMinusCircle } from "react-icons/hi2";

const SavedCandidates = () => {
  const [ savedCand, setSavedCand ] = useState<Candidate[]>([]);

  useEffect(() => {
    const savedCand = JSON.parse(localStorage.getItem('savedCand') || '[]');
    setSavedCand(savedCand);
  }, []);

  const removeCand = (login: string) => {
    const newCandList = savedCand.filter((cand: Candidate) => cand.login !== login);
    localStorage.setItem('savedCand', JSON.stringify(newCandList));
    setSavedCand(newCandList);
  }

  if (savedCand.length === 0) {
    return (
      <h1>No Candidates Saved</h1>
    )
  } else {
    return (
      <>
        <h1>Potential Candidates</h1>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Username</th>
              <th>Email</th>
              <th>Location</th>
              <th>Company</th>
              <th>Bio</th>
              <th>Reject</th>
            </tr>
          </thead>
          <tbody>
            {savedCand.map((cand: Candidate, index: number) =>{
              return (
                <tr key={index}>
                  <td><img style={{height: '60px', width: '60px', borderRadius: '12px'}} src={`${cand.img}`} alt={`${cand.login}`} /></td>
                  <td>{cand.login}</td>
                  <td><a href={`mailto:${cand.email}`}>{cand.email}</a></td>
                  <td>{cand.location}</td>
                  <td>{cand.company}</td>
                  <td>{cand.bio}</td>
                  <td><HiMinusCircle onClick={() => removeCand(cand.login)} fill="red" size={50}/></td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </>
    );
  }

};

export default SavedCandidates;
