/**
 *
 * Making a GET request to "https://jsonplaceholder.typicode.com/posts/<postId>"
 * will return the details of a random post
 *
 * On load, fetch the post with post id 1 and display
 * the post title and body
 *
 * When the user clicks "Fetch new post", fetch
 * the next post (sequentially) and display it
 * below the existing list of posts
 *
 * Note: The range of values for postId is
 * 1-100 (inclusive). Disable the button when
 * postId is 100.
*/

// import React, { useState, useEffect } from 'react';

// function App() {
//   const [postId, setPostId] = useState(1);
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     fetchPost(postId);
//   }, [postId]);

//   const fetchPost = async (postId) => {
//     try {
//       const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
//       const postData = await response.json();
//       setPosts(prevPosts => [...prevPosts, postData]);
//     } catch (error) {
//       console.error('Error fetching post:', error);
//     }
//   };

//   const handleFetchNewPost = () => {
//     if (postId < 100) {
//       setPostId(postId + 1);
//     }
//   };

//   return (
//     <div className="App">
//       <button onClick={handleFetchNewPost} disabled={postId === 100}>
//         Fetch New Post
//       </button>
//       {posts.map((post, index) => (
//         <div key={index}>
//           <h2>{post.title}</h2>
//           <p>{post.body}</p>
//         </div>
//       )).reverse()}
//     </div>
//   );
// }

// export default App;


// import React, { useState, useEffect } from 'react';

// function App() {
//   const [posts, setPosts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [currentPostIndex, setCurrentPostIndex] = useState(0);

//   useEffect(() => {
//     const fetchAllPosts = async () => {
//       try {
//         const responses = await Promise.all(
//           Array.from({ length: 100 }, (_, index) =>
//             fetch(`https://jsonplaceholder.typicode.com/posts/${index + 1}`).then(response =>
//               response.json()
//             )
//           )
//         );

//         const fetchedPosts = responses.map((postData, index) => ({
//           id: index + 1,
//           title: postData.title,
//           body: postData.body
//         }));

//         setPosts(fetchedPosts);
//       } catch (error) {
//         console.error('Error fetching posts:', error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchAllPosts();
//   }, []);

//   const handleFetchNewPost = () => {
//     if (currentPostIndex < posts.length - 1) {
//       setCurrentPostIndex(currentPostIndex + 1);
//     } else {
//       // If there are no more posts in the local array, notify the user
//       alert('No more posts available.');
//     }
//   };

//   return (
//     <div className="App">
//       <button onClick={handleFetchNewPost} disabled={isLoading || currentPostIndex === posts.length - 1}>
//         Fetch New Post
//       </button>
//       {isLoading ? (
//         <p>Loading...</p>
//       ) : (
//         <div>
//           {posts.slice(0, currentPostIndex + 1).map(post => (
//             <div key={post.id}>
//               <h2>{post.title}</h2>
//               <p>{post.body}</p>
//             </div>
//           )).reverse()}
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
import React, { useState, useEffect } from 'react';

function App() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPostIndex, setCurrentPostIndex] = useState(0);
  const initialPostCount = 10; 
  useEffect(() => {
    const fetchInitialPosts = async () => {
      try {
        const responses = await Promise.all(
          Array.from({ length: initialPostCount }, (_, index) =>
            fetch(`https://jsonplaceholder.typicode.com/posts/${index + 1}`).then(response =>
              response.json()
            )
          )
        );

        const fetchedPosts = responses.map((postData, index) => ({
          id: index + 1,
          title: postData.title,
          body: postData.body
        }));

        setPosts(fetchedPosts);
        setIsLoading(false);

        // Start fetching remaining posts in the background
        fetchRemainingPosts();
      } catch (error) {
        console.error('Error fetching initial posts:', error);
        setIsLoading(false);
      }
    };

    fetchInitialPosts();
  }, []);

  const fetchRemainingPosts = async () => {
    try {
      const responses = await Promise.all(
        Array.from({ length: 90 }, (_, index) =>
          fetch(`https://jsonplaceholder.typicode.com/posts/${index + 11}`).then(response =>
            response.json()
          )
        )
      );

      const remainingPosts = responses.map((postData, index) => ({
        id: index + initialPostCount + 1,
        title: postData.title,
        body: postData.body
      }));

      setPosts(prevPosts => [...prevPosts, ...remainingPosts]);
    } catch (error) {
      console.error('Error fetching remaining posts:', error);
    }
  };

  const handleFetchNewPost = () => {
    if (currentPostIndex < posts.length - 1) {
      setCurrentPostIndex(currentPostIndex + 1);
    }
  };

  return (
    <div className="App">
      <button onClick={handleFetchNewPost} disabled={isLoading || currentPostIndex === posts.length - 1}>
        Fetch New Post
      </button>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {posts.slice(0, currentPostIndex + 1).map(post => (
            <div key={post.id}>
              <h2>{post.title}</h2>
              <p>{post.body}</p>
            </div>
          )).reverse()}
        </div>
      )}
    </div>
  );
}

export default App;

