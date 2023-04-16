

const pesquisarBackGroundTodosOsComponentes = async () => {
   
    try {
       
        console.log("Executando chamada de componentes em worker");

        const response = await fetch('https://pkaislan234-36840.portmap.io:36840/v1/componentes/web');
        const jsonData = await response.json();

        return jsonData;

    } catch (_err) {
        console.log("erro de chamada no worker: " + _err);
        return null;

    }
   
  };

    

export default pesquisarBackGroundTodosOsComponentes;
