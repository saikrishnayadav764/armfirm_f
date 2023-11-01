import React,{useState, useEffect} from 'react'
import './Popup.css'
const images = importAll(require.context('../assets', false, /\.(png|jpe?g|svg)$/));


function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}

function Popup({ onClose,setLoading }) {

// Define the state for the selected option
  const [selectedOption, setSelectedOption] = useState('Us English');
  const [selectedFile, setSelectedFile] = useState(null);
  const [speakerIdentification, setSpeakerIdentification] = useState(false);
  
  

  // Define a function to handle changes to the dropdown
  const handleDropdownChange = (event) => {
    setSelectedOption(event.target.value);
  };


  const allowedFormats = ['.mp3', '.mp4', '.wav', '.caf', '.aiff', '.avi', '.rmvb', '.flv', '.m4a', '.mov', '.wmv', '.wma'];
  const languages = ['Us English', 'Spanish', 'French', 'German', 'Italian', 'Portugese', 'Dutch']

  const handleFileDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    
    if (file) {
      const fileExtension = `.${file.name.split('.').pop()}`.toLowerCase();
      
      if (allowedFormats.includes(fileExtension)) {
        setSelectedFile(file);
      } else {
        alert('Invalid file format. Please select a valid format.');
      }
    }
  };
  


  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleFileUpload = () => {
    // You can handle the file upload here using 'selectedFile'
    console.log('Selected file:', selectedFile);
  };

  const preventDefault = (event) => {
    event.preventDefault();
  };

  // const handleForm = (e)=>{
  //   e.preventDefault()
  // }

  const handleForm = async (e) => {
    e.preventDefault();
  
    if (!selectedFile) {
      alert('Please select a file before submitting.');
      return;
    }

    setLoading(true);
    onClose()

  
    const formData = new FormData();
    formData.append('audioFile', selectedFile);
    formData.append('transcriptionLanguage', selectedOption);
    formData.append('enableSpeakerIdentification', speakerIdentification);
  
    try {
      const response = await fetch('http://localhost:3000/transcribe', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Transcription data:', data);
        setLoading(false)
        // Handle the transcription data as needed
      } else {
        console.error('Failed to transcribe the file.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };
  

  return (
    
    <div class="frame-1000007625-bhs" >

    <form class="frame-1000007623-Wpq">
      <div class="frame-1000007618-FXX">
        <div class="transcribe-file-Bvy">Transcribe File</div>
        <img class="icon-multiply-huK" src={images["icon-multiply.png"]} onClick={onClose}/>
      </div>
      <div class="frame-1000007622-EeM">
        <div class="frame-1000007620-muB">
          <div class="transcription-language-LBb">Transcription Language</div>
          <div class="frame-1000007619-3rh">
               <select class="default-ykM" value={selectedOption} onChange={handleDropdownChange}>
                 {languages.map((ind)=><option key={ind} value={ind}>{ind}</option>)}
               </select>
          </div>
        </div>

        <div className="file-upload-pFB" onDrop={handleFileDrop} onDragOver={preventDefault}>
          <label className="content-92Z" htmlFor="file-upload">

              <img class="file-upload-i-upload-u1j" src={images["file-upload-i-upload.png"]} alt="Upload" />
            
            <input
              type="file"
              id="file-upload"
              accept=".mp3, .mp4, .wav, .caf, .aiff, .avi, .rmvb, .flv, .m4a, .mov, .wmv, .wma"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
            />
            <div className="text-and-supporting-text-2MF">
              <div className="action-Nvu">
                <div className="button-texts-WnD">Click to upload</div>
                <p className="text-Pb7">or drag and drop</p>
              </div>
              <p className="supporting-text-XSR">
                The maximum file size is 1GB for audio and 10GB for videos.
                <br />
                Supported formats: mp3, mp4, wav, caf, aiff, avi, rmvb, flv, m4a, mov, wmv, wma
              </p>
            </div>
            {selectedFile && (
              <div className="selected-file">
                <span className="selected-file-label">Selected File:</span>
                   {selectedFile.name}
                </div>
          )}
          </label>
        </div>

        <div class="frame-1000007621-CoT">
          <div class="import-from-link-ZP7">Import from Link</div>
          <input disabled class="frame-1000007619-seh" placeholder='Paste a Drobpox, Google Drive or Youtube URL here'/>
        </div>
        <div class="form-control-component-9cD">
          <input type="checkbox" class="outer-rectangle-HiR" checked={speakerIdentification} onChange={(e) => setSpeakerIdentification(e.target.checked)}/>
          <p class="control-button-heading-Boo">Speaker identification</p>
        </div>
      </div>
      <button onClick={handleForm} class="button-primary-vFb">Transcribe File</button>
    
    </form>
</div>

  )
}

export default Popup