import React, { useState, useEffect } from 'react';
import './styles.scss';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import logo from '../../assets/imgs/logo.png';

const Rodape = () => {

    const date = new Date();
    const [width, setWidth] = useState(0);

    function checkDimenssoes() {
        var largura = window.innerWidth
            || document.documentElement.clientWidth
            || document.body.clientWidth;
     
        console.log("largura: " + largura);

        setWidth(largura);

    }

    window.addEventListener('resize', function (event) {
        checkDimenssoes();
    });

    useEffect(() => {

        checkDimenssoes();

    }, []);


    return (
        <div>
            <div  style={{paddingBottom: 30, paddingTop: 30, backgroundColor:'black'}}>
              
                <a href="https://api.whatsapp.com/send?phone=5138999416698&text=olá" 
                    style={{ height: 40, width: 135, position: 'fixed', right: '15px', bottom: width < 768 ? '10px' : '100px', backgroundColor: 'green', borderRadius: '20px' }}

                >
                    <p style={{ fontSize: 14, lineHeight: '40px', color: 'white', paddingLeft: 10 }}>  Fale Conosco
                        <img src="https://i.ibb.co/VgSspjY/whatsapp-button.png" alt="botão whatsapp" width={35}
                            style={{ paddingLeft: 5 }} />

                    </p>

                </a>
                <div className="container">
                    <div className="row">
                        <Grid container spacing={3}>
                            <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
                                <div >
                                    <img alt="img1" height={200} width={200}

                                        src={logo}
                                    />
                                    <h2>
                                        <span style={{ color: 'white', paddingTop: 20, fontSize: 42, fontWeight: 600 }} >
                                            titaniwm
                                        </span>
                                    </h2>


                                </div>
                            </Grid>


                            <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
                                <div className="footer-menu">
                                    <h2 className="footer-wid-title" style={{fontWeight:'bold', color:'Cyan'}}>Softwares</h2>
                                    <ul>
                                        <li><a id={"arodape"} href="/gestaodecontratos">e-Contract</a></li>
                                        <li><a id={"arodape"}  href="/localizacao">Ainda não encontrei o que procuro</a></li>
                                        <li><a id={"arodape"}  href="/noticias">Blog, Notícias e Tutoriais</a></li>
                                        <li><a id={"arodape"}  href="/contato">Fale Conosco</a></li>
                                    </ul>
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
                                <div className="footer-menu">
                                    <h2 className="footer-wid-title" style={{fontWeight:'bold', color:'Cyan'}} >Serviços</h2>
                                    <ul>
                                        <li><a id={"arodape"}  href="/minhaconta">Criação de WebSites</a></li>
                                        <li><a id={"arodape"}  href="/sobre">Desktop</a></li>
                                        <li><a id={"arodape"}  href="/sobre">ChatBot</a></li>
                                        <li><a id={"arodape"}  href="/iot">IOT</a></li>
                                        <li><a id={"arodape"}  href="/localizacao">Automação</a></li>
                                    </ul>
                                </div>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
                                <div className="footer-menu">
                                    <h2 className="footer-wid-title" style={{fontWeight:'bold', color:'Cyan'}}>Acesso Rápido</h2>
                                    <ul>
                                        <li><a id={"arodape"}  href="/patio">Central de Ajuda</a></li>
                                    </ul>
                                </div>
                            </Grid>


                        </Grid>


                    </div>
                </div>
                <p style={{textAlign:'center', color:'white', fontSize: 22, paddingTop: 30, fontWeight:'bold'}}> Contate-nos: (38) 9 9941-6698</p>

            </div>

            <div className="footer-bottom-area">
                <div className="container" >
                    <Grid item xs={12} >
                        
                        <div style={{ textAlign: 'center' }}>
                            <p style={{ paddingTop: 30, fontSize: 20 }} >  &copy; titaniwm {moment(date).format("yyyy")} <br></br>  Todos os Direitos Reservados</p>
                        </div>
                    </Grid>
                    
                </div>
               
            </div>
           
        </div>

    )
}
export default Rodape;
