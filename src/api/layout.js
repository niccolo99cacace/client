import client from "./client";

export const recoveryButtons = async () => {
    try {
      const { data } = await client.get("/user/recovery");
      return data;
    } catch (error) {
      const { response } = error;
      //.? è semplicemente come il .
      //ma invece di restituire errore se la funzione chiamata è undefined oppure l'oggetto chiamato è null
      //restituisce undefined e basta
      //in tal caso se il server ha restituito un messaggio di errore(controllo in quell'if) ,quindi un dato,
      // restituiamo il messaggio di errore dato dalla risposta del server
      if (response?.data) return response.data;
      return { error: error.message || error };
    }
  };
  
  export const memoriseButtons = async (buttonsData) => {
    try {
      const { data } = await client.post("/user/memoriseButtons", buttonsData);
      return data;
    } catch (error) {
      const { response } = error;
      //.? è semplicemente come il .
      //ma invece di restituire errore se la funzione chiamata è undefined oppure l'oggetto chiamato è null
      //restituisce undefined e basta
      //in tal caso se il server ha restituito un messaggio di errore(controllo in quell'if) ,quindi un dato,
      // restituiamo il messaggio di errore dato dalla risposta del server
      if (response?.data) return response.data;
      return { error: error.message || error };
    }
  };