import React, { useState, CSSProperties } from 'react';

interface UserData {
  name: string;
  avatar_url: string;
  followers: number;
  following: number;
  public_repos: number;
}

interface Repository {
  id: number;
  name: string;
}

const UserProfile = () => {
  const [showDiv, setShowDiv] = useState(false);
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [repositories, setRepositories] = useState<Repository[]>([]);

  const handleClick = async () => {
    try {
      const userResponse = await fetch(`https://api.github.com/users/${username}`);
      const userData = await userResponse.json();
      setUserData(userData);

      const repoResponse = await fetch(`https://api.github.com/users/${username}/repos`);
      const repoData = await repoResponse.json();
      setRepositories(repoData);

      setShowDiv(true);
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUserData(null);
      setRepositories([]);
    }
  };

  const styles: { [key: string]: CSSProperties } = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '50vh',
      backgroundColor: '#151721', // Background color
      color: 'white',
    },
    innerContainer: {
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#151721', // Background color
      borderRadius: '8px',
      color: 'white',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Box shadow for inner container
    },
    profile: {
      marginTop: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      width: '200px',
      height: '200px',
      borderRadius: '50%',
    },
    stats: {
      display: 'flex',
      justifyContent: 'space-between',
      width: '80%',
      marginTop: '20px',
    },
    statItem: {
      padding: '10px',
      backgroundColor: '#252c3b',
      color: 'white',
      borderRadius: '5px',
      flex: '1', // Equal width for each stat item
      margin: '0 10px', // Margin between stat items
    },
    repoList: {
      marginTop: '20px',
      textAlign: 'left',
    },
    repoItem: {
      padding: '10px',
      margin: '5px',
      backgroundColor: '#252c3b',
      color: 'white',
      borderRadius: '5px',
      minWidth: '150px',
      flex: '1 0 30%', // Flex properties for 3 columns layout
    },
    inputContainer: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '20px', // Space between search bar and button
    },
    input: {
      marginRight: '10px', // Space between input and button
      padding: '8px',
      borderRadius: '5px',
      border: '1px solid #ccc',
      fontSize: '16px',
      width: '200px',
    },
    button: {
      padding: '8px 16px',
      borderRadius: '5px',
      backgroundColor: '#4CAF50',
      color: 'white',
      fontSize: '16px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.container}>
      {!showDiv && (
        <div style={styles.innerContainer}>
          <div style={styles.inputContainer}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter GitHub username"
              style={styles.input}
            />
            <button onClick={handleClick} style={styles.button}>
              Get Profile
            </button>
          </div>
        </div>
      )}
      {showDiv && (
        <div style={styles.innerContainer}>
          <div style={styles.inputContainer}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter GitHub username"
              style={styles.input}
            />
            <button onClick={handleClick} style={styles.button}>
              Get Profile
            </button>
          </div>
          {userData && (
            <div className="profile" style={styles.profile}>
              <h2>{userData.name}</h2>
              <img src={userData.avatar_url} alt="User Avatar" style={styles.avatar} />
              <div style={styles.stats}>
                <div style={styles.statItem}>
                  <p>Followers</p>
                  <p>{userData.followers}</p>
                </div>
                <div style={styles.statItem}>
                  <p>Following</p>
                  <p>{userData.following}</p>
                </div>
                <div style={styles.statItem}>
                  <p>Public Repositories</p>
                  <p>{userData.public_repos}</p>
                </div>
              </div>
              {repositories.length > 0 && (
                <div style={styles.repoList}>
                  <h3>Public Repositories:</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                    {repositories.map((repo) => (
                      <div key={repo.id} style={styles.repoItem}>
                        {repo.name}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserProfile;
