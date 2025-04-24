import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
// import { YMaps, Map, Placemark, SearchControl, GeolocationControl,} from '@pbe/react-yandex-maps';
import { YMaps, Map, Placemark, SearchControl, GeolocationControl, withYMaps, ZoomControl } from '@pbe/react-yandex-maps';
import './gpsStyle.css'
import { Context } from '../..';
import ErrorAuthModal from '../ErroePageComponents/ErrorModal/ErrorAuthModal';
import ErrorModal from '../ErroePageComponents/ErrorModal/ErrorModal';
const GPS = ({ findAdress, ...props }) => {
  const { user } = useContext(Context)

  const mapOptions = {
    modules: ["geocode", "SuggestView"],
    defaultOptions: { suppressMapOpenBlock: true,  restrictMapArea: [[56.830569, 59.852335], [56.755036, 59.999630]]},
    width: '100%',
    height: props.width < 800 ? '100vh' : '60vh',
  };

  const geolocationOptions = {
    
    defaultOptions: { 
      maxWidth: 128,
      noPlacemark: true},
    defaultData: { content: "" },
  };

  const initialState = {
    title: "",
    center: [56.800084, 59.908718],
    zoom: 5,
  };

  const [state, setState] = useState({
    title: '',
    center: [56.800084, 59.908718],
    zoom: 17,
  });

  const [mapConstructor, setMapConstructor] = useState(null),
        [adress, setAdress] = useState(''),
        placemarkRef = useRef(null),
        mapRef = useRef(null),
        searchRef = useRef(null),
        locationRef = useRef(null);

  const handleReset = async () => {
    searchRef.current.value = "";
    await setDefaultAdress()
    props.onClick()
  };

 

  const setDefaultAdress = async () => {
    await user.changeDefaultAddressByNumber(state.title, user._user.number)
  }

  const defaultAddress = useMemo(() => {
    setAdress(user._user.defaultAddress)
    return adress
  }, [user._user.defaultAddress, adress])

  useEffect(() => {
    if (mapConstructor) {
      new mapConstructor.SuggestView(searchRef.current, {
        // load: 'https://api-maps.yandex.ru/2.1/?lang=ru_RU&apikey=<8e2c6a37-a238-4ab8-80f7-eccef9472ef9>&suggest_apikey=<1e1d0ab9-d063-4a48-ae23-624adc6bba4b>',
        boundedBy: [[56.830569, 59.852335], [56.755036, 59.999630]],
        offset: [0, 2],
        strictBounds: true,
        provider: 'yandex#map'
      }).events.add("select", function (e) {
        const selectedName = e.get("item").value;
        mapConstructor.geocode(selectedName).then((result) => {
          const newCoords = result.geoObjects.get(0).geometry.getCoordinates();
          setState((prevState) => ({ ...prevState, center: newCoords, title: selectedName }));
        });
      });
    }
  }, [mapConstructor]);



  useEffect(() => {
    findAdress(defaultAddress)
  }, [defaultAddress])

  const placemarkByDefaultAdress = () => {
    const currentLocation = defaultAddress ? defaultAddress : 'Ревда';
    try {mapConstructor.geocode(currentLocation).then((res) => {
      const nearest = res.geoObjects.get(0)
      const [centerX, centerY] = nearest.geometry.getCoordinates();
      const [initialCenterX, initialCenterY] = initialState.center;
      if (centerX !== initialCenterX && centerY !== initialCenterY) {
        setState((prevState) => ({ ...prevState, title: currentLocation, center: [centerX, centerY] }));
        searchRef.current.value = currentLocation
    }})} catch {
      <ErrorModal/>
    }
  }

  const changeLocationByClick = (e) => {
    const newCoords = e.get('coords')
    mapConstructor.geocode(newCoords).then((res) => {
      const nearest = res.geoObjects.get(0);
      const foundAddress = nearest.properties.get("text");
      const [centerX, centerY] = nearest.geometry.getCoordinates();
      const [initialCenterX, initialCenterY] = initialState.center;
      if (centerX !== initialCenterX && centerY !== initialCenterY) {
        setState((prevState) => ({ ...prevState, title: foundAddress, center: newCoords }));
        searchRef.current.value = foundAddress
      }
    });
  }

  useEffect(() => {
    if (props.show) {
      placemarkByDefaultAdress()
    }
  }, [props.show])

  const geometryChange = (e) => {
    const newCoords = placemarkRef.current.geometry.getCoordinates();
    mapConstructor.geocode(newCoords).then((res) => {
      const nearest = res.geoObjects.get(0);
      const foundAddress = nearest.properties.get("text");
      const [centerX, centerY] = nearest.geometry.getCoordinates();
      const [initialCenterX, initialCenterY] = initialState.center;
      if (centerX !== initialCenterX && centerY !== initialCenterY) {
        setState((prevState) => ({ ...prevState, title: foundAddress }));
        searchRef.current.value = foundAddress
      }
    });
  }
  const locationchange = (event) => {
    const newCoords = event.get('position')
    mapConstructor.geocode(newCoords).then((res) => {
      const nearest = res.geoObjects.get(0);
      const foundAddress = nearest.properties.get('text');
      const [centerX, centerY] = nearest.geometry.getCoordinates()
      const [initialCenterX, initialCenterY] = initialState.center;
      if (centerX !== initialCenterX && centerY !== initialCenterY) {
        setState((options) => ({...options, title: foundAddress, center: newCoords}));
        searchRef.current.value = foundAddress
      }
    })
  }



  return (
    <div className='position-relative z-3'>
      <YMaps query={{
        lang: 'ru_RU',
        apikey: '8e2c6a37-a238-4ab8-80f7-eccef9472ef9',
        suggest_apikey: '1e1d0ab9-d063-4a48-ae23-624adc6bba4b',
        load: "Map,Placemark,control.GeolocationControl,control.FullscreenControl,control.SearchControl,geoObject.addon.balloon,SuggestView"
      }}>
        <div className='search_map_box'>
          <div className='search_map_content'>
            <input className='search_content_input p-2' ref={searchRef} placeholder='Ваш адрес...' disabled={!mapConstructor} />
            {/* <div>
                          {state.title}
                        </div> */}
          </div>
          <button onClick={handleReset}  className='me-1 search_submit_btn text-center' disabled={!state.title.length}>
            OK
          </button>
          {props.width < 900 && <button className='close_btn text-center' onClick={props.onClick}>Зкарыть</button>}
        </div>
        <Map
          {...mapOptions}
          onClick={changeLocationByClick}
          state={state}
          onLoad={setMapConstructor}
          instanceRef={mapRef}>
          <GeolocationControl 
                    instanceRef={locationRef}
                    onLocationChange={locationchange}
                    {...geolocationOptions} />
          <ZoomControl/>
          <Placemark
            instanceRef={placemarkRef}
            geometry={state.center}
            onDragEnd={geometryChange}
            options={{
              useMapMarginInDragging: true,
              visible: true,
              preset: 'islands#redCircleDotIcon',
              draggable: true
            }}
          />
           <Placemark
            balloonContent = 'adsas'
            geometry={[56.800817, 59.912877]}
            options={{
              useMapMarginInDragging: true,
              preset: 'islands#blueDotIcon',
              draggable: false,
            }}
          />
        </Map>
      </YMaps>
    </div>
  );
};

export default GPS;