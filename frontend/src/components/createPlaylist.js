import React from 'react';

class CreatePlaylist extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      playlistName: '',
      noOfTracks: '',
      genre: '',
      imagePreview: null
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.setState({ imagePreview: reader.result });
      };
      reader.readAsDataURL(file);
    }
  }

  handleCreate = () => {
    console.log('Creating playlist:', this.state);
    this.setState({
      playlistName: '',
      noOfTracks: '',
      genre: '',
      imagePreview: null
    });
  }

  render() {
    return (
      <div style={styles.container}>
        <h2 style={styles.title}>Create playlist</h2>
        
        <div style={styles.imageContainer}>
          <input
            type="file"
            accept="image/*"
            onChange={this.handleImageChange}
            style={styles.fileInput}
            id="playlist-cover"
          />
          <label htmlFor="playlist-cover" style={styles.imageLabel}>
            {this.state.imagePreview ? (
              <img
                src={this.state.imagePreview}
                alt="Playlist cover preview"
                style={styles.image}
              />
            ) : (
              <div style={styles.placeholderText}>Click to upload image</div>
            )}
          </label>
        </div>
        
        <input
          type="text"
          name="playlistName"
          placeholder="Playlist name"
          value={this.state.playlistName}
          onChange={this.handleInputChange}
          style={styles.input}
        />
        <input
          type="number"
          name="noOfTracks"
          placeholder="no of tracks"
          value={this.state.noOfTracks}
          onChange={this.handleInputChange}
          style={styles.input}
        />
        <input
          type="text"
          name="genre"
          placeholder="genre"
          value={this.state.genre}
          onChange={this.handleInputChange}
          style={styles.input}
        />
        
        <button
          onClick={this.handleCreate}
          style={styles.button}
        >
          Create
        </button>
      </div>
    );
  }
}

const styles = {
  container: {
    backgroundColor: '#D3D3D3',
    padding: '20px',
    borderRadius: '20px',
    width: '300px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
  },
  imageContainer: {
    width: '100%',
    marginBottom: '20px',
  },
  fileInput: {
    display: 'none',
  },
  imageLabel: {
    display: 'block',
    width: '100%',
    height: '150px',
    backgroundColor: '#000',
    borderRadius: '10px',
    cursor: 'pointer',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  placeholderText: {
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  input: {
    width: '100%',
    padding: '10px 0',
    marginBottom: '10px',
    border: 'none',
    borderBottom: '2px solid #999',
    backgroundColor: 'transparent',
    fontSize: '16px',
    outline: 'none',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#FF69B4',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '20px',
  },
};

export default CreatePlaylist;