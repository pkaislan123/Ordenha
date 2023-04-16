import { Grid, Typography, Switch, FormControlLabel } from '@material-ui/core';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@mui/material/AppBar';
import Box from '@material-ui/core/Box';
import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import moment from 'moment';

import Paper from '@material-ui/core/Paper';

import { styled } from '@material-ui/styles';
import { Select, MenuItem, InputLabel } from '@material-ui/core';

import { XAxis, AreaChart, Line, LabelList, LineChart, Area, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {

    Legend
} from 'recharts';
import Checkbox from '@mui/material/Checkbox';
import api from '../../services/api';

//import { useWorker } from "@koale/useworker";
//import pesquisarBackGroundTodosOsComponentes from "./worker";
//import pesquisarBackGroundGraficosWorker from "./workergrafico";









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


const CustomizedLabel = (props) => {
    const { x, y, stroke, value, unit } = props;

    return (
        <text x={x} y={y} dy={-4} fill={stroke} fontSize={14} textAnchor="middle">
            {value + "" + unit}
        </text>
    );
};



export default function GraficoOrdenha() {


    // const [sortWorker] = useWorker(pesquisarBackGroundTodosOsComponentes);
    //console.log("WORKER:", sortWorkerStatus);
    // const [sortWorkerGraficos] = useWorker(pesquisarBackGroundGraficosWorker);






    const [searchBackgroundReservatorio, setSearchBackgroundReservatorio] = useState(false);
    const [searchBackgroundVentiladores, setSearchBackgroundVentiladores] = useState(false);
    const [searchBackgroundBoiler, setSearchBackgroundBoiler] = useState(false);
    const [searchBackgroundResfriador, setSearchBackgroundResfriador] = useState(false);
    const [searchBackgroundRefrescador, setSearchBackgroundRefrescador] = useState(false);




    const [registrosResfriador, setRegistrosResfriador] = useState(null);
    const [registrosReservatorio, setRegistrosReservatorio] = useState(null);
    const [registrosReservatorioStatus, setRegistrosReservatorioStatus] = useState(null);
    const [registrosRefrescadorStatus, setRegistrosRefrescadorStatus] = useState(null);


    const espessura = 1;



    // Reservatório
    const [dataInicioReservatorio, setDataInicioReservatorio] = useState(moment().format('DD/MM/YYYY'));
    const [erroDataInicioReservatorio, setErroDataInicioReservatorio] = useState(false);
    const [textoErroDataInicioReservatorio, setTextoErroDataInicioReservatorio] = useState('');

    const [dataFimReservatorio, setDataFimReservatorio] = useState(moment().format('DD/MM/YYYY'));
    const [erroDataFimReservatorio, setErroDataFimReservatorio] = useState(false);
    const [textoErroDataFimReservatorio, setTextoErroDataFimReservatorio] = useState('');

    // Boiler
    const [dataInicioBoiler, setDataInicioBoiler] = useState(moment().format('DD/MM/YYYY'));
    const [erroDataInicioBoiler, setErroDataInicioBoiler] = useState(false);
    const [textoErroDataInicioBoiler, setTextoErroDataInicioBoiler] = useState('');

    const [dataFimBoiler, setDataFimBoiler] = useState(moment().format('DD/MM/YYYY'));
    const [erroDataFimBoiler, setErroDataFimBoiler] = useState(false);
    const [textoErroDataFimBoiler, setTextoErroDataFimBoiler] = useState('');

    // Ventiladores
    const [dataInicioVentiladores, setDataInicioVentiladores] = useState(moment().format('DD/MM/YYYY'));
    const [erroDataInicioVentiladores, setErroDataInicioVentiladores] = useState(false);
    const [textoErroDataInicioVentiladores, setTextoErroDataInicioVentiladores] = useState('');

    const [dataFimVentiladores, setDataFimVentiladores] = useState(moment().format('DD/MM/YYYY'));
    const [erroDataFimVentiladores, setErroDataFimVentiladores] = useState(false);
    const [textoErroDataFimVentiladores, setTextoErroDataFimVentiladores] = useState('');

    // Resfriador
    const [dataInicioResfriador, setDataInicioResfriador] = useState(moment().format('DD/MM/YYYY'));
    const [erroDataInicioResfriador, setErroDataInicioResfriador] = useState(false);
    const [textoErroDataInicioResfriador, setTextoErroDataInicioResfriador] = useState('');

    const [dataFimResfriador, setDataFimResfriador] = useState(moment().format('DD/MM/YYYY'));
    const [erroDataFimResfriador, setErroDataFimResfriador] = useState(false);
    const [textoErroDataFimResfriador, setTextoErroDataFimResfriador] = useState('');

    // Aspersores
    const [dataInicioAspersores, setDataInicioAspersores] = useState(moment().format('DD/MM/YYYY'));
    const [erroDataInicioAspersores, setErroDataInicioAspersores] = useState(false);
    const [textoErroDataInicioAspersores, setTextoErroDataInicioAspersores] = useState('');

    const [dataFimAspersores, setDataFimAspersores] = useState(moment().format('DD/MM/YYYY'));
    const [erroDataFimAspersores, setErroDataFimAspersores] = useState(false);
    const [textoErroDataFimAspersores, setTextoErroDataFimAspersores] = useState('');




    const [legendas, setLegendas] = useState(false);
    const [animacao, setAnimacao] = useState(true);

    const [searchingReservatorio, setSearchingReservatorio] = useState(true);
    const [searchingReservatorioStatus, setSearchingReservatorioStatus] = useState(true);
    const [searchingResfriador, setSearchingResfriador] = useState(true);


    const [searchingBoiler, setSearchingBoiler] = useState(true);
    const [searchingBoilerStatus, setSearchingBoilerStatus] = useState(true);

    const [searchingBoilerTemp, setSearchingBoilerTemp] = useState(true);
    const [searchingBoilerTempStatus, setSearchingBoilerTempStatus] = useState(true);

    const [searchingRefrescadorStatus, setSearchingRefrescadorStatus] = useState(true);



    const [searchingVentiladores, setSearchingVentiladores] = useState(true);
    const [searchingVentiladoresStatus, setSearchingVentiladoresStatus] = useState(true);

    const [registrosVentiladores, setRegistrosVentiladores] = useState(true);
    const [registrosVentiladoresStatus, setRegistrosVentiladoresStatus] = useState(true);


    const [registrosBoiler, setRegistrosBoiler] = useState(true);
    const [registrosBoilerStatus, setRegistrosBoilerStatus] = useState(true);


    const [registrosBoilerTemp, setRegistrosBoilerTemp] = useState(true);
    const [registrosBoilerTempStatus, setRegistrosBoilerTempStatus] = useState(true);

    const [parametros, setParametros] = useState(
        {

            acumulado: 0,
        }
    );

    const maskDate = value => {
        return value
            .replace(/\D/g, "")
            .replace(/(\d{2})(\d)/, "$1/$2")
            .replace(/(\d{2})(\d)/, "$1/$2")
            .replace(/(\d{4})(\d)/, "$1");
    };

    function handleChangeLegends() {
        setLegendas(!legendas);
    }

    function handleChangeAnimacao() {
        setAnimacao(!animacao);
    }


    function handlepesquisarReservatorio() {
        if (parametros.acumulado === 2) {
            setSearchBackgroundReservatorio(true);

        } else {
            setSearchBackgroundReservatorio(false);

        }
        pesquisarReservatorio();

    }

    function handlepesquisarVentiladores() {
        if (parametros.acumulado === 2) {
            setSearchBackgroundVentiladores(true);

        } else {
            setSearchBackgroundVentiladores(false);

        }
        pesquisarVentiladores();

    }





    function handlepesquisarBoiler() {
        if (parametros.acumulado === 2) {
            if (!searchBackgroundBoiler)
                setSearchBackgroundBoiler(true);

        } else {

            if (searchBackgroundBoiler)
                setSearchBackgroundBoiler(false);

        }
        pesquisarBoiler();

    }

    function handlepesquisarRefrescador() {
        if (parametros.acumulado === 2) {
            setSearchBackgroundRefrescador(true);

        } else {
            setSearchBackgroundRefrescador(false);

        }
        pesquisarRefrescador();

    }


    function handlepesquisarResfriador() {
        if (parametros.acumulado === 2) {
            setSearchBackgroundResfriador(true);

        } else {
            setSearchBackgroundResfriador(false);

        }
        pesquisarResfriador();

    }


    /*
        useEffect(() => {
            const interval = setInterval(() => {
                sortWorkerGraficos().then((result) => {
                    console.log("Resultado da chamada", result);
    
                    const response = result;
                        if (response !== null) {
    
                            
                            //reservatorio 0 e 1
                            if (searchBackgroundReservatorio) {
                                setRegistrosReservatorio(response[0])
                                setRegistrosReservatorioStatus(response[1])
    
                                //  setSearchingReservatorio(false);
                                //  setSearchingReservatorioStatus(false);
                            }
    
                            //ventiladores 2 e 3
                            if (searchBackgroundVentiladores) {
                                setRegistrosVentiladores(response[2])
                                setRegistrosVentiladoresStatus(response[3])
    
                                //  setSearchingVentiladores(false);
                                //  setSearchingVentiladoresStatus(false);
                            }
    
    
                            //boiler caixa 4 e 5
                            if (searchBackgroundBoiler) {
    
                                setRegistrosBoiler(response[4])
                                setRegistrosBoilerStatus(response[5])
    
                                //  setSearchingBoiler(false);
                                // setSearchingBoilerStatus(false);
    
    
                            }
                            //boiler temp 6 e 7
                            if (searchBackgroundBoiler) {
                                setRegistrosBoilerTemp(response[6])
                                setRegistrosBoilerTempStatus(response[7]);
    
                                // setSearchingBoilerTemp(false);
                                // setSearchingBoilerTempStatus(false);
                            }
    
                            //ventiladores externos 8 e 9
                            if (searchBackgroundVentiladores) {
    
                            }
    
    
                            //resfriador 10 e 11
                            if (searchBackgroundResfriador) {
                                setRegistrosResfriador(response[10])
    
                                // setSearchingResfriador(false);
    
                            }
    
                            //  //reles 12 e 13
                             // if (searchBackgroundReles) {
                                //
                              //}
                              
                            //refrescador 14 e 15
                            if (searchBackgroundRefrescador) {
                                setRegistrosRefrescadorStatus(response[15])
                                // setSearchingRefrescadorStatus(false);
                            }
    
    
    
                        }
                    
                });
    
    
            }, 50000);
    
            return () => clearInterval(interval);
    
    
        }, [searchBackgroundReservatorio, searchBackgroundResfriador, searchBackgroundVentiladores, searchBackgroundRefrescador, searchBackgroundBoiler]);
    */


    useEffect(() => {
        const interval = setInterval(() => {

            async function pesquisarBackGroundGraficos() {

                if (searchBackgroundReservatorio || searchBackgroundResfriador || searchBackgroundVentiladores || searchBackgroundRefrescador || searchBackgroundBoiler) {
                    try {
                        console.log("graficos iniciado!")



                        var url = "v1/registro/listarTodosComponenteStatus";
                        //console.log("Url: " + url);
                        await api.get(url).then(function (response) {
                            if (response.data !== null) {


                                //reservatorio 0 e 1
                                if (searchBackgroundReservatorio) {
                                    setRegistrosReservatorio(response.data[0])
                                    setRegistrosReservatorioStatus(response.data[1])

                                    //  setSearchingReservatorio(false);
                                    //  setSearchingReservatorioStatus(false);
                                }

                                //ventiladores 2 e 3
                                if (searchBackgroundVentiladores) {
                                    setRegistrosVentiladores(response.data[2])
                                    setRegistrosVentiladoresStatus(response.data[3])

                                    //  setSearchingVentiladores(false);
                                    //  setSearchingVentiladoresStatus(false);
                                }


                                //boiler caixa 4 e 5
                                if (searchBackgroundBoiler) {

                                    setRegistrosBoiler(response.data[4])
                                    setRegistrosBoilerStatus(response.data[5])

                                    //  setSearchingBoiler(false);
                                    // setSearchingBoilerStatus(false);


                                }
                                //boiler temp 6 e 7
                                if (searchBackgroundBoiler) {
                                    setRegistrosBoilerTemp(response.data[6])
                                    setRegistrosBoilerTempStatus(response.data[7]);

                                    // setSearchingBoilerTemp(false);
                                    // setSearchingBoilerTempStatus(false);
                                }

                                //ventiladores externos 8 e 9
                                if (searchBackgroundVentiladores) {

                                }


                                //resfriador 10 e 11
                                if (searchBackgroundResfriador) {
                                    setRegistrosResfriador(response.data[10])

                                    // setSearchingResfriador(false);

                                }

                                //  //reles 12 e 13
                                // if (searchBackgroundReles) {
                                //
                                //}

                                //refrescador 14 e 15
                                if (searchBackgroundRefrescador) {
                                    setRegistrosRefrescadorStatus(response.data[15])
                                    // setSearchingRefrescadorStatus(false);
                                }





                            }
                        });

                        console.log("graficos encerrado!")


                    } catch (_err) {
                        console.log("Erro no background: " + _err);
                        //alert("Erro de Conexão, tente novamente mais tarde");

                    }
                }
            }

            pesquisarBackGroundGraficos();


        }, 20000);

        return () => clearInterval(interval);

    }, [searchBackgroundReservatorio, searchBackgroundResfriador, searchBackgroundVentiladores, searchBackgroundRefrescador, searchBackgroundBoiler]);





    function validarData(data) {
        const dateFormat = "DD/MM/YYYY";
        const teste = moment(data, dateFormat, true).isValid();
        return teste;
    }

    function validarDataInicioReservatorio() {
        if (validarData(dataInicioReservatorio)) {
            setErroDataInicioReservatorio(false);
            setTextoErroDataInicioReservatorio('');
            return true;
        } else {
            setErroDataInicioReservatorio(true);
            setTextoErroDataInicioReservatorio("Data Inicial do Reservatório Inválida");
            return false;
        }
    }

    function validarDataFimReservatorio() {
        if (validarData(dataFimReservatorio)) {
            setErroDataFimReservatorio(false);
            setTextoErroDataFimReservatorio('');
            return true;
        } else {
            setErroDataFimReservatorio(true);
            setTextoErroDataFimReservatorio("Data do Final do Reservatório Inválida");
            return false;
        }
    }

    function validarDataInicioVentiladores() {
        if (validarData(dataInicioVentiladores)) {
            setErroDataInicioVentiladores(false);
            setTextoErroDataInicioVentiladores('');
            return true;
        } else {
            setErroDataInicioVentiladores(true);
            setTextoErroDataInicioVentiladores("Data Inicial dos Ventiladores Inválida");
            return false;
        }
    }

    function validarDataFimVentiladores() {
        if (validarData(dataFimVentiladores)) {
            setErroDataFimVentiladores(false);
            setTextoErroDataFimVentiladores('');
            return true;
        } else {
            setErroDataFimVentiladores(true);
            setTextoErroDataFimVentiladores("Data do Final dos Ventiladores Inválida");
            return false;
        }
    }

    function validarDataInicioBoiler() {
        if (validarData(dataInicioBoiler)) {
            setErroDataInicioBoiler(false);
            setTextoErroDataInicioBoiler('');
            return true;
        } else {
            setErroDataInicioBoiler(true);
            setTextoErroDataInicioBoiler("Data Inicial do Boiler Inválida");
            return false;
        }
    }

    function validarDataFimBoiler() {
        if (validarData(dataFimBoiler)) {
            setErroDataFimBoiler(false);
            setTextoErroDataFimBoiler('');
            return true;
        } else {
            setErroDataFimBoiler(true);
            setTextoErroDataFimBoiler("Data do Final do Boiler Inválida");
            return false;
        }
    }


    function validarDataInicioAspersores() {
        if (validarData(dataInicioAspersores)) {
            setErroDataInicioAspersores(false);
            setTextoErroDataInicioAspersores('');
            return true;
        } else {
            setErroDataInicioAspersores(true);
            setTextoErroDataInicioAspersores("Data Inicial dos Aspersores Inválida");
            return false;
        }
    }

    function validarDataFimAspersores() {
        if (validarData(dataFimAspersores)) {
            setErroDataFimAspersores(false);
            setTextoErroDataFimAspersores('');
            return true;
        } else {
            setErroDataFimAspersores(true);
            setTextoErroDataFimAspersores("data invalida");
        }
    }

    function validarDataInicioResfriador() {
        if (validarData(dataInicioResfriador)) {
            setErroDataInicioResfriador(false);
            setTextoErroDataInicioResfriador('');
            return true;
        } else {
            setErroDataInicioResfriador(true);
            setTextoErroDataInicioResfriador("Data do Final Inválida");
            return false;
        }
    }


    function validarDataFimResfriador() {
        if (validarData(dataFimResfriador)) {
            setErroDataFimResfriador(false);
            setTextoErroDataFimResfriador('');
            return true;
        } else {
            setErroDataFimResfriador(true);
            setTextoErroDataFimResfriador("Data do Final Inválida");
            return false;
        }
    }

    const DataFormater = (number) => {


        return number.toLocaleString();

    }

    function formatDataAndHour(data) {
        var dataCtr = moment(data, "YYYY-MM-DD hh:mm:ss");
        return dataCtr.format("DD/MM/YYYY HH:mm");
    }


    function formatDataAndHourComplete(data) {
        var dataCtr = moment(data, "YYYY-MM-DD hh:mm:ss");
        return dataCtr.format("HH:mm:ss");
    }



    async function pesquisarReservatorio() {



        //  setSearchingReservatorio(true);
        //  setSearchingReservatorioStatus(true);
        validarDataInicioReservatorio();
        validarDataFimReservatorio();

        try {

            if (validarDataInicioReservatorio() && validarDataFimReservatorio()) {
                var dataIn = moment(dataInicioReservatorio, "DD/MM/YYYY");
                var dataFi = moment(dataFimReservatorio, "DD/MM/YYYY");


                dataIn = moment(dataIn).format('yyyy-MM-DD')
                dataFi = moment(dataFi).format('yyyy-MM-DD')

                var url = "v1/registro/listarPorComponente/1/" + dataIn + "/" + dataFi + "/" + parametros.acumulado;
                //console.log("Url: " + url);
                await api.get(url).then(function (response) {

                    if (response.data !== null) {


                        setRegistrosReservatorio(response.data)

                        //   console.log(" Medicoes: " + response.data);


                    }
                });

                url = "v1/registro/listarPorComponenteStatus/1/" + dataIn + "/" + dataFi + "/" + parametros.acumulado;
                console.log("Url: " + url);
                await api.get(url).then(function (response) {

                    if (response.data !== null) {


                        setRegistrosReservatorioStatus(response.data)

                        //   console.log(" Medicoes: " + response.data);


                    }
                });

                setSearchingReservatorio(false);

                setSearchingReservatorioStatus(false);

            }

        } catch (_err) {
            alert("Erro de Conexão, tente novamente mais tarde");

        }
    }


    async function pesquisarVentiladores() {



        setSearchingVentiladores(true);
        setSearchingVentiladoresStatus(true);

        if (parametros.acumulado <= 1) {
            validarDataInicioVentiladores();
            validarDataFimVentiladores();
        }
        try {

            if (parametros.acumulado === 2 || (validarDataInicioVentiladores() && validarDataFimVentiladores() && parametros.acumulado <= 1)) {
                var dataIn = moment(dataInicioVentiladores, "DD/MM/YYYY");
                var dataFi = moment(dataFimVentiladores, "DD/MM/YYYY");


                dataIn = moment(dataIn).format('yyyy-MM-DD')
                dataFi = moment(dataFi).format('yyyy-MM-DD')

                var url = "v1/registro/listarPorComponente/2/" + dataIn + "/" + dataFi + "/" + parametros.acumulado;
                //console.log("Url: " + url);
                await api.get(url).then(function (response) {

                    if (response.data !== null) {


                        setRegistrosVentiladores(response.data)

                        //    console.log(" Medicoes: " + response.data);


                    }
                });
                setSearchingVentiladores(false);

                url = "v1/registro/listarPorComponenteStatus/2/" + dataIn + "/" + dataFi + "/" + parametros.acumulado;
                //   console.log("Url: " + url);
                await api.get(url).then(function (response) {

                    if (response.data !== null) {


                        setRegistrosVentiladoresStatus(response.data)

                        //    console.log(" Medicoes: " + response.data);


                    }
                });
                setSearchingVentiladoresStatus(false);

            }

        } catch (_err) {
            alert("Erro de Conexão, tente novamente mais tarde");

        }
    }




    async function pesquisarBoiler() {



        // setSearchingBoiler(true);
        // setSearchingBoilerStatus(true);
        //  setSearchingBoilerTemp(true);
        //  setSearchingBoilerTempStatus(true);


        if (parametros.acumulado <= 1) {
            validarDataInicioBoiler();
            validarDataFimBoiler();
        }

        try {

            if (parametros.acumulado === 2 || (validarDataInicioBoiler() && validarDataFimBoiler() && parametros.acumulado <= 1)) {
                var dataIn = moment(dataInicioBoiler, "DD/MM/YYYY");
                var dataFi = moment(dataFimBoiler, "DD/MM/YYYY");


                dataIn = moment(dataIn).format('yyyy-MM-DD')
                dataFi = moment(dataFi).format('yyyy-MM-DD')

                var url = "v1/registro/listarRegistrosBoiler/" + dataIn + "/" + dataFi + "/" + parametros.acumulado;
                console.log("Url: " + url);

                console.log("Chamada de grafico de boiler iniciada");

                await api.get(url).then(function (response) {

                    if (response.data !== null) {
                        console.log("Chamada de grafico de boiler, renderizando");


                        setRegistrosBoiler(response.data[0])
                        setRegistrosBoilerStatus(response.data[1])
                        setRegistrosBoilerTemp(response.data[2])
                        setRegistrosBoilerTempStatus(response.data[3])
                        console.log("Chamada de grafico de boiler arrays atualizados");


                        setSearchingBoiler(false);
                        setSearchingBoilerStatus(false);
                        setSearchingBoilerTemp(false);
                        setSearchingBoilerTempStatus(false);

                        console.log("Chamada de grafico de boiler concluida, fim da renderizacao");

                    }
                });


            }

        } catch (_err) {
            console.log("Erro: " + _err);
            alert("Erro de Conexão, tente novamente mais tarde");

        }
    }



    async function pesquisarRefrescador() {



        // setSearchingRefrescadorStatus(true);



        if (parametros.acumulado <= 1) {
            validarDataInicioAspersores();
            validarDataFimAspersores();
        }

        try {

            if (parametros.acumulado === 2 || (validarDataInicioAspersores() && validarDataFimAspersores() && parametros.acumulado <= 1)) {
                var dataIn = moment(dataInicioAspersores, "DD/MM/YYYY");
                var dataFi = moment(dataFimAspersores, "DD/MM/YYYY");


                dataIn = moment(dataIn).format('yyyy-MM-DD')
                dataFi = moment(dataFi).format('yyyy-MM-DD')


                var url = "v1/registro/listarPorComponenteStatus/8/" + dataIn + "/" + dataFi + "/" + parametros.acumulado;
                // console.log("Url: " + url);
                await api.get(url).then(function (response) {

                    if (response.data !== null) {


                        setRegistrosRefrescadorStatus(response.data)

                        //    console.log(" Medicoes: " + response.data);


                    }
                });
                setSearchingRefrescadorStatus(false);

            }

        } catch (_err) {
            console.log("Erro: " + _err);
            alert("Erro de Conexão, tente novamente mais tarde");

        }
    }



    async function pesquisarResfriador() {



        //setSearchingResfriador(true);



        if (parametros.acumulado <= 1) {
            validarDataInicioResfriador();
            validarDataFimResfriador();
        }

        try {

            if (parametros.acumulado === 2 || (validarDataInicioResfriador() && validarDataFimResfriador() && parametros.acumulado <= 1)) {
                var dataIn = moment(dataInicioResfriador, "DD/MM/YYYY");
                var dataFi = moment(dataFimResfriador, "DD/MM/YYYY");


                dataIn = moment(dataIn).format('yyyy-MM-DD')
                dataFi = moment(dataFi).format('yyyy-MM-DD')


                var url = "v1/registro/listarPorComponente/6/" + dataIn + "/" + dataFi + "/" + parametros.acumulado;
                // console.log("Url: " + url);
                await api.get(url).then(function (response) {

                    if (response.data !== null) {


                        setRegistrosResfriador(response.data)

                        //    console.log(" Medicoes: " + response.data);


                    }
                });
                setSearchingResfriador(false);

            }

        } catch (_err) {
            console.log("Erro: " + _err);
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






    return (


        <div style={{
            margin: 0
        }}>





            <Box style={{ backgroundColor: 'white', width: '100%' }}>
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

                    </Tabs>
                </AppBar>
                <Grid
                    container
                    item xs={12} sm={12} md={12} lg={12} xl={12}
                    alignItems={"center"}
                    justifyContent={"center"}
                    style={{bakgroundColor:'white', paddingTop: 10, paddingBottom: 10}}
                >

                    <Button href="/" variant="contained" color="primary">
                        Ir para Controle
                    </Button>
                </Grid>
            </Box>

            <SwipeableViews
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <div value={value} index={0} >
                    {

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



                            <div>
                                <Grid container
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="center"
                                    item xs={12}
                                    style={{ marginTop: 50 }}
                                    spacing={3}
                                >
                                    <Grid item xs={2} >
                                        <TextField
                                            variant="standard"
                                            name="dataInicio"
                                            label="Data de Início"
                                            required
                                            id="dataInicio"
                                            value={dataInicioReservatorio}
                                            onChange={e => (e.target.value === '' || /^[0-9/\b]+$/.test(e.target.value)) ? setDataInicioReservatorio(maskDate(e.target.value)) : null}
                                            error={erroDataInicioReservatorio}
                                            helperText={textoErroDataInicioReservatorio}
                                            fullWidth
                                            disabled={parametros.acumulado === 2 ? true : false}
                                        />
                                    </Grid>

                                    <Grid item xs={2} >
                                        <TextField
                                            variant="standard"
                                            name="dataFim"
                                            label="Data Final"
                                            required
                                            id="dataFim"
                                            value={dataFimReservatorio}
                                            onChange={e => (e.target.value === '' || /^[0-9/\b]+$/.test(e.target.value)) ? setDataFimReservatorio(maskDate(e.target.value)) : null}
                                            error={erroDataFimReservatorio}
                                            helperText={textoErroDataFimReservatorio}
                                            fullWidth
                                            disabled={parametros.acumulado === 2 ? true : false}

                                        />
                                    </Grid>


                                    <Grid
                                        item xs={12} sm={3} md={3} lg={3} xl={3}
                                        direction="row"
                                        container
                                        justifyContent="center"
                                        alignItems="center"
                                        style={{ padding: 20, width: '100%', fontSize: 22 }}
                                    >
                                        <Grid
                                            container
                                            justifyContent="flex-end"
                                            direction="row"
                                            alignItems="flex-end"
                                            item xs={12} sm={2} md={2} lg={2} xl={2}>
                                            <InputLabel style={{ fontSize: 22 }} id="acumulado">Acumulado: </InputLabel>
                                        </Grid>

                                        <Grid
                                            item xs={12} sm={2} md={2} lg={2} xl={2}>
                                            <Select

                                                labelId="acumulado"
                                                id="acumulado"
                                                value={parametros.acumulado}
                                                name="acumulado"
                                                style={{ fontSize: 18, fontWeight: 'bold' }}
                                                onChange={e => setParametros(prevState => ({ ...prevState, [e.target.name]: e.target.value }))} label="acumulado"
                                            >
                                                <MenuItem value={0}>Por Dia</MenuItem>
                                                <MenuItem value={1}>Por Hora</MenuItem>
                                                <MenuItem value={2}>Tempo Real</MenuItem>


                                            </Select>
                                        </Grid>

                                    </Grid>

                                    <Grid
                                        item xs={12} sm={2} md={2} lg={2} xl={2}
                                        direction="row"
                                        container
                                        justifyContent="center"
                                        alignItems="center"
                                        style={{ padding: 20, width: '100%', fontSize: 22 }}
                                    >

                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={(e) => handlepesquisarReservatorio()}
                                        >
                                            pesquisar
                                        </Button>

                                    </Grid>

                                    <Grid item xs={12}
                                        style={{ color: 'black' }}>
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="center"
                                            alignItems="center"
                                            item xs={12}
                                            style={{ color: 'black' }}
                                        >

                                            <FormControlLabel
                                                label="Legendas"
                                                control={<Checkbox checked={legendas} onChange={() => handleChangeLegends()} />}
                                            />

                                            <FormControlLabel
                                                label="Animação"
                                                control={<Checkbox checked={animacao} onChange={() => handleChangeAnimacao()} />}
                                            />

                                        </Grid>

                                    </Grid>

                                </Grid>

                            </div>
                            {searchingReservatorio ?
                                <div></div>
                                :
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={10}
                                    style={{ paddingBottom: 50 }}
                                >
                                    <Paper elevation={5} style={{ height: 400, borderRadius: '20px', backgroundColor: '#E6E6FA', marginBotton: 50 }} >
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart
                                                width={400}
                                                height={400}
                                                data={registrosReservatorio.map((medida => {

                                                    medida['data_formatada'] = parametros.acumulado === 2 ? formatDataAndHourComplete(medida.data_hora) : formatDataAndHour(medida.data_hora)
                                                    medida['Medição'] = medida.valor
                                                    medida['amt'] = medida.valor
                                                    return medida;
                                                }))}
                                                margin={{
                                                    top: 30,
                                                    right: 30,
                                                    left: 20,
                                                    bottom: 5
                                                }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey='data_formatada'
                                                    tick={{ fill: 'blue' }} tickLine={{ stroke: 'blue' }}

                                                />
                                                <YAxis
                                                    tickFormatter={DataFormater}
                                                    unit={"%"}
                                                    tick={{ fill: 'green' }} tickLine={{ stroke: 'green' }}

                                                />
                                                <Tooltip />

                                                <Legend
                                                    align="right"
                                                    verticalAlign="top"
                                                    layout="vertical"
                                                />
                                                <Line type="monotone" dataKey="Medição" strokeWidth={espessura} stroke="#000080" unit={"%"} >
                                                    <LabelList unit={"%"} content={<CustomizedLabel />} />
                                                </Line>
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </Paper>
                                </Grid>



                            }

                            {searchingReservatorioStatus ?
                                <div></div>
                                :
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={10}
                                    style={{ paddingBottom: 50 }}
                                >
                                    <Paper elevation={5} style={{ height: 400, borderRadius: '20px', backgroundColor: '#E6E6FA', marginBotton: 50 }} >
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart
                                                width={400}
                                                height={400}
                                                data={registrosReservatorioStatus.map((medida => {

                                                    medida['data_formatada'] = parametros.acumulado === 2 ? formatDataAndHourComplete(medida.data_hora) : formatDataAndHour(medida.data_hora)
                                                    medida['Status'] = medida.status
                                                    medida['amt'] = medida.status
                                                    return medida;
                                                }))}
                                                margin={{
                                                    top: 30,
                                                    right: 30,
                                                    left: 20,
                                                    bottom: 5
                                                }}
                                            >
                                                <defs>
                                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                                    </linearGradient>
                                                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey='data_formatada'
                                                    tick={{ fill: 'blue' }} tickLine={{ stroke: 'blue' }}

                                                />

                                                <Tooltip />

                                                <Legend
                                                    align="right"
                                                    verticalAlign="top"
                                                    layout="vertical"
                                                />
                                                <Area
                                                    type="monotone"
                                                    dataKey="Status"
                                                    stroke="#000080"
                                                    fillOpacity={1}
                                                    fill="url(#colorUv)" />


                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </Paper>
                                </Grid>



                            }

                        </Grid>

                    }
                </div >

                <div value={value} index={1} >


                    {


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

                            <div>
                                <Grid container
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="center"
                                    item xs={12} sm={12} md={12} lg={12} xl={12}

                                    style={{ marginTop: 50 }}
                                    spacing={3}
                                >
                                    <Grid item xs={2} >
                                        <TextField
                                            variant="standard"
                                            name="dataInicioBoiler"
                                            label="Data de Início"
                                            required
                                            id="dataInicioBoiler"
                                            value={dataInicioBoiler}
                                            onChange={e => (e.target.value === '' || /^[0-9/\b]+$/.test(e.target.value)) ? setDataInicioBoiler(maskDate(e.target.value)) : null}
                                            error={erroDataInicioBoiler}
                                            helperText={textoErroDataInicioBoiler}
                                            fullWidth
                                            disabled={parametros.acumulado === 2 ? true : false}
                                        />
                                    </Grid>

                                    <Grid item xs={2} >
                                        <TextField
                                            variant="standard"
                                            name="dataFimBoiler"
                                            label="Data Final"
                                            required
                                            id="dataFimBoiler"
                                            value={dataFimBoiler}
                                            onChange={e => (e.target.value === '' || /^[0-9/\b]+$/.test(e.target.value)) ? setDataFimBoiler(maskDate(e.target.value)) : null}
                                            error={erroDataFimBoiler}
                                            helperText={textoErroDataFimBoiler}
                                            fullWidth
                                            disabled={parametros.acumulado === 2 ? true : false}

                                        />
                                    </Grid>


                                    <Grid
                                        item xs={12} sm={3} md={3} lg={3} xl={3}
                                        direction="row"
                                        container
                                        justifyContent="center"
                                        alignItems="center"
                                        style={{ padding: 20, width: '100%', fontSize: 22 }}
                                    >
                                        <Grid
                                            container
                                            justifyContent="flex-end"
                                            direction="row"
                                            alignItems="flex-end"
                                            item xs={12} sm={2} md={2} lg={2} xl={2}>
                                            <InputLabel style={{ fontSize: 22 }} id="acumulado">Acumulado: </InputLabel>
                                        </Grid>

                                        <Grid
                                            item xs={12} sm={2} md={2} lg={2} xl={2}>
                                            <Select
                                                labelId="acumulado"
                                                id="acumulado"
                                                value={parametros.acumulado}
                                                name="acumulado"
                                                style={{ fontSize: 18, fontWeight: 'bold' }}
                                                onChange={e => setParametros(prevState => ({ ...prevState, [e.target.name]: e.target.value }))} label="acumulado"
                                            >
                                                <MenuItem value={0}>Por Dia</MenuItem>
                                                <MenuItem value={1}>Por Hora</MenuItem>
                                                <MenuItem value={2}>Tempo Real</MenuItem>


                                            </Select>
                                        </Grid>

                                    </Grid>

                                    <Grid
                                        item xs={12} sm={2} md={2} lg={2} xl={2}
                                        direction="row"
                                        container
                                        justifyContent="center"
                                        alignItems="center"
                                        style={{ padding: 20, width: '100%', fontSize: 22 }}
                                    >

                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={(e) => handlepesquisarBoiler()}
                                        >
                                            pesquisar
                                        </Button>

                                    </Grid>

                                    <Grid item xs={12}
                                        style={{ color: 'black' }}>
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="center"
                                            alignItems="center"
                                            item xs={12}
                                            style={{ color: 'black' }}
                                        >

                                            <FormControlLabel
                                                label="Legendas"
                                                control={<Checkbox checked={legendas} onChange={() => handleChangeLegends()} />}
                                            />

                                            <FormControlLabel
                                                label="Animação"
                                                control={<Checkbox checked={animacao} onChange={() => handleChangeAnimacao()} />}
                                            />

                                        </Grid>

                                    </Grid>

                                </Grid>

                            </div>
                            {searchingBoiler ?
                                <div></div>
                                :
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={10}
                                    style={{ paddingBottom: 50 }}
                                >
                                    <Paper elevation={5} style={{ height: 400, borderRadius: '20px', backgroundColor: '#E6E6FA', marginBotton: 50 }} >
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart
                                                width={400}
                                                height={400}
                                                data={registrosBoiler.map((medida => {

                                                    medida['data_formatada'] = parametros.acumulado === 2 ? formatDataAndHourComplete(medida.data_hora) : formatDataAndHour(medida.data_hora)
                                                    medida['Nível do Reservatório'] = medida.valor
                                                    medida['amt'] = medida.valor
                                                    return medida;
                                                }))}
                                                margin={{
                                                    top: 30,
                                                    right: 30,
                                                    left: 20,
                                                    bottom: 5
                                                }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey='data_formatada'
                                                    tick={{ fill: 'blue' }} tickLine={{ stroke: 'blue' }}

                                                />
                                                <YAxis
                                                    tickFormatter={DataFormater}
                                                    unit={"%"}
                                                    tick={{ fill: 'green' }} tickLine={{ stroke: 'green' }}

                                                />
                                                <Tooltip />

                                                <Legend
                                                    align="right"
                                                    verticalAlign="top"
                                                    layout="vertical"
                                                />
                                                <Line type="monotone" dataKey="Nível do Reservatório" strokeWidth={espessura} stroke="#000080" unit={"%"} >
                                                    <LabelList unit={"%"} content={<CustomizedLabel />} />
                                                </Line>
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </Paper>
                                </Grid>



                            }

                            {searchingBoilerStatus ?
                                <div></div>
                                :
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={10}
                                    style={{ paddingBottom: 50 }}
                                >
                                    <Paper elevation={5} style={{ height: 400, borderRadius: '20px', backgroundColor: '#E6E6FA', marginBotton: 50 }} >
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart
                                                width={400}
                                                height={400}
                                                data={registrosBoilerStatus.map((medida => {

                                                    medida['data_formatada'] = parametros.acumulado === 2 ? formatDataAndHourComplete(medida.data_hora) : formatDataAndHour(medida.data_hora)
                                                    medida['Status'] = medida.status
                                                    medida['amt'] = medida.status
                                                    return medida;
                                                }))}
                                                margin={{
                                                    top: 30,
                                                    right: 30,
                                                    left: 20,
                                                    bottom: 5
                                                }}
                                            >
                                                <defs>
                                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                                    </linearGradient>
                                                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey='data_formatada'
                                                    tick={{ fill: 'blue' }} tickLine={{ stroke: 'blue' }}

                                                />

                                                <Tooltip />

                                                <Legend
                                                    align="right"
                                                    verticalAlign="top"
                                                    layout="vertical"
                                                />
                                                <Area
                                                    type="monotone"
                                                    dataKey="Status"
                                                    stroke="#000080"
                                                    fillOpacity={1}
                                                    fill="url(#colorUv)" />


                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </Paper>
                                </Grid>



                            }

                            {searchingBoilerTemp ?
                                <div></div>
                                :
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={10}
                                    style={{ paddingBottom: 50 }}
                                >
                                    <Paper elevation={5} style={{ height: 400, borderRadius: '20px', backgroundColor: '#E6E6FA', marginBotton: 50 }} >
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart
                                                width={400}
                                                height={400}
                                                data={registrosBoilerTemp.map((medida => {

                                                    medida['data_formatada'] = parametros.acumulado === 2 ? formatDataAndHourComplete(medida.data_hora) : formatDataAndHour(medida.data_hora)
                                                    medida['Temperatura'] = medida.valor
                                                    medida['amt'] = medida.valor
                                                    return medida;
                                                }))}
                                                margin={{
                                                    top: 30,
                                                    right: 30,
                                                    left: 20,
                                                    bottom: 5
                                                }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey='data_formatada'
                                                    tick={{ fill: 'blue' }} tickLine={{ stroke: 'blue' }}

                                                />
                                                <YAxis
                                                    tickFormatter={DataFormater}
                                                    unit={"ºC"}
                                                    tick={{ fill: 'green' }} tickLine={{ stroke: 'green' }}

                                                />
                                                <Tooltip />

                                                <Legend
                                                    align="right"
                                                    verticalAlign="top"
                                                    layout="vertical"
                                                />
                                                <Line type="monotone" dataKey="Temperatura" strokeWidth={espessura} stroke="#000080" unit={"ºC"} >
                                                    <LabelList unit={"ºC"} content={<CustomizedLabel />} />
                                                </Line>
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </Paper>
                                </Grid>



                            }

                            {searchingBoilerTempStatus ?
                                <div></div>
                                :
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={10}
                                    style={{ paddingBottom: 50 }}
                                >
                                    <Paper elevation={5} style={{ height: 400, borderRadius: '20px', backgroundColor: '#E6E6FA', marginBotton: 50 }} >
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart
                                                width={400}
                                                height={400}
                                                data={registrosBoilerTempStatus.map((medida => {

                                                    medida['data_formatada'] = parametros.acumulado === 2 ? formatDataAndHourComplete(medida.data_hora) : formatDataAndHour(medida.data_hora)
                                                    medida['Status'] = medida.status
                                                    medida['amt'] = medida.status
                                                    return medida;
                                                }))}
                                                margin={{
                                                    top: 30,
                                                    right: 30,
                                                    left: 20,
                                                    bottom: 5
                                                }}
                                            >
                                                <defs>
                                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                                    </linearGradient>
                                                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey='data_formatada'
                                                    tick={{ fill: 'blue' }} tickLine={{ stroke: 'blue' }}

                                                />

                                                <Tooltip />

                                                <Legend
                                                    align="right"
                                                    verticalAlign="top"
                                                    layout="vertical"
                                                />
                                                <Area
                                                    type="monotone"
                                                    dataKey="Status"
                                                    stroke="#000080"
                                                    fillOpacity={1}
                                                    fill="url(#colorUv)" />


                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </Paper>
                                </Grid>



                            }


                        </Grid>
                    }

                </div >
                <div value={value} index={2} >
                    {



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



                            <div>
                                <Grid container
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="center"
                                    item xs={12} sm={12} md={12} lg={12} xl={12}

                                    style={{ marginTop: 50 }}
                                    spacing={3}
                                >
                                    <Grid item xs={2} >
                                        <TextField
                                            variant="standard"
                                            name="dataInicioVentiladores"
                                            label="Data de Início"
                                            required
                                            id="dataInicioVentiladores"
                                            value={dataInicioVentiladores}
                                            onChange={e => (e.target.value === '' || /^[0-9/\b]+$/.test(e.target.value)) ? setDataInicioVentiladores(maskDate(e.target.value)) : null}
                                            error={erroDataInicioVentiladores}
                                            helperText={textoErroDataInicioVentiladores}
                                            fullWidth
                                            disabled={parametros.acumulado === 2 ? true : false}
                                        />
                                    </Grid>

                                    <Grid item xs={2} >
                                        <TextField
                                            variant="standard"
                                            name="dataFimVentiladores"
                                            label="Data Final"
                                            required
                                            id="dataFimVentiladores"
                                            value={dataFimVentiladores}
                                            onChange={e => (e.target.value === '' || /^[0-9/\b]+$/.test(e.target.value)) ? setDataFimVentiladores(maskDate(e.target.value)) : null}
                                            error={erroDataFimVentiladores}
                                            helperText={textoErroDataFimVentiladores}
                                            fullWidth
                                            disabled={parametros.acumulado === 2 ? true : false}

                                        />
                                    </Grid>


                                    <Grid
                                        item xs={12} sm={3} md={3} lg={3} xl={3}
                                        direction="row"
                                        container
                                        justifyContent="center"
                                        alignItems="center"
                                        style={{ padding: 20, width: '100%', fontSize: 22 }}
                                    >
                                        <Grid
                                            container
                                            justifyContent="flex-end"
                                            direction="row"
                                            alignItems="flex-end"
                                            item xs={12} sm={2} md={2} lg={2} xl={2}>
                                            <InputLabel style={{ fontSize: 22 }} id="acumulado">Acumulado: </InputLabel>
                                        </Grid>

                                        <Grid
                                            item xs={12} sm={2} md={2} lg={2} xl={2}>
                                            <Select
                                                labelId="acumulado"
                                                id="acumulado"
                                                value={parametros.acumulado}
                                                name="acumulado"
                                                style={{ fontSize: 18, fontWeight: 'bold' }}
                                                onChange={e => setParametros(prevState => ({ ...prevState, [e.target.name]: e.target.value }))} label="acumulado"
                                            >
                                                <MenuItem value={0}>Por Dia</MenuItem>
                                                <MenuItem value={1}>Por Hora</MenuItem>
                                                <MenuItem value={2}>Tempo Real</MenuItem>


                                            </Select>
                                        </Grid>

                                    </Grid>

                                    <Grid
                                        item xs={12} sm={2} md={2} lg={2} xl={2}
                                        direction="row"
                                        container
                                        justifyContent="center"
                                        alignItems="center"
                                        style={{ padding: 20, width: '100%', fontSize: 22 }}
                                    >

                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={(e) => handlepesquisarVentiladores()}
                                        >
                                            pesquisar
                                        </Button>

                                    </Grid>

                                    <Grid item xs={12}
                                        style={{ color: 'black' }}>
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="center"
                                            alignItems="center"
                                            item xs={12}
                                            style={{ color: 'black' }}
                                        >

                                            <FormControlLabel
                                                label="Legendas"
                                                control={<Checkbox checked={legendas} onChange={() => handleChangeLegends()} />}
                                            />

                                            <FormControlLabel
                                                label="Animação"
                                                control={<Checkbox checked={animacao} onChange={() => handleChangeAnimacao()} />}
                                            />

                                        </Grid>

                                    </Grid>

                                </Grid>

                            </div>
                            {searchingVentiladores ?
                                <div></div>
                                :
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={10}
                                    style={{ paddingBottom: 50 }}
                                >
                                    <Paper elevation={5} style={{ height: 400, borderRadius: '20px', backgroundColor: '#E6E6FA', marginBotton: 50 }} >
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart
                                                width={400}
                                                height={400}
                                                data={registrosVentiladores.map((medida => {

                                                    medida['data_formatada'] = parametros.acumulado === 2 ? formatDataAndHourComplete(medida.data_hora) : formatDataAndHour(medida.data_hora)
                                                    medida['Medição'] = medida.valor
                                                    medida['amt'] = medida.valor
                                                    return medida;
                                                }))}
                                                margin={{
                                                    top: 30,
                                                    right: 30,
                                                    left: 20,
                                                    bottom: 5
                                                }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey='data_formatada'
                                                    tick={{ fill: 'blue' }} tickLine={{ stroke: 'blue' }}

                                                />
                                                <YAxis
                                                    tickFormatter={DataFormater}
                                                    unit={"ºC"}
                                                    tick={{ fill: 'green' }} tickLine={{ stroke: 'green' }}

                                                />
                                                <Tooltip />

                                                <Legend
                                                    align="right"
                                                    verticalAlign="top"
                                                    layout="vertical"
                                                />
                                                <Line type="monotone" dataKey="Medição" strokeWidth={espessura} stroke="#000080" unit={"ºC"} >
                                                    <LabelList unit={"ºC"} content={<CustomizedLabel />} />
                                                </Line>
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </Paper>
                                </Grid>



                            }

                            {searchingVentiladoresStatus ?
                                <div></div>
                                :
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={10}
                                    style={{ paddingBottom: 50 }}
                                >
                                    <Paper elevation={5} style={{ height: 400, borderRadius: '20px', backgroundColor: '#E6E6FA', marginBotton: 50 }} >
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart
                                                width={400}
                                                height={400}
                                                data={registrosVentiladoresStatus.map((medida => {

                                                    medida['data_formatada'] = parametros.acumulado === 2 ? formatDataAndHourComplete(medida.data_hora) : formatDataAndHour(medida.data_hora)
                                                    medida['Status'] = medida.status
                                                    medida['amt'] = medida.status
                                                    return medida;
                                                }))}
                                                margin={{
                                                    top: 30,
                                                    right: 30,
                                                    left: 20,
                                                    bottom: 5
                                                }}
                                            >
                                                <defs>
                                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                                    </linearGradient>
                                                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey='data_formatada'
                                                    tick={{ fill: 'blue' }} tickLine={{ stroke: 'blue' }}

                                                />

                                                <Tooltip />

                                                <Legend
                                                    align="right"
                                                    verticalAlign="top"
                                                    layout="vertical"
                                                />
                                                <Area
                                                    type="monotone"
                                                    dataKey="Status"
                                                    stroke="#000080"
                                                    fillOpacity={1}
                                                    fill="url(#colorUv)" />


                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </Paper>
                                </Grid>



                            }


                        </Grid>


                    }
                </div >

                <div value={value} index={3} >


                    {

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




                            <div>
                                <Grid container
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="center"
                                    item xs={12}
                                    style={{ marginTop: 50 }}
                                    spacing={3}
                                >
                                    <Grid item xs={2} >
                                        <TextField
                                            variant="standard"
                                            name="dataInicioResfriador"
                                            label="Data de Início"
                                            required
                                            id="dataInicioResfriador"
                                            value={dataInicioResfriador}
                                            onChange={e => (e.target.value === '' || /^[0-9/\b]+$/.test(e.target.value)) ? setDataInicioResfriador(maskDate(e.target.value)) : null}
                                            error={erroDataInicioResfriador}
                                            helperText={textoErroDataInicioResfriador}
                                            fullWidth
                                            disabled={parametros.acumulado === 2 ? true : false}
                                        />
                                    </Grid>

                                    <Grid item xs={2} >
                                        <TextField
                                            variant="standard"
                                            name="dataFimResfriador"
                                            label="Data Final"
                                            required
                                            id="dataFimResfriador"
                                            value={dataFimResfriador}
                                            onChange={e => (e.target.value === '' || /^[0-9/\b]+$/.test(e.target.value)) ? setDataFimResfriador(maskDate(e.target.value)) : null}
                                            error={erroDataFimResfriador}
                                            helperText={textoErroDataFimResfriador}
                                            fullWidth
                                            disabled={parametros.acumulado === 2 ? true : false}

                                        />
                                    </Grid>


                                    <Grid
                                        item xs={12} sm={3} md={3} lg={3} xl={3}
                                        direction="row"
                                        container
                                        justifyContent="center"
                                        alignItems="center"
                                        style={{ padding: 20, width: '100%', fontSize: 22 }}
                                    >
                                        <Grid
                                            container
                                            justifyContent="flex-end"
                                            direction="row"
                                            alignItems="flex-end"
                                            item xs={12} sm={2} md={2} lg={2} xl={2}>
                                            <InputLabel style={{ fontSize: 22 }} id="acumulado">Acumulado: </InputLabel>
                                        </Grid>

                                        <Grid
                                            item xs={12} sm={2} md={2} lg={2} xl={2}>
                                            <Select
                                                labelId="acumulado"
                                                id="acumulado"
                                                value={parametros.acumulado}
                                                name="acumulado"
                                                style={{ fontSize: 18, fontWeight: 'bold' }}
                                                onChange={e => setParametros(prevState => ({ ...prevState, [e.target.name]: e.target.value }))} label="acumulado"
                                            >
                                                <MenuItem value={0}>Por Dia</MenuItem>
                                                <MenuItem value={1}>Por Hora</MenuItem>
                                                <MenuItem value={2}>Tempo Real</MenuItem>


                                            </Select>
                                        </Grid>

                                    </Grid>

                                    <Grid
                                        item xs={12} sm={2} md={2} lg={2} xl={2}
                                        direction="row"
                                        container
                                        justifyContent="center"
                                        alignItems="center"
                                        style={{ padding: 20, width: '100%', fontSize: 22 }}
                                    >

                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handlepesquisarResfriador()}
                                        >
                                            pesquisar
                                        </Button>

                                    </Grid>

                                    <Grid item xs={12}
                                        style={{ color: 'black' }}>
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="center"
                                            alignItems="center"
                                            item xs={12}
                                            style={{ color: 'black' }}
                                        >

                                            <FormControlLabel
                                                label="Legendas"
                                                control={<Checkbox checked={legendas} onChange={() => handleChangeLegends()} />}
                                            />

                                            <FormControlLabel
                                                label="Animação"
                                                control={<Checkbox checked={animacao} onChange={() => handleChangeAnimacao()} />}
                                            />

                                        </Grid>

                                    </Grid>

                                </Grid>

                            </div>
                            {searchingResfriador ?
                                <div></div>
                                :
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={10}
                                    style={{ paddingBottom: 50 }}
                                >
                                    <Paper elevation={5} style={{ height: 400, borderRadius: '20px', backgroundColor: '#E6E6FA', marginBotton: 50 }} >
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart
                                                width={400}
                                                height={400}
                                                data={registrosResfriador.map((medida => {

                                                    medida['data_formatada'] = parametros.acumulado === 2 ? formatDataAndHourComplete(medida.data_hora) : formatDataAndHour(medida.data_hora)
                                                    medida['Medição'] = medida.valor
                                                    medida['amt'] = medida.valor
                                                    return medida;
                                                }))}
                                                margin={{
                                                    top: 30,
                                                    right: 30,
                                                    left: 20,
                                                    bottom: 5
                                                }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey='data_formatada'
                                                    tick={{ fill: 'blue' }} tickLine={{ stroke: 'blue' }}

                                                />
                                                <YAxis
                                                    tickFormatter={DataFormater}
                                                    unit={"ºC"}
                                                    tick={{ fill: 'green' }} tickLine={{ stroke: 'green' }}

                                                />
                                                <Tooltip />

                                                <Legend
                                                    align="right"
                                                    verticalAlign="top"
                                                    layout="vertical"
                                                />
                                                <Line type="monotone" dataKey="Medição" strokeWidth={espessura} stroke="#000080" unit={"ºC"} >
                                                    <LabelList unit={"ºC"} content={<CustomizedLabel />} />
                                                </Line>
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </Paper>
                                </Grid>



                            }

                        </Grid>


                    }
                </div >

                <div value={value} index={4} >


                    {


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




                            <div>
                                <Grid container
                                    direction="row"
                                    alignItems="center"
                                    justifyContent="center"
                                    item xs={12} sm={12} md={12} lg={12} xl={12}

                                    style={{ marginTop: 50 }}
                                    spacing={3}
                                >
                                    <Grid item xs={2} >
                                        <TextField
                                            variant="standard"
                                            name="dataInicioAspersores"
                                            label="Data de Início"
                                            required
                                            id="dataInicioAspersores"
                                            value={dataInicioAspersores}
                                            onChange={e => (e.target.value === '' || /^[0-9/\b]+$/.test(e.target.value)) ? setDataInicioAspersores(maskDate(e.target.value)) : null}
                                            error={erroDataInicioAspersores}
                                            helperText={textoErroDataInicioAspersores}
                                            fullWidth
                                            disabled={parametros.acumulado === 2 ? true : false}
                                        />
                                    </Grid>

                                    <Grid item xs={2} >
                                        <TextField
                                            variant="standard"
                                            name="dataFimAspersores"
                                            label="Data Final"
                                            required
                                            id="dataFimAspersores"
                                            value={dataFimAspersores}
                                            onChange={e => (e.target.value === '' || /^[0-9/\b]+$/.test(e.target.value)) ? setDataFimAspersores(maskDate(e.target.value)) : null}
                                            error={erroDataFimAspersores}
                                            helperText={textoErroDataFimAspersores}
                                            fullWidth
                                            disabled={parametros.acumulado === 2 ? true : false}

                                        />
                                    </Grid>


                                    <Grid
                                        item xs={12} sm={3} md={3} lg={3} xl={3}
                                        direction="row"
                                        container
                                        justifyContent="center"
                                        alignItems="center"
                                        style={{ padding: 20, width: '100%', fontSize: 22 }}
                                    >
                                        <Grid
                                            container
                                            justifyContent="flex-end"
                                            direction="row"
                                            alignItems="flex-end"
                                            item xs={12} sm={2} md={2} lg={2} xl={2}>
                                            <InputLabel style={{ fontSize: 22 }} id="acumulado">Acumulado: </InputLabel>
                                        </Grid>

                                        <Grid
                                            item xs={12} sm={2} md={2} lg={2} xl={2}>
                                            <Select
                                                labelId="acumulado"
                                                id="acumulado"
                                                value={parametros.acumulado}
                                                name="acumulado"
                                                style={{ fontSize: 18, fontWeight: 'bold' }}
                                                onChange={e => setParametros(prevState => ({ ...prevState, [e.target.name]: e.target.value }))} label="acumulado"
                                            >
                                                <MenuItem value={0}>Por Dia</MenuItem>
                                                <MenuItem value={1}>Por Hora</MenuItem>
                                                <MenuItem value={2}>Tempo Real</MenuItem>


                                            </Select>
                                        </Grid>

                                    </Grid>

                                    <Grid
                                        item xs={12} sm={2} md={2} lg={2} xl={2}
                                        direction="row"
                                        container
                                        justifyContent="center"
                                        alignItems="center"
                                        style={{ padding: 20, width: '100%', fontSize: 22 }}
                                    >

                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={(e) => handlepesquisarRefrescador()}
                                        >
                                            pesquisar
                                        </Button>

                                    </Grid>

                                    <Grid item xs={12}
                                        style={{ color: 'black' }}>
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="center"
                                            alignItems="center"
                                            item xs={12}
                                            style={{ color: 'black' }}
                                        >

                                            <FormControlLabel
                                                label="Legendas"
                                                control={<Checkbox checked={legendas} onChange={() => handleChangeLegends()} />}
                                            />

                                            <FormControlLabel
                                                label="Animação"
                                                control={<Checkbox checked={animacao} onChange={() => handleChangeAnimacao()} />}
                                            />

                                        </Grid>

                                    </Grid>

                                </Grid>

                            </div>


                            {searchingRefrescadorStatus ?
                                <div></div>
                                :
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={10}
                                    style={{ paddingBottom: 50 }}
                                >
                                    <Paper elevation={5} style={{ height: 400, borderRadius: '20px', backgroundColor: '#E6E6FA', marginBotton: 50 }} >
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart
                                                width={400}
                                                height={400}
                                                data={registrosRefrescadorStatus.map((medida => {

                                                    medida['data_formatada'] = parametros.acumulado === 2 ? formatDataAndHourComplete(medida.data_hora) : formatDataAndHour(medida.data_hora)
                                                    medida['Status'] = medida.status
                                                    medida['amt'] = medida.status
                                                    return medida;
                                                }))}
                                                margin={{
                                                    top: 30,
                                                    right: 30,
                                                    left: 20,
                                                    bottom: 5
                                                }}
                                            >
                                                <defs>
                                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                                    </linearGradient>
                                                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey='data_formatada'
                                                    tick={{ fill: 'blue' }} tickLine={{ stroke: 'blue' }}

                                                />

                                                <Tooltip />

                                                <Legend
                                                    align="right"
                                                    verticalAlign="top"
                                                    layout="vertical"
                                                />
                                                <Area
                                                    type="monotone"
                                                    dataKey="Status"
                                                    stroke="#000080"
                                                    fillOpacity={1}
                                                    fill="url(#colorUv)" />


                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </Paper>
                                </Grid>



                            }

                            {searchingBoilerTemp ?
                                <div></div>
                                :
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={10}
                                    style={{ paddingBottom: 50 }}
                                >
                                    <Paper elevation={5} style={{ height: 400, borderRadius: '20px', backgroundColor: '#E6E6FA', marginBotton: 50 }} >
                                        <ResponsiveContainer width="100%" height="100%">
                                            <LineChart
                                                width={400}
                                                height={400}
                                                data={registrosBoilerTemp.map((medida => {

                                                    medida['data_formatada'] = parametros.acumulado === 2 ? formatDataAndHourComplete(medida.data_hora) : formatDataAndHour(medida.data_hora)
                                                    medida['Temperatura'] = medida.valor
                                                    medida['amt'] = medida.valor
                                                    return medida;
                                                }))}
                                                margin={{
                                                    top: 30,
                                                    right: 30,
                                                    left: 20,
                                                    bottom: 5
                                                }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey='data_formatada'
                                                    tick={{ fill: 'blue' }} tickLine={{ stroke: 'blue' }}

                                                />
                                                <YAxis
                                                    tickFormatter={DataFormater}
                                                    unit={"ºC"}
                                                    tick={{ fill: 'green' }} tickLine={{ stroke: 'green' }}

                                                />
                                                <Tooltip />

                                                <Legend
                                                    align="right"
                                                    verticalAlign="top"
                                                    layout="vertical"
                                                />
                                                <Line type="monotone" dataKey="Temperatura" strokeWidth={espessura} stroke="#000080" unit={"ºC"} >
                                                    <LabelList unit={"ºC"} content={<CustomizedLabel />} />
                                                </Line>
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </Paper>
                                </Grid>



                            }

                            {searchingBoilerTempStatus ?
                                <div></div>
                                :
                                <Grid item xs={12} sm={12} md={12} lg={12} xl={10}
                                    style={{ paddingBottom: 50 }}
                                >
                                    <Paper elevation={5} style={{ height: 400, borderRadius: '20px', backgroundColor: '#E6E6FA', marginBotton: 50 }} >
                                        <ResponsiveContainer width="100%" height="100%">
                                            <AreaChart
                                                width={400}
                                                height={400}
                                                data={registrosBoilerTempStatus.map((medida => {

                                                    medida['data_formatada'] = parametros.acumulado === 2 ? formatDataAndHourComplete(medida.data_hora) : formatDataAndHour(medida.data_hora)
                                                    medida['Status'] = medida.status
                                                    medida['amt'] = medida.status
                                                    return medida;
                                                }))}
                                                margin={{
                                                    top: 30,
                                                    right: 30,
                                                    left: 20,
                                                    bottom: 5
                                                }}
                                            >
                                                <defs>
                                                    <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                                                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                                                    </linearGradient>
                                                    <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                                                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                                                    </linearGradient>
                                                </defs>
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey='data_formatada'
                                                    tick={{ fill: 'blue' }} tickLine={{ stroke: 'blue' }}

                                                />

                                                <Tooltip />

                                                <Legend
                                                    align="right"
                                                    verticalAlign="top"
                                                    layout="vertical"
                                                />
                                                <Area
                                                    type="monotone"
                                                    dataKey="Status"
                                                    stroke="#000080"
                                                    fillOpacity={1}
                                                    fill="url(#colorUv)" />


                                            </AreaChart>
                                        </ResponsiveContainer>
                                    </Paper>
                                </Grid>



                            }


                        </Grid>
                    }

                </div >




            </SwipeableViews>



        </div>


    );
}



