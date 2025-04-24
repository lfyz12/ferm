import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { observer } from "mobx-react-lite";
import { Context } from ".";
import { Spinner } from "react-bootstrap";
import GPS from "./components/YndexMaps/GPS";
import Loading from "./components/Loading";

const App = observer(() => {
  const { user } = useContext(Context)
  const { product } = useContext(Context)
  const { basket } = useContext(Context)
  const { order } = useContext(Context)
  const { basketProduct } = useContext(Context)

  const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   check().then(data => {
  //     user.setUser(true)
  //     user.setIsAuth(true)
  //   }).finally(() => setLoading(false))
  // }, [])
  //

  async function loadToContext() {
    await user.checkAuth()

    if (user._user.isActivated) {
      basket.getBasketByUserID(user._user.id)
    }
    product.getAllByAvailable(true)
  }
// жыжка
  useEffect(() => {
    if (localStorage.getItem('token')) {
      loadToContext()
      // setLoading(false)
    }
  }, [user._user.id])


  //ЗАГРУЖАЕТ ТОВАРЫ В ПЕРВУЮ ОЧЕРЕДЬ
  useEffect(() => {
    product.getAllByAvailable(true)
  }, []);


  const [showHeader, setShowHeader] = useState(false)
  useEffect(() => {
    let prevScrollPos = window.scrollY;
    window.onscroll = function () {
      const currentScrollPos = window.scrollY;
      if (prevScrollPos >= currentScrollPos) {
        setShowHeader(false)
      } else {
        setShowHeader(true)
      }
      prevScrollPos = currentScrollPos;
    };
  })


  // basket.getBasketByUserID(user._user.id)




  return (
    <BrowserRouter>
      <NavBar showHeader={showHeader} />
      {user.isLoading && <Loading/>}
      <AppRouter/>
      <Footer />
    </BrowserRouter>
  );
});

export default App;
