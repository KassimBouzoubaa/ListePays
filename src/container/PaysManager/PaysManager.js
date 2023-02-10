import React, { useEffect, useState } from "react";
import Titre from "../../components/Titres/TitreH1";
import Bouton from "../../components/Bouton/Bouton";
import axios from "axios";
import Pays from "./Pays/Pays";
function PaysManager() {
  const [listePays, setListePays] = useState([]);
  const [loading, setLoading] = useState(false);
  const [region, setRegion] = useState("all");
  const [regionSelection, setRegionSelection] = useState("Tous");
  const [numPageActuel, setNumPageActuel] = useState(1);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://restcountries.com/v2/${region}`)
      .then((data) => {
        const pays = data.data.map((pays) => {
          return {
            nom: pays.name,
            nomFrancais: pays.translations.fr,
            capitale: pays.capital,
            region: pays.region,
            drapeau: pays.flags.png,
          };
        });
        setListePays(pays);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [region]);

  let pagination = [];
  let liste = "";
  if (listePays) {
    let fin = listePays.length / 10;
    if (listePays.length % 10 !== 0) fin++;
    for (let i = 1; i <= fin; i++) {
      pagination.push(
        <Bouton
          key={i}
          clic={() => setNumPageActuel(i)}
          isCurrent={numPageActuel}
          typeBtn='btn-primary'
        >
          {i}
        </Bouton>
      );
    }
    let debut = (numPageActuel -1)*10
    let finListe = numPageActuel*10
    const listeReduite = listePays.slice(debut, finListe)

    liste = listeReduite.map((pays, index) => {
      return (
        <div key={index} className='col-12 col-md-6'>
          <Pays {...pays} />
        </div>
      );
    });
  }

  return (
    <>
      <div className='container'>
        <Titre>Listes des pays du monde</Titre>
        <Bouton
          isCurrent={regionSelection}
          clic={() => {
            setNumPageActuel(1)
            setRegion("all");
            setRegionSelection("Tous");
          }}
          typeBtn='btn-primary'
        >
          Tous
        </Bouton>
        <Bouton
          isCurrent={regionSelection}
          clic={() => {
            setNumPageActuel(1)
            setRegion("region/europe");
            setRegionSelection("Europe");
          }}
          typeBtn='btn-primary'
        >
          Europe
        </Bouton>
        <Bouton
          isCurrent={regionSelection}
          clic={() => {
            setNumPageActuel(1)
            setRegion("region/africa");
            setRegionSelection("Afrique");
          }}
          typeBtn='btn-primary'
        >
          Afrique
        </Bouton>
        <Bouton
          isCurrent={regionSelection}
          clic={() => {
            setNumPageActuel(1)
            setRegion("region/asia");
            setRegionSelection("Asie");
          }}
          typeBtn='btn-primary'
        >
          Asie
        </Bouton>
        <Bouton
          isCurrent={regionSelection}
          clic={() => {
            setNumPageActuel(1)
            setRegion("region/americas");
            setRegionSelection("Amerique");
          }}
          typeBtn='btn-primary'
        >
          Amerique
        </Bouton>
        <Bouton
          isCurrent={regionSelection}
          clic={() => {
            setNumPageActuel(1)
            setRegion("region/oceania");
            setRegionSelection("Oceanie");
          }}
          typeBtn='btn-primary'
        >
          Oceanie
        </Bouton>
        <div>
          Nombre de pays :{" "}
          <span class='badge bg-success badge-pill'>{listePays.length}</span>
        </div>
        {loading ? (
          <div>Chargement...</div>
        ) : (
          <div className='row no-gutters'>{liste}</div>
        )}
      </div>
      <div>{pagination}</div>
    </>
  );
}

export default PaysManager;
