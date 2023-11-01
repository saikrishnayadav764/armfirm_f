import React from 'react'
const images = importAll(require.context('../assets', false, /\.(png|jpe?g|svg)$/));

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  return images;
}


function Leftbar() {
  return (
    <div class="sidebar-313">
    <div class="top-section-JbB">
      <div class="logo-container-Rvh">abc firm</div>
      <div class="body-section-F93">
        <div class="sidebar-section-yKw">
          <div class="sidebar-menulist-CTb">
            <div class="auto-group-u9qx-w3o">
              <div class="sidebar-menu-item-EYh">
                <div class="left-content-99s">
                  <img class="icon-home-5JR" src={images["icon-home-BLm.png"]}/>
                  <p class="text-mS9">Home</p>
                </div>
              </div>
              <div class="sidebar-menu-item-S2V">
                <div class="left-content-wE9">
                  <img class="icon-folder-GGR" src={images["icon-folder.png"]}/>
                  <p class="text-nVf">All Files</p>
                </div>
              </div>
              <div class="sidebar-menu-item-729">
                <div class="left-content-Dqs">
                  <img class="icon-bookmark-NCy" src={images["icon-bookmark.png"]}/>
                  <p class="text-VHb">Saved</p>
                </div>
              </div>
              <div class="sidebar-menu-item-DjP">
                <div class="left-content-LZ7">
                  <img class="icon-share-gcy" src={images["icon-share.png"]}/>
                  <p class="text-bzq">Integrations</p>
                </div>
              </div>
              <div class="sidebar-menu-item-jr9">
                <div class="left-content-4tR">
                  <img class="icon-bin-12y" src={images["icon-bin.png"]}/>
                  <p class="text-X1K">Trash</p>
                </div>
              </div>
            </div>
            <div class="auto-group-e5n3-ERX">
              <div class="sidebar-menu-item-BrZ">
                <div class="left-content-7ER">
                  <img class="icon-question-circle-rho" src={images["icon-question-circle-w3P.png"]}/>
                  <p class="text-nLZ">Help and Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sidebar-WGZ">
      <img class="icon-rocket-alt-pHF" src={images["icon-rocket-alt-zxq.png"]}/>
      <div class="frame-8-jf7">
        <p class="text-fHs">Upgrade Account</p>
        <p class="text-yZT">Access to Unlimited Transcription</p>
      </div>
      <div class="button-primary-WpH">Upgrade </div>
    </div>
  </div>
  )
}

export default Leftbar