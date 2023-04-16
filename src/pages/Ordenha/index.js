import { Grid, Typography, Switch, FormControlLabel } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@mui/material/AppBar';
import Box from '@material-ui/core/Box';
import React, { useState, useEffect } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import ReactSpeedometer from "react-d3-speedometer"
import Thermometer from 'react-thermometer-component'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import { styled } from '@material-ui/styles';


import api from '../../services/api';

//import { useWorker } from "@koale/useworker";
//import pesquisarBackGroundTodosOsComponentes from "./worker";
//import pesquisarBackGroundGraficosWorker from "./workergrafico";




const ColorButton = styled(Button)(({ theme }) => ({
    color: 'green',
    backgroundColor: 'white',
    size: 'large',
    borderColor: 'green',
    '&:hover': {
        backgroundColor: 'green',
        color: 'white',
    },
}));



const ColorButtonPurple = styled(Button)(({ theme }) => ({
    color: 'purple',
    size: 'large',
    backgroundColor: 'white',
    borderColor: 'purple',
    '&:hover': {
        backgroundColor: 'purple',
        color: 'white',
    },
}));


export const MuiSwitchLarge = styled(Switch)(({ theme }) => ({
    width: 80,
    height: 50,
    padding: 7,
    "& .MuiSwitch-switchBase": {
        margin: 1,
        padding: 0,
        transform: "translateX(6px)",
        "&.Mui-checked": {
            transform: "translateX(30px)",
        },
    },
    "& .MuiSwitch-thumb": {
        width: 40,
        height: 40,
    },
    "& .MuiSwitch-track": {
        borderRadius: 30 / 2,
    },
}));






export default function Ordenha() {


    // const [sortWorker] = useWorker(pesquisarBackGroundTodosOsComponentes);
    //console.log("WORKER:", sortWorkerStatus);
    // const [sortWorkerGraficos] = useWorker(pesquisarBackGroundGraficosWorker);




    const [loadingReservatorio, setLoadingReservatorio] = useState(true);
    const [loadingVentiladores, setLoadingVentiladores] = useState(true);
    const [loadingBoiler, setLoadingBoiler] = useState(true);
    const [loadingVentiladoresExternos, setLoadingVentiladoresExternos] = useState(true);
    const [loadingResfriador, setLoadingResfriador] = useState(true);
    const [loadingRefrescador, setLoadingRefrescador] = useState(true);
    const [loadingVentiladoresAspersores, setLoadingVentiladoresAspersores] = useState(true);
    const [loadingRele4, setLoadingRele4] = useState(true);
    const [loadingRele5, setLoadingRele5] = useState(true);



    const [reservatorio, setReservatrio] = useState(null);
    const [resfriador, setResfriador] = useState(null);
    const [resfriadorHorarios, setResfriadorHorarios] = useState(true);

    const [ventiladores, setVentiladores] = useState(null);
    const [ventiladoresExternos, setVentiladoresExternos] = useState(null);
    const [ventiladoresAspersores, setVentiladoresAspersores] = useState(null);

    const [boiler, setBoiler] = useState(null);
    const [boilerHorarios, setBoilerHorarios] = useState(true);

    const [boilerTemp, setBoilerTemp] = useState(null);


    const [rele4, setRele4] = useState(null);
    const [rele5, setRele5] = useState(null);


    const [refrescador, setRefrescador] = useState(null);
    const [refrescadorHorarios, setRefrescadorHorarios] = useState(null);

  
    const [escopoMin, setEscopoMin] = useState(0);
    const [escopoMinBoiler, setEscopoMinBoiler] = useState(0);



    const [tempMax, setTempMax] = useState(0);
    const [tempMin, setTempMin] = useState(0);


    const [tempMaxRefrescador, setTempMaxRefrescador] = useState(0);
    const [tempMinRefrescador, setTempMinRefrescador] = useState(0);
    const [tempIntervalRefrescador, setTempIntervalRefrescador] = useState(0);


    const [tempMaxBoiler, setTempMaxBoiler] = useState(0);
    const [tempMinBoiler, setTempMinBoiler] = useState(0);

    const [tempMaxResfriador, setTempMaxResfriador] = useState(0);


    const [newHoraInicio, setNewHoraInicio] = useState("06:00");
    const [newHoraFim, setNewHoraFim] = useState("07:00");


    const [newHoraInicioRefrescador, setNewHoraInicioRefrescador] = useState("06:00");
    const [newHoraFimRefrescador, setNewHoraFimRefrescador] = useState("07:00");


    const [newHoraInicioAlerta, setNewHoraInicioAlerta] = useState("06:00");
    const [newHoraFimAlerta, setNewHoraFimAlerta] = useState("07:00");



   

    async function excluir(id) {

        // console.log("Funcao deletar chamada, id: " + id);
        if (window.confirm("Excluir o Horario Selecionada?")) {
            var result = await api.delete("/v1/horario/excluir/" + id);
            /// console.log("resultado da exclusao: " + result.status);
            if (result.status === 200) {

                listarBoiler();

            } else {
                alert("Erro ao Excluir! Tente novamente");
            }
        }
    }

    async function excluirAlerta(id) {

        // console.log("Funcao deletar chamada, id: " + id);
        if (window.confirm("Excluir o Horario Selecionada?")) {
            var result = await api.delete("/v1/horario/excluir/" + id);
            // console.log("resultado da exclusao: " + result.status);
            if (result.status === 200) {

                listarResfriador();

            } else {
                alert("Erro ao Excluir! Tente novamente");
            }
        }
    }




    async function mudar(props) {

        // console.log("Funcao mudar chamada, id: " + props.id_horario);

        let novo_status = props.status === 0 ? 1 : 0

        var result = await api.post("/v1/horario/atualizar/" + props.id_horario + "?hora_inicio=" + props.hora_inicio + "&hora_fim=" + props.hora_fim + "&status=" + novo_status)

        //  console.log("resultado da exclusao: " + result.status);
        if (result.status === 200) {
            alert("Atualizado!");

            listarBoiler();

        } else {
            alert("Erro ao Excluir! Tente novamente");
        }
    }


    async function mudarAlerta(props) {

        //  console.log("Funcao mudar chamada, id: " + props.id_horario);

        let novo_status = props.status === 0 ? 1 : 0

        var result = await api.post("/v1/horario/atualizar/" + props.id_horario + "?hora_inicio=" + props.hora_inicio + "&hora_fim=" + props.hora_fim + "&status=" + novo_status)

        // console.log("resultado da exclusao: " + result.status);
        if (result.status === 200) {
            alert("Atualizado!");

            listarResfriador();

        } else {
            alert("Erro ao Excluir! Tente novamente");
        }
    }


    function isHoraValida(hora) {
        const regexHora = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
        return regexHora.test(hora);
    }


    async function inserir() {


        if (isHoraValida(newHoraInicio) && isHoraValida(newHoraFim)) {

            var result = await api.post("/v1/horario/inserir/" + boilerTemp.id_componente + "?hora_inicio=" + newHoraInicio + "&hora_fim=" + newHoraFim)

            //  console.log("resultado da adicao: " + result.status);
            if (result.status === 200) {
                alert("Inserido!");

                listarBoiler();

            } else {
                alert("Erro ao Excluir! Tente novamente");
            }
        } else {
            alert("Formato de Hora Invalido!");

        }
    }

    async function inserirAlerta() {


        if (isHoraValida(newHoraInicioAlerta) && isHoraValida(newHoraFimAlerta)) {

            var result = await api.post("/v1/horario/inserir/" + resfriador.id_componente + "?hora_inicio=" + newHoraInicioAlerta + "&hora_fim=" + newHoraFimAlerta)

            //   console.log("resultado da adicao: " + result.status);
            if (result.status === 200) {
                alert("Inserido!");

                listarResfriador();

            } else {
                alert("Erro ao Excluir! Tente novamente");
            }
        } else {
            alert("Formato de Hora Invalido!");

        }
    }


    async function inserirRefrescador() {


        if (isHoraValida(newHoraInicioRefrescador) && isHoraValida(newHoraFimRefrescador)) {

            var result = await api.post("/v1/horario/inserir/8?hora_inicio=" + newHoraInicioRefrescador + "&hora_fim=" + newHoraFimRefrescador)

            //   console.log("resultado da adicao: " + result.status);
            if (result.status === 200) {
                alert("Inserido!");

                listarRefrescador();

            } else {
                alert("Erro ao Excluir! Tente novamente");
            }
        } else {
            alert("Formato de Hora Invalido!");

        }
    }


    function Row(props) {
        const { row } = props;


        return (
            <React.Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} style={{ textAlign: "center", fontSize: 14 }}>

                    <TableCell colSpan={2} align="center">

                        <TextField
                            variant="standard"
                            name="horaInicio"
                            label="Inicio"
                            id="escopoMin"
                            value={row.hora_inicio}
                            fullWidth
                        />
                    </TableCell>
                    <TableCell colSpan={2} align="center">
                        <TextField
                            variant="standard"
                            name="escopoMin"
                            label="Min"
                            id="escopoMin"
                            value={row.hora_fim}
                            fullWidth

                        />
                    </TableCell>
                    <TableCell colSpan={1} align="center"><span >{row.status === 1 ? "Ativo" : "Inativo"}</span></TableCell>
                    <TableCell colSpan={1} align="center">
                        <Grid item xs={12}
                        >
                            <ButtonGroup >
                                <ColorButtonPurple color="secondary" onClick={() => mudar(row)} >{row.status === 0 ? "Ativar" : "Desativar"}</ColorButtonPurple>

                            </ButtonGroup>
                        </Grid>
                        <Grid item xs={12} >
                            <ButtonGroup >
                                <Button color="secondary" onClick={() => excluir(row.id_horario)} >Excluir</Button>

                            </ButtonGroup>
                        </Grid>

                    </TableCell>

                </TableRow>
            </React.Fragment>
        );
    }

    const handleChangeHoraFim = (event) => {
        setNewHoraFim(event.target.value);
    };


    const handleChangeHoraInicio = (event) => {
        setNewHoraInicio(event.target.value);
    };



    const handleChangeHoraFimRefrescador = (event) => {
        setNewHoraFimRefrescador(event.target.value);
    };


    const handleChangeHoraInicioRefrescador = (event) => {
        setNewHoraInicioRefrescador(event.target.value);
    };




    function RowAlerta(props) {
        const { row } = props;


        return (
            <React.Fragment>
                <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} style={{ textAlign: "center", fontSize: 14 }}>

                    <TableCell colSpan={2} align="center">

                        <TextField
                            fullWidth
                            variant="standard"
                            name="horaInicio"
                            label="Inicio"
                            id="escopoMin"
                            value={row.hora_inicio}

                        />
                    </TableCell>
                    <TableCell colSpan={2} align="center">
                        <TextField
                            fullWidth
                            variant="standard"
                            name="escopoMin"
                            label="Min"
                            id="escopoMin"
                            value={row.hora_fim}

                        />
                    </TableCell>
                    <TableCell colSpan={1} align="center"><span >{row.status === 1 ? "Ativo" : "Inativo"}</span></TableCell>
                    <TableCell colSpan={1} align="center">
                        <Grid item xs={12} >
                            <ButtonGroup >
                                <ColorButtonPurple color="secondary" onClick={() => mudarAlerta(row)} >{row.status === 0 ? "Ativar" : "Desativar"}</ColorButtonPurple>

                            </ButtonGroup>
                        </Grid>
                        <Grid item xs={12} >
                            <ButtonGroup >
                                <Button color="secondary" onClick={() => excluirAlerta(row.id_horario)} >Excluir</Button>

                            </ButtonGroup>
                        </Grid>

                    </TableCell>

                </TableRow>
            </React.Fragment>
        );
    }

    const handleChangeHoraFimAlerta = (event) => {
        setNewHoraFimAlerta(event.target.value);
    };


    const handleChangeHoraInicioAlerta = (event) => {
        setNewHoraInicioAlerta(event.target.value);
    };





    /*
        async function listarReservatorio() {
    
            setLoadingReservatorio(true);
    
    
            try {
    
                var url = "v1/componentes/1";
              //  console.log("Url: " + url);
                await api.get(url).then(function (response) {
    
                    if (response.data !== null) {
                //        console.log(" Reservatorio: " + response.data);
                        setReservatrio(response.data);
                        setEscopoMin(response.data.nivel)
                    }
                });
                setLoadingReservatorio(false);
    
            } catch (_err) {
                alert("Erro de Conexão, tente novamente mais tarde");
    
            }
        }
    */

    async function listarResfriador() {

        setLoadingResfriador(true);


        try {

            var url = "v1/componentes/6";
            // console.log("Url: " + url);
            await api.get(url).then(function (response) {

                if (response.data !== null) {
                    //      console.log(" Resfriador: " + response.data);
                    setResfriador(response.data);
                    setTempMaxResfriador(response.data.nivel)
                }
            });

            url = "v1/horario/6";
            // console.log("Url: " + url);
            await api.get(url).then(function (response) {

                if (response.data !== null) {
                    setResfriadorHorarios(response.data);


                }
            });


            setLoadingResfriador(false);

        } catch (_err) {
            alert("Erro de Conexão com o resfriador, tente novamente mais tarde");

        }
    }



    async function listarBoiler() {

        setLoadingBoiler(true);


        try {

            var url = "v1/componentes/3";
            //  console.log("Url: " + url);
            await api.get(url).then(function (response) {

                if (response.data !== null) {
                    //      console.log(" Boiler: " + response.data);
                    setBoiler(response.data);
                    setEscopoMinBoiler(response.data.nivel)

                }
            });



            url = "v1/horario/4";
            //  console.log("Url: " + url);
            await api.get(url).then(function (response) {

                if (response.data !== null) {
                    //     console.log(" Boiler: " + response.data);
                    setBoilerHorarios(response.data);


                }
            });


            url = "v1/componentes/4";
            //  console.log("Url: " + url);
            await api.get(url).then(function (response) {

                if (response.data !== null) {
                    // console.log(" Boiler: " + response.data);
                    setBoilerTemp(response.data);
                    setTempMaxBoiler(response.data.nivel)
                    setTempMinBoiler(response.data.nivel_min)

                }
            });

            setLoadingBoiler(false);

        } catch (_err) {
            alert("Erro de Conexão ao consultar boiler, tente novamente mais tarde");
            console.log(_err)
        }
    }


    async function listarRefrescador() {

        setLoadingRefrescador(true);


        try {

            var url = "v1/componentes/8";
            // console.log("Url: " + url);
            await api.get(url).then(function (response) {

                if (response.data !== null) {
                    //  console.log(" Boiler: " + response.data);
                    setRefrescador(response.data);
                    setTempMaxRefrescador(response.data.nivel)
                    setTempMinRefrescador(response.data.nivel_min)
                    setTempIntervalRefrescador(response.data.nivel_atual)

                }
            });



            url = "v1/horario/8";
            //  console.log("Url: " + url);
            await api.get(url).then(function (response) {

                if (response.data !== null) {
                    //    console.log(" Boiler: " + response.data);
                    setResfriadorHorarios(response.data);


                }
            });




            setLoadingRefrescador(false);

        } catch (_err) {
            alert("Erro de Conexão ao consultar refrescador, tente novamente mais tarde");
            console.log(_err)
        }
    }

    /*
        async function listarVentiladores() {
    
            setLoadingVentiladores(true);
    
    
            try {
    
                var url = "v1/componentes/2";
               // console.log("Url: " + url);
                await api.get(url).then(function (response) {
    
                    if (response.data !== null) {
                     //   console.log(" Ventilador: " + response.data);
                        setVentiladores(response.data);
                        setTempMax(response.data.nivel)
                        setTempMin(response.data.nivel_min)
                    }
                });
                setLoadingVentiladores(false);
    
            } catch (_err) {
                alert("Erro de Conexão ao obter dados de ventiladores, tente novamente mais tarde");
    
                console.log(_err)
            }
        }
    
        /*
    
        async function listarVentiladoresExternos() {
    
            setLoadingVentiladoresExternos(true);
    
    
            try {
    
                var url = "v1/componentes/5";
              //  console.log("Url: " + url);
                await api.get(url).then(function (response) {
    
                    if (response.data !== null) {
                       // console.log(" Ventilador: " + response.data);
                        setVentiladoresExternos(response.data);
                    }
                });
                setLoadingVentiladoresExternos(false);
    
            } catch (_err) {
                alert("Erro de Conexão ao obter dados de ventiladores externos, tente novamente mais tarde");
    
                console.log(_err)
            }
        }
    
    */

    async function setOperacaoReservatorio() {


        try {

            var modo_operacao_atual = reservatorio.modo_operacao;

            var nova_operacao = 0;
            if (modo_operacao_atual === 0)
                nova_operacao = 1;

            var url = "v1/componentes/1?modo_operacao=" + nova_operacao + "&status_rele=" + reservatorio.status_rele + "&nivel_atual=" + reservatorio.nivel_atual;
            // console.log("Url: " + url);
            await api.post(url).then(function (response) {

                if (response.data !== null) {

                    setTimeout(function () {

                        var url = "v1/componentes/1/";
                        //  console.log("Url: " + url);
                        api.get(url).then(function (response) {

                            if (response.data !== null) {

                                setReservatrio(response.data);

                                setLoadingReservatorio(false);

                            }
                        });

                    }, 1500);


                }
            });

        } catch (_err) {
            alert("Erro de Conexão, tente novamente mais tarde");

        }
    }



    async function setOperacaoStatus() {


        try {

            var status_atual_rele = reservatorio.status_rele;

            var novo_status = 0;
            if (status_atual_rele === 0)
                novo_status = 1;

            var url = "v1/componentes/1?modo_operacao=" + reservatorio.modo_operacao + "&status_rele=" + novo_status + "&nivel_atual=" + reservatorio.nivel_atual;
            //console.log("Url: " + url);
            await api.post(url).then(function (response) {

                if (response.data !== null) {

                    setTimeout(function () {

                        var url = "v1/componentes/1/";
                        // console.log("Url: " + url);
                        api.get(url).then(function (response) {

                            if (response.data !== null) {

                                setReservatrio(response.data);

                                setLoadingReservatorio(false);

                            }
                        });

                    }, 1500);


                }
            });

        } catch (_err) {
            alert("Erro de Conexão, tente novamente mais tarde");

        }
    }



    async function setOperacaoStatusRele4() {


        try {

            var status_atual_rele = rele4.status_rele;

            var novo_status = 0;
            if (status_atual_rele === 0)
                novo_status = 1;

            var url = "v1/componentes/10?modo_operacao=" + rele4.modo_operacao + "&status_rele=" + novo_status + "&nivel_atual=" + rele4.nivel_atual;
            //console.log("Url: " + url);
            await api.post(url).then(function (response) {

                if (response.data !== null) {

                    setTimeout(function () {

                        var url = "v1/componentes/10/";
                        // console.log("Url: " + url);
                        api.get(url).then(function (response) {

                            if (response.data !== null) {

                                setRele4(response.data);

                                setLoadingRele4(false);

                            }
                        });

                    }, 1500);


                }
            });

        } catch (_err) {
            alert("Erro de Conexão, tente novamente mais tarde");

        }
    }


    async function setOperacaoStatusRele5() {


        try {

            var status_atual_rele = rele5.status_rele;

            var novo_status = 0;
            if (status_atual_rele === 0)
                novo_status = 1;

            var url = "v1/componentes/11?modo_operacao=" + rele5.modo_operacao + "&status_rele=" + novo_status + "&nivel_atual=" + rele5.nivel_atual;
            //console.log("Url: " + url);
            await api.post(url).then(function (response) {

                if (response.data !== null) {

                    setTimeout(function () {

                        var url = "v1/componentes/11/";
                        // console.log("Url: " + url);
                        api.get(url).then(function (response) {

                            if (response.data !== null) {

                                setRele5(response.data);

                                setLoadingRele5(false);

                            }
                        });

                    }, 1500);


                }
            });

        } catch (_err) {
            alert("Erro de Conexão, tente novamente mais tarde");

        }
    }



    async function setOperacaoBoiler() {


        try {

            var modo_operacao_atual = boiler.modo_operacao;

            var nova_operacao = 0;
            if (modo_operacao_atual === 0)
                nova_operacao = 1;

            var url = "v1/componentes/3?modo_operacao=" + nova_operacao + "&status_rele=" + boiler.status_rele + "&nivel_atual=" + boiler.nivel_atual;
            // console.log("Url: " + url);
            await api.post(url).then(function (response) {

                if (response.data !== null) {

                    setTimeout(function () {

                        var url = "v1/componentes/3/";
                        //    console.log("Url: " + url);
                        api.get(url).then(function (response) {

                            if (response.data !== null) {

                                setBoiler(response.data);

                                setLoadingBoiler(false);

                            }
                        });

                    }, 1500);


                }
            });

        } catch (_err) {
            alert("Erro de Conexão, tente novamente mais tarde");

        }
    }


    async function setOperacaoRefrescador() {


        try {

            var modo_operacao_atual = refrescador.modo_operacao;

            var nova_operacao = 0;
            if (modo_operacao_atual === 0)
                nova_operacao = 1;

            var url = "v1/componentes/8?modo_operacao=" + nova_operacao + "&status_rele=" + refrescador.status_rele + "&nivel_atual=" + refrescador.nivel_atual;
            //  console.log("Url: " + url);
            await api.post(url).then(function (response) {

                if (response.data !== null) {

                    setTimeout(function () {

                        var url = "v1/componentes/8/";
                        //   console.log("Url: " + url);
                        api.get(url).then(function (response) {

                            if (response.data !== null) {

                                setRefrescador(response.data);

                                setLoadingRefrescador(false);

                            }
                        });

                    }, 1500);


                }
            });

        } catch (_err) {
            alert("Erro de Conexão, tente novamente mais tarde");

        }
    }

    async function setOperacaoStatusRefrescador() {


        try {

            var status_atual_rele = refrescador.status_rele;

            var novo_status = 0;
            if (status_atual_rele === 0)
                novo_status = 1;

            var url = "v1/componentes/8?modo_operacao=" + refrescador.modo_operacao + "&status_rele=" + novo_status + "&nivel_atual=" + refrescador.nivel_atual;
            // console.log("Url: " + url);
            await api.post(url).then(function (response) {

                if (response.data !== null) {

                    setTimeout(function () {

                        var url = "v1/componentes/8/";
                        //  console.log("Url: " + url);
                        api.get(url).then(function (response) {

                            if (response.data !== null) {

                                setRefrescador(response.data);

                                setLoadingRefrescador(false);

                            }
                        });

                    }, 1500);


                }
            });

        } catch (_err) {
            alert("Erro de Conexão, tente novamente mais tarde");

        }
    }

    async function setOperacaoStatusVentiladoresAspersores() {


        try {

            var status_atual_rele = ventiladoresAspersores.status_rele;

            var novo_status = 0;
            if (status_atual_rele === 0)
                novo_status = 1;

            var url = "v1/componentes/9?modo_operacao=" + refrescador.modo_operacao + "&status_rele=" + novo_status + "&nivel_atual=" + ventiladoresAspersores.nivel_atual;
            // console.log("Url: " + url);
            await api.post(url).then(function (response) {

                if (response.data !== null) {

                    setTimeout(function () {

                        var url = "v1/componentes/9/";
                        //  console.log("Url: " + url);
                        api.get(url).then(function (response) {

                            if (response.data !== null) {

                                setVentiladoresAspersores(response.data);

                                setLoadingVentiladoresAspersores(false);

                            }
                        });

                    }, 1500);


                }
            });

        } catch (_err) {
            alert("Erro de Conexão, tente novamente mais tarde");

        }
    }



    async function setOperacaoStatusBoiler() {


        try {

            var status_atual_rele = boiler.status_rele;

            var novo_status = 0;
            if (status_atual_rele === 0)
                novo_status = 1;

            var url = "v1/componentes/3?modo_operacao=" + boiler.modo_operacao + "&status_rele=" + novo_status + "&nivel_atual=" + boiler.nivel_atual;
            // console.log("Url: " + url);
            await api.post(url).then(function (response) {

                if (response.data !== null) {

                    setTimeout(function () {

                        var url = "v1/componentes/3/";
                        //  console.log("Url: " + url);
                        api.get(url).then(function (response) {

                            if (response.data !== null) {

                                setBoiler(response.data);

                                setLoadingBoiler(false);

                            }
                        });

                    }, 1500);


                }
            });

        } catch (_err) {
            alert("Erro de Conexão, tente novamente mais tarde");

        }
    }


    async function setOperacaoStatusBoilerTemp() {


        try {

            var status_atual_rele = boilerTemp.status_rele;

            var novo_status = 0;
            if (status_atual_rele === 0)
                novo_status = 1;

            var url = "v1/componentes/4?modo_operacao=" + boilerTemp.modo_operacao + "&status_rele=" + novo_status + "&nivel_atual=" + boilerTemp.nivel_atual;
            //  console.log("Url: " + url);
            await api.post(url).then(function (response) {

                if (response.data !== null) {

                    setTimeout(function () {

                        var url = "v1/componentes/4/";
                        //   console.log("Url: " + url);
                        api.get(url).then(function (response) {

                            if (response.data !== null) {

                                setBoilerTemp(response.data);

                                setLoadingBoiler(false);

                            }
                        });

                    }, 1500);


                }
            });

        } catch (_err) {
            alert("Erro de Conexão, tente novamente mais tarde");

        }
    }



    async function setOperacaoVentiladores() {


        try {

            var modo_operacao_atual = ventiladores.modo_operacao;

            var nova_operacao = 0;
            if (modo_operacao_atual === 0)
                nova_operacao = 1;

            var url = "v1/componentes/2?modo_operacao=" + nova_operacao + "&status_rele=" + ventiladores.status_rele + "&nivel_atual=" + ventiladores.nivel_atual;
            // console.log("Url: " + url);
            await api.post(url).then(function (response) {

                if (response.data !== null) {

                    setTimeout(function () {

                        var url = "v1/componentes/2/";
                        //    console.log("Url: " + url);
                        api.get(url).then(function (response) {

                            if (response.data !== null) {

                                setVentiladores(response.data);

                                setLoadingVentiladores(false);

                            }
                        });

                    }, 1500);


                }
            });

        } catch (_err) {
            alert("Erro de Conexão, tente novamente mais tarde");

        }
    }


    async function setOperacaoStatusVentiladores() {


        try {

            var status_atual_rele = ventiladores.status_rele;

            var novo_status = 0;
            if (status_atual_rele === 0)
                novo_status = 1;

            var url = "v1/componentes/2?modo_operacao=" + ventiladores.modo_operacao + "&status_rele=" + novo_status + "&nivel_atual=" + ventiladores.nivel_atual;
            //  console.log("Url: " + url);
            await api.post(url).then(function (response) {

                if (response.data !== null) {

                    setTimeout(function () {

                        var url = "v1/componentes/2/";
                        console.log("Url: " + url);
                        api.get(url).then(function (response) {

                            if (response.data !== null) {

                                setVentiladores(response.data);

                                setLoadingVentiladores(false);

                            }
                        });

                    }, 1500);


                }
            });

        } catch (_err) {
            alert("Erro de Conexão, tente novamente mais tarde");

        }
    }


    async function setOperacaoStatusVentiladoresExternos() {


        try {

            var status_atual_rele = ventiladoresExternos.status_rele;

            var novo_status = 0;
            if (status_atual_rele === 0)
                novo_status = 1;

            var url = "v1/componentes/5?modo_operacao=" + ventiladoresExternos.modo_operacao + "&status_rele=" + novo_status + "&nivel_atual=" + ventiladoresExternos.nivel_atual;
            //   console.log("Url: " + url);
            await api.post(url).then(function (response) {

                if (response.data !== null) {

                    setTimeout(function () {

                        var url = "v1/componentes/5/";
                        //   console.log("Url: " + url);
                        api.get(url).then(function (response) {

                            if (response.data !== null) {

                                setVentiladoresExternos(response.data);

                                setLoadingVentiladoresExternos(false);

                            }
                        });

                    }, 1500);


                }
            });

        } catch (_err) {
            alert("Erro de Conexão, tente novamente mais tarde");

        }
    }



    async function atualizarEscopoTemp() {


        try {


            var url = "v1/componentes/atualizarEscopoTemp/2?nivel=" + tempMax + "&nivel_min=" + tempMin;
            //  console.log("Url: " + url);
            await api.post(url).then(function (response) {

                if (response.data !== null) {

                    setTimeout(function () {

                        var url = "v1/componentes/2/";
                        // console.log("Url: " + url);
                        api.get(url).then(function (response) {

                            if (response.data !== null) {
                                setVentiladores(response.data);
                                setLoadingVentiladores(false);
                            }
                        });

                    }, 1500);


                }
            });

        } catch (_err) {
            alert("Erro de Conexão, tente novamente mais tarde");

        }
    }


    async function atualizarEscopoRefrescador() {


        try {


            var url = "v1/componentes/atualizarEscopoCompleto/8?nivel=" + tempMaxRefrescador + "&nivel_min=" + tempMinRefrescador + "&nivel_atual=" + tempIntervalRefrescador;
            console.log("Url: " + url);
            await api.post(url).then(function (response) {

                if (response.data !== null) {
                    console.log(" atualizado");

                    setTimeout(function () {

                        var url = "v1/componentes/8/";
                        // console.log("Url: " + url);
                        api.get(url).then(function (response) {

                            if (response.data !== null) {

                                setRefrescador(response.data);
                                setTempMaxRefrescador(response.data.nivel)
                                setTempMinRefrescador(response.data.nivel_min)
                                setTempIntervalRefrescador(response.data.nivel_atual)

                            }
                        });

                    }, 1500);


                }
            });

        } catch (_err) {
            alert("Erro de Conexão, tente novamente mais tarde");

        }
    }


    async function atualizarEscopoTempBoiler() {


        try {


            var url = "v1/componentes/atualizarEscopoTemp/4?nivel=" + tempMaxBoiler + "&nivel_min=" + tempMinBoiler;
            //    console.log("Url: " + url);
            await api.post(url).then(function (response) {

                if (response.data !== null) {

                    setTimeout(function () {

                        var url = "v1/componentes/4/";
                        //      console.log("Url: " + url);
                        api.get(url).then(function (response) {

                            if (response.data !== null) {
                                setBoilerTemp(response.data);
                                setLoadingBoiler(false);
                            }
                        });

                    }, 1500);


                }
            });

        } catch (_err) {
            alert("Erro de Conexão, tente novamente mais tarde");

        }
    }


    async function atualizarEscopoTempResfriador() {


        try {


            var url = "v1/componentes/atualizarEscopoTemp/6?nivel=" + tempMaxResfriador + "&nivel_min=" + tempMaxResfriador;
            //     console.log("Url: " + url);
            await api.post(url).then(function (response) {

                if (response.data !== null) {

                    setTimeout(function () {

                        var url = "v1/componentes/6/";
                        //     console.log("Url: " + url);
                        api.get(url).then(function (response) {

                            if (response.data !== null) {
                                setResfriador(response.data);
                                setLoadingResfriador(false);
                            }
                        });

                    }, 1500);


                }
            });

        } catch (_err) {
            alert("Erro de Conexão, tente novamente mais tarde");

        }
    }


    async function atualizarEscopoMin() {


        try {


            var url = "v1/componentes/atualizarEscopoTemp/1?nivel=" + escopoMin + "&nivel_min=" + escopoMin;
            //   console.log("Url: " + url);
            await api.post(url).then(function (response) {

                if (response.data !== null) {

                    setTimeout(function () {

                        var url = "v1/componentes/1/";
                        //   console.log("Url: " + url);
                        api.get(url).then(function (response) {

                            if (response.data !== null) {
                                setReservatrio(response.data);
                                setLoadingReservatorio(false);
                            }
                        });

                    }, 1500);


                }
            });

        } catch (_err) {
            alert("Erro de Conexão, tente novamente mais tarde");

        }
    }


    async function atualizarEscopoMinBoiler() {


        try {


            var url = "v1/componentes/atualizarEscopoTemp/3?nivel=" + escopoMinBoiler + "&nivel_min=" + escopoMinBoiler;
            //  console.log("Url: " + url);
            await api.post(url).then(function (response) {

                if (response.data !== null) {

                    setTimeout(function () {

                        var url = "v1/componentes/3/";
                        //  console.log("Url: " + url);
                        api.get(url).then(function (response) {

                            if (response.data !== null) {
                                setBoiler(response.data);
                                setLoadingBoiler(false);
                            }
                        });

                    }, 1500);


                }
            });

        } catch (_err) {
            alert("Erro de Conexão, tente novamente mais tarde");

        }
    }


    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };





    useEffect(() => {

        async function pesquisarBackGroundTodosOsComponentesInicio() {

            try {

                var url = "v1/componentes/web";
                //   console.log("Url: " + url);
                await api.get(url).then(function (response) {

                    if (response.data !== null) {



                        //reservatorio

                        //  console.log(" Reservatorio: " + response.data[0]);
                        setReservatrio(response.data[0].componente);
                        setEscopoMin(response.data[0].componente.nivel)



                        //ventiladores internos

                        //  console.log(" Ventilador: " + response.data[1]);
                        setVentiladores(response.data[1].componente);
                        setTempMax(response.data[1].componente.nivel)
                        setTempMin(response.data[1].componente.nivel_min)



                        //boiler
                        //boiler caixa
                        // console.log(" Boiler Caixa: " + response.data[2]);
                        setBoiler(response.data[2].componente);
                        setEscopoMinBoiler(response.data[2].componente.nivel)

                        //boiler temp
                        // console.log(" Boiler Temp: " + response.data[3]);
                        setBoilerTemp(response.data[3].componente);
                        setTempMaxBoiler(response.data[3].componente.nivel)
                        setTempMinBoiler(response.data[3].componente.nivel_min)
                        setBoilerHorarios(response.data[3].horarios);



                        //ventiladores externos
                        //  console.log(" Ventiladores Externos: " + response.data[4]);
                        setVentiladoresExternos(response.data[4].componente);


                        //resfriador
                        // console.log(" Resfriador: " + response.data[5]);
                        setResfriador(response.data[5].componente);
                        setTempMaxResfriador(response.data[5].componente.nivel)
                        setResfriadorHorarios(response.data[5].horarios);


                        //refrescador
                        //  console.log(" Refrescador: " + response.data[7]);
                        setRefrescador(response.data[7].componente);
                        setTempMaxRefrescador(response.data[7].componente.nivel)
                        setTempIntervalRefrescador(response.data[7].componente.nivel_atual)
                        setTempMinRefrescador(response.data[7].componente.nivel_min)
                        setRefrescadorHorarios(response.data[7].horarios);


                        //ventiladores aspersores
                        //  console.log(" Refrescador: " + response.data[7]);
                        setVentiladoresAspersores(response.data[8].componente);


                        setRele4(response.data[9].componente);
                        setRele5(response.data[10].componente);


                        setLoadingBoiler(false);
                        setLoadingVentiladoresExternos(false);
                        setLoadingResfriador(false);
                        setLoadingRefrescador(false);
                        setLoadingVentiladoresAspersores(false);
                        setLoadingVentiladores(false);
                        setLoadingReservatorio(false);
                        setLoadingRele4(false);
                        setLoadingRele5(false);
                    }
                });

            } catch (_err) {

            }

        }

        pesquisarBackGroundTodosOsComponentesInicio();



    }, []);



    useEffect(() => {
        //const ws = new WebSocket("ws://192.168.1.207:8080/monitoramentowebsocket");
        const ws = new WebSocket("wss://pkaislan234-36840.portmap.io:36840/monitoramentowebsocket");

        ws.onopen = function () {
            console.log("WebSocket connection open");
            ws.send(JSON.stringify({ destination: "/app/mensagem" }));
        };

        ws.onmessage = function (e) {
            //  console.log("WebSocket message received: ", e.data);

            let data = JSON.parse(e.data);
            //console.log("Resposta: " + data);
            //reservatorio

            //  console.log(" Reservatorio: " + response.data[0]);
            setReservatrio(data[0].componente);
            setEscopoMin(data[0].componente.nivel)



            //ventiladores internos

            //  console.log(" Ventilador: " + response.data[1]);
            setVentiladores(data[1].componente);
            setTempMax(data[1].componente.nivel)
            setTempMin(data[1].componente.nivel_min)



            //boiler
            //boiler caixa
            // console.log(" Boiler Caixa: " + response.data[2]);
            setBoiler(data[2].componente);
            setEscopoMinBoiler(data[2].componente.nivel)

            //boiler temp
            // console.log(" Boiler Temp: " + response.data[3]);
            setBoilerTemp(data[3].componente);
            setTempMaxBoiler(data[3].componente.nivel)
            setTempMinBoiler(data[3].componente.nivel_min)
            setBoilerHorarios(data[3].horarios);



            //ventiladores externos
            //  console.log(" Ventiladores Externos: " + response.data[4]);
            setVentiladoresExternos(data[4].componente);


            //resfriador
            // console.log(" Resfriador: " + response.data[5]);
            setResfriador(data[5].componente);
            setTempMaxResfriador(data[5].componente.nivel)
            setResfriadorHorarios(data[5].horarios);



            //refrescador
            //  console.log(" Refrescador: " + response.data[7]);
            setRefrescador(data[7].componente);
            setTempMaxRefrescador(data[7].componente.nivel)
            setTempMinRefrescador(data[7].componente.nivel_min)
            setRefrescadorHorarios(data[7].horarios);


            //ventiladores aspersores
            //  console.log(" Refrescador: " + response.data[7]);
            setVentiladoresAspersores(data[8].componente);


            setRele4(data[9].componente);
            setRele5(data[10].componente);


            console.log("Componentes atualizados via websocket");


        };

        ws.onclose = function () {
            console.log("WebSocket connection closed");
        };

        return () => {
            ws.close();
        };
    }, []);




    /*
    useEffect(() => {




        const interval = setInterval(() => {
            async function pesquisarBackGroundTodosOsComponentes() {

                // setLoadingBoiler(true);
                //setLoadingReservatorio(true);
                // aqui

                console.log("Executando chamada de componentes em background!");

                try {

                    var url = "v1/componentes/web";
                    //   console.log("Url: " + url);
                    await api.get(url).then(function (response) {

                        if (response.data !== null) {


                            //reservatorio

                            //  console.log(" Reservatorio: " + response.data[0]);
                            setReservatrio(response.data[0].componente);
                            setEscopoMin(response.data[0].componente.nivel)



                            //ventiladores internos

                            //  console.log(" Ventilador: " + response.data[1]);
                            setVentiladores(response.data[1].componente);
                            setTempMax(response.data[1].componente.nivel)
                            setTempMin(response.data[1].componente.nivel_min)



                            //boiler
                            //boiler caixa
                            // console.log(" Boiler Caixa: " + response.data[2]);
                            setBoiler(response.data[2].componente);
                            setEscopoMinBoiler(response.data[2].componente.nivel)

                            //boiler temp
                            // console.log(" Boiler Temp: " + response.data[3]);
                            setBoilerTemp(response.data[3].componente);
                            setTempMaxBoiler(response.data[3].componente.nivel)
                            setTempMinBoiler(response.data[3].componente.nivel_min)
                            setBoilerHorarios(response.data[3].horarios);



                            //ventiladores externos
                            //  console.log(" Ventiladores Externos: " + response.data[4]);
                            setVentiladoresExternos(response.data[4].componente);


                            //resfriador
                            // console.log(" Resfriador: " + response.data[5]);
                            setResfriador(response.data[5].componente);
                            setTempMaxResfriador(response.data[5].componente.nivel)
                            setResfriadorHorarios(response.data[5].horarios);



                            //refrescador
                            //  console.log(" Refrescador: " + response.data[7]);
                            setRefrescador(response.data[7].componente);
                            setTempMaxRefrescador(response.data[7].componente.nivel)
                            setTempMinRefrescador(response.data[7].componente.nivel_min)
                            setRefrescadorHorarios(response.data[7].horarios);


                            //ventiladores aspersores
                            //  console.log(" Refrescador: " + response.data[7]);
                            setVentiladoresAspersores(response.data[8].componente);


                            setRele4(response.data[9].componente);
                            setRele5(response.data[10].componente);



                        }
                    });
                    console.log("finalizada chamada de componentes em background")

                } catch (_err) {

                }

            }
            pesquisarBackGroundTodosOsComponentes();


        }, 30000);

        return () => clearInterval(interval);


    }, []);
    */


    /*
    
        useEffect(() => {
            const interval = setInterval(() => {
                sortWorker().then((result) => {
                    console.log("Resultado da chamada", result);
    
                    const response = result;
                    if (response !== null) {
    
    
                        //reservatorio
    
                         console.log(" Reservatorio: " + response[0].componente);
                        setReservatrio(response[0].componente);
                        setEscopoMin(response[0].componente.nivel)
    
    
    
                        //ventiladores internos
    
                        //  console.log(" Ventilador: " + response.data[1]);
                        setVentiladores(response[1].componente);
                        setTempMax(response[1].componente.nivel)
                        setTempMin(response[1].componente.nivel_min)
    
    
    
                        //boiler
                        //boiler caixa
                        // console.log(" Boiler Caixa: " + response.data[2]);
                        setBoiler(response[2].componente);
                        setEscopoMinBoiler(response[2].componente.nivel)
    
                        //boiler temp
                        // console.log(" Boiler Temp: " + response.data[3]);
                        setBoilerTemp(response[3].componente);
                        setTempMaxBoiler(response[3].componente.nivel)
                        setTempMinBoiler(response[3].componente.nivel_min)
                        setBoilerHorarios(response[3].horarios);
    
    
    
                        //ventiladores externos
                        //  console.log(" Ventiladores Externos: " + response.data[4]);
                        setVentiladoresExternos(response[4].componente);
    
    
                        //resfriador
                        // console.log(" Resfriador: " + response.data[5]);
                        setResfriador(response[5].componente);
                        setTempMaxResfriador(response[5].componente.nivel)
                        setResfriadorHorarios(response[5].horarios);
    
    
                        //refrescador
                        //  console.log(" Refrescador: " + response.data[7]);
                        setRefrescador(response[7].componente);
                        setTempMaxRefrescador(response[7].componente.nivel)
                        setTempIntervalRefrescador(response[7].componente.nivel_atual)
                        setTempMinRefrescador(response[7].componente.nivel_min)
                        setRefrescadorHorarios(response[7].horarios);
    
    
    
                    }
                    
                });
    
    
            }, 20000);
    
            return () => clearInterval(interval);
    
    
        }, []);
    */














    return (


        <div style={{
            margin: 0
        }}>





            <Box style={{ backgroundColor: 'Silver', width: '100%' }}>
                <AppBar position="static" >

                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"

                    >
                        <Tab label="Reservatório de Água" style={{ backgroundColor: '#1C1C1C' }} />
                        <Tab label="Boiler" style={{ backgroundColor: 'green' }} />
                        <Tab label="Ventiladores" style={{ backgroundColor: 'blue' }} />
                        <Tab label="Resfriador" style={{ backgroundColor: 'orange' }} />
                        <Tab label="Aspersão" style={{ backgroundColor: 'purple' }} />
                        <Tab label="Reles" style={{ backgroundColor: 'red' }} />

                    </Tabs>
                </AppBar>
            </Box>

            <SwipeableViews
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <div value={value} index={0} >
                    {
                        loadingReservatorio ?
                            <Skeleton animation={"wave"} width={'100%'} style={{ backgroundColor: '#48D1CC' }
                            } >
                            </Skeleton>
                            :


                            <Grid
                                container
                                item xs={12} sm={12} md={12} lg={12} xl={12}
                                alignItems={"center"}
                                justifyContent={"center"}
                            >

                                <Grid
                                    container
                                    item xs={12} sm={12} md={12} lg={12} xl={12}
                                    alignItems={"center"}
                                    justifyContent={"center"}
                                    style={{ margin: 10 }}
                                >
                                    <Grid
                                        item xs={12} sm={12} md={6} lg={6} xl={6}
                                        container
                                        alignItems={"flex-end"}
                                        justifyContent={"flex-end"}
                                    >

                                        <Typography style={{ fontWeight: 'bold', fontSize: '28px' }}>Reservatório De Água</Typography>
                                    </Grid>
                                    <Grid
                                        item xs={6} sm={6} md={6} lg={6} xl={6}
                                        container
                                        alignItems={"center"}
                                        justifyContent={"center"}
                                    >
                                        <img
                                            width="100px" height={"100px"}
                                            src="https://cdn-icons-png.flaticon.com/512/2109/2109224.png"
                                            alt="bomba de agua"
                                        />
                                    </Grid>
                                </Grid>


                                <Grid
                                    item xs={12} sm={12} md={6} lg={6} xl={6}
                                    container
                                    alignItems={"center"}
                                    justifyContent={"center"}
                                    style={{ margin: 10, border: '1px solid black' }}
                                >

                                    <Grid
                                        container
                                        direction='row'
                                        item xs={12} sm={12} md={12} lg={12} xl={12}
                                        alignItems="flex-end"
                                        justifyContent={"center"}
                                    >
                                        <Grid
                                            container
                                            item xs={4} sm={4} md={4} lg={4} xl={4}
                                            alignItems="flex-end"
                                            justifyContent={"flex-end"}
                                        ><span style={{ fontSize: '22px' }} >Manual</span></Grid>
                                        <Grid
                                            container
                                            item xs={4} sm={4} md={4} lg={4} xl={4}
                                            alignItems="center"
                                            justifyContent={"center"}

                                        >

                                            <FormControlLabel
                                                control={
                                                    <MuiSwitchLarge
                                                        checked={reservatorio.modo_operacao === 0 ? false : true}
                                                        onChange={() => setOperacaoReservatorio()}
                                                        size="medium"

                                                    />
                                                }
                                                label={<Typography style={{ color: '#000', fontSize: 26 }}>Operação</Typography>}
                                                labelPlacement="top"
                                            />
                                        </Grid>
                                        <Grid
                                            container
                                            item xs={4} sm={4} md={4} lg={4} xl={4}
                                            justifyContent={"flex-start"}
                                        >
                                            <span style={{ fontSize: '22px' }}>Automatico</span>
                                        </Grid>



                                    </Grid>




                                    <Grid
                                        item xs={12} sm={12} md={6} lg={6} xl={6}
                                        container
                                        alignItems={"center"}
                                        justifyContent={"center"}
                                        style={{ margin: 10 }}
                                    >

                                        <Grid
                                            container
                                            direction='row'
                                            item xs={12} sm={12} md={12} lg={12} xl={12}
                                            alignItems="flex-end"
                                            justifyContent={"center"}
                                        >
                                            <Grid
                                                container
                                                item xs={4} sm={4} md={4} lg={4} xl={4}
                                                alignItems="flex-end"
                                                justifyContent={"flex-end"}
                                            ><span style={{ fontSize: '22px' }} >Desligado</span></Grid>
                                            <Grid
                                                container
                                                item xs={4} sm={4} md={4} lg={4} xl={4}
                                                alignItems="center"
                                                justifyContent={"center"}

                                            >

                                                <FormControlLabel
                                                    control={
                                                        <MuiSwitchLarge
                                                            size="medium"
                                                            disabled={reservatorio.modo_operacao === 1 ? true : false}
                                                            checked={reservatorio.status_rele === 1 ? true : false}
                                                            onChange={() => setOperacaoStatus()}

                                                        />
                                                    }
                                                    label={<Typography style={{ color: '#000', fontSize: 26 }}>Status</Typography>}
                                                    labelPlacement="top"
                                                />
                                            </Grid>
                                            <Grid
                                                container
                                                item xs={4} sm={4} md={4} lg={4} xl={4}
                                                justifyContent={"flex-start"}
                                            >
                                                <span style={{ fontSize: '22px' }}>Ligado</span>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}
                                        container
                                        direction="row"
                                        alignItems="center"
                                        style={{ paddingTop: 20 }}
                                    >

                                        <Grid item xs={3}
                                            container
                                            direction="row"
                                            alignItems="flex-end"
                                            justifyContent='flex-end'
                                            style={{ margin: 5 }}
                                        >
                                            <Typography style={{ fontSize: 22 }}>
                                                Escopo:
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={2}
                                            container
                                            direction="row"
                                            alignItems="center"
                                            style={{ margin: 5 }}
                                        >
                                            <TextField
                                                variant="standard"
                                                name="escopoMin"
                                                label="Min"
                                                id="escopoMin"
                                                value={escopoMin}
                                                onChange={e => (e.target.value === '' || /^[.0-9\b]+$/.test(e.target.value)) ? setEscopoMin(e.target.value) : null}

                                            />

                                        </Grid>
                                        <Grid item xs={3}
                                            container
                                            direction="row"
                                            alignItems="center"
                                        >
                                            <Button
                                                fullWidth
                                                size="large"
                                                variant="contained"
                                                color="primary"
                                                onClick={atualizarEscopoMin}
                                            > ok  </Button>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12}
                                        container
                                        direction="row"
                                        alignItems="flex-end"
                                        justifyContent="flex-end"
                                        style={{ margin: 10 }}
                                    >
                                        <Grid item xs={8}
                                            container
                                            direction="row"
                                            alignItems="flex-end"
                                        >
                                            <span > Último Acionamento: {reservatorio.ultimo_acionamento}</span>

                                        </Grid>
                                    </Grid>

                                </Grid>

                                <Grid
                                    container
                                    item xs={12} sm={12} md={5} lg={5} xl={5}
                                    alignItems={"center"}
                                    justifyContent={"center"}
                                    style={{ marginTop: 50 }}
                                >

                                    <div>
                                        <ReactSpeedometer
                                            maxValue={100}
                                            width={400}
                                            needleHeightRatio={0.6}
                                            value={reservatorio.nivel_atual}
                                            currentValueText="Nível"
                                            customSegmentLabels={[
                                                {
                                                    text: "Vazio",
                                                    position: "INSIDE",
                                                    color: "#555",
                                                },
                                                {
                                                    text: "Baixo",
                                                    position: "INSIDE",
                                                    color: "#555",
                                                },
                                                {
                                                    text: "Meio",
                                                    position: "INSIDE",
                                                    color: "#555",
                                                    fontSize: "19px",
                                                },
                                                {
                                                    text: "Meio-Cheio",
                                                    position: "INSIDE",
                                                    color: "#555",
                                                },
                                                {
                                                    text: "Cheio",
                                                    position: "INSIDE",
                                                    color: "#555",
                                                },
                                            ]}
                                        />

                                    </div>
                                </Grid>


                              

                            </Grid>

                    }
                </div >

                <div value={value} index={1} >


                    {
                        loadingBoiler ?
                            <Skeleton animation={"wave"} width={'100%'} style={{ backgroundColor: '#48D1CC' }
                            } >
                            </Skeleton>
                            :


                            <Grid
                                container
                                item xs={12} sm={12} md={12} lg={12} xl={12}
                                alignItems={"center"}
                                justifyContent={"center"}
                            >

                                <Grid
                                    container
                                    item xs={12} sm={12} md={12} lg={12} xl={12}
                                    alignItems={"center"}
                                    justifyContent={"center"}
                                    style={{ margin: 10 }}
                                >
                                    <Grid
                                        item xs={6} sm={6} md={6} lg={6} xl={6}
                                        container
                                        alignItems={"flex-end"}
                                        justifyContent={"flex-end"}
                                    >

                                        <Typography style={{ fontWeight: 'bold', fontSize: '28px' }}>Boiler</Typography>
                                    </Grid>
                                    <Grid
                                        item xs={6} sm={6} md={6} lg={6} xl={6}
                                        container
                                        alignItems={"center"}
                                        justifyContent={"center"}
                                    >
                                        <img
                                            width="100px" height={"100px"}
                                            src="https://cdn-icons-png.flaticon.com/512/7959/7959053.png"
                                            alt="bomba de agua"
                                        />
                                    </Grid>
                                </Grid>


                                <Grid
                                    item xs={12} sm={12} md={6} lg={6} xl={6}
                                    container
                                    alignItems={"center"}
                                    justifyContent={"center"}
                                    style={{ margin: 10, border: '1px solid black' }}
                                >

                                    <Grid
                                        container
                                        direction='row'
                                        item xs={12} sm={12} md={12} lg={12} xl={12}
                                        alignItems="flex-end"
                                        justifyContent={"center"}
                                    >
                                        <Grid
                                            container
                                            item xs={4} sm={4} md={4} lg={4} xl={4}
                                            alignItems="flex-end"
                                            justifyContent={"flex-end"}
                                        ><span style={{ fontSize: '22px' }} >Manual</span></Grid>
                                        <Grid
                                            container
                                            item xs={4} sm={4} md={4} lg={4} xl={4}
                                            alignItems="center"
                                            justifyContent={"center"}

                                        >

                                            <FormControlLabel
                                                control={
                                                    <MuiSwitchLarge
                                                        checked={boiler.modo_operacao === 0 ? false : true}
                                                        onChange={() => setOperacaoBoiler()}
                                                        size="medium"

                                                    />
                                                }
                                                label={<Typography style={{ color: '#000', fontSize: 26 }}>Operação</Typography>}
                                                labelPlacement="top"
                                            />
                                        </Grid>
                                        <Grid
                                            container
                                            item xs={4} sm={4} md={4} lg={4} xl={4}
                                            justifyContent={"flex-start"}
                                        >
                                            <span style={{ fontSize: '22px' }}>Automatico</span>
                                        </Grid>
                                    </Grid>





                                </Grid>

                                <Grid
                                    container
                                    direction='row'
                                    item xs={12} sm={12} md={6} lg={6} xl={6}
                                    alignItems={"center"}
                                    justifyContent={"center"}
                                    style={{ marginTop: 50 }}

                                >


                                    <Grid
                                        container
                                        direction="row"
                                        item xs={12} sm={12} md={12} lg={12} xl={12}
                                        alignItems="flex-end"
                                        justifyContent='flex-end'
                                    >

                                        <Grid
                                            container
                                            direction='row'
                                            item xs={12} sm={12} md={12} lg={12} xl={12}
                                            alignItems="flex-end"
                                            justifyContent={"center"}
                                        >
                                            <Grid
                                                container
                                                item xs={4} sm={4} md={4} lg={4} xl={4}
                                                alignItems="flex-end"
                                                justifyContent={"flex-end"}
                                            ><span style={{ fontSize: '22px' }} >Desligado</span></Grid>
                                            <Grid
                                                container
                                                item xs={4} sm={4} md={4} lg={4} xl={4}
                                                alignItems="center"
                                                justifyContent={"center"}

                                            >

                                                <FormControlLabel
                                                    control={
                                                        <MuiSwitchLarge
                                                            size="medium"
                                                            disabled={boiler.modo_operacao === 1 ? true : false}
                                                            checked={boiler.status_rele === 1 ? true : false}
                                                            onChange={() => setOperacaoStatusBoiler()}

                                                        />
                                                    }
                                                    label={<Typography style={{ color: '#000', fontSize: 26 }}>Status</Typography>}
                                                    labelPlacement="top"
                                                />
                                            </Grid>
                                            <Grid
                                                container
                                                item xs={4} sm={4} md={4} lg={4} xl={4}
                                                justifyContent={"flex-start"}
                                            >
                                                <span style={{ fontSize: '22px' }}>Ligado</span>
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}
                                        container
                                        direction="row"
                                        alignItems="center"
                                        style={{ paddingTop: 20 }}
                                        justifyContent='center'
                                    >

                                        <Grid item xs={3}
                                            container
                                            direction="row"
                                            alignItems="flex-end"
                                            justifyContent='flex-end'
                                            style={{ margin: 5 }}
                                        >
                                            <Typography style={{ fontSize: 22 }}>
                                                Escopo:
                                            </Typography>
                                        </Grid>

                                        <Grid item xs={2}
                                            container
                                            direction="row"
                                            alignItems="center"
                                            style={{ margin: 5 }}
                                        >
                                            <TextField
                                                variant="standard"
                                                name="escopoMinBoiler"
                                                label="Min"
                                                id="escopoMinBoiler"
                                                value={escopoMinBoiler}
                                                onChange={e => (e.target.value === '' || /^[.0-9\b]+$/.test(e.target.value)) ? setEscopoMinBoiler(e.target.value) : null}

                                            />

                                        </Grid>
                                        <Grid item xs={3}
                                            container
                                            direction="row"
                                            alignItems="center"
                                        >
                                            <Button
                                                size="large"
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                onClick={atualizarEscopoMinBoiler}
                                            > ok  </Button>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}
                                        container
                                        direction="row"
                                        alignItems="flex-end"
                                        justifyContent="flex-end"
                                        style={{ margin: 10 }}
                                    >
                                        <Grid item xs={8}
                                            container
                                            direction="row"
                                            alignItems="flex-end"
                                        >
                                            <span > Último Acionamento: {boiler.ultimo_acionamento}</span>

                                        </Grid>
                                    </Grid>

                                </Grid>




                                <Grid
                                    container
                                    item xs={12} sm={12} md={6} lg={6} xl={6}
                                    alignItems={"flex-start"}
                                    justifyContent={"flex-start"}
                                    style={{ marginTop: 50 }}
                                >

                                    <div>
                                        <ReactSpeedometer
                                            maxValue={100}
                                            width={400}
                                            needleHeightRatio={0.4}
                                            value={boiler.nivel_atual}
                                            currentValueText="Nível"
                                            customSegmentLabels={[
                                                {
                                                    text: "Vazio",
                                                    position: "INSIDE",
                                                    color: "#555",
                                                },
                                                {
                                                    text: "Baixo",
                                                    position: "INSIDE",
                                                    color: "#555",
                                                },
                                                {
                                                    text: "Meio",
                                                    position: "INSIDE",
                                                    color: "#555",
                                                    fontSize: "19px",
                                                },
                                                {
                                                    text: "Meio-Cheio",
                                                    position: "INSIDE",
                                                    color: "#555",
                                                },
                                                {
                                                    text: "Cheio",
                                                    position: "INSIDE",
                                                    color: "#555",
                                                },

                                            ]}
                                        />

                                    </div>


                                </Grid>


                                <Grid
                                    container
                                    direction="row"
                                    item xs={12} sm={12} md={6} lg={6} xl={6}
                                    alignItems="flex-end"
                                    justifyContent='flex-end'
                                >

                                    <Grid
                                        container
                                        direction='row'
                                        item xs={12} sm={12} md={12} lg={12} xl={12}
                                        alignItems="flex-end"
                                        justifyContent={"center"}
                                    >
                                        <Grid
                                            container
                                            item xs={4} sm={4} md={4} lg={4} xl={4}
                                            alignItems="flex-end"
                                            justifyContent={"flex-end"}
                                        ><span style={{ fontSize: '22px' }} >Desligado</span></Grid>
                                        <Grid
                                            container
                                            item xs={4} sm={4} md={4} lg={4} xl={4}
                                            alignItems="center"
                                            justifyContent={"center"}

                                        >

                                            <FormControlLabel
                                                control={
                                                    <MuiSwitchLarge
                                                        size="medium"
                                                        disabled={boiler.modo_operacao === 1 ? true : false}
                                                        checked={boilerTemp.status_rele === 1 ? true : false}
                                                        onChange={() => setOperacaoStatusBoilerTemp()}

                                                    />
                                                }
                                                label={<Typography style={{ color: '#000', fontSize: 26 }}>Status</Typography>}
                                                labelPlacement="top"
                                            />
                                        </Grid>
                                        <Grid
                                            container
                                            item xs={4} sm={4} md={4} lg={4} xl={4}
                                            justifyContent={"flex-start"}
                                        >
                                            <span style={{ fontSize: '22px' }}>Ligado</span>
                                        </Grid>
                                    </Grid>

                                    <Grid
                                        item xs={12} sm={12} md={12} lg={12} xl={12}
                                        container
                                        direction="row"
                                        alignItems="center"
                                        style={{ paddingTop: 20 }}
                                    >

                                        <Grid item xs={3}
                                            container
                                            direction="row"
                                            alignItems="flex-end"
                                            justifyContent='flex-end'
                                            style={{ margin: 5 }}
                                        >
                                            <Typography style={{ fontSize: 22 }}>
                                                Escopo:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={2}
                                            container
                                            direction="row"
                                            alignItems="center"
                                            style={{ margin: 5 }}
                                        >

                                            <TextField
                                                variant="standard"
                                                name="tempMaxBoiler"
                                                label="Max"
                                                id="tempMaxBoiler"
                                                value={tempMaxBoiler}
                                                onChange={e => (e.target.value === '' || /^[.0-9\b]+$/.test(e.target.value)) ? setTempMaxBoiler(e.target.value) : null}

                                            />
                                        </Grid>
                                        <Grid item xs={2}
                                            container
                                            direction="row"
                                            alignItems="center"
                                            style={{ margin: 5 }}
                                        >
                                            <TextField
                                                variant="standard"
                                                name="tempMinBoiler"
                                                label="Min"
                                                id="tempMinBoiler"
                                                value={tempMinBoiler}
                                                onChange={e => (e.target.value === '' || /^[.0-9\b]+$/.test(e.target.value)) ? setTempMinBoiler(e.target.value) : null}

                                            />

                                        </Grid>
                                        <Grid item xs={3}
                                            container
                                            direction="row"
                                            alignItems="center"
                                        >
                                            <Button
                                                fullWidth
                                                size="large"
                                                variant="contained"
                                                color="primary"
                                                onClick={atualizarEscopoTempBoiler}
                                            > ok  </Button>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}
                                        container
                                        direction="row"
                                        alignItems="flex-end"
                                        justifyContent="flex-end"
                                        style={{ margin: 10 }}
                                    >
                                        <Grid item xs={8}
                                            container
                                            direction="row"
                                            alignItems="flex-end"
                                        >
                                            <span > Último Acionamento: {boilerTemp.ultimo_acionamento}</span>

                                        </Grid>
                                    </Grid>

                                </Grid>

                                <Grid
                                    container
                                    item xs={12} sm={12} md={6} lg={6} xl={6}
                                    alignItems={"flex-start"}
                                    justifyContent={"flex-start"}
                                    style={{ marginTop: 50 }}
                                >

                                    <div>
                                        <Thermometer
                                            theme="dark"
                                            value={boilerTemp.nivel_atual}
                                            max="150"
                                            steps="3"
                                            format="°C"
                                            size="small"
                                            height="120"
                                        />
                                    </div>
                                </Grid>


                                <Grid
                                    item xs={12} sm={12} md={8} lg={8} xl={8}
                                    container
                                    direction="row"
                                    alignItems="center"
                                    justifyContent={"center"}
                                    style={{ paddingTop: 50 }}
                                >

                                    <Grid item xs={12}
                                        container
                                        direction="row"
                                        alignItems="center"
                                    >

                                        <TableContainer component={Paper} style={{ backgroundColor: 'Silver' }}>
                                            <Table aria-label="collapsible table">
                                                <TableHead style={{ backgroundColor: 'Silver' }}>
                                                    <TableRow style={{ fontSize: 8 }}>
                                                        <TableCell style={{ backgroundColor: 'black', color: 'white', position: "sticky", top: 0, textAlign: "center" }} colSpan={2}>Hora Inicial</TableCell>
                                                        <TableCell style={{ backgroundColor: 'black', color: 'white', position: "sticky", top: 0, textAlign: "center" }} colSpan={2}>Hora Final</TableCell>
                                                        <TableCell style={{ backgroundColor: 'black', color: 'white', position: "sticky", top: 0, textAlign: "center" }} colSpan={1}>Status</TableCell>


                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {boilerHorarios.map((horario) => (
                                                        <Row key={horario.id_horario} row={horario} />
                                                    ))}


                                                    <React.Fragment>
                                                        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} style={{ textAlign: "center", fontSize: 14 }}>

                                                            <TableCell colSpan={2} align="center">

                                                                <TextField
                                                                    variant="standard"
                                                                    name="horaInicio"
                                                                    label="Inicio"
                                                                    id="escopoMin"
                                                                    value={newHoraInicio}
                                                                    onChange={handleChangeHoraInicio}
                                                                    fullWidth
                                                                />
                                                            </TableCell>
                                                            <TableCell colSpan={2} align="center">
                                                                <TextField
                                                                    variant="standard"
                                                                    name="escopoMin"
                                                                    label="Min"
                                                                    id="escopoMin"
                                                                    value={newHoraFim}
                                                                    onChange={handleChangeHoraFim}
                                                                    fullWidth
                                                                />
                                                            </TableCell>
                                                            <TableCell colSpan={1} align="center"><span ></span></TableCell>
                                                            <TableCell colSpan={1} align="center">
                                                                <Grid item xs={12} >
                                                                    <ColorButton color="secondary" onClick={() => inserir()} >Novo</ColorButton>
                                                                </Grid>

                                                            </TableCell>

                                                        </TableRow>
                                                    </React.Fragment>

                                                </TableBody>
                                            </Table>
                                        </TableContainer >
                                    </Grid>
                                </Grid>



                             

                               

                               

                              


                            </Grid>
                    }

                </div >
                <div value={value} index={2} >
                    {
                        loadingVentiladores ?
                            <Skeleton animation={"wave"} width={'100%'} style={{ backgroundColor: '#48D1CC' }
                            } >
                            </Skeleton>
                            :


                            <Grid
                                container
                                item xs={12} sm={12} md={12} lg={12} xl={12}
                                alignItems={"center"}
                                justifyContent={"center"}
                            >

                                <Grid
                                    container
                                    item xs={12} sm={12} md={12} lg={12} xl={12}
                                    alignItems={"center"}
                                    justifyContent={"center"}
                                    style={{ margin: 10 }}
                                >
                                    <Grid
                                        item xs={6} sm={6} md={6} lg={6} xl={6}
                                        container
                                        alignItems={"flex-end"}
                                        justifyContent={"flex-end"}
                                    >

                                        <Typography style={{ fontWeight: 'bold', fontSize: '28px' }}>Ventilação</Typography>
                                    </Grid>
                                    <Grid
                                        item xs={6} sm={6} md={6} lg={6} xl={6}
                                        container
                                        alignItems={"center"}
                                        justifyContent={"center"}
                                    >
                                        <img
                                            width="100px" height={"100px"}
                                            src="https://cdn-icons-png.flaticon.com/512/979/979568.png"
                                            alt="ventilacao"
                                        />
                                    </Grid>
                                </Grid>


                                <Grid
                                    item xs={12} sm={12} md={5} lg={5} xl={5}
                                    container
                                    alignItems={"center"}
                                    justifyContent={"center"}
                                    style={{ margin: 10, border: '1px solid black' }}
                                >

                                    <Grid
                                        container
                                        direction='row'
                                        item xs={12} sm={12} md={12} lg={12} xl={12}
                                        alignItems="flex-end"
                                        justifyContent={"center"}
                                    >
                                        <Grid
                                            container
                                            item xs={4} sm={4} md={4} lg={4} xl={4}
                                            alignItems="flex-end"
                                            justifyContent={"flex-end"}
                                        ><span style={{ fontSize: '22px' }} >Manual</span></Grid>
                                        <Grid
                                            container
                                            item xs={4} sm={4} md={4} lg={4} xl={4}
                                            alignItems="center"
                                            justifyContent={"center"}

                                        >

                                            <FormControlLabel
                                                control={
                                                    <MuiSwitchLarge
                                                        checked={ventiladores.modo_operacao === 0 ? false : true}
                                                        onChange={() => setOperacaoVentiladores()}
                                                        size="medium"

                                                    />
                                                }
                                                label={<Typography style={{ color: '#000', fontSize: 26 }}>Operação</Typography>}
                                                labelPlacement="top"
                                            />
                                        </Grid>
                                        <Grid
                                            container
                                            item xs={4} sm={4} md={4} lg={4} xl={4}
                                            justifyContent={"flex-start"}
                                        >
                                            <span style={{ fontSize: '22px' }}>Automatico</span>
                                        </Grid>
                                    </Grid>



                                    <Grid
                                        item xs={12} sm={12} md={8} lg={8} xl={8}
                                        container
                                        alignItems={"center"}
                                        justifyContent={"center"}
                                        style={{ margin: 10 }}
                                    >

                                        <Grid
                                            container
                                            direction='row'
                                            item xs={12} sm={12} md={12} lg={12} xl={12}
                                            alignItems="flex-end"
                                            justifyContent={"center"}
                                        >
                                            <Grid
                                                container
                                                item xs={4} sm={4} md={4} lg={4} xl={4}
                                                alignItems="flex-end"
                                                justifyContent={"flex-end"}
                                            ><span style={{ fontSize: '22px' }} >Desligado</span></Grid>
                                            <Grid
                                                container
                                                item xs={4} sm={4} md={4} lg={4} xl={4}
                                                alignItems="center"
                                                justifyContent={"center"}

                                            >

                                                <FormControlLabel
                                                    control={
                                                        <MuiSwitchLarge
                                                            size="medium"
                                                            disabled={ventiladores.modo_operacao === 1 ? true : false}
                                                            checked={ventiladores.status_rele === 1 ? true : false}
                                                            onChange={() => setOperacaoStatusVentiladores()}

                                                        />
                                                    }
                                                    label={<Typography style={{ color: '#000', fontSize: 26 }}>Interno</Typography>}
                                                    labelPlacement="top"
                                                />
                                            </Grid>
                                            <Grid
                                                container
                                                item xs={4} sm={4} md={4} lg={4} xl={4}
                                                justifyContent={"flex-start"}
                                            >
                                                <span style={{ fontSize: '22px' }}>Ligado</span>
                                            </Grid>
                                        </Grid>

                                        <Grid item xs={12}
                                            container
                                            direction="row"
                                            alignItems="center"
                                            style={{ paddingTop: 20 }}
                                        >

                                            <Grid item xs={3}
                                                container
                                                direction="row"
                                                alignItems="flex-end"
                                                justifyContent='flex-end'
                                                style={{ margin: 5 }}
                                            >
                                                <Typography style={{ fontSize: 22 }}>
                                                    Escopo:
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={2}
                                                container
                                                direction="row"
                                                alignItems="center"
                                                style={{ margin: 5 }}
                                            >

                                                <TextField
                                                    variant="standard"
                                                    name="tempMax"
                                                    label="Max"
                                                    id="tempMax"
                                                    value={tempMax}
                                                    onChange={e => (e.target.value === '' || /^[.0-9\b]+$/.test(e.target.value)) ? setTempMax(e.target.value) : null}

                                                />
                                            </Grid>
                                            <Grid item xs={2}
                                                container
                                                direction="row"
                                                alignItems="center"
                                                style={{ margin: 5 }}
                                            >
                                                <TextField
                                                    variant="standard"
                                                    name="tempMin"
                                                    label="Min"
                                                    id="tempMin"
                                                    value={tempMin}
                                                    onChange={e => (e.target.value === '' || /^[.0-9\b]+$/.test(e.target.value)) ? setTempMin(e.target.value) : null}

                                                />

                                            </Grid>
                                            <Grid item xs={3}
                                                container
                                                direction="row"
                                                alignItems="center"
                                            >
                                                <Button
                                                    fullWidth
                                                    size="large"
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={atualizarEscopoTemp}
                                                > ok  </Button>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}
                                            container
                                            direction="row"
                                            alignItems="flex-end"
                                            justifyContent="flex-end"
                                            style={{ margin: 10 }}
                                        >
                                            <Grid item xs={8}
                                                container
                                                direction="row"
                                                alignItems="flex-end"
                                            >
                                                <span > Último Acionamento: {ventiladores.ultimo_acionamento}</span>

                                            </Grid>
                                        </Grid>
                                    </Grid>

                                    {loadingVentiladoresExternos ?
                                        <Skeleton animation={"wave"} width={'100%'} style={{ backgroundColor: '#48D1CC' }
                                        } >
                                        </Skeleton>
                                        :

                                        <Grid
                                            item xs={12} sm={12} md={12} lg={12} xl={12}
                                            container
                                            alignItems={"center"}
                                            justifyContent={"center"}
                                            style={{ margin: 10 }}
                                        >

                                            <Grid
                                                container
                                                direction='row'
                                                item xs={12} sm={12} md={12} lg={12} xl={12}
                                                alignItems="flex-end"
                                                justifyContent={"center"}
                                            >
                                                <Grid
                                                    container
                                                    item xs={4} sm={4} md={4} lg={4} xl={4}
                                                    alignItems="flex-end"
                                                    justifyContent={"flex-end"}
                                                ><span style={{ fontSize: '22px' }} >Desligado</span></Grid>
                                                <Grid
                                                    container
                                                    item xs={4} sm={4} md={4} lg={4} xl={4}
                                                    alignItems="center"
                                                    justifyContent={"center"}

                                                >

                                                    <FormControlLabel
                                                        control={
                                                            <MuiSwitchLarge
                                                                size="medium"
                                                                //disabled={ventiladoresExternos.modo_operacao === 1 ? true : false}
                                                                disabled={false}
                                                                checked={ventiladoresExternos.status_rele === 1 ? true : false}
                                                                onChange={() => setOperacaoStatusVentiladoresExternos()}

                                                            />
                                                        }
                                                        label={<Typography style={{ color: '#000', fontSize: 26 }}>Externo</Typography>}
                                                        labelPlacement="top"
                                                    />
                                                </Grid>
                                                <Grid
                                                    container
                                                    item xs={4} sm={4} md={4} lg={4} xl={4}
                                                    justifyContent={"flex-start"}
                                                >
                                                    <span style={{ fontSize: '22px' }}>Ligado</span>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12}
                                                container
                                                direction="row"
                                                alignItems="flex-end"
                                                justifyContent="flex-end"
                                                style={{ margin: 10 }}
                                            >
                                                <Grid item xs={8}
                                                    container
                                                    direction="row"
                                                    alignItems="flex-end"
                                                >
                                                    <span > Último Acionamento: {ventiladoresExternos.ultimo_acionamento}</span>

                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    }

                                </Grid>



                                <Grid
                                    container
                                    direction={"column"}
                                    item xs={12} sm={12} md={2} lg={2} xl={2}
                                    alignItems={"center"}
                                    justifyContent={"center"}
                                    style={{ marginTop: 30 }}
                                >

                                    <div>
                                        <Thermometer
                                            theme="light"
                                            value={ventiladores.nivel_atual}
                                            max="60"
                                            steps="3"
                                            format="°C"
                                            size="large"
                                            height="300"
                                        />
                                    </div>

                                    <span style={{ fontSize: 14, marginTop: 20 }}> Temperatura Interna </span>
                                </Grid>


                                {/*
                                    loadingVentiladoresExternos ?
                                        <Skeleton animation={"wave"} width={'100%'} style={{ backgroundColor: '#48D1CC' }
                                        } >
                                        </Skeleton>
                                        :

                                        <div>
                                            <Grid
                                                container
                                                item xs={5} sm={5} md={5} lg={5} xl={5}
                                                alignItems={"center"}
                                                justifyContent={"center"}
                                                style={{ marginTop: 50 }}
                                            >

                                                <div>
                                                    <Thermometer
                                                        theme="dark"
                                                        value={ventiladoresExternos.nivel_atual}
                                                        max="60"
                                                        steps="3"
                                                        format="°C"
                                                        size="small"
                                                        height="120"
                                                    />
                                                </div>
                                            </Grid>

                                            <Grid
                                                item xs={6} sm={6} md={6} lg={6} xl={6}
                                                container
                                                alignItems={"center"}
                                                justifyContent={"center"}
                                                style={{ margin: 10 }}
                                            >

                                                <Grid
                                                    container
                                                    direction='row'
                                                    item xs={12} sm={12} md={12} lg={12} xl={12}
                                                    alignItems="flex-end"
                                                    justifyContent={"center"}
                                                >
                                                    <Grid
                                                        container
                                                        item xs={4} sm={4} md={4} lg={4} xl={4}
                                                        alignItems="flex-end"
                                                        justifyContent={"flex-end"}
                                                    ><span style={{ fontSize: '22px' }} >Desligado</span></Grid>
                                                    <Grid
                                                        container
                                                        item xs={4} sm={4} md={4} lg={4} xl={4}
                                                        alignItems="center"
                                                        justifyContent={"center"}

                                                    >

                                                        <FormControlLabel
                                                            control={
                                                                <MuiSwitchLarge
                                                                    size="medium"
                                                                    disabled={ventiladoresExternos.modo_operacao === 1 ? true : false}
                                                                    checked={ventiladoresExternos.status_rele === 1 ? true : false}
                                                                    onChange={() => setOperacaoStatusVentiladoresExternos()}

                                                                />
                                                            }
                                                            label={<Typography style={{ color: '#000', fontSize: 26 }}>Status</Typography>}
                                                            labelPlacement="top"
                                                        />
                                                    </Grid>
                                                    <Grid
                                                        container
                                                        item xs={4} sm={4} md={4} lg={4} xl={4}
                                                        justifyContent={"flex-start"}
                                                    >
                                                        <span style={{ fontSize: '22px' }}>Ligado</span>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={12}
                                                    container
                                                    direction="row"
                                                    alignItems="flex-end"
                                                    justifyContent="flex-end"
                                                    style={{ margin: 10 }}
                                                >
                                                    <Grid item xs={8}
                                                        container
                                                        direction="row"
                                                        alignItems="flex-end"
                                                    >
                                                        <span > Último Acionamento: {ventiladoresExternos.ultimo_acionamento}</span>

                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                        </div>
                                */}


                                {
                                    loadingVentiladoresExternos ?
                                        <Skeleton animation={"wave"} width={'100%'} style={{ backgroundColor: '#48D1CC' }
                                        } >
                                        </Skeleton>
                                        :

                                        <Grid
                                            direction={"column"}
                                            container
                                            item xs={12} sm={12} md={2} lg={2} xl={2}
                                            alignItems={"center"}
                                            justifyContent={"center"}
                                            style={{ marginTop: 30 }}
                                        >

                                            <div>
                                                <Thermometer
                                                    theme="light"
                                                    value={ventiladoresExternos.nivel_atual}
                                                    max="60"
                                                    steps="3"
                                                    format="°C"
                                                    size="large"
                                                    height="300"
                                                />
                                            </div>
                                            <span style={{ fontSize: 14, marginTop: 20 }}>Temperatura Externa</span>
                                        </Grid>
                                }



                              

                                


                            </Grid>


                    }
                </div >

                <div value={value} index={3} >


                    {
                        loadingResfriador ?
                            <Skeleton animation={"wave"} width={'100%'} style={{ backgroundColor: '#48D1CC' }
                            } >
                            </Skeleton>
                            :

                            <Grid
                                container
                                item xs={12} sm={12} md={12} lg={12} xl={12}
                                alignItems={"center"}
                                justifyContent={"center"}
                            >

                                <Grid
                                    container
                                    item xs={12} sm={12} md={12} lg={12} xl={12}
                                    alignItems={"center"}
                                    justifyContent={"center"}
                                    style={{ margin: 10 }}
                                >
                                    <Grid
                                        item xs={6} sm={6} md={6} lg={6} xl={6}
                                        container
                                        alignItems={"flex-end"}
                                        justifyContent={"flex-end"}
                                    >

                                        <Typography style={{ fontWeight: 'bold', fontSize: '28px' }}>Resfriador</Typography>
                                    </Grid>
                                    <Grid
                                        item xs={6} sm={6} md={6} lg={6} xl={6}
                                        container
                                        alignItems={"center"}
                                        justifyContent={"center"}
                                    >
                                        <img
                                            width="100px" height={"100px"}
                                            src="https://cdn-icons-png.flaticon.com/512/2729/2729104.png"
                                            alt="bomba de agua"
                                        />
                                    </Grid>
                                </Grid>



                                <Grid
                                    container
                                    item xs={5} sm={5} md={5} lg={5} xl={5}
                                    alignItems={"center"}
                                    justifyContent={"center"}
                                    style={{ marginTop: 50 }}
                                >

                                    <div>
                                        <Thermometer
                                            theme="dark"
                                            value={resfriador.nivel_atual}
                                            max="60"
                                            steps="3"
                                            format="°C"
                                            size="large"
                                            height="300"
                                        />
                                    </div>
                                </Grid>

                                <Grid item xs={12}
                                    container
                                    direction="row"
                                    alignItems="center"
                                    style={{ paddingTop: 20 }}
                                >

                                    <Grid item xs={3}
                                        container
                                        direction="row"
                                        alignItems="flex-end"
                                        justifyContent='flex-end'
                                        style={{ margin: 5 }}
                                    >
                                        <Typography style={{ fontSize: 22 }}>
                                            Escopo:
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2}
                                        container
                                        direction="row"
                                        alignItems="center"
                                        style={{ margin: 5 }}
                                    >

                                        <TextField
                                            variant="standard"
                                            name="tempMaxBoiler"
                                            label="Max"
                                            id="tempMaxBoiler"
                                            value={tempMaxResfriador}
                                            onChange={e => (e.target.value === '' || /^[.0-9\b]+$/.test(e.target.value)) ? setTempMaxResfriador(e.target.value) : null}

                                        />
                                    </Grid>

                                    <Grid item xs={3}
                                        container
                                        direction="row"
                                        alignItems="center"
                                    >
                                        <Button
                                            fullWidth
                                            size="large"
                                            variant="contained"
                                            color="primary"
                                            onClick={atualizarEscopoTempResfriador}
                                        > ok  </Button>
                                    </Grid>
                                </Grid>


                                <Grid
                                    container
                                    item xs={12}
                                    alignItems={"center"}
                                    justifyContent={"center"}
                                    style={{ marginTop: 50 }}
                                >

                                    {
                                        resfriador.nivel_atual === resfriador.nivel ? <span style={{ color: 'green' }}> Temperatura no Padrão </span> :



                                            (resfriador.nivel_atual !== resfriador.nivel) && resfriador.ativar === 1 ? <span style={{ color: 'red', textColor: 'red', fontSize: 18, fontWeight: 'bold' }}> Alerta, Temperatura fora do padrão  </span> :

                                                <span style={{ color: 'orange' }}> Temperatura fora do Padrão, mas o horario permite </span>

                                    }


                                </Grid>


                                <Grid

                                    item xs={12}
                                    container
                                    direction="row"
                                    alignItems="center"
                                    justifyContent={"center"}
                                    style={{ paddingTop: 50 }}
                                >

                                    <Grid
                                        item xs={12} sm={12} md={8} lg={8} xl={8}
                                        container
                                        direction="row"
                                        alignItems="center"
                                    >

                                        <TableContainer component={Paper} style={{ backgroundColor: 'Silver' }}>
                                            <Table aria-label="collapsible table">
                                                <TableHead style={{ backgroundColor: 'Silver' }}>
                                                    <TableRow style={{ fontSize: 8 }}>
                                                        <TableCell style={{ backgroundColor: 'black', color: 'white', position: "sticky", top: 0, textAlign: "center" }} colSpan={2}>Hora Inicial</TableCell>
                                                        <TableCell style={{ backgroundColor: 'black', color: 'white', position: "sticky", top: 0, textAlign: "center" }} colSpan={2}>Hora Final</TableCell>
                                                        <TableCell style={{ backgroundColor: 'black', color: 'white', position: "sticky", top: 0, textAlign: "center" }} colSpan={1}>Status</TableCell>


                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {resfriadorHorarios.map((horario) => (
                                                        <RowAlerta key={horario.id_horario} row={horario} />
                                                    ))}


                                                    <React.Fragment>
                                                        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} style={{ textAlign: "center", fontSize: 14 }}>

                                                            <TableCell colSpan={2} align="center">

                                                                <TextField
                                                                    variant="standard"
                                                                    name="horaInicio"
                                                                    label="Inicio"
                                                                    id="escopoMin"
                                                                    value={newHoraInicioAlerta}
                                                                    onChange={handleChangeHoraInicioAlerta}
                                                                    fullWidth
                                                                />
                                                            </TableCell>
                                                            <TableCell colSpan={2} align="center">
                                                                <TextField
                                                                    variant="standard"
                                                                    name="escopoMin"
                                                                    label="Min"
                                                                    id="escopoMin"
                                                                    value={newHoraFimAlerta}
                                                                    onChange={handleChangeHoraFimAlerta}
                                                                    fullWidth
                                                                />
                                                            </TableCell>
                                                            <TableCell colSpan={1} align="center"><span ></span></TableCell>
                                                            <TableCell colSpan={1} align="center">
                                                                <Grid item xs={12} >
                                                                    <ColorButton color="secondary" onClick={() => inserirAlerta()} >Novo</ColorButton>
                                                                </Grid>

                                                            </TableCell>

                                                        </TableRow>
                                                    </React.Fragment>

                                                </TableBody>
                                            </Table>
                                        </TableContainer >
                                    </Grid>
                                </Grid>


                            </Grid>


                    }
                </div >

                <div value={value} index={4} >


                    {
                        loadingRefrescador ?
                            <Skeleton animation={"wave"} width={'100%'} style={{ backgroundColor: '#48D1CC' }
                            } >
                            </Skeleton>
                            :


                            <Grid
                                container
                                item xs={12} sm={12} md={12} lg={12} xl={12}
                                alignItems={"center"}
                                justifyContent={"center"}
                            >

                                <Grid
                                    container
                                    item xs={12} sm={12} md={12} lg={12} xl={12}
                                    alignItems={"center"}
                                    justifyContent={"center"}
                                    style={{ margin: 10 }}
                                >
                                    <Grid
                                        item xs={6} sm={6} md={6} lg={6} xl={6}
                                        container
                                        alignItems={"flex-end"}
                                        justifyContent={"flex-end"}
                                    >

                                        <Typography style={{ fontWeight: 'bold', fontSize: '28px' }}>Aspersores</Typography>
                                    </Grid>
                                    <Grid
                                        item xs={6} sm={6} md={6} lg={6} xl={6}
                                        container
                                        alignItems={"center"}
                                        justifyContent={"center"}
                                    >
                                        <img
                                            width="100px" height={"100px"}
                                            src="https://cdn-icons-png.flaticon.com/512/2564/2564756.png"
                                            alt="refrescador"
                                        />
                                    </Grid>
                                </Grid>


                                <Grid
                                    item xs={12} sm={12} md={6} lg={6} xl={6}
                                    container
                                    alignItems={"center"}
                                    justifyContent={"center"}
                                    style={{ margin: 10, border: '1px solid black' }}
                                >

                                    <Grid
                                        container
                                        direction='row'
                                        item xs={12} sm={12} md={12} lg={12} xl={12}
                                        alignItems="flex-end"
                                        justifyContent={"center"}
                                    >
                                        <Grid
                                            container
                                            item xs={4} sm={4} md={4} lg={4} xl={4}
                                            alignItems="flex-end"
                                            justifyContent={"flex-end"}
                                        ><span style={{ fontSize: '22px' }} >Manual</span></Grid>
                                        <Grid
                                            container
                                            item xs={4} sm={4} md={4} lg={4} xl={4}
                                            alignItems="center"
                                            justifyContent={"center"}

                                        >

                                            <FormControlLabel
                                                control={
                                                    <MuiSwitchLarge
                                                        checked={refrescador.modo_operacao === 0 ? false : true}
                                                        onChange={() => setOperacaoRefrescador()}
                                                        size="medium"

                                                    />
                                                }
                                                label={<Typography style={{ color: '#000', fontSize: 26 }}>Operação</Typography>}
                                                labelPlacement="top"
                                            />
                                        </Grid>
                                        <Grid
                                            container
                                            item xs={4} sm={4} md={4} lg={4} xl={4}
                                            justifyContent={"flex-start"}
                                        >
                                            <span style={{ fontSize: '22px' }}>Automatico</span>
                                        </Grid>
                                    </Grid>





                                </Grid>

                                <Grid item xs={12}
                                    container
                                    direction="row"
                                    alignItems="center"
                                    style={{ paddingTop: 20 }}
                                >

                                    <Grid item xs={3}
                                        container
                                        direction="row"
                                        alignItems="flex-end"
                                        justifyContent='flex-end'
                                        style={{ margin: 5 }}
                                    >
                                        <Typography style={{ fontSize: 22 }}>
                                            Escopo:
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={2}
                                        container
                                        direction="row"
                                        alignItems="center"
                                        style={{ margin: 5 }}
                                    >

                                        <TextField
                                            variant="standard"
                                            name="tempMaxRefrescador"
                                            label="Tempo Ligado"
                                            id="tempMaxRefrescador"
                                            value={tempMaxRefrescador}
                                            onChange={e => (e.target.value === '' || /^[.0-9\b]+$/.test(e.target.value)) ? setTempMaxRefrescador(e.target.value) : null}

                                        />
                                    </Grid>
                                    <Grid item xs={2}
                                        container
                                        direction="row"
                                        alignItems="center"
                                        style={{ margin: 5 }}
                                    >
                                        <TextField
                                            variant="standard"
                                            name="tempMinRefrescador"
                                            label="Tempo Desligado"
                                            id="tempMinRefrescador"
                                            value={tempMinRefrescador}
                                            onChange={e => (e.target.value === '' || /^[.0-9\b]+$/.test(e.target.value)) ? setTempMinRefrescador(e.target.value) : null}

                                        />

                                    </Grid>
                                    <Grid item xs={2}
                                        container
                                        direction="row"
                                        alignItems="center"
                                        style={{ margin: 5 }}
                                    >

                                        <TextField
                                            variant="standard"
                                            name="tempIntervalRefrescador"
                                            label="Tempo Intervalo"
                                            id="tempIntervalRefrescador"
                                            value={tempIntervalRefrescador}
                                            onChange={e => (e.target.value === '' || /^[.0-9\b]+$/.test(e.target.value)) ? setTempIntervalRefrescador(e.target.value) : null}

                                        />
                                    </Grid>
                                    <Grid item xs={2}
                                        container
                                        direction="row"
                                        alignItems="center"
                                    >
                                        <Button
                                            size="large"
                                            variant="contained"
                                            color="primary"
                                            onClick={atualizarEscopoRefrescador}
                                        > ok  </Button>
                                    </Grid>
                                </Grid>

                                <Grid
                                    container
                                    direction='row'
                                    item xs={12} sm={12} md={6} lg={6} xl={6}
                                    alignItems={"center"}
                                    justifyContent={"center"}
                                    style={{ marginTop: 50 }}

                                >


                                    <Grid
                                        container
                                        direction="row"
                                        item xs={12} sm={12} md={12} lg={12} xl={12}
                                        alignItems="flex-end"
                                        justifyContent='flex-end'
                                    >

                                        <Grid
                                            container
                                            direction='row'
                                            item xs={12} sm={12} md={12} lg={12} xl={12}
                                            alignItems="flex-end"
                                            justifyContent={"center"}
                                        >
                                            <Grid
                                                container
                                                item xs={4} sm={4} md={4} lg={4} xl={4}
                                                alignItems="flex-end"
                                                justifyContent={"flex-end"}
                                            ><span style={{ fontSize: '22px' }} >Desligado</span></Grid>
                                            <Grid
                                                container
                                                item xs={4} sm={4} md={4} lg={4} xl={4}
                                                alignItems="center"
                                                justifyContent={"center"}

                                            >

                                                <FormControlLabel
                                                    control={
                                                        <MuiSwitchLarge
                                                            size="medium"
                                                            disabled={refrescador.modo_operacao === 1 ? true : false}
                                                            checked={refrescador.status_rele === 1 ? true : false}
                                                            onChange={() => setOperacaoStatusRefrescador()}

                                                        />
                                                    }
                                                    label={<Typography style={{ color: '#000', fontSize: 26 }}>Aspersores</Typography>}
                                                    labelPlacement="top"
                                                />
                                            </Grid>
                                            <Grid
                                                container
                                                item xs={4} sm={4} md={4} lg={4} xl={4}
                                                justifyContent={"flex-start"}
                                            >
                                                <span style={{ fontSize: '22px' }}>Ligado</span>
                                            </Grid>
                                        </Grid>
                                        <Grid item xs={12}
                                            container
                                            direction="row"
                                            alignItems="flex-end"
                                            justifyContent="flex-end"
                                            style={{ margin: 10 }}
                                        >
                                            <Grid item xs={8}
                                                container
                                                direction="row"
                                                alignItems="flex-end"
                                            >
                                                <span > Último Acionamento: {refrescador.ultimo_acionamento}</span>

                                            </Grid>
                                        </Grid>
                                    </Grid>


                                    <Grid
                                        container
                                        direction="row"
                                        item xs={12} sm={12} md={12} lg={12} xl={12}
                                        alignItems="flex-end"
                                        justifyContent='flex-end'
                                        style={{ marginTop: 10 }}
                                    >

                                        <Grid
                                            container
                                            direction='row'
                                            item xs={12} sm={12} md={12} lg={12} xl={12}
                                            alignItems="flex-end"
                                            justifyContent={"center"}
                                        >
                                            <Grid
                                                container
                                                item xs={4} sm={4} md={4} lg={4} xl={4}
                                                alignItems="flex-end"
                                                justifyContent={"flex-end"}
                                            ><span style={{ fontSize: '22px' }} >Desligado</span></Grid>
                                            <Grid
                                                container
                                                item xs={4} sm={4} md={4} lg={4} xl={4}
                                                alignItems="center"
                                                justifyContent={"center"}

                                            >

                                                <FormControlLabel
                                                    control={
                                                        <MuiSwitchLarge
                                                            size="medium"
                                                            disabled={refrescador.modo_operacao === 1 ? true : false}
                                                            checked={ventiladoresAspersores.status_rele === 1 ? true : false}
                                                            onChange={() => setOperacaoStatusVentiladoresAspersores()}

                                                        />
                                                    }
                                                    label={<Typography style={{ color: '#000', fontSize: 26 }}>Ventiladores</Typography>}
                                                    labelPlacement="top"
                                                />
                                            </Grid>
                                            <Grid
                                                container
                                                item xs={4} sm={4} md={4} lg={4} xl={4}
                                                justifyContent={"flex-start"}
                                            >
                                                <span style={{ fontSize: '22px' }}>Ligado</span>
                                            </Grid>
                                        </Grid>
                                    </Grid>


                                    <Grid item xs={12}
                                        container
                                        direction="row"
                                        alignItems="flex-end"
                                        justifyContent="flex-end"
                                        style={{ margin: 10 }}
                                    >
                                        <Grid item xs={8}
                                            container
                                            direction="row"
                                            alignItems="flex-end"
                                        >
                                            <span > Último Acionamento: {ventiladoresAspersores.ultimo_acionamento}</span>

                                        </Grid>
                                    </Grid>

                                </Grid>



                                <Grid
                                    item xs={12} sm={12} md={8} lg={8} xl={8}
                                    container
                                    direction="row"
                                    alignItems="center"
                                    justifyContent={"center"}
                                    style={{ paddingTop: 50 }}
                                >

                                    <Grid item xs={12}
                                        container
                                        direction="row"
                                        alignItems="center"
                                    >

                                        <TableContainer component={Paper} style={{ backgroundColor: 'Silver' }}>
                                            <Table aria-label="collapsible table">
                                                <TableHead style={{ backgroundColor: 'Silver' }}>
                                                    <TableRow style={{ fontSize: 8 }}>
                                                        <TableCell style={{ backgroundColor: 'black', color: 'white', position: "sticky", top: 0, textAlign: "center" }} colSpan={2}>Hora Inicial</TableCell>
                                                        <TableCell style={{ backgroundColor: 'black', color: 'white', position: "sticky", top: 0, textAlign: "center" }} colSpan={2}>Hora Final</TableCell>
                                                        <TableCell style={{ backgroundColor: 'black', color: 'white', position: "sticky", top: 0, textAlign: "center" }} colSpan={1}>Status</TableCell>


                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {refrescadorHorarios.map((horario) => (
                                                        <Row key={horario.id_horario} row={horario} />
                                                    ))}


                                                    <React.Fragment>
                                                        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }} style={{ textAlign: "center", fontSize: 14 }}>

                                                            <TableCell colSpan={2} align="center">

                                                                <TextField
                                                                    variant="standard"
                                                                    name="horaInicio"
                                                                    label="Inicio"
                                                                    id="escopoMin"
                                                                    value={newHoraInicioRefrescador}
                                                                    onChange={handleChangeHoraInicioRefrescador}
                                                                    fullWidth
                                                                />
                                                            </TableCell>
                                                            <TableCell colSpan={2} align="center">
                                                                <TextField
                                                                    variant="standard"
                                                                    name="escopoMin"
                                                                    label="Min"
                                                                    id="escopoMin"
                                                                    value={newHoraFimRefrescador}
                                                                    onChange={handleChangeHoraFimRefrescador}
                                                                    fullWidth
                                                                />
                                                            </TableCell>
                                                            <TableCell colSpan={1} align="center"><span ></span></TableCell>
                                                            <TableCell colSpan={1} align="center">
                                                                <Grid item xs={12} >
                                                                    <ColorButton color="secondary" onClick={() => inserirRefrescador()} >Novo</ColorButton>
                                                                </Grid>

                                                            </TableCell>

                                                        </TableRow>
                                                    </React.Fragment>

                                                </TableBody>
                                            </Table>
                                        </TableContainer >
                                    </Grid>
                                </Grid>





                               

                              


                            </Grid>
                    }

                </div >

                <div value={value} index={5} >


                    {
                        loadingRefrescador ?
                            <Skeleton animation={"wave"} width={'100%'} style={{ backgroundColor: '#48D1CC' }
                            } >
                            </Skeleton>
                            :
                            <Grid
                                container
                                item xs={12} sm={12} md={12} lg={12} xl={12}
                                alignItems={"center"}
                                justifyContent={"center"}
                            >

                                <Grid
                                    container
                                    item xs={12} sm={12} md={12} lg={12} xl={12}
                                    alignItems={"center"}
                                    justifyContent={"center"}
                                    style={{ margin: 10 }}
                                >
                                    <Grid
                                        item xs={12} sm={12} md={6} lg={6} xl={6}
                                        container
                                        alignItems={"flex-end"}
                                        justifyContent={"flex-end"}
                                    >

                                        <Typography style={{ fontWeight: 'bold', fontSize: '28px' }}>Reles</Typography>
                                    </Grid>
                                    <Grid
                                        item xs={6} sm={6} md={6} lg={6} xl={6}
                                        container
                                        alignItems={"center"}
                                        justifyContent={"center"}
                                    >
                                        <img
                                            width="100px" height={"100px"}
                                            src="https://cdn-icons-png.flaticon.com/512/9750/9750283.png"
                                            alt="reles"
                                        />
                                    </Grid>
                                </Grid>

                                <Grid
                                    item xs={12} sm={12} md={12} lg={12} xl={12}
                                    container
                                    direction={"row"}
                                    alignItems={"center"}
                                    justifyContent={"center"}
                                    spacing={2}

                                >


                                    <Grid
                                        item xs={12} sm={12} md={4} lg={4} xl={4}
                                        container
                                        direction={"column"}
                                        alignItems={"center"}
                                        justifyContent={"center"}

                                    >

                                        {/*reservatorio*/}
                                        <Grid
                                            item xs={12} sm={12} md={12} lg={12} xl={12}
                                            container
                                            alignItems={"center"}
                                            justifyContent={"center"}
                                            style={{ margin: 10, border: '1px solid black' }}

                                        >
                                            <Grid
                                                item xs={3} sm={3} md={3} lg={3} xl={3}
                                                container
                                                alignItems={"center"}
                                                justifyContent={"center"}
                                            >
                                                <img
                                                    width="100px" height={"100px"}
                                                    src="https://cdn-icons-png.flaticon.com/512/2109/2109224.png"
                                                    alt="reservatorio_rele"
                                                />

                                            </Grid>

                                            <Grid
                                                item xs={9} sm={9} md={9} lg={9} xl={9}
                                                container
                                                alignItems={"center"}
                                                justifyContent={"center"}
                                            >
                                                <Grid
                                                    item xs={12} sm={12} md={12} lg={12} xl={12}
                                                    container
                                                    alignItems={"center"}
                                                    justifyContent={"center"}
                                                    style={{ margin: 10 }}
                                                >

                                                    <Grid
                                                        container
                                                        direction='row'
                                                        item xs={12} sm={12} md={12} lg={12} xl={12}
                                                        alignItems="flex-end"
                                                        justifyContent={"center"}
                                                    >
                                                        <Grid
                                                            container
                                                            item xs={4} sm={4} md={4} lg={4} xl={4}
                                                            alignItems="flex-end"
                                                            justifyContent={"flex-end"}
                                                        ><span style={{ fontSize: '22px' }} >Desligado</span></Grid>
                                                        <Grid
                                                            container
                                                            item xs={4} sm={4} md={4} lg={4} xl={4}
                                                            alignItems="center"
                                                            justifyContent={"center"}

                                                        >

                                                            <FormControlLabel
                                                                control={
                                                                    <MuiSwitchLarge
                                                                        size="medium"
                                                                        disabled={false}
                                                                        checked={reservatorio.status_rele === 1 ? true : false}
                                                                        onChange={() => setOperacaoStatus()}

                                                                    />
                                                                }
                                                                label={<Typography style={{ color: '#000', fontSize: 18 }}>Reservatório</Typography>}
                                                                labelPlacement="top"
                                                            />
                                                        </Grid>
                                                        <Grid
                                                            container
                                                            item xs={4} sm={4} md={4} lg={4} xl={4}
                                                            justifyContent={"flex-start"}
                                                        >
                                                            <span style={{ fontSize: '22px' }}>Ligado</span>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>

                                            </Grid>

                                            <span style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Canal 1</span>
                                        </Grid>

                                        {/*reservatorio*/}

                                        {/*ventiladores_internos*/}
                                        <Grid
                                            item xs={12} sm={12} md={12} lg={12} xl={12}
                                            container
                                            alignItems={"center"}
                                            justifyContent={"center"}
                                            style={{ margin: 10, border: '1px solid black' }}

                                        >
                                            <Grid
                                                item xs={3} sm={3} md={3} lg={3} xl={3}
                                                container
                                                alignItems={"center"}
                                                justifyContent={"center"}
                                            >
                                                <img
                                                    width="100px" height={"100px"}
                                                    src="https://cdn-icons-png.flaticon.com/512/979/979568.png"
                                                    alt="ventiladores_internos_rele"
                                                />

                                            </Grid>

                                            <Grid
                                                item xs={9} sm={9} md={9} lg={9} xl={9}
                                                container
                                                alignItems={"center"}
                                                justifyContent={"center"}
                                            >
                                                <Grid
                                                    item xs={12} sm={12} md={12} lg={12} xl={12}
                                                    container
                                                    alignItems={"center"}
                                                    justifyContent={"center"}
                                                    style={{ margin: 10 }}
                                                >

                                                    <Grid
                                                        container
                                                        direction='row'
                                                        item xs={12} sm={12} md={12} lg={12} xl={12}
                                                        alignItems="flex-end"
                                                        justifyContent={"center"}
                                                    >
                                                        <Grid
                                                            container
                                                            item xs={4} sm={4} md={4} lg={4} xl={4}
                                                            alignItems="flex-end"
                                                            justifyContent={"flex-end"}
                                                        ><span style={{ fontSize: '22px' }} >Desligado</span></Grid>
                                                        <Grid
                                                            container
                                                            item xs={4} sm={4} md={4} lg={4} xl={4}
                                                            alignItems="center"
                                                            justifyContent={"center"}

                                                        >

                                                            <FormControlLabel
                                                                control={
                                                                    <MuiSwitchLarge
                                                                        size="medium"
                                                                        disabled={false}
                                                                        checked={ventiladores.status_rele === 1 ? true : false}
                                                                        onChange={() => setOperacaoStatusVentiladores()}

                                                                    />
                                                                }
                                                                label={<Typography style={{ color: '#000', fontSize: 18 }}>Ventiladores Internos</Typography>}
                                                                labelPlacement="top"
                                                            />
                                                        </Grid>
                                                        <Grid
                                                            container
                                                            item xs={4} sm={4} md={4} lg={4} xl={4}
                                                            justifyContent={"flex-start"}
                                                        >
                                                            <span style={{ fontSize: '22px' }}>Ligado</span>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>

                                            </Grid>
                                            <span style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Canal 2</span>
                                        </Grid>

                                        {/*ventiladores_internos*/}


                                        {/*ventiladores_aspersores*/}
                                        {loadingVentiladoresAspersores ? <div></div> :
                                            <Grid
                                                item xs={12} sm={12} md={12} lg={12} xl={12}
                                                container
                                                alignItems={"center"}
                                                justifyContent={"center"}
                                                style={{ margin: 10, border: '1px solid black' }}

                                            >
                                                <Grid
                                                    item xs={3} sm={3} md={3} lg={3} xl={3}
                                                    container
                                                    alignItems={"center"}
                                                    justifyContent={"center"}
                                                >
                                                    <img
                                                        width="100px" height={"100px"}
                                                        src="https://cdn-icons-png.flaticon.com/512/5633/5633316.png"
                                                        alt="ventiladores_aspersores_rele"
                                                    />

                                                </Grid>

                                                <Grid
                                                    item xs={9} sm={9} md={9} lg={9} xl={9}
                                                    container
                                                    alignItems={"center"}
                                                    justifyContent={"center"}
                                                >
                                                    <Grid
                                                        item xs={12} sm={12} md={12} lg={12} xl={12}
                                                        container
                                                        alignItems={"center"}
                                                        justifyContent={"center"}
                                                        style={{ margin: 10 }}
                                                    >

                                                        <Grid
                                                            container
                                                            direction='row'
                                                            item xs={12} sm={12} md={12} lg={12} xl={12}
                                                            alignItems="flex-end"
                                                            justifyContent={"center"}
                                                        >
                                                            <Grid
                                                                container
                                                                item xs={4} sm={4} md={4} lg={4} xl={4}
                                                                alignItems="flex-end"
                                                                justifyContent={"flex-end"}
                                                            ><span style={{ fontSize: '22px' }} >Desligado</span></Grid>
                                                            <Grid
                                                                container
                                                                item xs={4} sm={4} md={4} lg={4} xl={4}
                                                                alignItems="center"
                                                                justifyContent={"center"}

                                                            >

                                                                <FormControlLabel
                                                                    control={
                                                                        <MuiSwitchLarge
                                                                            size="medium"
                                                                            disabled={false}
                                                                            checked={ventiladoresAspersores.status_rele === 1 ? true : false}
                                                                            onChange={() => setOperacaoStatusVentiladoresAspersores()}

                                                                        />
                                                                    }
                                                                    label={<Typography style={{ color: '#000', fontSize: 18 }}>Ventiladores Aspersores</Typography>}
                                                                    labelPlacement="top"
                                                                />
                                                            </Grid>
                                                            <Grid
                                                                container
                                                                item xs={4} sm={4} md={4} lg={4} xl={4}
                                                                justifyContent={"flex-start"}
                                                            >
                                                                <span style={{ fontSize: '22px' }}>Ligado</span>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                </Grid>
                                                <span style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Canal 3</span>
                                            </Grid>
                                        }
                                        {/*ventiladores_aspersores*/}

                                    </Grid>


                                    <Grid
                                        item xs={12} sm={12} md={4} lg={4} xl={4}
                                        container
                                        direction={"column"}
                                        alignItems={"center"}
                                        justifyContent={"center"}

                                    >

                                        {/*ventiladores_externos*/}
                                        <Grid
                                            item xs={12} sm={12} md={12} lg={12} xl={12}
                                            container
                                            alignItems={"center"}
                                            justifyContent={"center"}
                                            style={{ margin: 10, border: '1px solid black' }}

                                        >
                                            <Grid
                                                item xs={3} sm={3} md={3} lg={3} xl={3}
                                                container
                                                alignItems={"center"}
                                                justifyContent={"center"}
                                            >
                                                <img
                                                    width="100px" height={"100px"}
                                                    src="https://cdn-icons-png.flaticon.com/512/430/430752.png"
                                                    alt="ventiladores_externos_rele"
                                                />

                                            </Grid>

                                            <Grid
                                                item xs={9} sm={9} md={9} lg={9} xl={9}
                                                container
                                                alignItems={"center"}
                                                justifyContent={"center"}
                                            >
                                                <Grid
                                                    item xs={12} sm={12} md={12} lg={12} xl={12}
                                                    container
                                                    alignItems={"center"}
                                                    justifyContent={"center"}
                                                    style={{ margin: 10 }}
                                                >

                                                    <Grid
                                                        container
                                                        direction='row'
                                                        item xs={12} sm={12} md={12} lg={12} xl={12}
                                                        alignItems="flex-end"
                                                        justifyContent={"center"}
                                                    >
                                                        <Grid
                                                            container
                                                            item xs={4} sm={4} md={4} lg={4} xl={4}
                                                            alignItems="flex-end"
                                                            justifyContent={"flex-end"}
                                                        ><span style={{ fontSize: '22px' }} >Desligado</span></Grid>
                                                        <Grid
                                                            container
                                                            item xs={4} sm={4} md={4} lg={4} xl={4}
                                                            alignItems="center"
                                                            justifyContent={"center"}

                                                        >

                                                            <FormControlLabel
                                                                control={
                                                                    <MuiSwitchLarge
                                                                        size="medium"
                                                                        disabled={false}
                                                                        checked={ventiladoresExternos.status_rele === 1 ? true : false}
                                                                        onChange={() => setOperacaoStatusVentiladoresExternos()}

                                                                    />
                                                                }
                                                                label={<Typography style={{ color: '#000', fontSize: 18 }}>Ventiladores Externos</Typography>}
                                                                labelPlacement="top"
                                                            />
                                                        </Grid>
                                                        <Grid
                                                            container
                                                            item xs={4} sm={4} md={4} lg={4} xl={4}
                                                            justifyContent={"flex-start"}
                                                        >
                                                            <span style={{ fontSize: '22px' }}>Ligado</span>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>

                                            </Grid>
                                            <span style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Canal 4</span>
                                        </Grid>

                                        {/*ventiladores_externos*/}



                                        {/*caixa_boiler*/}
                                        <Grid
                                            item xs={12} sm={12} md={12} lg={12} xl={12}
                                            container
                                            alignItems={"center"}
                                            justifyContent={"center"}
                                            style={{ margin: 10, border: '1px solid black' }}

                                        >
                                            <Grid
                                                item xs={3} sm={3} md={3} lg={3} xl={3}
                                                container
                                                alignItems={"center"}
                                                justifyContent={"center"}
                                            >
                                                <img
                                                    width="100px" height={"100px"}
                                                    src="https://cdn-icons-png.flaticon.com/512/7959/7959053.png"
                                                    alt="caixa_boiler_rele"
                                                />

                                            </Grid>

                                            <Grid
                                                item xs={9} sm={9} md={9} lg={9} xl={9}
                                                container
                                                alignItems={"center"}
                                                justifyContent={"center"}
                                            >
                                                <Grid
                                                    item xs={12} sm={12} md={12} lg={12} xl={12}
                                                    container
                                                    alignItems={"center"}
                                                    justifyContent={"center"}
                                                    style={{ margin: 10 }}
                                                >

                                                    <Grid
                                                        container
                                                        direction='row'
                                                        item xs={12} sm={12} md={12} lg={12} xl={12}
                                                        alignItems="flex-end"
                                                        justifyContent={"center"}
                                                    >
                                                        <Grid
                                                            container
                                                            item xs={4} sm={4} md={4} lg={4} xl={4}
                                                            alignItems="flex-end"
                                                            justifyContent={"flex-end"}
                                                        ><span style={{ fontSize: '22px' }} >Desligado</span></Grid>
                                                        <Grid
                                                            container
                                                            item xs={4} sm={4} md={4} lg={4} xl={4}
                                                            alignItems="center"
                                                            justifyContent={"center"}

                                                        >

                                                            <FormControlLabel
                                                                control={
                                                                    <MuiSwitchLarge
                                                                        size="medium"
                                                                        disabled={false}
                                                                        checked={boiler.status_rele === 1 ? true : false}
                                                                        onChange={() => setOperacaoStatusBoiler()}

                                                                    />
                                                                }
                                                                label={<Typography style={{ color: '#000', fontSize: 18 }}>Reservatório Boiler</Typography>}
                                                                labelPlacement="top"
                                                            />
                                                        </Grid>
                                                        <Grid
                                                            container
                                                            item xs={4} sm={4} md={4} lg={4} xl={4}
                                                            justifyContent={"flex-start"}
                                                        >
                                                            <span style={{ fontSize: '22px' }}>Ligado</span>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>

                                            </Grid>
                                            <span style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Rele 1</span>
                                        </Grid>

                                        {/*caixa_boiler*/}


                                        {/*temp_boiler*/}
                                        <Grid
                                            item xs={12} sm={12} md={12} lg={12} xl={12}
                                            container
                                            alignItems={"center"}
                                            justifyContent={"center"}
                                            style={{ margin: 10, border: '1px solid black' }}

                                        >
                                            <Grid
                                                item xs={3} sm={3} md={3} lg={3} xl={3}
                                                container
                                                alignItems={"center"}
                                                justifyContent={"center"}
                                            >
                                                <img
                                                    width="100px" height={"100px"}
                                                    src="https://cdn-icons-png.flaticon.com/512/7248/7248274.png"
                                                    alt="temp_boiler_rele"
                                                />

                                            </Grid>

                                            <Grid
                                                item xs={9} sm={9} md={9} lg={9} xl={9}
                                                container
                                                alignItems={"center"}
                                                justifyContent={"center"}
                                            >
                                                <Grid
                                                    item xs={12} sm={12} md={12} lg={12} xl={12}
                                                    container
                                                    alignItems={"center"}
                                                    justifyContent={"center"}
                                                    style={{ margin: 10 }}
                                                >

                                                    <Grid
                                                        container
                                                        direction='row'
                                                        item xs={12} sm={12} md={12} lg={12} xl={12}
                                                        alignItems="flex-end"
                                                        justifyContent={"center"}
                                                    >
                                                        <Grid
                                                            container
                                                            item xs={4} sm={4} md={4} lg={4} xl={4}
                                                            alignItems="flex-end"
                                                            justifyContent={"flex-end"}
                                                        ><span style={{ fontSize: '22px' }} >Desligado</span></Grid>
                                                        <Grid
                                                            container
                                                            item xs={4} sm={4} md={4} lg={4} xl={4}
                                                            alignItems="center"
                                                            justifyContent={"center"}

                                                        >

                                                            <FormControlLabel
                                                                control={
                                                                    <MuiSwitchLarge
                                                                        size="medium"
                                                                        disabled={false}
                                                                        checked={boilerTemp.status_rele === 1 ? true : false}
                                                                        onChange={() => setOperacaoStatusBoilerTemp()}

                                                                    />
                                                                }
                                                                label={<Typography style={{ color: '#000', fontSize: 18 }}>Resistência Boiler</Typography>}
                                                                labelPlacement="top"
                                                            />
                                                        </Grid>
                                                        <Grid
                                                            container
                                                            item xs={4} sm={4} md={4} lg={4} xl={4}
                                                            justifyContent={"flex-start"}
                                                        >
                                                            <span style={{ fontSize: '22px' }}>Ligado</span>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>

                                            </Grid>
                                            <span style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Rele 2</span>
                                        </Grid>

                                        {/*temp_boiler*/}


                                    </Grid>


                                    <Grid
                                        item xs={12} sm={12} md={4} lg={4} xl={4}
                                        container
                                        direction={"column"}
                                        alignItems={"center"}
                                        justifyContent={"center"}

                                    >

                                        {/*aspersor*/}
                                        <Grid
                                            item xs={12} sm={12} md={12} lg={12} xl={12}
                                            container
                                            alignItems={"center"}
                                            justifyContent={"center"}
                                            style={{ margin: 10, border: '1px solid black' }}

                                        >
                                            <Grid
                                                item xs={3} sm={3} md={3} lg={3} xl={3}
                                                container
                                                alignItems={"center"}
                                                justifyContent={"center"}
                                            >
                                                <img
                                                    width="100px" height={"100px"}
                                                    src="https://cdn-icons-png.flaticon.com/512/7072/7072165.png"
                                                    alt="aspersores"
                                                />

                                            </Grid>

                                            <Grid
                                                item xs={9} sm={9} md={9} lg={9} xl={9}
                                                container
                                                alignItems={"center"}
                                                justifyContent={"center"}
                                            >
                                                <Grid
                                                    item xs={12} sm={12} md={12} lg={12} xl={12}
                                                    container
                                                    alignItems={"center"}
                                                    justifyContent={"center"}
                                                    style={{ margin: 10 }}
                                                >

                                                    <Grid
                                                        container
                                                        direction='row'
                                                        item xs={12} sm={12} md={12} lg={12} xl={12}
                                                        alignItems="flex-end"
                                                        justifyContent={"center"}
                                                    >
                                                        <Grid
                                                            container
                                                            item xs={4} sm={4} md={4} lg={4} xl={4}
                                                            alignItems="flex-end"
                                                            justifyContent={"flex-end"}
                                                        ><span style={{ fontSize: '22px' }} >Desligado</span></Grid>
                                                        <Grid
                                                            container
                                                            item xs={4} sm={4} md={4} lg={4} xl={4}
                                                            alignItems="center"
                                                            justifyContent={"center"}

                                                        >

                                                            <FormControlLabel
                                                                control={
                                                                    <MuiSwitchLarge
                                                                        size="medium"
                                                                        disabled={false}
                                                                        checked={refrescador.status_rele === 1 ? true : false}
                                                                        onChange={() => setOperacaoStatusRefrescador()}

                                                                    />
                                                                }
                                                                label={<Typography style={{ color: '#000', fontSize: 18 }}>Aspersores</Typography>}
                                                                labelPlacement="top"
                                                            />
                                                        </Grid>
                                                        <Grid
                                                            container
                                                            item xs={4} sm={4} md={4} lg={4} xl={4}
                                                            justifyContent={"flex-start"}
                                                        >
                                                            <span style={{ fontSize: '22px' }}>Ligado</span>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>

                                            </Grid>
                                            <span style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Rele 3</span>
                                        </Grid>

                                        {/*aspersor*/}



                                        {/*rele4livre*/}
                                        {loadingRele4 ? <div></div> :
                                            <Grid
                                                item xs={12} sm={12} md={12} lg={12} xl={12}
                                                container
                                                alignItems={"center"}
                                                justifyContent={"center"}
                                                style={{ margin: 10, border: '1px solid black' }}

                                            >
                                                <Grid
                                                    item xs={3} sm={3} md={3} lg={3} xl={3}
                                                    container
                                                    alignItems={"center"}
                                                    justifyContent={"center"}
                                                >
                                                    <img
                                                        width="100px" height={"100px"}
                                                        src="https://cdn-icons-png.flaticon.com/512/9750/9750283.png"
                                                        alt="rele4"
                                                    />

                                                </Grid>

                                                <Grid
                                                    item xs={9} sm={9} md={9} lg={9} xl={9}
                                                    container
                                                    alignItems={"center"}
                                                    justifyContent={"center"}
                                                >
                                                    <Grid
                                                        item xs={12} sm={12} md={12} lg={12} xl={12}
                                                        container
                                                        alignItems={"center"}
                                                        justifyContent={"center"}
                                                        style={{ margin: 10 }}
                                                    >

                                                        <Grid
                                                            container
                                                            direction='row'
                                                            item xs={12} sm={12} md={12} lg={12} xl={12}
                                                            alignItems="flex-end"
                                                            justifyContent={"center"}
                                                        >
                                                            <Grid
                                                                container
                                                                item xs={4} sm={4} md={4} lg={4} xl={4}
                                                                alignItems="flex-end"
                                                                justifyContent={"flex-end"}
                                                            ><span style={{ fontSize: '22px' }} >Desligado</span></Grid>
                                                            <Grid
                                                                container
                                                                item xs={4} sm={4} md={4} lg={4} xl={4}
                                                                alignItems="center"
                                                                justifyContent={"center"}

                                                            >

                                                                <FormControlLabel
                                                                    control={
                                                                        <MuiSwitchLarge
                                                                            size="medium"
                                                                            disabled={false}
                                                                            checked={rele4.status_rele === 1 ? true : false}
                                                                            onChange={() => setOperacaoStatusRele4()}

                                                                        />
                                                                    }
                                                                    label={<Typography style={{ color: '#000', fontSize: 18 }}>Rele 4</Typography>}
                                                                    labelPlacement="top"
                                                                />
                                                            </Grid>
                                                            <Grid
                                                                container
                                                                item xs={4} sm={4} md={4} lg={4} xl={4}
                                                                justifyContent={"flex-start"}
                                                            >
                                                                <span style={{ fontSize: '22px' }}>Ligado</span>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                </Grid>
                                                <span style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Rele 4</span>
                                            </Grid>
                                        }
                                        {/*rele4livre*/}

                                        {/*rele5livre*/}
                                        {loadingRele5 ? <div></div> :

                                            <Grid
                                                item xs={12} sm={12} md={12} lg={12} xl={12}
                                                container
                                                alignItems={"center"}
                                                justifyContent={"center"}
                                                style={{ margin: 10, border: '1px solid black' }}

                                            >
                                                <Grid
                                                    item xs={3} sm={3} md={3} lg={3} xl={3}
                                                    container
                                                    alignItems={"center"}
                                                    justifyContent={"center"}
                                                >
                                                    <img
                                                        width="100px" height={"100px"}
                                                        src="https://cdn-icons-png.flaticon.com/512/9750/9750283.png"
                                                        alt="rele5"
                                                    />

                                                </Grid>

                                                <Grid
                                                    item xs={9} sm={9} md={9} lg={9} xl={9}
                                                    container
                                                    alignItems={"center"}
                                                    justifyContent={"center"}
                                                >
                                                    <Grid
                                                        item xs={12} sm={12} md={12} lg={12} xl={12}
                                                        container
                                                        alignItems={"center"}
                                                        justifyContent={"center"}
                                                        style={{ margin: 10 }}
                                                    >

                                                        <Grid
                                                            container
                                                            direction='row'
                                                            item xs={12} sm={12} md={12} lg={12} xl={12}
                                                            alignItems="flex-end"
                                                            justifyContent={"center"}
                                                        >
                                                            <Grid
                                                                container
                                                                item xs={4} sm={4} md={4} lg={4} xl={4}
                                                                alignItems="flex-end"
                                                                justifyContent={"flex-end"}
                                                            ><span style={{ fontSize: '22px' }} >Desligado</span></Grid>
                                                            <Grid
                                                                container
                                                                item xs={4} sm={4} md={4} lg={4} xl={4}
                                                                alignItems="center"
                                                                justifyContent={"center"}

                                                            >

                                                                <FormControlLabel
                                                                    control={
                                                                        <MuiSwitchLarge
                                                                            size="medium"
                                                                            disabled={false}
                                                                            checked={rele5.status_rele === 1 ? true : false}
                                                                            onChange={() => setOperacaoStatusRele5()}

                                                                        />
                                                                    }
                                                                    label={<Typography style={{ color: '#000', fontSize: 18 }}>Rele 5</Typography>}
                                                                    labelPlacement="top"
                                                                />
                                                            </Grid>
                                                            <Grid
                                                                container
                                                                item xs={4} sm={4} md={4} lg={4} xl={4}
                                                                justifyContent={"flex-start"}
                                                            >
                                                                <span style={{ fontSize: '22px' }}>Ligado</span>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>

                                                </Grid>
                                                <span style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>Rele 5</span>
                                            </Grid>

                                        }
                                        {/*rele5livre*/}

                                    </Grid>



                                </Grid>

                            </Grid>
                    }
                </div>


            </SwipeableViews>



        </div>


    );
}



