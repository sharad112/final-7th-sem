import { useState } from 'react';

function Image() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      
      const data = await response.json();
      console.log(data);
      setImageUrl(data.choices[0].data.url);
    } catch (error) {
      console.error(error);
    }
  };
  const setprompt=(e)=>
  {
    setPrompt(e.target.value);
    console.log(prompt);
  }
  return (
    <div className="App">
      <h1>OpenAI Image Generator</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a description"
          value={prompt}
          onChange={setprompt}
        />
        <button type="submit">Generate Image</button>
      </form>
      {imageUrl && <img src={imageUrl} alt="Generated" />}
    </div>
  );
}

export default Image;