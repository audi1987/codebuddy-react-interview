import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Posts = () => {
  const history = useHistory();
  const [posts, setPosts] = useState([]);

  const getPostData = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/posts`)
      .then(response => {
        console.log('response', response);
        if (response.status === 200) {
          setPosts(response.data.data.posts);
        }
      })
      .catch(error => {
        console.log('Some error has occured while posting form data ', error);
      });
  };

  useEffect(() => {
    getPostData();
  }, []);

  const navigateToAddPost = () => {
    history.push('/form');
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-link"
        onClick={() => {
          navigateToAddPost();
        }}
      >
        Add post
      </button>

      <table className="table">
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Writeup</th>
            <th>Image</th>
            <th>Avatar</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(item => (
            <tr>
              <td>{item.id}</td>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.writeup}</td>
              <td>
                <img src={item.image} alt="" />
              </td>
              <td>
                <img src={item.avatar} alt="" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Posts;
