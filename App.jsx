import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  var installer = null
  const [isVisible, changeVisibility] = useState(true)

  window.addEventListener('beforeinstallprompt', (e) => {
    changeVisibility(true)
    installer = e;
  });

  async function GetPWA(){
    if(installer!=null){
      installer.prompt();
      const { outcome } = await installer.userChoice;
      if (outcome === 'accepted') {
        installer = null;
      }
    }
  }

  function ClickNotif(){
    if(!('Notification' in window)){
      alert("Votre navigteur ne prend pas en compte les notifs push...")
      return;
    } 
    Notification.requestPermission().then((res)=>{
      if(res=='granted') {
        try{
            new Notification("Come ceci !")
        }
        catch{
          try{
            navigator.serviceWorker.getRegistration()
              .then((reg) => reg.showNotification("Come ceci !"))
              .catch((err) => alert("Votre navigteur ne prend pas en compte les notifs push..."));
          }
          catch{
              alert("Votre navigteur ne prend pas en compte les notifs push...")
          }
        }
      }
    })
  }

  const [pos,setPos] = useState("(?,?)")
  function GetPosition(){
    navigator.permissions.query({ name: 'geolocation' }).then(
      c=>{
        console.log(c.state)
        if(c.state==="denied")
          alert("Veuillez donner accès à votre géolocalisation.");
          else{
            navigator.geolocation.getCurrentPosition(function (loc){
              setPos("("+loc.coords.latitude+","+loc.coords.longitude+")")
            })
          }
      })
  }

  return (
    <div className="PWAExplanation">
      {isVisible ? 
      <div>
        <button className="PWAButton" onClick={GetPWA}>Installez la PWA ici!</button>
        <p>Cliquez sur ce bouton (ou cliquez sur l'icône se trouvant en haut de votre barre de recherche) et accédez à ce site en un clic sur votre bureau !</p>
        <img src="icon.png"/>
        <p>Il ne vous reste plus qu'à valider la pop-up et le tour est joué !</p>
        <img src="explainChrome.png"/>
      </div>
      : 
      <p>Vous ne pouvez pas actuellement installer la PWA.</p>
      }
      <p>Afin de pouvoir profiter au maximum des fonctionnalités de ce site, utilisez le navigateur web Chrome (pour utilisateurs Windows/Android) ou Safari (pour utilisateurs Mac/iOS)</p>
      <p>Cela vous permettra de :</p>
      <ul>
        <li>Recevoir <a onClick={ClickNotif}>des notifcations push !</a></li>
        <li>Connaître <a onClick={GetPosition}>votre position !</a> : {pos}</li>
        <li>Utilisez le NFC de votre mobile !</li>
        <li>Connectez-vous au Bluetooth d'un de vos appareils !</li>
        <li>Passer en plein écran !</li>
        <li>Utiliser votre webcam !</li>
        <li>Et bien d'autres encore !</li>
      </ul>
      <p>Il se peut que votre appareil ne soit cependant pas compatible à certaines fonctionnalités.</p>
    </div>
  )
}

export default App
