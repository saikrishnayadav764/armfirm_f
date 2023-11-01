import React, { useState, useEffect } from 'react'
import Popup from './Popup';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query } from 'firebase/firestore/lite';
import { doc, onSnapshot } from "firebase/firestore";

const images = importAll(require.context('../assets', false, /\.(png|jpe?g|svg)$/));

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}



function Righbar({setLoading, isLoading}) {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [count, setCount] = useState(0)
  const [dcs, setDcs] = useState([])
  

  const firebaseConfig = {
    apiKey: "AIzaSyBp3azDdwf-idhrAVqejd14G77IPT5ZNNo",
    authDomain: "audios-e6cef.firebaseapp.com",
    projectId: "audios-e6cef",
    storageBucket: "audios-e6cef.appspot.com",
    messagingSenderId: "1045088670392",
    appId: "1:1045088670392:web:c94977ff081c4e5a39da4d",
    measurementId: "G-S8M790QY7N"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  async function getFiles(db) {
    const docsCol = collection(db, 'docs');
    const docsSnapshot = await getDocs(docsCol);
    const docsList = docsSnapshot.docs.map(doc => doc.data());
    return docsList;
  }

  useEffect(() => {
    async function fetchData() {
      const docsList = await getFiles(db);
      console.log(docsList)
      setDcs(docsList)
      setCount(docsList.length)
    }

    fetchData();
    

  }, [isPopupOpen, isLoading]);



  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };


  return (

   <div class="frame-1000007569-Ma1">
    <div class="header-6Gh">
      <div class="container-qk5">
        <div class="content-nvD">
          <div class="left-content-Lwj">
            <div class="input-master-box-J7s">
              <div class="label-frame-473">
                <div class="input-frame-12H">
                  <div class="left-content-xCR">
                    <img class="icon-left-hA1" src={images["icon-left-vPb.png"]}/>
                    <div class="text-cursor-S7b">
                      <div class="rectangle-P2q">
                      </div>
                      <div class="placeholder-7Dj">Search here...</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="links-wiZ">
            <div class="auto-group-vntd-Vzy">
              <img class="featured-icon-3Wh" src={images["featured-icon-nBK.png"]}/>
              <div class="frame-1000007450-NYy">
                <div class="image-Kj7">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="auto-group-cpzh-bRj">
      <div class="frame-1000007615-WHo">
        <div class="frame-1000007451-q5B">
          <p class="welcome-shakirat-P6h">Welcome Shakirat</p>
          <p class="upload-your-audio-and-video-to-covert-to-text-Hhs">Upload your audio and Video to covert to text</p>
        </div>
        <button className="button-primary-185" onClick={openPopup}>
        Transcribe File
      </button>

      {isPopupOpen && (
        <div className="popup-background">
          <Popup setLoading={setLoading} onClose={closePopup} />
        </div>
      )}
      </div>
      <div class="frame-1000007598-H5b">
        <div class="metrics-23B">
          <img class="featured-icon-jiH" src={images["featured-icon-NrD.png"]}/>
          <div class="heading-and-number-GiD">
            <p class="number-dYm">{count}</p>
            <p class="heading-ktH">Uploaded Files</p>
          </div>
        </div>
        <div class="metrics-fVT">
          <img class="featured-icon-PRT" src={images["featured-icon-n97.png"]}/>
          <div class="heading-and-number-iyX">
            <p class="number-gvM">{count}</p>
            <p class="heading-cZ7">Transcribed</p>
          </div>
        </div>
        <div class="metrics-81f">
          <img class="featured-icon-fGV" src={images["featured-icon-YQ9.png"]}/>
          <div class="heading-and-number-zpZ">
            <p class="number-ZMs">{count}</p>
            <p class="heading-Hof">Saved</p>
          </div>
        </div>
      </div>
      <div class="frame-1000007616-QNV">
        <p class="recent-files-ity">Recent Files</p>
        <div class="divider-4T3">
        </div>
        <div class="frame-96-1dB">
           <table id="Apu">
            	<thead>
            	<tr>
            		<th>Name</th>
            		<th>Type</th>
            		<th>Duration</th>
            		<th>Data Created</th>
            		<th>Last Updated</th>
            		<th>Action</th>
            	</tr>
            	</thead>
            	<tbody>
                {
                  dcs.map((obj, ind)=>(<tr key={ind}>
                    <td>{obj.fileName}</td>
                    <td>{obj.fileType}</td>
                    <td>{obj.duration}</td>
                    <td>{obj.dateCreated}</td>
                    <td>{obj.lastUpdated}</td>
                    <td><a className="elinks" href={obj.downloadURL}>download</a></td>
                  </tr>))
                }

            	</tbody>
            </table>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Righbar