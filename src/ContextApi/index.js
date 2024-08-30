
import React, { createContext, useState, useEffect, useContext } from 'react';
import { getSocket, initSocket } from '../components/SocketConnection/SocketConnection';
import { userSignOut } from '../appRedux/actions';
import { useDispatch } from 'react-redux';


const BalanceContext = createContext();

export const BalanceProvider = ({ children }) => {
  const [balance, setBalance] = useState({
    coins: JSON.parse(localStorage.getItem("client-wallet-balance")) || "",
    exposure: JSON.parse(localStorage.getItem("client-wallet-exposure")) || ""
  });

  const dispatch = useDispatch()
  useEffect(() => {
    updateSocket();

    function updateSocket() {
      let userID = JSON.parse(localStorage.getItem("user_id"));
      let token_Id = userID?.token;
      let socket = getSocket();

      if (!socket || socket == null) {
        socket = initSocket(token_Id);
      }

      const loginData = {
        userId: userID?.data?.userId,
        token: token_Id,
      };

      socket.emit(`login`, loginData);

      socket.on("userLoggedOut", (data) => {
        if (data == userID?.data?.userId){
          // return dispatch(userSignOut()) ff
          localStorage.clear()
          window.location.href = '/signin'
        }
      });

      socket.on("userLoggedIn", (data) => {
        console.warn('userLoggedIn');
      });


      socket.on("coinUpdate", (data) => {
        localStorage.setItem("client-wallet-balance", JSON.stringify(data.coins));
        localStorage.setItem("client-wallet-exposure", JSON.stringify(data.exposure));
        setBalance({
          coins: data.coins,
          exposure: data.exposure,
        });
      });

      // socket.on("fetchCasinoBetList", (data) => {
     
      //   console.log(data,"hhhhhhhhhhhhhh");
      // });


    }
  }, []);

  return (
    <BalanceContext.Provider value={{ balance, setBalance }}>
      {children}
    </BalanceContext.Provider>
  );
};

export const useBalance = () => {
  return useContext(BalanceContext);
};
