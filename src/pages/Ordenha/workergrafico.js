

const pesquisarBackGroundGraficosWorker = async () => {
   
    try {
       
        console.log("Executando chamada de graficos em worker");

        const response = await fetch('https://pkaislan234-36840.portmap.io:36840/v1/registro/listarTodosComponenteStatus');
        const jsonData = await response.json();

        return jsonData;

    } catch (_err) {
        console.log("erro de chamada no worker de graficos: " + _err);
        return null;

    }
   
  };

    

export default pesquisarBackGroundGraficosWorker;
